import Vue from 'vue'
import Vuex from 'vuex'

import state from '@store/state'
import getters from '@store/getters'
import * as actions from '@store/actions'
import mutations from '@store/mutations'

import createLogger from '@plugins/logger'
import metronome from '@plugins/metronome'
import canvas from '@plugins/canvas'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [ createLogger(), metronome, canvas ]
})

export default store
