import { app, BrowserWindow, Menu, nativeTheme, powerSaveBlocker, ipcMain } from 'electron'
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
    // Frameless is a macOS arrangement, not a cross-platform one. There,
    // titleBarStyle 'hidden' removes the bar but keeps the traffic lights, so
    // the window still has controls and the q-toolbar sits where the title bar
    // used to be - which is what trafficLightPosition is placing them against.
    //
    // Windows and Linux have no equivalent. frame:false on those leaves a
    // window with no close button, nothing to minimise it, and - since nothing
    // in the renderer sets -webkit-app-region: drag - no way to move it either.
    // The app draws no controls of its own, so the only way out is Alt+F4 or
    // the task manager. They get an ordinary frame instead.
    ...(platform === 'darwin'
      ? { frame: false, titleBarStyle: 'hidden' as const, trafficLightPosition: { x: 10, y: 10 } }
      : {}),
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

  // Electron installs a default File/Edit/View/Window menu when an application
  // sets none. On macOS that is the system menu bar and it carries Quit, so it
  // has to stay. On Windows and Linux it is drawn inside the window, and none
  // of it applies here: the app opens no files, has no text to cut or paste,
  // and its View entries are reload, zoom and devtools. It was invisible until
  // this window stopped being frameless, which is the only reason it went
  // unnoticed.
  //
  // This also retires the shortcuts that menu registered - Ctrl+R and
  // Ctrl+Shift+I. Dev builds open devtools on their own and production blocks
  // them, so neither is missed.
  if (platform !== 'darwin') {
    Menu.setApplicationMenu(null)
  }

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
