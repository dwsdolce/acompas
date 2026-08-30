import { defineCapacitorConfig } from '@quasar/app-vite/capacitor'

// @quasar/app-vite v3 no longer accepts capacitor.config.json. The helper
// receives Quasar's runtime info via env and fills in dev-time defaults
// (webDir, and server.url when running `quasar dev`), so those are not
// hardcoded here.
export default defineCapacitorConfig({
  appId: 'audio.acompas.app',
  appName: 'A Compás',
  npmClient: 'yarn',
  webDir: 'www',
  plugins: {
    AppRestart: {
      android: 'audio.acompas.app.AppRestartPlugin'
    }
  }
})
