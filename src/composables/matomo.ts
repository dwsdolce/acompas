import { ref } from 'vue'
import { Platform } from 'quasar'
import { useRouter } from 'vue-router'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'

declare global {
  interface Window {
    _paq: ((string | number)[])[]
  }
}

window._paq = window._paq || []

export const useMatomo = () => {
  const router = useRouter()
  const sessionStore = useSessionStore()
  const patternStore = usePatternStore()

  const playStartTime = ref<number | null>(null)

  const initMatomo = () => {
    if (!sessionStore.trackingEnabled) return
    const platformName = Platform.is.capacitor ? 'Capacitor' : 'Website'

    window._paq.push([ 'setCustomVariable', 1, 'AppVersion', platformName, 'visit' ])
    window._paq.push([ 'trackPageView' ])
    window._paq.push([ 'enableLinkTracking' ])

    const u = 'https://piwik.acompas.org/'
    window._paq.push([ 'setTrackerUrl', u + 'matomo.php' ])
    window._paq.push([ 'setSiteId', 1 ])
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.id = 'matomo-script'
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'matomo.js'
    if (s.parentNode) s.parentNode.insertBefore(g, s)

    router.afterEach((to) => {
      if (sessionStore.trackingEnabled) window._paq.push([ 'trackPageView' ])
    })
  }

  const matomoExists = () => document.getElementById('matomo-script') !== null

  const deleteMatomo = () => {
    const script = document.getElementById('matomo-script')
    if (script) script.remove()
  }

  const trackPlay = () => {
    if (sessionStore.trackingEnabled) {
      playStartTime.value = Math.round(patternStore.getContext().currentTime)

      const matomoEvent = [
        'trackEvent',
        'Playing',
        'Start',
        patternStore.selectedPattern.name
      ]

      process.env.NODE_ENV !== 'production' ? matomoEvent.push('(test)') : null

      window._paq.push(matomoEvent)
    }
  }

  const trackStop = () => {
    if (sessionStore.trackingEnabled) {
      const playDuration = Math.round(patternStore.getContext().currentTime) - (playStartTime.value || 0)

      const matomoEvent = [
        'trackEvent',
        'Playing',
        'Stop',
        patternStore.selectedPattern.name,
        playDuration
      ]

      process.env.NODE_ENV !== 'production' ? matomoEvent.push('(test)') : null

      window._paq.push(matomoEvent)
    }
  }


  return {
    initMatomo,
    matomoExists,
    deleteMatomo,
    trackPlay,
    trackStop,
  }
}
