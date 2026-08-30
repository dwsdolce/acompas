import { app, BrowserWindow, nativeTheme, powerSaveBlocker, ipcMain } from 'electron'
import { registerQuasarRuntime } from '@quasar/app-vite/electron/main'
import fs from 'node:fs'
import { initialize, enable } from '@electron/remote/main' // <-- add this
import os from 'os'
import url from 'url'
import path from 'path'
import { fileURLToPath } from 'node:url'

// @quasar/app-vite v3 bundles the main process as an ES module, where
// __dirname does not exist — the packaged app died at launch with
// "ReferenceError: __dirname is not defined".
const currentDir = path.dirname(fileURLToPath(import.meta.url))

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    fs.unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined

// if (import.meta.env.QUASAR_PROD) {
//   global.__statics = currentDir
// }

let isRemoteInitialized = false

function initializeRemote() {
  if (!isRemoteInitialized) {
    initialize()
    isRemoteInitialized = true
  }
}


function createWindow() {
  let powerSaveBlockerId: number

  /**
   * Initial window options
   */
  initializeRemote() // <-- add this

  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
    width: 1500,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      // v3 dropped QUASAR_ELECTRON_PRELOAD. Preload scripts are named by
      // quasar.config > electron.preloadScripts (default ['electron-preload'])
      // and are emitted as .cjs beside the main bundle.
      preload: path.resolve(currentDir, 'electron-preload.cjs')
    },
  })

  enable(mainWindow.webContents) // <-- add this


  if (import.meta.env.QUASAR_DEBUG) {
    // if on DEV or Production with debug enabled
    mainWindow.loadURL(import.meta.env.QUASAR_APP_URL)
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production no access to devtools pls
    mainWindow.loadURL(url.format({
      pathname: path.join(currentDir, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools()
    })
  }

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

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow()
  }
})
