import * as types from '../mutation-types'
import measurements from '../../api/measurements'

const state = {
  isShowMeasurementSidebar: false,
  measurements: {}
}

const getters = {
  isShowMeasurementSidebar: state => state.isShowMeasurementSidebar,
  allLatestMeasurements: state => state.measurements
}

const actions = {
  isShowMeasurementSidebar: (state) => {
    return state.isShowMeasurementSidebar
  },
  getAllLatestMeasurements ({ commit }) {
    return measurements.getAllLatest()
      .then(response => {
        let data = {
          measurements: response.data.measurements,
          source: response.data.meta.source
        }
        commit(types.GET_ALL_LATEST_MEASUREMENTS, data)

        return data
      })
  }
}

const mutations = {
  [types.SET_SHOW_MEASUREMENT_SIDEBAR] (state, value) {
    state.isShowMeasurementSidebar = value
  },
  [types.GET_ALL_LATEST_MEASUREMENTS] (state, data) {
    state.measurements = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
