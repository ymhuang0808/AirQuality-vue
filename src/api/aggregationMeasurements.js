import axios from 'axios'
import qs from 'qs'

const API_URL = process.env.API_URL

export const PERIOD_TYPES = {
  0: 'hourly',
  1: 'daily'
}

export const aggregationMeasurements = {
  getAggregationMeasurementsBySiteId (id, startDateTime, endDateTime, period, limit = 30, order = 'desc') {
    let url = `${API_URL}/sites/${id}/aggregation_measurements`
    let queryString = {
      start_datetime: startDateTime.format('YYYY-MM-DDTHH:mm:ssZZ'),
      end_datetime: endDateTime.format('YYYY-MM-DDTHH:mm:ssZZ'),
      period_type: period,
      limit: limit,
      order: order
    }

    return axios.get(url, {
      params: queryString,
      paramsSerializer: function (params) {
        return qs.stringify(params)
      }
    })
  }
}
