#!/usr/bin/env node
//
// Check this machine's prerequisites, and fix what can be fixed.
//
//   node scripts/setup.mjs           interactive: asks before changing anything
//   node scripts/setup.mjs --check   report only, change nothing (exit 1 on failure)
//
// Node is the only thing this needs, which is also the only thing you cannot
// avoid installing by hand - so it runs before yarn, before ffmpeg, before the
// project's own dependencies exist.
//
// Some things genuinely cannot be automated, and the script says so rather than
// pretending otherwise: it cannot change the PATH of the terminal that launched
// it, and it cannot elevate silently. Where a step needs you, it prints what to
// do and how to resume. Every check re-runs from scratch, so resuming is just
// running it again.

import { appendFileSync, existsSync, mkdirSync, readFileSync, statSync, unlinkSync, writeFileSync, accessSync, constants } from 'node:fs'
import { spawnSync } from 'node:child_process'
// The callback form rather than node:readline/promises, which arrived in Node
// 17. The bootstrap scripts hand over to this file as soon as *any* usable Node
// exists, precisely so the "your Node is too old" conversation happens here
// once instead of in each of them - which only works if this file itself runs
// on an old Node.
import { createInterface } from 'node:readline'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(ROOT)

const WIN = process.platform === 'win32'
const MAC = process.platform === 'darwin'

// Without a terminal there is nobody to ask, so fall back to reporting.
const CHECK_ONLY = process.argv.includes('--check') || process.stdin.isTTY !== true

const rl = CHECK_ONLY ? null : createInterface({ input: process.stdin, output: process.stdout })

const ask = prompt => new Promise(resolve => rl.question(prompt, resolve))

// ---------------------------------------------------------------- utilities

const label = {
  ok: '[ ok ]',
  warn: '[warn]',
  fail: '[fail]',
  todo: '[ -- ]'
}

// Counted so the closing summary cannot claim everything is in place while a
// warning is still on screen - which is how a missing Electron runtime went
// unnoticed in the first place.
let warnings = 0

const say = (status, title, detail) => {
  if (status === 'warn') warnings++
  console.log(`  ${label[status]}  ${title.padEnd(14)}${detail ?? ''}`)
}

const heading = title => console.log(`\n${title}\n${'-'.repeat(title.length)}`)

/** The first executable named `name` on PATH, or null. */
function which (name) {
  const extensions = WIN
    ? (process.env.PATHEXT ?? '.COM;.EXE;.BAT;.CMD').split(';')
    : ['']

  for (const dir of (process.env.PATH ?? '').split(path.delimiter)) {
    if (dir === '') continue
    for (const extension of extensions) {
      const candidate = path.join(dir, name + extension)
      try {
        if (!statSync(candidate).isFile()) continue
        accessSync(candidate, constants.X_OK)
        return candidate
      } catch {
        // Not here, or not runnable.
      }
    }
  }
  return null
}

/**
 * Rewrite a call so Node will actually spawn it.
 *
 * Windows exposes plenty of tools only as .cmd or .bat - yarn, winget's shims,
 * corepack - and Node refuses to spawn those directly since the fix for
 * CVE-2024-27980. Naming the interpreter is the way through; a shell command
 * line is one string, hence the quoting.
 */
function spawnable (command, args) {
  const suffix = command.slice(-4).toLowerCase()
  if (WIN && (suffix === '.cmd' || suffix === '.bat')) {
    const line = [command, ...args].map(arg => `"${arg.replace(/"/g, '""')}"`).join(' ')
    return {
      command: process.env.COMSPEC ?? 'cmd.exe',
      args: ['/d', '/s', '/c', `"${line}"`],
      options: { windowsVerbatimArguments: true }
    }
  }
  return { command, args, options: {} }
}

/** Run a command and return its trimmed stdout, or null if it failed. */
function capture (command, args) {
  const call = spawnable(command, args)
  const result = spawnSync(call.command, call.args, { ...call.options, encoding: 'utf8' })
  if (result.error !== undefined || result.status !== 0) return null
  return (result.stdout ?? '').trim()
}

