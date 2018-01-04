import * as types from '@store/mutation-types'
import { forEachValue } from '../assets/utils'

const mutations = {
    [types.START_AUDIO_CONTEXT] (state) {
        state.isUnlocked = true
    },

    [types.TOGGLE_SIDE_MENU] (state) {
        state.shownSideMenu = !state.shownSideMenu
    },

    // payload = DOM element
    [types.GET_CANVAS_EL] (state, payload) {
        state.canvasElement = payload
    },

    [types.SELECT_VISUALIZATION_MODE] (state, payload) {
        state.selectedVisualizationMode = payload
        window.localStorage.setItem('visualization-mode', payload)
    },

    [types.PLAY_STOP] (state) {
        state.isPlaying = !state.isPlaying
        if (state.metronomeEvent !== null) state.metronomeEvent = null
    },

    [types.SELECT_PALO] (state, payload) {
        forEachValue(state.palos, palo => {
            if (palo.slug === payload) {
                state.selectedPalo = palo
                if (window.localStorage.getItem('tempo-' + palo.slug) !== null) {
                    if (parseInt(window.localStorage.getItem('tempo-' + palo.slug))) {
                        state.tempo = parseInt(window.localStorage.getItem('tempo-' + palo.slug))
                    } else {
                        state.tempo = palo.defaultTempo
                    }
                } else {
                    state.tempo = palo.defaultTempo
                }
            }
        })
        window.localStorage.setItem('palo', payload)
    },

    [types.SELECT_TEMPO] (state, payload) {
        state.tempo = payload
        window.localStorage.setItem('tempo-' + state.selectedPalo.slug, payload)
    },

    // payload is an array of instrument slugs
    [types.SELECT_INSTRUMENTS] (state, payload) {
        state.selectedInstruments = payload
        window.localStorage.setItem('selected-instruments', JSON.stringify(state.selectedInstruments))
    },

    // payload = { instrument: item from state.instruments, volume: [value] }
    [types.CHANGE_VOLUME] (state, payload) {
        payload.instrument.volume = payload.volume
        window.localStorage.setItem(payload.instrument.value + '-volume', payload.volume)
    },

    // payload = item from state.instruments
    [types.TOGGLE_EIGHTHNOTES] (state, payload) {
        payload.eighthNotes = !payload.eighthNotes
        window.localStorage.setItem(payload.value + '-eighthNotes', payload.eighthNotes)
    },

    [types.ENABLE_EIGHTHNOTES] (state, payload) {
        payload.eighthNotes = true
        window.localStorage.setItem(payload.value + '-eighthNotes', payload.eighthNotes)
    },

    [types.DISABLE_EIGHTHNOTES] (state, payload) {
        payload.eighthNotes = false
        window.localStorage.setItem(payload.value + '-eighthNotes', payload.eighthNotes)
    },

    [types.TOGGLE_IMPROVISE] (state) {
        state.improvise = !state.improvise
        window.localStorage.setItem('improvise', state.improvise)
    },

    [types.ENABLE_IMPROVISE] (state) {
        state.improvise = true
        window.localStorage.setItem('improvise', state.improvise)
    },

    [types.DISABLE_IMPROVISE] (state) {
        state.improvise = false
        window.localStorage.setItem('improvise', state.improvise)
    },

    [types.TOGGLE_HUMANIZE] (state) {
        state.humanize = !state.humanize
        window.localStorage.setItem('humanize', state.humanize)
    },

    [types.ENABLE_HUMANIZE] (state) {
        state.humanize = true
        window.localStorage.setItem('humanize', state.humanize)
    },

    [types.DISABLE_HUMANIZE] (state) {
        state.humanize = false
        window.localStorage.setItem('humanize', state.humanize)
    },

    [types.SHOW_SLOW_MESSAGE] (state) {
        state.isTooSlow = true
    },

    [types.HIDE_SLOW_MESSAGE] (state) {
        state.isTooSlow = false
    },

    [types.SHOW_FAST_MESSAGE] (state) {
        state.isTooFast = true
    },

    [types.HIDE_FAST_MESSAGE] (state) {
        state.isTooFast = false
    },

    // payload = Tonejs time event
    [types.TRIGGER_EVENT] (state, payload) {
        state.metronomeEvent = payload
    }
}

export default mutations
