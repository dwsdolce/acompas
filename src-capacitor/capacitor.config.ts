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
    SplashScreen: {
      // The default is three seconds, and the app does not reliably get going
      // in three: MainPage mounts before App.vue and starts fetching and
      // decoding 58 audio samples, so the platform's timer was hiding the
      // splash before our own hide() ran. That produced the plugin's warning
      // about calling hide() too late, and left a gap where the splash had
      // gone but the app had not arrived.
      //
      // App.vue still hides it the moment there is an app to show, so this is
      // only a backstop for a launch slower than expected - not a delay. It is
      // deliberately not launchAutoHide: false, which would leave a failed
      // start showing the splash forever with no way out.
      launchShowDuration: 6000
    }
  }
})
