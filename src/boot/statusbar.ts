import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import type { StatusBarInfo } from '@capacitor/status-bar'
import { App } from '@capacitor/app'
import { logger } from 'src/utils/logger'

interface Info extends StatusBarInfo {
  height?: number
}

// Store the initial height to prevent re-setting it
let initialHeight: string | null = null

async function configureStatusBar() {
  if (!Capacitor.isNativePlatform()) return

  try {
    // Allow status bar to overlay and handle spacing with CSS
    await StatusBar.setOverlaysWebView({ overlay: true })
    await StatusBar.setStyle({ style: Style.Dark })
    await StatusBar.setBackgroundColor({ color: '#000000' })

    // Set CSS variable only once on initial load
    if (Capacitor.getPlatform() === 'android' && !initialHeight) {
      // Try to get actual status bar height, fallback to 40px
      const statusBarHeight = await StatusBar.getInfo()
        .then((info: Info) => (info.height ? `${info.height}px` : '40px'))
        .catch(() => '40px')

      initialHeight = statusBarHeight
      document.documentElement.style.setProperty(
        '--safe-area-inset-top',
        statusBarHeight
      )
    }
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
