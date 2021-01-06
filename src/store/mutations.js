import * as types from './mutation-types'
import palosDefaultSettings from './data/palosDefaultSettings'

const mutations = {
  [types.TOGGLE_SIDE_MENU] (state) {
    state.shownSideMenu = !state.shownSideMenu
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
    state.preCounts = payload.preCounts
    state.startBeats = payload.startBeats
  },

  [types.SELECT_TEMPO] (state, payload) {
    state.tempo = payload
  },

  [types.SELECT_SWING] (state, payload) {
    state.swing = payload
  },

  // payload is an array of instrument slugs
  [types.SELECT_INSTRUMENTS] (state, payload) {
    state.selectedInstruments = payload
  },

  // payload is a pre-count object ({ value: intValue, label: 'Label' })
  [types.SELECT_PRECOUNT] (state, payload) {
    state.selectedPreCount = payload
  },

  // payload is a start beat object ({ value: intValue, label: 'Label' })
  [types.SELECT_STARTBEAT] (state, payload) {
    state.selectedStartBeat = payload
  },

  // payload = { instrument: item from state.instruments, volume: [value] }
  [types.CHANGE_VOLUME] (state, payload) {
    const instrument = state.instruments.find(i => i.value === payload.instrument.value)
    instrument.volume = payload.volume
  },

  // payload = item from state.instruments
  [types.TOGGLE_EIGHTHNOTES] (state, payload) {
    const instrument = state.instruments.find(i => i.value === payload.value)
    instrument.eighthNotes = !instrument.eighthNotes
  },

  [types.ENABLE_EIGHTHNOTES] (state, payload) {
    const instrument = state.instruments.find(i => i.value === payload.value)
    instrument.eighthNotes = true
  },

  [types.DISABLE_EIGHTHNOTES] (state, payload) {
    const instrument = state.instruments.find(i => i.value === payload.value)
    instrument.eighthNotes = false
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

  [types.TOGGLE_TRACKVISITS] (state) {
    state.trackVisits = !state.trackVisits
  },

  [types.ENABLE_TRACKVISITS] (state) {
    state.trackVisits = true
  },

  [types.DISABLE_TRACKVISITS] (state) {
    state.trackVisits = false
  },

  [types.INITIALIZE_TRACKING] (state) {
    state.trackingInitialized = true
  },

  [types.OPEN_PRIVACYDIALOG] (state) {
    state.privacyDialogOpen = true
  },

  [types.CLOSE_PRIVACYDIALOG] (state) {
    state.privacyDialogOpen = false
  },

  [types.ENABLE_TRACKINGCHOSEN] (state) {
    state.trackingChosen = true
  },

  // payload = Tonejs time event
  [types.TRIGGER_EVENT] (state, payload) {
    state.metronomeEvent = payload
  },

  [types.RESET_STORAGE] (state) {
    state.selectedPalo = palosDefaultSettings[0]
  },

  [types.TUNING_FORK_PLAY] (state) {
    state.tuningFork.isPlaying = true
  },

  [types.TUNING_FORK_STOP] (state) {
    state.tuningFork.isPlaying = false
  },

  [types.TUNING_CHANGE_NOTE] (state, payload) {
    state.tuningFork.activeNote = payload
  }
}

export default mutations
