import * as types from '../mutation-types'
import sites from '../../api/sites'

const state = {
  sitesWithLatestMeasurements: null
}

const getters = {
  siteWithLatestMeasurement: (state) => (id) => {
    if (state.sitesWithLatestMeasurements === null) {
      return
    }
    return state.sitesWithLatestMeasurements[id]
  }
}

const actions = {
  getSiteWithLatestMeasurement ({ commit }, id) {
    return sites.getSite(id, ['latest_measurement'])
      .then(response => {
        console.log('getSiteWithLatestMeasurement')
        let payload = {
          id: response.data.id,
          data: response.data
        }

        commit(types.ADD_SITE_WITH_LATEST_MEASUREMENTS, payload)

        return payload.data
      })
  }
}

const mutations = {
  [types.SET_SITE_WITH_LATEST_MEASUREMENTS] (state, value) {
    state.sitesWithLatestMeasurements = value
  },
  [types.ADD_SITE_WITH_LATEST_MEASUREMENTS] (state, value) {
    if (state.sitesWithLatestMeasurements === null) {
      state.sitesWithLatestMeasurements = {}
    }

    state.sitesWithLatestMeasurements[value.id] = value.data
  },
  [types.REMOVE_SITE_WITH_LATEST_MEASUREMENTS] (state, id) {
    if (state.sitesWithLatestMeasurements !== null) {
      delete state.sitesWithLatestMeasurements[id]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