/** Run a command with its output attached to this terminal. */
function run (command, args) {
  console.log(`\n  $ ${command} ${args.join(' ')}\n`)
  const call = spawnable(command, args)
  const result = spawnSync(call.command, call.args, { ...call.options, stdio: 'inherit' })
  return result.error === undefined && result.status === 0
}

async function confirm (question) {
  if (CHECK_ONLY) return false
  const answer = await ask(`\n  ${question} [y/N] `)
  return /^y(es)?$/i.test(answer.trim())
}

async function choose (question, options) {
  if (CHECK_ONLY) return null
  console.log(`\n  ${question}`)
  options.forEach((option, index) => console.log(`    ${index + 1}) ${option.label}`))
  while (true) {
    const answer = (await ask('  Choose a number: ')).trim()
    const index = Number(answer) - 1
    if (Number.isInteger(index) && index >= 0 && index < options.length) return options[index].value
    console.log('  Not one of the options.')
  }
}

/**
 * Told to the user whenever a step needs a shell they do not have yet.
 *
 * Echoes back whichever entry point they actually used - the bootstrap scripts
 * set ACOMPAS_ENTRY - because being told to resume with a command you did not
 * type reads as a different instruction, not the same one again.
 */
function resumeHere (why) {
  const entry = process.env.ACOMPAS_ENTRY ?? 'node scripts/setup.mjs'
  console.log(`\n  ${why}`)
  console.log('  Then run this again to pick up where you left off:')
  console.log(`\n      ${entry}\n`)
}

// ------------------------------------------------------------ the PATH check

/** The PATH as Windows has it stored, which is what a fresh terminal will get. */
function registryPath () {
  const read = key => {
    const out = capture('reg', ['query', key, '/v', 'Path'])
    if (out === null) return ''
    const match = out.match(/Path\s+REG_(?:EXPAND_)?SZ\s+(.*)/)
    return match === null ? '' : match[1].trim()
  }

  const expand = value =>
    value.replace(/%([^%]+)%/g, (whole, name) => process.env[name] ?? whole)

  const machine = read('HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment')
  const user = read('HKCU\\Environment')
  return `${expand(machine)};${expand(user)}`
}

/**
 * Entries Windows has on PATH that this process did not inherit.
 *
 * A terminal inside VS Code inherits its environment from the VS Code process
 * as it was at launch, so anything installed since is invisible to it - which
 * looks exactly like a failed install. Nothing a child process can do fixes
 * that; only restarting VS Code does.
 */
function stalePathEntries () {
  if (!WIN) return []
  const normalise = entry => entry.trim().replace(/[\\/]+$/, '').toLowerCase()
  const mine = new Set((process.env.PATH ?? '').split(';').map(normalise).filter(Boolean))
  return registryPath()
    .split(';')
    .map(entry => entry.trim())
    .filter(entry => entry !== '' && !mine.has(normalise(entry)))
}

// ---------------------------------------------------------------- Node.js

function engineRange () {
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
  return pkg.engines.node
}

/** Enough of semver for the caret clauses this project's engines field uses. */
function satisfies (version, range) {
  const [major, minor, patch] = version.split('.').map(Number)
  return range.split('||').some(clause => {
    const match = clause.trim().match(/^\^(\d+)(?:\.(\d+))?(?:\.(\d+))?$/)
    if (match === null) return false
    const [, wantMajor, wantMinor, wantPatch] = match
    if (Number(wantMajor) !== major) return false
    if (wantMinor === undefined) return true
    if (minor > Number(wantMinor)) return true
    if (minor < Number(wantMinor)) return false
    return patch >= Number(wantPatch ?? 0)
  })
}

