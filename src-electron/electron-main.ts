import { app, BrowserWindow, nativeTheme, powerSaveBlocker, ipcMain } from 'electron'
import { initialize, enable } from '@electron/remote/main' // <-- add this
import os from 'os'
import url from 'url'
import path from 'path'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined

// if (process.env.PROD) {
//   global.__statics = __dirname
// }

let isRemoteInitialized = false;

function initializeRemote() {
  if (!isRemoteInitialized) {
    initialize();
    isRemoteInitialized = true;
  }
}


function createWindow() {
  let powerSaveBlockerId: number

  /**
   * Initial window options
   */
  initializeRemote() // <-- add this

  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
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
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    },
  })

  enable(mainWindow.webContents) // <-- add this


  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.loadURL(process.env.APP_URL)
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production no access to devtools pls
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
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
