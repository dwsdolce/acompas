import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { App } from '@capacitor/app'
import { logger } from 'src/utils/logger'

async function configureStatusBar() {
  if (!Capacitor.isNativePlatform()) return

  try {
    // Allow status bar to overlay and handle spacing with CSS
    await StatusBar.setOverlaysWebView({ overlay: true })
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: '#000000' })

    // Capacitor 8 injects --safe-area-inset-top/right/bottom/left itself:
    // that is the SystemBars plugin's `insetsHandling: 'css'` default, and the
    // value it injects accounts for whether the web view actually extends
    // under the status bar.
    //
    // This used to compute the variable from StatusBar.getInfo().height and
    // set it by hand. Under Capacitor 8 that overwrote a correct 0px with
    // 51px, padding the header by the height of a status bar that was no
    // longer behind it.
  } catch (e) {
    logger.warn('StatusBar configuration failed:', e)
  }
}

export default boot(async () => {
  // Initial configuration
  await configureStatusBar()

  // Re-apply status bar configuration when app resumes
  if (Capacitor.isNativePlatform()) {
    try {
      await App.addListener('resume', async () => {
        logger.log('App resumed - reconfiguring status bar')
        // Small delay to ensure native UI is ready
        setTimeout(async () => {
          await configureStatusBar()
        }, 100)
      })

      await App.addListener('appStateChange', async ({ isActive }) => {
        if (isActive) {
          logger.log('App active - reconfiguring status bar')
          // Small delay to ensure native UI is ready
          setTimeout(async () => {
            await configureStatusBar()
          }, 100)
        }
      })
    } catch (e) {
      logger.warn('Failed to add app lifecycle listeners:', e)
    }
  }
})
