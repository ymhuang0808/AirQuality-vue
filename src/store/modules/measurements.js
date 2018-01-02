import * as types from '../mutation-types'
import measurements from '../../api/measurements'

const state = {
  isShowMeasurementsSlider: false,
  measurements: {}
}

const getters = {
  isShowMeasurementsSlider: state => state.isShowMeasurementsSlider,
  allLatestMeasurements: state => state.measurements
}

const actions = {
  isShowMeasurementsSlider: (state) => {
    return state.isShowMeasurementsSlider
  },
  getAllLatestMeasurements ({ commit }) {
    measurements.getAllLatest()
      .then(response => {
        let data = {
          measurements: response.data.measurements,
          source: response.data.meta.source
        }
        commit(types.GET_ALL_LATEST_MEASUREMENTS, data)
      })
  }
}

const mutations = {
  [types.SET_SHOW_MEASUREMENTS_SLIDER] (state, value) {
    state.isShowMeasurementsSlider = value
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
