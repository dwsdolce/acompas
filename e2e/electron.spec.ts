import { test, expect, _electron as electron } from '@playwright/test'
import { existsSync } from 'node:fs'
import path from 'node:path'

// Playwright loads specs as CommonJS, so import.meta is unavailable; it runs
// from the project root, which is what the build output is relative to.
const appDir = path.resolve(process.cwd(), 'dist/electron/UnPackaged')

// VS Code's plugin host exports ELECTRON_RUN_AS_NODE=1 and child shells inherit
// it. Electron would then run as plain Node: no window, no BrowserWindow, and a
// failure that reads like a broken build rather than a broken environment.
const { ELECTRON_RUN_AS_NODE: _ignored, ...cleanEnv } = process.env

test.describe('Electron desktop app', () => {
  test.skip(
    !existsSync(appDir),
    'Build it first: quasar build -m electron (or packaging/build_mac app)'
  )

  test('opens a window that renders the app with its assets', async () => {
    const app = await electron.launch({ args: [appDir], env: cleanEnv as Record<string, string> })

    const errors: string[] = []
    const window = await app.firstWindow()
    window.on('console', message => {
      if (message.type() === 'error') errors.push(message.text())
    })
    window.on('pageerror', error => errors.push(String(error)))

    await window.waitForLoadState('domcontentloaded')

    // The white page failed exactly here: a window opened, but #q-app was empty.
    await expect(window.locator('#q-app')).not.toBeEmpty()

    const domSize = await window.evaluate(() => document.body.innerHTML.length)
    expect(domSize, 'the renderer produced almost no DOM').toBeGreaterThan(1000)

    // The logos are served through the public-path bridge, which is what broke
    // when a filesystem path was handed to the renderer as a URL prefix.
    const images = await window.evaluate(() => {
      const all = [...document.images]
      return { total: all.length, loaded: all.filter(i => i.naturalWidth > 0).length }
    })
    expect(images.total).toBeGreaterThan(0)
    expect(images.loaded, 'some images failed to load').toBe(images.total)

    expect(errors, `console errors on load:\n${errors.join('\n')}`).toEqual([])

    await app.close()
  })

  test('serves a decodable audio sample to the renderer', async () => {
    const app = await electron.launch({ args: [appDir], env: cleanEnv as Record<string, string> })
    const window = await app.firstWindow()
    await window.waitForLoadState('domcontentloaded')

    // Mirrors what loadSounds does: an explicit byte range, then a decode.
    const result = await window.evaluate(async () => {
      const prefix = window.electronAPI.getPublicPath()
      const response = await fetch(`${prefix}/audio/acompas/cajon/cajon_1.flac`, {
        headers: { Range: 'bytes=0-' }
      })
      if (!response.ok) return { ok: false, detail: `HTTP ${response.status}` }
      const buffer = await new AudioContext().decodeAudioData(await response.arrayBuffer())
      return { ok: true, detail: `${buffer.duration.toFixed(2)}s @ ${buffer.sampleRate}Hz` }
    })

    expect(result.ok, `sample did not decode: ${result.detail}`).toBe(true)

    await app.close()
  })
})
