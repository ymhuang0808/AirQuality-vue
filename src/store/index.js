import Vue from 'vue'
import Vuex from 'vuex'
import measurements from './modules/measurements'
import { state, getters, actions, mutations } from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    measurements
  },
  state,
  getters,
  actions,
  mutations
})
