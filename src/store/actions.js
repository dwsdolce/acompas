import { Notify } from 'quasar'
import * as types from './mutation-types'
import { forEachValue } from '../assets/utils'

export const toggleSideMenu = ({ commit }) => {
  commit(types.TOGGLE_SIDE_MENU)
}

export const playStop = ({ commit, state }) => {
  if (state.isPlaying) {
    commit(types.STOP)
    commit(types.TRIGGER_EVENT, null)
  } else {
    commit(types.PLAY)
  }
}

export const selectVisualizationMode = ({ commit, state }, payload) => {
  commit(types.SELECT_VISUALIZATION_MODE, payload)
}

export const selectPalo = ({ dispatch, commit, state }, payload) => { // payload is a palo slug
  if (state.isPlaying) commit(types.STOP)
  forEachValue(state.palos, palo => {
    if (palo.value === payload) {
      commit(types.SELECT_PALO, palo)
    }
  })
}

export const selectTempo = ({ commit, state }, payload) => {
  let tempo = parseInt(payload)
  commit(types.SELECT_TEMPO, tempo)
  if (tempo > state.selectedPalo.fastTempo && !state.isTooFast) {
    commit(types.SHOW_FAST_MESSAGE)
    Notify.create({
      message: state.selectedPalo.fastMessage,
      color: 'secondary',
      icon: 'warning'
    })
  } else if (tempo < state.selectedPalo.fastTempo && state.isTooFast) {
    commit(types.HIDE_FAST_MESSAGE)
  }
  if (tempo < state.selectedPalo.slowTempo && !state.isTooSlow) {
    commit(types.SHOW_SLOW_MESSAGE)
    Notify.create({
      message: state.selectedPalo.slowMessage,
      color: 'secondary',
      icon: 'warning'
    })
  } else if (tempo > state.selectedPalo.slowTempo && state.isTooSlow) {
    commit(types.HIDE_SLOW_MESSAGE)
  }
}

export const selectCrochets = ({ commit }) => {
  commit(types.SELECT_CROCHETS)
}

export const selectInstruments = ({ commit }, payload) => {
  commit(types.SELECT_INSTRUMENTS, payload)
}

export const selectPreCount = ({ commit }, payload) => {
  commit(types.SELECT_PRECOUNT, payload)
}

export const selectStartBeat = ({ commit }, payload) => {
  commit(types.SELECT_STARTBEAT, payload)
}

export const changeVolume = ({ commit }, payload) => {
  commit(types.CHANGE_VOLUME, payload)
}

export const toggleEighthNotes = ({ commit }, payload) => {
  commit(types.TOGGLE_EIGHTHNOTES, payload)
}

export const enableEighthNotes = ({ commit }, payload) => {
  commit(types.ENABLE_EIGHTHNOTES, payload)
}

export const disableEighthNotes = ({ commit }, payload) => {
  commit(types.DISABLE_EIGHTHNOTES, payload)
}

export const toggleImprovise = ({ commit }) => {
  commit(types.TOGGLE_IMPROVISE)
}

export const enableImprovise = ({ commit }) => {
  commit(types.ENABLE_IMPROVISE)
}

export const disableImprovise = ({ commit }) => {
  commit(types.DISABLE_IMPROVISE)
}

export const toggleHumanize = ({ commit }) => {
  commit(types.TOGGLE_HUMANIZE)
}

export const enableHumanize = ({ commit }) => {
  commit(types.ENABLE_HUMANIZE)
}

export const disableHumanize = ({ commit }) => {
  commit(types.DISABLE_HUMANIZE)
}

export const toggleTrackVisits = ({ commit, state }) => {
  commit(types.TOGGLE_TRACKVISITS)
  if (!state.trackingInitialized && state.trackVisits) {
    commit(types.INITIALIZE_TRACKING)
  }
}

export const enableTrackVisits = ({ commit, state }) => {
  commit(types.ENABLE_TRACKVISITS)
  if (!state.trackingInitialized) {
    commit(types.INITIALIZE_TRACKING)
  }
}

export const disableTrackVisits = ({ commit }) => {
  commit(types.DISABLE_TRACKVISITS)
}

export const initializeTracking = ({ commit }) => {
  commit(types.INITIALIZE_TRACKING)
}

export const enableTrackingChosen = ({ commit }) => {
  commit(types.ENABLE_TRACKINGCHOSEN)
}

export const openPrivacyDialog = ({ commit }) => {
  commit(types.OPEN_PRIVACYDIALOG)
}

export const closePrivacyDialog = ({ commit }) => {
  commit(types.CLOSE_PRIVACYDIALOG)
}
