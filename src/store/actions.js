import * as types from '@store/mutation-types'
import { forEachValue } from '../assets/utils'

export const startAudioContext = ({ commit }) => {
    commit(types.START_AUDIO_CONTEXT)
}

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
    commit(types.SELECT_TEMPO, payload)
    if (payload > state.selectedPalo.fastTempo && !state.isTooFast) {
        commit(types.SHOW_FAST_MESSAGE)
        setTimeout(() => { commit(types.HIDE_FAST_MESSAGE) }, 4000)
    } else if (payload < state.selectedPalo.fastTempo && state.isTooFast) {
        commit(types.HIDE_FAST_MESSAGE)
    }
    if (payload < state.selectedPalo.slowTempo && !state.isTooSlow) {
        commit(types.SHOW_SLOW_MESSAGE)
        setTimeout(() => { commit(types.HIDE_SLOW_MESSAGE) }, 4000)
    } else if (payload > state.selectedPalo.slowTempo && state.isTooSlow) {
        commit(types.HIDE_SLOW_MESSAGE)
    }
}

export const selectCrochets = ({ commit }) => {
    commit(types.SELECT_CROCHETS)
}

export const selectInstruments = ({ commit }, payload) => {
    commit(types.SELECT_INSTRUMENTS, payload)
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
