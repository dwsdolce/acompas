import * as types from './mutation-types'

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

  // payload is a slug value
  [types.SELECT_VISUALIZATION_MODE] (state, payload) {
    state.selectedVisualizationMode = payload
  },

  // payload = { width, height }
  [types.GET_VISUALIZATION_SIZE] (state, payload) {
    state.visualizationSize = payload
  },

  [types.PLAY] (state) {
    state.isPlaying = true
  },

  [types.STOP] (state) {
    state.isPlaying = false
  },

  // payload = palo object
  [types.SELECT_PALO] (state, payload) {
    state.selectedPalo = payload
  },

  [types.SELECT_TEMPO] (state, payload) {
    state.tempo = payload
  },

  // payload is an array of instrument slugs
  [types.SELECT_INSTRUMENTS] (state, payload) {
    state.selectedInstruments = payload
  },

  // payload = { instrument: item from state.instruments, volume: [value] }
  [types.CHANGE_VOLUME] (state, payload) {
    payload.instrument.volume = payload.volume
  },

  // payload = item from state.instruments
  [types.TOGGLE_EIGHTHNOTES] (state, payload) {
    payload.eighthNotes = !payload.eighthNotes
  },

  [types.ENABLE_EIGHTHNOTES] (state, payload) {
    payload.eighthNotes = true
  },

  [types.DISABLE_EIGHTHNOTES] (state, payload) {
    payload.eighthNotes = false
  },

  [types.TOGGLE_IMPROVISE] (state) {
    state.improvise = !state.improvise
  },

  [types.ENABLE_IMPROVISE] (state) {
    state.improvise = true
  },

  [types.DISABLE_IMPROVISE] (state) {
    state.improvise = false
  },

  [types.TOGGLE_HUMANIZE] (state) {
    state.humanize = !state.humanize
  },

  [types.ENABLE_HUMANIZE] (state) {
    state.humanize = true
  },

  [types.DISABLE_HUMANIZE] (state) {
    state.humanize = false
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
