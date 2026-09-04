// Finish the iOS assets Icon Genie leaves half-done.
//
// Run by scripts/icons.mjs straight after it generates the iOS set, so these
// two steps are part of producing the assets rather than a repair someone has
// to remember afterwards.
//
// Was a zsh script, so it ran on macOS and nowhere else - and it failed
// quietly on Windows, leaving the alpha channel in place. That is the worst
// possible place for a silent failure: a device build installs happily with an
// alpha channel, and App Store Connect refuses it at upload, long after anyone
// remembers generating the icon. This runs the same two steps everywhere.
//
// The only genuinely macOS-specific call was `sips`, to read the icon's width.
// A PNG states its own dimensions in the IHDR chunk, twelve bytes in, so that
// needed no tool at all.

import { spawnSync } from 'node:child_process'
import {
  accessSync, constants, copyFileSync, existsSync, mkdtempSync,
  readFileSync, renameSync, rmSync, statSync
} from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(ROOT)

const ICON = 'src-capacitor/ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'
const SPLASH_DIR = 'src-capacitor/ios/App/App/Assets.xcassets/Splash.imageset'
const SPLASH = `${SPLASH_DIR}/splash-2732x2732.png`

/** The first executable named `name` on PATH, or null - shutil.which in Node. */
function which (name) {
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
      } catch { /* keep looking */ }
    }
  }
  return null
}

/** Run an external tool, working around how Windows exposes some of them. */
function spawnTool (executable, args) {
  const suffix = executable.slice(-4).toLowerCase()

  // Node refuses to spawn .bat/.cmd directly (it is the fix for
  // CVE-2024-27980), so a shim-style ffmpeg - Scoop installs one - has to name
  // the interpreter.
  if (process.platform === 'win32' && (suffix === '.bat' || suffix === '.cmd')) {
    const line = [executable, ...args].map(arg => `"${arg.replace(/"/g, '""')}"`).join(' ')
    return spawnSync(process.env.COMSPEC ?? 'cmd.exe', ['/d', '/s', '/c', `"${line}"`], {
      stdio: 'inherit',
      windowsVerbatimArguments: true
    })
  }
  return spawnSync(executable, args, { stdio: 'inherit' })
}

/**
 * A PNG's dimensions, and whether it carries any transparency.
 *
 * The colour type alone is not enough, and getting this wrong is expensive.
 * Types 4 and 6 have an alpha channel outright, but types 0 and 3 - greyscale
 * and palette - express transparency through a separate tRNS chunk. Icon Genie
 * writes the icon as a palette PNG with tRNS, so a check that looked only at
 * the colour type read it as opaque and skipped the flattening, which is the
 * failure this whole script exists to prevent.
 */
function readPng (file) {
  const b = readFileSync(file)
  if (b.length < 26 || b.toString('hex', 0, 8) !== '89504e470d0a1a0a') return null
  if (b.toString('ascii', 12, 16) !== 'IHDR') return null

  const colorType = b[25]
  let transparent = colorType === 4 || colorType === 6

  if (!transparent) {
    for (let o = 8; o + 8 <= b.length;) {
      const length = b.readUInt32BE(o)
      const type = b.toString('ascii', o + 4, o + 8)
      if (type === 'tRNS') { transparent = true; break }
      if (type === 'IEND') break
      o += 12 + length
    }
  }

  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20), colorType, transparent }
}

const fail = (message) => { console.error(`ERROR: ${message}`); process.exit(1) }

if (!existsSync(ICON)) fail(`no iOS app icon at ${ICON} - run: yarn icons ios`)

const before = readPng(ICON)
if (before === null) fail(`${ICON} is not a PNG this script can read`)

// Nothing to do if a previous run already flattened it. Re-running ffmpeg
// would work, but saying so is more useful than silently redoing it.
if (!before.transparent) {
  console.log(`${ICON} already has no transparency (${before.width}x${before.height})`)
} else {
  const ffmpeg = which('ffmpeg')
  if (ffmpeg === null) {
    console.error('ERROR: ffmpeg not found, so the iOS icon keeps its alpha channel.')
    console.error('It will install on a device but App Store Connect will refuse it.')
    console.error('Install it, then run `yarn icons ios` again:')
    console.error('  macOS    brew install ffmpeg')
    console.error('  Windows  winget install Gyan.FFmpeg')
    console.error('  Linux    sudo apt install ffmpeg')
    process.exit(1)
  }

  // White because the mark is a red disc drawn to sit on a light ground,
  // matching how it renders on the desktop and the web.
  const scratch = mkdtempSync(path.join(os.tmpdir(), 'palmas-appicon-'))
  const temporary = path.join(scratch, 'AppIcon-512@2x.png')
  const size = `${before.width}x${before.height}`

  const run = spawnTool(ffmpeg, [
    '-y', '-loglevel', 'error',
    '-f', 'lavfi', '-i', `color=white:s=${size}`,
    '-i', ICON,
    '-filter_complex', '[0][1]overlay,format=rgb24',
    '-frames:v', '1', temporary
  ])

  if (run.status !== 0) {
    rmSync(scratch, { recursive: true, force: true })
    fail(`flattening the iOS icon failed (ffmpeg exited ${run.status})`)
  }

  // renameSync fails across devices on Windows when TMP is on another drive.
  try {
    renameSync(temporary, ICON)
  } catch {
    copyFileSync(temporary, ICON)
  }
  rmSync(scratch, { recursive: true, force: true })

  // Check the result rather than trusting the exit status: this is the step
  // whose failure would otherwise only appear at upload.
  const after = readPng(ICON)
  if (after === null || after.transparent) {
    fail(`${ICON} still has transparency after flattening`)
  }
  console.log(`Flattened ${ICON} (${after.width}x${after.height}, no transparency)`)
}

// The splash is one image referenced three times, at 1x, 2x and 3x. Icon Genie
// writes a single file, so the other two names are copies of it - the asset
// catalogue names them, and Xcode will not build with any of them missing.
if (!existsSync(SPLASH)) fail(`no iOS splash at ${SPLASH} - run: yarn icons ios`)

for (const scale of [1, 2]) {
  const target = `${SPLASH_DIR}/splash-2732x2732-${scale}.png`
  try {
    copyFileSync(SPLASH, target)
  } catch (error) {
    fail(`copying the splash to scale ${scale} failed: ${error.message}`)
  }
}
console.log(`Copied ${SPLASH} to its 1x and 2x names`)
