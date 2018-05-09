import Indicator from '../libs/indicator'

const IndicatorHelpersMixin = {
  data () {
    return {
      standard: Indicator.STANDARDS.custom.name
    }
  },
  methods: {
    getPM25LevelByValue (value) {
      let colorStops = Indicator.getPm25ColorStops(this.standard)
      let levels = Indicator.getPm25Levels(this.standard)

      for (let i = 0; i < colorStops.length; i++) {
        let currentStop = colorStops[i]
        let nextStop = colorStops[i + 1]

        if (nextStop === undefined) {
          return levels[i]
        }

        let current = currentStop[0]
        let next = nextStop[0]

        if (value >= current && value < next) {
          return levels[i]
        }
      }
    },
    getStandardInfo (standard) {
      return Indicator.getStandardInfo(standard)
    },
    findStandardStopIndex (standard, input) {
      const n = standard.colorStops.length
      let lowerIndex = 0
      let upperIndex = n - 1
      let currentIndex = 0
      let currentValue, upperValue

      while (lowerIndex <= upperIndex) {
        currentIndex = Math.floor((lowerIndex + upperIndex) / 2)
        currentValue = standard.colorStops[currentIndex][0]
        upperValue = standard.colorStops[currentIndex + 1][0]

        if ((input === currentValue) || (((input > currentValue) && (input < upperValue))) || input >= upperValue) { // Search complete
          return currentIndex
        } else if (currentValue < input) {
          lowerIndex = currentIndex + 1
        } else if (currentValue > input) {
          upperIndex = currentIndex - 1
        }
      }

      return Math.max(currentIndex - 1, 0)
    },
    findIndicatorInfo (standard, input) {
      const index = this.findStandardStopIndex(standard, input)
      return {
        colorStop: standard.colorStops[index],
        level: standard.levels[index]
      }
    }
  }
}

export default IndicatorHelpersMixin
