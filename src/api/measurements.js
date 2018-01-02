import axios from 'axios'

const API_URL = process.env.API_URL

export default {
  getAllLatest () {
    return axios.get(`${API_URL}/measurements/all/geojson`)
  }
}
