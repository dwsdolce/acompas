import { app, BrowserWindow, nativeTheme, powerSaveBlocker, ipcMain } from 'electron'
import { initialize, enable } from '@electron/remote/main' // <-- add this
import path from 'path'
import os from 'os'

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



function createWindow() {
  let powerSaveBlockerId: number

  /**
   * Initial window options
   */
  initialize() // <-- add this

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

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production no access to devtools pls
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

  // ipcMain.on('getAssetPath', (path: string) => {
  //   return app.isPackaged
  //     ? path.join(process.resourcesPath, 'public', path)
  //     : path.join(__dirname, '..', 'public', path)
  // })

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