/** Where the fnm shell hook belongs, and the line to put there. */
function hookTarget () {
  const home = os.homedir()
  const shell = process.env.SHELL ?? ''
  const posixLine = 'eval "$(fnm env --use-on-cd)"'

  if (shell.includes('zsh')) return { file: path.join(home, '.zshrc'), line: posixLine }

  if (shell !== '') {
    // Cygwin starts login shells, which read .bash_profile; most others source
    // .bashrc. Prefer whichever already exists.
    const profile = path.join(home, '.bash_profile')
    const rc = path.join(home, '.bashrc')
    return { file: existsSync(profile) ? profile : rc, line: posixLine }
  }

  if (WIN) {
    // setup.ps1 passes the running shell's own $PROFILE. Asking `powershell`
    // here would always answer with the Windows PowerShell 5.1 path, even when
    // the user is in PowerShell 7, which uses a different file.
    const file = process.env.ACOMPAS_PS_PROFILE
      || capture('powershell', ['-NoProfile', '-Command', 'Write-Output $PROFILE'])
    return { file, line: 'fnm env --use-on-cd | Out-String | Invoke-Expression' }
  }

  return { file: path.join(home, '.bashrc'), line: posixLine }
}

/**
 * Find an executable that may have been installed moments ago.
 *
 * A tool installed during this run is on the PATH Windows has stored but not on
 * the copy this process inherited, so an ordinary search cannot see it. Reading
 * the stored PATH lets the script finish the job in one go instead of sending
 * you off to open another terminal between every step.
 */
function whichFresh (name) {
  const found = which(name)
  if (found !== null || !WIN) return found

  const extensions = (process.env.PATHEXT ?? '.COM;.EXE;.BAT;.CMD').split(';')
  for (const dir of registryPath().split(';')) {
    const trimmed = dir.trim()
    if (trimmed === '') continue
    for (const extension of extensions) {
      const candidate = path.join(trimmed, name + extension)
      if (existsSync(candidate)) return candidate
    }
  }
  return null
}

/** Install fnm with this platform's package manager. Returns its path, or null. */
async function installFnm () {
  const installer = WIN
    ? ['winget', ['install', '--id', 'Schniz.fnm', '-e']]
    : MAC
      ? ['brew', ['install', 'fnm']]
      : null

  if (installer === null) {
    console.log('\n  Install fnm with:  curl -fsSL https://fnm.vercel.app/install | bash')
    return null
  }

  if (!await confirm(`Install fnm with ${installer[0]}?`)) return null
  if (!run(installer[0], installer[1])) {
    console.log('\n  That did not succeed. Install fnm by hand and run this again.')
    return null
  }
  return whichFresh('fnm')
}

/** Put fnm's hook in the shell profile. True if the line is there afterwards. */
function writeHook () {
  const target = hookTarget()

  if (target.file === null) {
    console.log('\n  Could not work out which profile file to use. Add this line to it:')
    console.log(`\n      ${target.line}\n`)
    return false
  }

  // A PowerShell profile the shell will refuse to load is worse than no profile
  // at all: PowerShell tries to run it at every startup and prints a security
  // error each time, in every session, for every project. Refuse to create that
  // rather than leaving someone with a permanently noisy shell.
  const policy = process.env.ACOMPAS_PS_POLICY
  if (target.file.endsWith('.ps1') && (policy === 'Restricted' || policy === 'AllSigned')) {
    console.log(`\n  Not writing ${target.file} - nothing has been changed.`)
    console.log(`  This PowerShell's execution policy is ${policy}, so it would refuse to`)
    console.log('  load the profile and would report a security error on every startup.')
    console.log('\n  To use fnm from PowerShell, allow local scripts first:')
    console.log('\n      Set-ExecutionPolicy -Scope CurrentUser RemoteSigned')
    console.log('\n  then run this again.')
    return false
  }

  const existing = existsSync(target.file) ? readFileSync(target.file, 'utf8') : ''
  if (existing.includes('fnm env')) {
    console.log(`\n  The hook is already in ${target.file} - it just has not been sourced yet.`)
    return true
  }

  // A profile path can name a directory that does not exist yet, and
  // appendFileSync would fail with ENOENT rather than creating it.
  mkdirSync(path.dirname(target.file), { recursive: true })

  // Newlines, never os.EOL. On Windows os.EOL is CRLF, and a CRLF written into
  // a POSIX shell profile makes every line of it fail with "$'\r': command not
  // found" - breaking the shell to install a convenience. PowerShell reads LF
  // perfectly well, so LF is right for both targets.
  appendFileSync(target.file, `\n# Added by palmas scripts/setup.mjs\n${target.line}\n`)
  console.log(`\n  Added to ${target.file}:  ${target.line}`)
  return true
}

