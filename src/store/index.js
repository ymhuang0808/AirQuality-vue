import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as types from './mutation-types'
import measurements from './modules/measurements'
import { state, getters, actions, mutations } from './store'

Vue.use(Vuex)

const allowedMutations = [types.SWITCH_LANG, types.SET_NAV_FILTER, types.SET_NAV_FILTER_SELECTED]
const vuexLocalStorage = new VuexPersistence({
  key: 'air-quality-veux',
  storage: window.localStorage,
  reducer: state => ({
    lang: state.lang,
    navFilter: state.navFilter
  }),
  filter: mutation => (allowedMutations.indexOf(mutation.type) !== -1)
})

export default new Vuex.Store({
  modules: {
    measurements
  },
  plugins: [vuexLocalStorage.plugin],
  state,
  getters,
  actions,
  mutations
})
