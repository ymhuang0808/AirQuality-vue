export default class Indicator {
  static STANDARDS = {
    custom: {
      name: 'CUSTOM',
      info: {
        pm25: {
          unit: 'μg/m3',
          colorStops: [
            [0, '#00BCD4'],
            [15, '#009688'],
            [35, '#FFC107'],
            [50, '#FF5722'],
            [70, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        }
      }
    }
  }

  static getPm25ColorStops (standard) {
    return this.getStandardInfo(standard).pm25.colorStops
  }

  static getPm25Levels (standard) {
    return this.getStandardInfo(standard).pm25.levels
  }

  static getStandardInfo (standard) {
    switch (standard) {
      case this.STANDARDS.custom.name:
        return this.STANDARDS.custom.info
    }

    return null
  }
}