/**
 * Decide what to do about Node, asking only where there is a real trade-off.
 *
 * A version manager is the better arrangement whenever a machine has more than
 * one Node project, because installing Node directly silently replaces whatever
 * was there. But that is only worth a question when something stands to be
 * lost: with a version manager already present the answer is obvious, and with
 * Node already at a supported version there is nothing to decide at all.
 */
async function checkNode () {
  heading('Node.js')

  const range = engineRange()
  const version = process.versions.node
  const good = satisfies(version, range)
  // Two signals, because either alone gives a wrong answer. The variable is
  // what fnm's hook exports, but it does not always survive into a subprocess -
  // and a Node running out of fnm's own multishell directory is proof enough
  // that fnm is in charge, whatever the environment says.
  const fnmActive = typeof process.env.FNM_MULTISHELL_PATH === 'string' ||
    process.execPath.includes('fnm_multishells')
  let fnm = which('fnm')

  say(good ? 'ok' : 'fail', 'Node.js', good
    ? `v${version}  (${process.execPath})`
    : `v${version} is outside the range this project supports (${range})`)

  if (fnm !== null) {
    say(fnmActive ? 'ok' : 'warn', 'fnm', fnmActive
      ? 'active'
      : 'installed, but its shell hook is not active - so it manages nothing')
  }

  // Node is usable. The only loose end is a version manager sitting inert.
  if (good) {
    if (fnm === null || fnmActive) return 'ok'

    const target = hookTarget()
    const policy = process.env.ACOMPAS_PS_POLICY
    const profileBlocked = target.file !== null &&
      target.file.endsWith('.ps1') &&
      (policy === 'Restricted' || policy === 'AllSigned')

    if (CHECK_ONLY) {
      if (profileBlocked) {
        console.log(`         fix: this PowerShell's execution policy is ${policy}, so a profile`)
        console.log('              would never load. Allow local scripts first:')
        console.log('              Set-ExecutionPolicy -Scope CurrentUser RemoteSigned')
      } else {
        console.log(`         fix: add  ${target.line}  to ${target.file ?? 'your shell profile'}`)
      }
      return 'ok'
    }

    console.log('\n  Node itself is fine, so this is optional tidying.')
    if (await confirm('Activate fnm, so it manages Node for this project?')) {
      if (writeHook()) {
        run(fnm, ['install', '24'])
        run(fnm, ['default', '24'])
        resumeHere('The hook only takes effect in a NEW shell.')
        return 'stop'
      }
    }
    return 'ok'
  }

  if (CHECK_ONLY) {
    console.log('         fix: install Node 24 - see README.md, "Node.js"')
    return 'fail'
  }

  // A version manager is already here, so Node 24 goes in alongside the current
  // version and nothing is lost. No trade-off, so no question.
  if (fnm !== null) {
    console.log(`\n  fnm is installed, so Node 24 can be added alongside v${version}`)
    console.log('  rather than replacing it.')
    if (!fnmActive && !writeHook()) return 'fail'
    if (!run(fnm, ['install', '24'])) return 'fail'
    run(fnm, ['default', '24'])
    resumeHere('Node 24 is installed and set as the default, for a NEW shell.')
    return 'stop'
  }

  // No version manager, and the Node that is here is the wrong version. This is
  // the one case where something is genuinely at stake, so it is the one case
  // that asks.
  const route = await choose(
    `Node v${version} is installed but unsupported. How should that be resolved?`,
    [
      {
        label: `Install fnm and let it manage Node 24, leaving v${version} in place for anything else on this machine`,
        value: 'fnm'
      },
      {
        label: `Replace v${version} with Node 24 system-wide - simplest, but the current Node is uninstalled`,
        value: 'direct'
      },
      { label: 'Skip - I will sort this out myself', value: 'skip' }
    ]
  )

  if (route === 'skip') return 'fail'

  if (route === 'direct') {
    const installer = WIN
      ? ['winget', ['install', '--id', 'OpenJS.NodeJS.LTS', '-e']]
      : MAC
        ? ['brew', ['install', 'node@24']]
        : null

    if (installer === null) {
      console.log('\n  Install Node 24 from https://nodejs.org/en/download/')
    } else {
      if (!await confirm(`This uninstalls v${version}. Go ahead?`)) return 'fail'
      if (!run(installer[0], installer[1])) return 'fail'
    }
    resumeHere('Node was replaced, and PATH changes do not reach a running terminal.')
    return 'stop'
  }

  fnm = await installFnm()
  if (fnm === null) return 'fail'
  if (!writeHook()) return 'fail'
  if (!run(fnm, ['install', '24'])) return 'fail'
  run(fnm, ['default', '24'])
  resumeHere('fnm now holds Node 24; its hook takes effect in a NEW shell.')
  return 'stop'
}

