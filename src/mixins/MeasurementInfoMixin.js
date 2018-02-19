import AppLinearGauge from '../components/AppLinearGauge'
import Indicator from '../libs/indicator'
import IndicatorHelpersMixin from '../mixins/IndicatorHelpersMixin'
import { sourceLogo } from '../utils/source-logo'
import moment from 'moment'

const MeasurementInfoMixin = {
  mixins: [IndicatorHelpersMixin],
  props: ['measurement'],
  components: { AppLinearGauge },
  data: () => {
    return {
      stops: Indicator.STANDARDS.custom.info.pm25.colorStops
    }
  },
  computed: {
    siteName: function () {
      if (this.measurement === undefined || this.measurement === null) {
        return null
      }
      return this.measurement.properties.humanized_name
    },
    sourceType: function () {
      if (this.measurement === undefined || this.measurement === null) {
        return null
      }
      return this.measurement.properties.source_type
    },
    timeAgo: function () {
      if (this.measurement === undefined || this.measurement === null) {
        return null
      }
      let publishedDateTime = moment(this.measurement.properties.published_datetime, moment.defaultFormat)

      return publishedDateTime.fromNow()
    },
    pm25: function () {
      if (this.measurement === undefined || this.measurement === null) {
        return null
      }
      return this.measurement.properties.pm25
    },
    temperature: function () {
      if (this.measurement === undefined || this.measurement === null) {
        return null
      }
      return this.measurement.properties.temperature
    },
    humidity: function () {
      if (this.measurement === undefined || this.measurement === null) {
        return null
      }
      return this.measurement.properties.humidity
    },
    imgSrc: function () {
      if (this.measurement === null) {
        return null
      }
      let logo = sourceLogo[this.sourceType]

      if (logo === undefined) {
        return null
      }

      return require(`../assets/imgs/source-logos/${logo}`)
    },
    level: function () {
      if (this.pm25 !== null) {
        return this.getPM25LevelByValue(this.pm25)
      }
    }
  }
}

export default MeasurementInfoMixin
