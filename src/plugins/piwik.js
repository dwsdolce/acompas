import * as types from '@store/mutation-types'
import { Platform } from 'quasar'
import { getContext } from '@plugins/metronome'

window._paq = []

let platformName = null
if (Platform.is.cordova) platformName = 'Cordova'
else platformName = 'Website'

let playStartTime = null

const initPiwik = () => {
    var u = 'http://piwik.acompas.org/'
    window._paq.push(['setTrackerUrl', u + 'piwik.php'])
    window._paq.push(['setSiteId', 1])
    var d = document,
        g = d.createElement('script'),
        s = d.getElementsByTagName('script')[0]
    g.type = 'text/javascript'
    g.async = true
    g.defer = true
    g.src = u + 'piwik.js'
    s.parentNode.insertBefore(g, s)
}

const piwik = store => {
    window._paq.push(['setCustomVariable', 1, 'AppVersion', platformName, 'visit'])
    window._paq.push(['trackPageView'])
    window._paq.push(['enableLinkTracking'])
    initPiwik()

    store.subscribe((mutation, state) => {
        switch (mutation.type) {
            case types.PLAY:
                window._paq.push(['trackEvent', 'Playing', 'Start', state.selectedPalo.label])
                playStartTime = getContext.currentTime
                break

            case types.STOP:
                window._paq.push(['trackEvent', 'Playing', 'Stop', state.selectedPalo.label,
                    Math.round(getContext.currentTime - playStartTime)])
                break

            case types.SELECT_PALO:
                window._paq.push(['trackEvent', 'PaloSwitch', 'Set', state.selectedPalo.label])
                break
        }
    })
}

export default piwik
