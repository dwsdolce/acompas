import Vue from 'vue'
import Vuex from 'vuex'

import state from '@store/state'
import getters from '@store/getters'
import * as actions from '@store/actions'
import mutations from '@store/mutations'

import createLogger from '@plugins/logger'
import metronome from '@plugins/metronome'
import canvas from '@plugins/canvas'
import localStorage from '@plugins/localStorage'
import piwik from '@plugins/piwik'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [ createLogger(), metronome, canvas, localStorage, piwik ]
})

export default store