// ------------------------------------------------------------------- Yarn

/**
 * Corepack's own entry point, rather than the `corepack` command.
 *
 * The Node.js Windows installer ships an extensionless POSIX shim next to
 * corepack.cmd, and that shim has CRLF line endings - so running `corepack`
 * from Cygwin or Git Bash dies on the carriage returns. Going through Node
 * sidesteps the shims completely and behaves the same on every platform.
 */
function corepackEntry () {
  const dir = path.dirname(process.execPath)
  return [
    path.join(dir, 'node_modules', 'corepack', 'dist', 'corepack.js'),
    path.join(dir, '..', 'lib', 'node_modules', 'corepack', 'dist', 'corepack.js')
  ].find(existsSync) ?? null
}

/** Really try to write, because Windows ACLs make accessSync untrustworthy. */
function canWriteTo (dir) {
  const probe = path.join(dir, '.palmas-write-probe')
  try {
    writeFileSync(probe, '')
    unlinkSync(probe)
    return true
  } catch {
    return false
  }
}

async function checkYarn () {
  heading('Yarn')

  const yarn = which('yarn')
  if (yarn !== null) {
    say('ok', 'yarn', `${capture(yarn, ['--version']) ?? 'present'}  (${yarn})`)
    return 'ok'
  }

  say('fail', 'yarn', 'not found - Corepack provides the pinned yarn 1.22.22')

  const entry = corepackEntry()
  if (entry === null) {
    console.log('\n  Corepack was not found beside this Node. Node 25 and newer no longer')
    console.log('  bundle it:  npm install -g corepack')
    return 'fail'
  }

  if (CHECK_ONLY) {
    console.log('         fix: corepack enable   (from an administrator PowerShell on Windows)')
    return 'fail'
  }

  if (!await confirm('Enable Corepack now?')) return 'fail'

  // Corepack writes its shims into the Node installation, so where Node lives
  // decides whether this needs elevation at all. An fnm-managed Node is inside
  // the user profile and needs none.
  const nodeDir = path.dirname(process.execPath)
  if (canWriteTo(nodeDir)) {
    if (run(process.execPath, [entry, 'enable'])) {
      resumeHere('Corepack is enabled, but the new yarn shim is not on this shell\'s PATH.')
      return 'stop'
    }
    return 'fail'
  }

  console.log(`\n  ${nodeDir} is not writable by you, so this needs elevation.`)

  if (!WIN) {
    console.log('  Run:  sudo corepack enable')
    resumeHere('Corepack has to be enabled first.')
    return 'stop'
  }

  if (await confirm('Launch an elevated PowerShell to run it? (a UAC prompt will appear)')) {
    const command = `Start-Process -Verb RunAs -Wait -FilePath '${process.execPath}' -ArgumentList '"${entry}"','enable'`
    run('powershell', ['-NoProfile', '-Command', command])
    resumeHere('If you approved the prompt, Corepack is now enabled.')
    return 'stop'
  }

  console.log('\n  Open PowerShell with "Run as administrator" and run:')
  console.log('\n      corepack enable\n')
  resumeHere('Corepack has to be enabled first.')
  return 'stop'
}

