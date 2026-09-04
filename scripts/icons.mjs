#!/usr/bin/env node

// Generate the icons a build needs, and only those.
//
// Everything is derived from resources/artwork/logo.svg, so nothing downstream
// of it is committed - not the 1024px master, and not the icons made from it. That
// made them install-time state: `postinstall` generated them once and nothing
// ever looked again, so pulling a commit that changed the artwork left every
// later build shipping the old mark with nothing to warn you. It happened - the
// Palmas icon landed on 3 September and the desktop builds carried the A Compás
// one until a .dmg was opened - and the profile has the same failure mode, since
// adding the Linux sizes to it left a directory electron-builder expects simply
// absent.
//
// So a build asks this first rather than anyone remembering a command, and it
// answers two questions the old arrangement could not:
//
//   what does THIS target need   - a macOS build has no use for icon.ico or the
//                                  Linux set, and generating them only invites
//                                  the question of why they are there
//   were these made from THIS art - by hashing the sources, not by comparing
//                                  timestamps, which say when git touched a
//                                  file rather than whether it changed
//
// Usage: node scripts/icons.mjs [web|electron|ios|android ...]
// With no arguments: every target this host can build, so a fresh clone is
// ready for Xcode or Android Studio without a build having to run first.

import { execFileSync } from 'node:child_process'
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import {
  existsSync, mkdirSync, readFileSync, rmSync, writeFileSync
} from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const PROFILE = path.join(ROOT, 'icongenie-profile.json')
const STAMPS = path.join(ROOT, '.icons')

const MASTER_SVG = path.join(ROOT, 'resources', 'artwork', 'logo.svg')

// Icon Genie wants a master at least this big to produce the largest asset in
// the profile - the 1024px iOS app icon - without upscaling.
const MASTER_SIZE = 1024

const TARGETS = ['web', 'electron', 'ios', 'android']

/**
 * Work Icon Genie cannot do, run straight after it so the set is finished
 * rather than left to be repaired by whoever remembers.
 *
 * iOS needs two things it does not provide: the app icon flattened, because
 * App Store Connect refuses an alpha channel at upload - hours after anyone
 * was thinking about icons - and the splash present under all three names the
 * asset catalogue lists, because Xcode will not build with any of them absent.
 */
const FINISHERS = {
  ios: {
    script: path.join(ROOT, 'packaging', 'prepare-ios-assets.mjs'),
    outputs: [
      'src-capacitor/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-1.png',
      'src-capacitor/ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732-2.png'
    ]
  }
}

// ---------------------------------------------------------------- selection

/**
 * Which target an asset belongs to. Keyed on where it is written rather than on
 * anything in the profile, because the profile is Icon Genie's schema and has
 * nowhere to record this. Electron is split further by host: the .icns is dead
 * weight on Windows and the whole linux/ directory is dead weight on both.
 */
function targetOf (asset) {
  const folder = asset.folder

  if (folder === 'public' || folder.startsWith('public/')) return 'web'
  if (folder.startsWith('src-capacitor/android/')) return 'android'
  if (folder.startsWith('src-capacitor/ios/')) return 'ios'

  if (folder.startsWith('src-electron/')) {
    if (folder.endsWith('/linux')) return 'electron:linux'
    if (asset.generator === 'icns') return 'electron:darwin'
    if (asset.generator === 'ico') return 'electron:win32'
    // icon.png carries no platform of its own; every Electron host may want it.
    return 'electron'
  }

  throw new Error(`no target known for ${folder}, so it would never be generated`)
}

function assetsFor (profile, target) {
  const wanted = target === 'electron'
    ? new Set(['electron', `electron:${process.platform}`])
    : new Set([target])

  return profile.assets.filter(asset => wanted.has(targetOf(asset)))
}

/** Every file an asset writes, so one added to the profile counts as missing. */
function outputsOf (assets) {
  const files = []
  for (const asset of assets) {
    for (const size of asset.sizes ?? [null]) {
      // A splashscreen size is a [width, height] pair and names its file
      // "1290x2796"; every other generator takes a single number.
      const label = Array.isArray(size) ? size.join('x') : String(size)
      files.push(path.join(ROOT, asset.folder, asset.name.replaceAll('{size}', label)))
    }
  }
  return files
}

// -------------------------------------------------------------------- state

/**
 * What the outputs were generated from. Content rather than mtime: `git
 * checkout` stamps files with the time it wrote them, so mtimes answer "when
 * did git last touch this" and not "is this still made from the current art".
 */
function fingerprint (profile, assets, target) {
  const hash = createHash('sha256')
  for (const source of sourcesOf(profile)) hash.update(readFileSync(source))
  hash.update(JSON.stringify({ params: profile.params, assets }))

  // The finisher shapes the output as much as the artwork does, so editing it
  // has to invalidate what it produced.
  const finisher = FINISHERS[target]
  if (finisher !== undefined) hash.update(readFileSync(finisher.script))

  return hash.digest('hex')
}

function sourcesOf (profile) {
  const sources = [MASTER_SVG]
  if (profile.params.background !== undefined) {
    sources.push(path.join(ROOT, profile.params.background))
  }
  return sources
}

