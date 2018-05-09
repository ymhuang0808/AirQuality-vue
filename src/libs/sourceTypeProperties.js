const SOURCE_TYPE_PROPERTIES = {
  airbox: {
    pollutionTypes: [
      'pm25',
      'pm10'
    ],
    aggregationTypes: [
      'pm25',
      'pm10'
    ],
    others: [
      'temperature',
      'humidity'
    ]
  },
  lass: {
    pollutionTypes: [
      'pm25',
      'pm10'
    ],
    aggregationTypes: [
      'pm25',
      'pm10'
    ],
    others: [
      'temperature',
      'humidity'
    ]
  },
  epa: {
    pollutionTypes: [
      'pm25',
      'pm10',
      'o3',
      'co',
      'so2',
      'nox',
      'no'
    ],
    aggregationTypes: [
      'pm25',
      'pm10'
    ],
    others: [
      'temperature',
      'humidity'
    ]
  }
}

export default SOURCE_TYPE_PROPERTIES