// ----------------------------------------------------------------- ffmpeg

async function checkFfmpeg () {
  heading('ffmpeg')

  const ffmpeg = which('ffmpeg')
  if (ffmpeg !== null) {
    const first = (capture(ffmpeg, ['-version']) ?? '').split('\n')[0]
    say('ok', 'ffmpeg', `${first || 'present'}`)
    return 'ok'
  }

  say('fail', 'ffmpeg', 'not found - the app has no playable audio without it')

  const installer = WIN
    ? ['winget', ['install', '--id', 'Gyan.FFmpeg', '-e']]
    : MAC
      ? ['brew', ['install', 'ffmpeg']]
      : which('apt') !== null || which('apt-get') !== null
        ? ['sudo', ['apt', 'install', '-y', 'ffmpeg']]
        : null

  if (CHECK_ONLY) {
    console.log(`         fix: ${installer === null ? 'install ffmpeg with your package manager' : `${installer[0]} ${installer[1].join(' ')}`}`)
    return 'fail'
  }

  if (installer === null) {
    console.log('\n  Install ffmpeg with your package manager, or from https://ffmpeg.org/download.html')
    resumeHere('ffmpeg has to be on PATH before dependencies are installed.')
    return 'stop'
  }

  if (!await confirm(`Install ffmpeg with ${installer[0]}?`)) return 'fail'
  if (!run(installer[0], installer[1])) {
    console.log('\n  That did not succeed. Install ffmpeg by hand and run this again.')
    return 'stop'
  }

  resumeHere('ffmpeg is installed, but PATH changes do not reach a running terminal.')
  return 'stop'
}

// ------------------------------------------------------------- dependencies