/**
 * Render the master PNG the profile names, from the drawing it was always
 * exported from by hand.
 *
 * Rendered at the target size rather than drawn small and scaled up, because
 * the SVG's own viewBox is 184px and rasterising at that then enlarging is how
 * you would quietly lose the quality this is meant to preserve.
 */
async function ensureMaster (profile) {
  const master = path.join(ROOT, profile.params.icon)
  const stamp = path.join(STAMPS, 'master.json')
  const wanted = createHash('sha256').update(readFileSync(MASTER_SVG)).digest('hex')

  let current = null
  try {
    current = JSON.parse(readFileSync(stamp, 'utf8')).fingerprint
  } catch { /* no stamp, so render */ }

  if (existsSync(master) && current === wanted) return

  console.log(`Rendering ${path.relative(ROOT, master)} from ${path.relative(ROOT, MASTER_SVG)}`)

  const natural = await sharp(MASTER_SVG).metadata()
  await sharp(MASTER_SVG, { density: 72 * (MASTER_SIZE / natural.width) })
    .resize(MASTER_SIZE, MASTER_SIZE)
    .png()
    .toFile(master)

  mkdirSync(STAMPS, { recursive: true })
  writeFileSync(stamp, JSON.stringify({ fingerprint: wanted }, null, 2) + '\n')
}

const stampFor = target => path.join(STAMPS, `${target}.json`)

function readStamp (target) {
  try {
    return JSON.parse(readFileSync(stampFor(target), 'utf8'))
  } catch {
    return null
  }
}

// ---------------------------------------------------------------- generation

function generate (profile, assets, target) {
  // Icon Genie takes a profile file and generates everything in it, so the
  // subset is expressed as a profile of its own rather than by filtering after
  // the fact - which would mean writing the whole set to find out we did not
  // want most of it.
  const scratch = path.join(os.tmpdir(), `palmas-icons-${process.pid}-${target}.json`)
  writeFileSync(scratch, JSON.stringify({ params: profile.params, assets }))

  const generator = path.join(
    ROOT, 'node_modules', '@quasar', 'icongenie', 'bin', 'icongenie.js'
  )

  try {
    execFileSync(process.execPath, [generator, 'generate', '-p', scratch], {
      cwd: ROOT,
      stdio: 'inherit'
    })
  } finally {
    rmSync(scratch, { force: true })
  }
}

// --------------------------------------------------------------------- main

function ensure (profile, target) {
  const assets = assetsFor(profile, target)
  if (assets.length === 0) {
    console.log(`  ${target}: nothing to generate on ${process.platform}`)
    return
  }

  const finisher = FINISHERS[target]
  const outputs = outputsOf(assets).concat(
    (finisher?.outputs ?? []).map(file => path.join(ROOT, file))
  )
  const missing = outputs.filter(file => !existsSync(file))
  const wanted = fingerprint(profile, assets, target)
  const stamp = readStamp(target)

  let reason = null
  if (missing.length > 0) {
    reason = missing.length === 1
      ? `${path.relative(ROOT, missing[0])} is missing`
      : `${missing.length} files are missing, starting with ${path.relative(ROOT, missing[0])}`
  } else if (stamp === null) {
    reason = 'nothing recorded what these were generated from'
  } else if (stamp.fingerprint !== wanted) {
    reason = 'the artwork or the profile has changed'
  }

  if (reason === null) return

  console.log(`Icons for ${target}: ${reason}`)
  generate(profile, assets, target)

  if (finisher !== undefined) {
    execFileSync(process.execPath, [finisher.script], { cwd: ROOT, stdio: 'inherit' })
  }

  const stillMissing = outputs.filter(file => !existsSync(file))
  if (stillMissing.length > 0) {
    const names = stillMissing.map(file => path.relative(ROOT, file)).join(', ')
    throw new Error(`Icon Genie did not write: ${names}`)
  }

  mkdirSync(STAMPS, { recursive: true })
  writeFileSync(stampFor(target), JSON.stringify({
    fingerprint: wanted,
    generated: new Date().toISOString(),
    files: outputs.map(file => path.relative(ROOT, file))
  }, null, 2) + '\n')
}

const profile = JSON.parse(readFileSync(PROFILE, 'utf8'))

await ensureMaster(profile)

for (const source of sourcesOf(profile)) {
  if (!existsSync(source)) {
    console.error(`\nERROR: missing icon source: ${path.relative(ROOT, source)}\n`)
    process.exit(1)
  }
}

/**
 * What this host can build, which is what a fresh clone should end up with so
 * that opening Xcode or Android Studio before any build still finds its icons.
 * Electron means this platform because electron-builder does not cross-compile;
 * iOS needs Xcode, so macOS only; Android tooling runs everywhere.
 */
const hostTargets = () => process.platform === 'darwin'
  ? ['web', 'electron', 'ios', 'android']
  : ['web', 'electron', 'android']

const asked = process.argv.slice(2).filter(argument => !argument.startsWith('-'))
const targets = asked.length > 0 ? asked : hostTargets()

for (const target of targets) {
  if (!TARGETS.includes(target)) {
    console.error(`\nERROR: unknown icon target "${target}", expected one of ${TARGETS.join(', ')}\n`)
    process.exit(1)
  }
}

try {
  for (const target of targets) ensure(profile, target)
} catch (error) {
  console.error(`\nERROR: ${error.message}\n`)
  process.exit(1)
}
