import { app, BrowserWindow, nativeTheme, powerSaveBlocker, ipcMain } from 'electron'
import { initialize, enable } from '@electron/remote/main'
import { registerQuasarRuntime, resolveElectronAssetsPath, resolvePublicPath } from '#q-app/electron/main'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

let mainWindow: BrowserWindow | undefined
let isRemoteInitialized = false

function initializeRemote() {
  if (!isRemoteInitialized) {
    initialize()
    isRemoteInitialized = true
  }
}

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) {}

async function createWindow() {
  let powerSaveBlockerId: number

  initializeRemote()

  mainWindow = new BrowserWindow({
    icon: resolveElectronAssetsPath('icons/icon.png'), // Windows and Linux
    width: 1500,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.join(import.meta.dirname, 'electron-preload.cjs')
    }
  })

  enable(mainWindow.webContents)

  if (import.meta.env.QUASAR_DEV) {
    await mainWindow.loadURL(import.meta.env.QUASAR_APP_URL)
  } else {
    await mainWindow.loadFile('index.html')
  }

  if (import.meta.env.QUASAR_DEBUG) {
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }

  // The renderer turns this into URLs, so it must be a URL prefix rather than
  // a filesystem path. In dev Vite serves public/ from the site root, so the
  // prefix is empty; in a packaged app index.html is loaded over file:// with
  // the public assets beside it, and an absolute path resolves against that.
  ipcMain.on('getPublicPath', (event) => {
    event.returnValue = import.meta.env.QUASAR_DEV ? '' : resolvePublicPath()
  })

  ipcMain.on('keep-awake', () => {
    powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep')
  })

  ipcMain.on('allow-sleep', () => {
    powerSaveBlocker.stop(powerSaveBlockerId as number)
  })

  mainWindow.on('closed', () => {
    mainWindow = undefined
  })
}

void app.whenReady().then(() => {
  registerQuasarRuntime()
  void createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})
