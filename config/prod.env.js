'use strict'

require('dotenv').config()

module.exports = {
  NODE_ENV: '"production"',
  MAPBOX_API_ACCESS_TOKEN: JSON.stringify(process.env.MAPBOX_API_ACCESS_TOKEN),
  API_URL: JSON.stringify(process.env.API_URL)
}
