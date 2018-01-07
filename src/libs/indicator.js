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
            [65, '#9C27B0']
          ],
          description: ['good', 'moderate', 'unhealthy_for_sensitive', 'unhealthy', 'very_unhealthy']
        }
      }
    }
  }

  static getPm25ColorStops (standard) {
    return this.getStandardInfo(standard).pm25.colorStops
  }

  static getStandardInfo (standard) {
    switch (standard) {
      case this.STANDARDS.custom.name:
        return this.STANDARDS.custom.info
    }

    return null
  }
}
