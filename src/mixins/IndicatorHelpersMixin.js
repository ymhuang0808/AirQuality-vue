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
    }
  }
}

export default IndicatorHelpersMixin
