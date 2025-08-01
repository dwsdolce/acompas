/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    QUASAR_ELECTRON_PRELOAD: string;
    APP_URL: string;
  }
}

interface Window {
  electronAPI: {
    sendMessage: (channel: string, data?: any) => void,
    getAssetPath: (path: string) => string,
    getPublicPath: () => string
  }
}
