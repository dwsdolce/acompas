import { ref } from 'vue'
import { Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useSessionStore } from 'src/stores/session'
import { useMetronome } from 'src/composables/metronome'

declare global {
  interface Window {
    _paq: any
  }
}

window._paq = window._paq || []

export const useMatomo = () => {
  const router = useRouter()

  const playStartTime = ref<number | null>(null)

  const sessionStore = useSessionStore()
  const trackingEnabled = ref(sessionStore.trackingEnabled)

  const { getContext } = useMetronome()

  const audioContext = getContext()

  const init = () => {
    if (!trackingEnabled.value) return
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
      if (trackingEnabled.value) window._paq.push([ 'trackPageView' ])
    })
  }

  const scriptExists = () => document.getElementById('matomo-script') !== null

  const deleteScript = () => {
    const script = document.getElementById('matomo-script')
    if (script) script.remove()
  }

  const trackPlay = (label: string) => {
    if (trackingEnabled.value) {
      playStartTime.value = Math.round(audioContext.currentTime)

      window._paq.push([
        'trackEvent',
        'Playing',
        'Start',
        label
      ])
    }
  }

  const trackStop = (label: string) => {
    if (trackingEnabled.value) {
      const playDuration = Math.round(audioContext.currentTime) - (playStartTime.value || 0)

      window._paq.push([
        'trackEvent',
        'Playing',
        'Stop',
        label,
        playDuration
      ])
    }
  }

  return {
    init,
    scriptExists,
    deleteScript,
    trackPlay,
    trackStop,
  }
}
