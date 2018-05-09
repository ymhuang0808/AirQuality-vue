import axios from 'axios'

const API_URL = process.env.API_URL

export default {
  getSite (id, include = []) {
    let url = `${API_URL}/sites/${id}`

    if (include.length !== 0) {
      let includeString = include.join(',')
      url += `?include=${includeString}`
    }

    return axios.get(url)
  }
}
