import * as types from '../mutation-types'
import { aggregationMeasurements } from '../../api/aggregationMeasurements'

const state = {
  hourlyAggregationMeasurements: null
}

const getters = {
  hourlyAggregationMeasurements: (state) => (id) => {
    if (state.hourlyAggregationMeasurements === null) {
      return
    }

    return state.hourlyAggregationMeasurements[id]
  }
}

const actions = {
  getAggregationMeasurements ({ commit }, query) {
    console.log('query...')
    console.log(query)
    return aggregationMeasurements.getAggregationMeasurementsBySiteId(query.id, query.startDateTime, query.endDateTime, query.period, query.limit, query.order)
      .then(response => {
        let payload = {
          id: response.data.site.id,
          aggregationMeasurements: response.data.aggregation_measurements,
          period: query.period,
          source_type: response.data.site.source_type
        }

        commit(types.ADD_SITE_AGGREGATION_MEASUREMENTS, payload)

        return payload
      })
  }
}

const mutations = {
  [types.ADD_SITE_AGGREGATION_MEASUREMENTS] (state, value) {
    if (state.hourlyAggregationMeasurements === null) {
      state.hourlyAggregationMeasurements = {}
    }

    state.hourlyAggregationMeasurements[value.id] = value
  },
  [types.REMOVE_SITE_AGGREGATION_MEASUREMENTS] (state, id) {
    if (state.hourlyAggregationMeasurements !== null) {
      delete state.hourlyAggregationMeasurements[id]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
