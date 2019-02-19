import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

import createLogger from '../plugins/logger'
import metronome from '../plugins/metronome'
import canvas from '../plugins/canvas'
import localStorage from '../plugins/localStorage'
import piwik from '../plugins/piwik'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [ createLogger(), metronome, canvas, localStorage, piwik ]
  })

  return Store
}
