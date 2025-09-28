import { boot } from 'quasar/wrappers'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'

export default boot(async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Force status bar to not overlay content
      await StatusBar.setOverlaysWebView({ overlay: false })
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#000000' })

      // Add CSS variable for safe area
      if (Capacitor.getPlatform() === 'android') {
        // Try to get actual status bar height, fallback to 40px
        const statusBarHeight = await StatusBar.getInfo()
          .then((info) => (info.height ? `${info.height}px` : '40px'))
          .catch(() => '40px')

        document.documentElement.style.setProperty(
          '--safe-area-inset-top',
          statusBarHeight
        )
      }
    } catch (e) {
      console.warn('StatusBar boot failed:', e)
    }
  }
})
