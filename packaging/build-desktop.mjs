#!/usr/bin/env node
//
// Build the desktop application for whichever platform you are on.
//
//   node packaging/build-desktop.mjs              installers for this platform
//   node packaging/build-desktop.mjs --unpacked   just the app directory, no installers
//   node packaging/build-desktop.mjs --help
//
// electron-builder does not cross-compile: run this on the platform you want a
// package for. One script rather than one per platform, because Node is
// necessarily present - you cannot build an Electron app without it - so the
// bootstrap problem that justifies setup.ps1 and setup.sh does not apply here.
//
// Signing is opt-in everywhere. Credentials live in a file outside the
// repository, and without it the build simply goes unsigned, which is the right
// outcome for anyone who is not the maintainer.

import { existsSync, readFileSync, rmSync, readdirSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(ROOT)

const WIN = process.platform === 'win32'
const MAC = process.platform === 'darwin'

// VS Code's plugin host exports ELECTRON_RUN_AS_NODE=1 and every shell it
// spawns inherits it, so a build started from an editor terminal gets it even
// though no dotfile sets it. It makes the Electron binary run as plain Node -
// no app, no BrowserWindow, no window - and the failure reads as a broken
// build rather than a broken environment. Nothing here ever wants it set.
delete process.env.ELECTRON_RUN_AS_NODE

if (process.argv.includes('--help')) {
  console.log('Usage: node packaging/build-desktop.mjs [--unpacked]')
  console.log('  (no options)  build the installers for this platform')
  console.log('  --unpacked    stop after the unpacked app directory - much faster,')
  console.log('                and what the end-to-end tests launch')
  process.exit(0)
}

const unpackedOnly = process.argv.includes('--unpacked')

// ------------------------------------------------------------------ helpers

const heading = title => console.log(`\n${title}\n${'-'.repeat(title.length)}`)

const fail = message => {
  console.error(`\nERROR: ${message}\n`)
  process.exit(1)
}

/** Read a shell-style settings file: KEY=value, optional `export`, optional quotes. */
function readSettings (file) {
  if (!existsSync(file)) return {}

  const values = {}
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (match === null) continue

    const [, name, rest] = match
    // Strip a trailing comment only when the value is not quoted, and then the
    // surrounding quotes. A password may legitimately contain a '#'.
    const raw = rest.trim()
    const quoted = /^(['"])(.*)\1\s*$/.exec(raw)
    values[name] = quoted === null ? raw.replace(/\s+#.*$/, '').trim() : quoted[2]
  }
  return values
}

const megabytes = bytes => `${(bytes / 1024 / 1024).toFixed(1)} MB`

// ------------------------------------------------------------------ preflight

heading('Checking the project')

if (!existsSync(path.join(ROOT, 'node_modules'))) {
  fail('Dependencies are not installed. Run: node scripts/setup.mjs')
}

// Electron delivers its runtime through its own postinstall rather than as
// files in the package, and that step can be skipped without failing `yarn
// install`. Without it electron-builder has nothing to package, and the error
// it gives says very little.
if (!existsSync(path.join(ROOT, 'node_modules', 'electron', 'path.txt'))) {
  fail('The Electron runtime is missing, so there is nothing to package.\n' +
    '       Fix it with: node node_modules/electron/install.js')
}

const quasar = path.join(ROOT, 'node_modules', '@quasar', 'app-vite', 'bin', 'quasar.js')
if (!existsSync(quasar)) fail('The Quasar CLI was not found. Run: node scripts/setup.mjs')

console.log(`  platform    ${process.platform} ${process.arch}`)
console.log(`  electron    ${JSON.parse(readFileSync(path.join(ROOT, 'node_modules/electron/package.json'), 'utf8')).version}`)

// ------------------------------------------------------------------- signing

heading('Signing')

// One file per platform, outside every repository, so no credential is baked
// into the source and there is a single place to edit it. macsign.env is the
// name the other macOS ports here already use.
const settingsFile = process.env.ACOMPAS_SIGN_ENV ??
  path.join(os.homedir(), '.config', MAC ? 'macsign.env' : 'winsign.env')

const settings = readSettings(settingsFile)

if (MAC) {
  // Deliberately not reimplemented here. packaging/build_mac already handles
  // Apple's signing and notarisation, including two traps that are easy to get
  // wrong: electron-builder's APPLE_API_KEY variables collide with the ones in
  // the settings file but mean different things, and notarytool exits 0 when
  // Apple *answers*, not when Apple approves. That logic works and cannot be
  // verified from any other platform, so this script hands macOS to it rather
  // than porting it blind.
  console.log('  macOS packaging is handled by packaging/build_mac, which signs,')
  console.log('  notarises and staples. Run that instead:')
  console.log('\n      packaging/build_mac         # .dmg')
  console.log('      packaging/build_mac app     # stop after the .app\n')
  process.exit(0)
}

if (WIN) {
  // electron-builder reads a PKCS#12 certificate from CSC_LINK (a path or a
  // base64 blob) and its password from CSC_KEY_PASSWORD. Both must be present
  // for signing to happen at all.
  const link = settings.CSC_LINK ?? settings.WIN_CSC_LINK
  const password = settings.CSC_KEY_PASSWORD ?? settings.WIN_CSC_KEY_PASSWORD

  if (link !== undefined && password !== undefined) {
    process.env.CSC_LINK = link
    process.env.CSC_KEY_PASSWORD = password
    console.log(`  signing with the certificate named in ${settingsFile}`)
  } else {
    console.log('  no certificate configured - building unsigned.')
    console.log('  Windows SmartScreen will warn on another machine; the user has to')
    console.log('  choose "More info" then "Run anyway". To sign instead, put this in')
    console.log(`  ${settingsFile}:`)
    console.log('\n      CSC_LINK="/path/to/certificate.pfx"')
    console.log('      CSC_KEY_PASSWORD="..."\n')
  }
} else {
  console.log('  Linux packages are not signed; nothing to configure.')
}

// -------------------------------------------------------------------- build

heading('Building')

// Only the packaged output goes. node_modules, the generated icons and the
// converted audio are left alone - regenerating them costs minutes and nothing
// in them goes stale between packaging runs.
//
// The retries are for Windows, where a file cannot be deleted while anything
// holds it open. A second build running in another terminal is the usual
// reason, and an unhandled EPERM here is a stack trace pointing at node:fs
// rather than at the thing you actually have to do.
try {
  rmSync(path.join(ROOT, 'dist', 'electron'), {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 300
  })
} catch (error) {
  if (error.code !== 'EPERM' && error.code !== 'EBUSY') throw error
  fail('dist/electron is in use, so the previous build cannot be cleared.\n' +
    '       Another build running in a second terminal is the usual cause;\n' +
    '       a running copy of the app is the other. Close it and try again.')
}

const args = [quasar, 'build', '-m', 'electron']
if (unpackedOnly) args.push('-s')

console.log(`\n  $ node ${args.map(a => (a === quasar ? 'node_modules/@quasar/app-vite/bin/quasar.js' : a)).join(' ')}\n`)

const build = spawnSync(process.execPath, args, { stdio: 'inherit' })
if (build.error !== undefined) throw build.error
if (build.status !== 0) fail('quasar build -m electron failed')

// ------------------------------------------------------------------ results

heading('Produced')

const unpacked = path.join(ROOT, 'dist', 'electron', 'UnPackaged')
if (unpackedOnly) {
  if (!existsSync(unpacked)) fail('No unpacked application appeared under dist/electron')
  console.log(`  ${path.relative(ROOT, unpacked)}`)
  console.log('\n  This is what the end-to-end tests launch: yarn test:e2e\n')
  process.exit(0)
}

const packaged = path.join(ROOT, 'dist', 'electron', 'Packaged')
if (!existsSync(packaged)) fail('No packages appeared under dist/electron/Packaged')

// Describe each artefact rather than just listing it. On Windows the installer
// and the portable build differ by one word in the filename, which is not
// nearly enough to tell them apart when you are looking for something to ship.
const describe = name => {
  if (name.endsWith('.blockmap')) return 'differential-update index for the installer'
  if (WIN && /Setup .*\.exe$/.test(name)) return 'installer - wizard, shortcuts, uninstall entry'
  if (WIN && name.endsWith('.exe')) return 'portable - runs without installing, no shortcuts'
  if (name.endsWith('.AppImage')) return 'portable - chmod +x and run'
  if (name.endsWith('.deb')) return 'Debian/Ubuntu package'
  if (name.endsWith('.rpm')) return 'Fedora/RHEL package'
  if (name.endsWith('.yml')) return 'update metadata'
  return ''
}

const artefacts = readdirSync(packaged)
  .filter(name => statSync(path.join(packaged, name)).isFile())
  .sort()

if (artefacts.length === 0) fail(`Nothing was written to ${path.relative(ROOT, packaged)}`)

for (const name of artefacts) {
  const size = megabytes(statSync(path.join(packaged, name)).size)
  console.log(`  ${size.padStart(9)}  ${name}`)
  const note = describe(name)
  if (note !== '') console.log(`             ${note}`)
}

console.log(`\n  in ${path.relative(ROOT, packaged)}\n`)
