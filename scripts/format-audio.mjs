#!/usr/bin/env node
//
// Convert the .wav masters in public/audio into the formats the app plays.
//
// Only the .wav files are committed; the rest are generated and gitignored.
// `yarn audio` runs this, and `yarn install` runs that, so a fresh clone gets
// playable audio without a manual step. The install passes --optional, so a
// missing ffmpeg warns instead of failing the whole dependency install.
//
// This was a Python script until the Windows setup showed what that cost:
// `python3` is not a command Windows supplies under that name, so `yarn
// install` failed on a machine that had everything else it needed. Node is
// already a hard requirement, so rewriting it here removes an interpreter from
// the prerequisites rather than adding a way to find one.

import { accessSync, constants, existsSync, readdirSync, rmSync, statSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

// Every path below is relative to the repository root, so anchor there rather
// than trusting the caller's directory - the same thing packaging/build_mac
// does. `yarn audio` would be fine either way; `node scripts/format-audio.mjs`
// from anywhere else would not.
process.chdir(path.resolve(import.meta.dirname, '..'))

const BASEDIR = 'public/audio'
const EXTENSIONS = ['mp3', 'mp4', 'ogg', 'flac']

/** The first executable named `name` on PATH, or null - shutil.which in Node. */
function which (name) {
  // On Windows the name on disk carries an extension that the command line
  // omits, and PATHEXT is the list to try.
  const extensions = process.platform === 'win32'
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
        // Not here, or not runnable. Keep looking.
      }
    }
  }
  return null
}

/** Recurse a directory, yielding its .wav files in a stable order. */
function * walk (dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield * walk(full)
    else if (entry.name.endsWith('.wav')) yield full
  }
}

function * wavFiles (directory) {
  const root = directory ? path.join(BASEDIR, directory) : BASEDIR
  if (!existsSync(root)) {
    // A mistyped subdirectory used to convert nothing and report success.
    console.error(`ERROR: no such directory: ${root}`)
    process.exit(1)
  }
  yield * walk(root)
}

/** Report the absent converter, and return the exit status to stop with. */
function missingFfmpeg (optional) {
  const label = optional ? 'WARNING' : 'ERROR'
  console.log(`${label}: ffmpeg not found, so the audio cannot be generated.`)
  console.log('The app will not play anything without it.')
  console.log('Install it, then run `yarn install` again or `yarn audio` on its own:')
  console.log('  macOS    brew install ffmpeg')
  console.log('  Windows  winget install Gyan.FFmpeg')
  console.log('  Linux    sudo apt install ffmpeg')
  return optional ? 0 : 1
}

/** Run an external tool, working around how Windows exposes some of them. */
function spawnTool (executable, args) {
  const suffix = executable.slice(-4).toLowerCase()

  // Node refuses to spawn .bat/.cmd directly (it is the fix for
  // CVE-2024-27980), so a shim-style ffmpeg - Scoop installs one - has to name
  // the interpreter. A shell command line is a single string, hence the
  // quoting; without this the failure is a bare EINVAL that says nothing.
  if (process.platform === 'win32' && (suffix === '.bat' || suffix === '.cmd')) {
    const line = [executable, ...args].map(arg => `"${arg.replace(/"/g, '""')}"`).join(' ')
    return spawnSync(process.env.COMSPEC ?? 'cmd.exe', ['/d', '/s', '/c', `"${line}"`], {
      stdio: 'inherit',
      windowsVerbatimArguments: true
    })
  }
  return spawnSync(executable, args, { stdio: 'inherit' })
}

function convert (directory, optional) {
  let converted = 0
  let skipped = 0

  // Looked up on the first file that actually needs converting, not on entry.
  // Everything here is generated against the .wav masters, so a tree that is
  // already up to date - a fresh clone with a warm CI cache, or a second
  // `yarn install` - needs no converter at all, and demanding one there fails
  // a build that had nothing to do.
  let ffmpeg

  for (const wav of wavFiles(directory)) {
    const base = wav.slice(0, -'.wav'.length)
    const wavModified = statSync(wav).mtimeMs

    for (const extension of EXTENSIONS) {
      const out = `${base}.${extension}`

      // Already generated and no older than its source: nothing to do.
      if (existsSync(out) && statSync(out).mtimeMs >= wavModified) {
        skipped++
        continue
      }

      if (ffmpeg === undefined) ffmpeg = which('ffmpeg')
      if (ffmpeg === null) return missingFfmpeg(optional)

      // A converter that is present but fails is a real error in both modes:
      // --optional forgives ffmpeg being absent, nothing else.
      const run = spawnTool(ffmpeg, ['-y', '-loglevel', 'error', '-i', wav, out])
      if (run.error !== undefined) throw run.error
      if (run.status !== 0) {
        console.error(`ERROR: ffmpeg exited ${run.status} converting ${wav}`)
        return 1
      }
      converted++
    }
  }

  console.log(`Audio: ${converted} converted, ${skipped} already up to date.`)
  return 0
}

function unconvert (directory) {
  let removed = 0
  for (const wav of wavFiles(directory)) {
    const base = wav.slice(0, -'.wav'.length)
    for (const extension of EXTENSIONS) {
      const out = `${base}.${extension}`
      if (existsSync(out)) {
        rmSync(out)
        removed++
      }
    }
  }
  console.log(`Audio: removed ${removed} generated files.`)
  return 0
}

function showHelp () {
  console.log('Usage: node scripts/format-audio.mjs [convert|unconvert] [directory] [--optional]')
  console.log('  convert     Generate the playable formats from the .wav masters')
  console.log('  unconvert   Delete the generated formats')
  console.log('  directory   Limit to a subdirectory of public/audio (optional)')
  console.log('  --optional  Warn instead of failing when ffmpeg is not installed')
}

const args = process.argv.slice(2)
const flags = args.filter(arg => arg.startsWith('-'))
const words = args.filter(arg => !arg.startsWith('-'))

const action = words[0] ?? '--help'
const directory = words[1]

if (action === 'convert') {
  process.exit(convert(directory, flags.includes('--optional')))
} else if (action === 'unconvert') {
  process.exit(unconvert(directory))
} else {
  showHelp()
  process.exit(words.length === 0 ? 0 : 1)
}
