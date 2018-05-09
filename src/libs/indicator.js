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
        },
        pm10: {
          unit: 'μg/m3',
          colorStops: [
            [0, '#00BCD4'],
            [15, '#009688'],
            [50, '#FFC107'],
            [75, '#FF5722'],
            [101, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        },
        o3: {
          unit: 'ppm',
          colorStops: [
            [0, '#00BCD4'],
            [33, '#009688'],
            [50, '#FFC107'],
            [100, '#FF5722'],
            [200, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        },
        co: {
          unit: 'ppm',
          colorStops: [
            [0, '#00BCD4'],
            [2.2, '#009688'],
            [4.5, '#FFC107'],
            [9.5, '#FF5722'],
            [15.5, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        },
        so2: {
          unit: 'ppb',
          colorStops: [
            [0, '#00BCD4'],
            [15, '#009688'],
            [35, '#FFC107'],
            [50, '#FF5722'],
            [70, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        },
        no2: {
          unit: 'ppb',
          colorStops: [
            [0, '#00BCD4'],
            [15, '#009688'],
            [35, '#FFC107'],
            [50, '#FF5722'],
            [70, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        },
        nox: {
          unit: 'ppb',
          colorStops: [
            [0, '#00BCD4'],
            [15, '#009688'],
            [35, '#FFC107'],
            [50, '#FF5722'],
            [70, '#9C27B0']
          ],
          levels: ['very_good', 'good', 'moderate', 'bad', 'very_bad']
        },
        no: {
          unit: 'ppb',
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
