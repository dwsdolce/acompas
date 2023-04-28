import { ref } from 'vue'
import { Platform } from 'quasar'
import { useMetronome } from './metronome'
import { useSessionStore } from 'src/stores/session'
import { usePaloStore } from 'src/stores/palo'

declare global {
  interface Window {
    _paq: any
  }
}

window._paq = []

export const useMatomo = () => {
  const playStartTime = ref<number | null>(null)

  const { getContext } = useMetronome()

  const { trackVisits } = useSessionStore()

  const platformName = Platform.is.cordova ? 'Cordova' : 'Website'

  const initPiwik = () => {
    window._paq.push([ 'setCustomVariable', 1, 'AppVersion', platformName, 'visit' ])
    window._paq.push([ 'trackPageView' ])
    window._paq.push([ 'enableLinkTracking' ])

    const u = 'https://piwik.acompas.org/'
    window._paq.push([ 'setTrackerUrl', u + 'piwik.php' ])
    window._paq.push([ 'setSiteId', 1 ])
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'piwik.js'
    if (s.parentNode) s.parentNode.insertBefore(g, s)
  }

  const trackPlay = (label: string) => {
    if (!trackVisits) {
      return
    }
    window._paq.push([
      'trackEvent',
      'Playing',
      'Start',
      label
    ])
    playStartTime.value = getContext().currentTime
  }

  const trackStop = (label: string) => {
    if (!trackVisits) {
      return
    }
    window._paq.push([
      'trackEvent',
      'Playing',
      'Stop',
      label,
      Math.round(getContext().currentTime - (playStartTime.value || 0))
    ])
  }

  // const matomo = Platform.is.cordova ? require('@ionic-native/matomo') : null

  // const init = () => {
  //   if (matomo) {
  //     matomo.init('https://piwik.acompas.org/', 1)
  //   }
  // }

  // const trackView = (name: string) => {
  //   if (matomo) {
  //     matomo.trackView(name)
  //   }
  // }

  // const trackEvent = (category: string, action: string, name: string) => {
  //   if (matomo) {
  //     matomo.trackEvent(category, action, name)
  //   }
  // }

  return {
    initPiwik,
    trackPlay,
    trackStop,
  }
}