async function checkDependencies () {
  heading('Project')

  const rootInstalled = existsSync(path.join(ROOT, 'node_modules'))
  const capacitorInstalled = existsSync(path.join(ROOT, 'src-capacitor', 'node_modules'))
  const prepared = existsSync(path.join(ROOT, '.quasar'))

  say(rootInstalled ? 'ok' : 'todo', 'dependencies',
    rootInstalled ? 'installed' : 'not installed yet')

  // src-capacitor is a second, separate install, and it is not optional even
  // for the plain web build. @quasar/app-vite aliases every dependency listed
  // in src-capacitor/package.json to src-capacitor/node_modules in *every*
  // mode - Capacitor plugins ship web implementations, so shared code under
  // /src may import them. Without the install those aliases point at nothing
  // and `quasar dev` dies with "Failed to resolve import
  // @capacitor/splash-screen", no matter what the root node_modules holds.
  say(capacitorInstalled ? 'ok' : 'todo', 'src-capacitor',
    capacitorInstalled ? 'installed' : 'not installed yet - the web build needs this too')

  if (!prepared && rootInstalled) {
    say('warn', '.quasar', 'missing - run: npx quasar prepare')
  }

  // Electron delivers its ~250MB binary through its own postinstall rather than
  // as files inside the package, and that step can be skipped without failing
  // `yarn install`. The package then looks perfectly installed while the
  // desktop build and the Electron end-to-end specs have nothing to launch. It
  // is only a warning: everything web works without it.
  const electronDir = path.join(ROOT, 'node_modules', 'electron')
  const electronReady = existsSync(path.join(electronDir, 'path.txt'))
  if (rootInstalled && existsSync(electronDir) && !electronReady) {
    // "Installed" would be misleading: the npm package is here, and only the
    // runtime it fetches separately is absent. Naming both halves is the
    // difference between a puzzling message and an obvious one.
    say('warn', 'electron', 'npm package present, but the Electron runtime is missing')
    console.log('         the desktop build and its tests have nothing to launch')
    const installer = path.join(electronDir, 'install.js')

    if (CHECK_ONLY) {
      console.log('         fix: node node_modules/electron/install.js')
      console.log('              ~150MB to download, ~370MB once unpacked')
    } else if (await confirm('Fetch the Electron runtime now? Desktop builds and their tests need it.')) {
      // install.js says nothing at all when it succeeds, so check the artefact
      // rather than trusting the exit status, and say so either way - an echoed
      // command followed by silence tells you nothing about what happened.
      const ok = run(process.execPath, [installer]) &&
        existsSync(path.join(electronDir, 'path.txt'))

      if (ok) {
        say('ok', 'electron', 'runtime fetched')
        // It was counted as a warning moments ago and has just been resolved;
        // leaving it counted would make the closing summary contradict the
        // screen directly above it.
        warnings--
      } else {
        console.log('\n  That did not work. Run it by hand and read the error:')
        console.log('\n      node node_modules/electron/install.js\n')
      }
    }
  } else if (rootInstalled && electronReady) {
    say('ok', 'electron', 'runtime present')
  }

  if (rootInstalled && capacitorInstalled && prepared) return 'ok'

  if (CHECK_ONLY) {
    if (!rootInstalled) console.log('         fix: yarn install')
    if (!capacitorInstalled) console.log('         fix: cd src-capacitor && yarn install')
    return 'fail'
  }

  if (!await confirm('Install the project dependencies now? (several minutes on a first run)')) {
    console.log('\n  When you are ready:')
    console.log('      yarn install')
    console.log('      cd src-capacitor && yarn install')
    return 'ok'
  }

  const yarn = which('yarn')
  if (yarn === null) return 'fail'

  if (!rootInstalled && !run(yarn, ['install'])) return 'fail'

  if (!capacitorInstalled) {
    const capacitorDir = path.join(ROOT, 'src-capacitor')
    process.chdir(capacitorDir)
    const ok = run(yarn, ['install'])
    process.chdir(ROOT)
    if (!ok) return 'fail'
  }

  return 'ok'
}

// -------------------------------------------------------------------- main

async function main () {
  console.log('\nA Compas - setup check')
  console.log(`${process.platform} ${process.arch}, ${CHECK_ONLY ? 'reporting only' : 'interactive'}`)

  // Reported first because it explains every other odd result on this list.
  const stale = stalePathEntries()
  if (stale.length > 0) {
    heading('Environment')
    say('warn', 'PATH', `${stale.length} entr${stale.length === 1 ? 'y is' : 'ies are'} set in Windows but missing from this shell`)
    for (const entry of stale) console.log(`         ${entry}`)
    console.log('\n  Something was installed after this terminal started. A terminal inside')
    console.log('  VS Code inherits its environment from VS Code itself, so a new tab is')
    console.log('  not enough - restart VS Code. To patch just this shell:')
    console.log('\n      $env:PATH = [Environment]::GetEnvironmentVariable(\'Path\',\'Machine\') + \';\' +')
    console.log('                  [Environment]::GetEnvironmentVariable(\'Path\',\'User\')\n')
  }

  const steps = [checkNode, checkYarn, checkFfmpeg, checkDependencies]
  let failed = false

  for (const step of steps) {
    const result = await step()
    if (result === 'stop') {
      rl?.close()
      process.exit(1)
    }
    if (result === 'fail') failed = true
  }

  console.log()
  if (failed) {
    console.log('Some prerequisites are still missing. Fix the items above and run this again.\n')
  } else if (warnings > 0) {
    const plural = warnings === 1 ? '' : 's'
    console.log(`Ready to build, with ${warnings} warning${plural} above worth reading.`)
    console.log('Next:  yarn dev\n')
  } else {
    console.log('Everything is in place. Next:  yarn dev\n')
  }

  rl?.close()
  process.exit(failed ? 1 : 0)
}

main().catch(error => {
  console.error(`\nsetup failed: ${error.message}\n`)
  rl?.close()
  process.exit(1)
})
