<template>
  <div class="site-dashboard" ref="siteDashbaord">
    <resize-observer @notify="handleSize" />
    <b-container class="site-dashboard__wrapper" fluid v-if="siteInfo">
      <b-row>
        <b-col class="site-dashboard__wrapper__section site-dashboard__wrapper__overview" lg="7">
          <b-row>
            <b-col cols="12" class="my-5 text-center">
              <b-row>
                <b-col cols="12" class="site-dashboard__wrapper__section__measurement-name">
                  <span class="site-dashboard__pm25__name">{{ $t('site_measurement_info.pm25_concentration') }}</span>
                </b-col>
                <b-col cols="12" class="site-dashboard__wrapper__section__value">
                  <span :class="['site-dashboard__pm25', 'site-dashboard__pm25--' + this.level]">{{ siteInfo.latest_measurement.pm25 }}</span>
                  <br/>
                  <span class="site-dashboard__pm25__unit">μg/m<sup>3</sup></span>
                </b-col>
                <b-col cols="12" class="site-dashboard__wrapper__section__level">
                  <span :class="['site-dashboard__level', 'site-dashboard__level--' + this.level]">{{ $t(`levels.${this.level}.name`) }}</span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="site-dashboard__wrapper__section__suggestions">
              <b-row>
                <div class="col-12 text-center site-dashboard__wrapper__section__suggestions__title">{{ $t('site_measurement_info.activity_suggestions') }}</div>
                <div class="col-12 site-dashboard__wrapper__section__suggestions__item suggestions__general-public">
                  <div class="row">
                    <div class="col-12 suggestions__general-public__title"><h5>{{ $t('groups.general_public') }}</h5></div>
                    <div class="col-12 suggestions__general-public__description" v-html="$t(`levels.${this.level}.activity_guidance.general_public`)"></div>
                  </div>
                </div>
                <div class="col-12 site-dashboard__wrapper__section__suggestions__item suggestions__sensitive_groups">
                  <div class="row">
                    <div class="col-12 suggestions__sensitive_groups__title"><h5>{{ $t('groups.sensitive_groups') }}</h5></div>
                    <div class="col-12 suggestions__sensitive_groups__description" v-html="$t(`levels.${this.level}.activity_guidance.sensitive_groups`)"></div>
                  </div>
                </div>
              </b-row>
            </b-col>
          </b-row>
          <b-row align-h="end" class="site-dashboard__wrapper__section__meta">
            <b-col class="text-right">
              <span class="site-dashboard__time-ago mr-3">{{ timeAgo }}</span>
              <span class="site-dashboard__site-name">{{ siteInfo.humanized_name }}</span>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="site-dashboard__wrapper__section site-dashboard__wrapper__details" lg="5">
          <b-row class="mb-3">
            <b-col cols="12" class="text-center site-dashboard__wrapper__details__other-pollution-measurements other-pollution-measurements my-5">
              <span class="site-dashboard__wrapper__details__other-pollution-measurements__title">{{ $t('site_measurement_info.other_pollution_measurements') }}</span>
              <b-row>
                <b-col cols="12" v-if="otherMeasurements && otherMeasurements.length > 0" class="other-pollution-measurements__content">
                  <b-row>
                    <b-col v-for="measurement in otherMeasurements" :key="measurement.name" cols="4" class="other-pollution-measurements__content__section">
                      <div class="other-pollution-measurements__content__section__name">{{ $t(`site_measurement_info.${measurement.name}`) }}</div>
                      <div :class="[ 'other-pollution-measurements__content__section__value', 'other-pollution-measurements__content__section__value' + measurement.level, 'mx-auto', 'text-center', 'indicator--' + measurement.level]">{{ measurement.value }}</div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="site-dashboard__wrapper__details__measurements-bar-chart" @mounted="handleBarChart" ref="mBarChartWrapper">
              <b-row>
                <b-col cols="12" class="text-center">
                  <span class="site-dashboard__wrapper__details__measurements-bar-chart__title">{{ $t('site_dashboard.historical_data') }}</span>
                </b-col>
                <b-col cols="12">
                  <template v-if="displayBarChart">
                    <measurements-bar-chart
                      :measurements="siteAggregationMeasurements.aggregationMeasurements"
                      :property="barChartProperty"
                      :lc-width="barChart.width"
                      :lc-height="barChart.height"
                      :lc-margin="barChart.margin">
                    </measurements-bar-chart>
                  </template>
                </b-col>
                <b-col cols="12" class="text-center">
                  <b-button-group class="site-dashboard__wrapper__details__measurements-bar-chart__button-group" size="lg">
                    <b-button v-for="property in availableAggreationBarChartProperties" :key="property.key" @click="switchBarChartProperty(property)" :pressed="activeProperty(property)"> {{ property.name }}</b-button>
                  </b-button-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <m-fab absoluteRight @click="clickFab">
      <font-awesome-icon :icon="fabIcon" size="lg"></font-awesome-icon>
    </m-fab>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  import _ from 'lodash'
  import IndicatorHelpersMixin from '../mixins/IndicatorHelpersMixin'
  import SourceTypesMixin from '../mixins/SourceTypesMixin'
  import Indicator from '../libs/indicator'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import { faExpand, faCompress } from '@fortawesome/fontawesome-free-solid'
  import { PERIOD_TYPES } from '../api/aggregationMeasurements'
  import MeasurementsBarChart from '../components/MeasurementsBarChart'
  import SOURCE_TYPE_PROPERTIES from '../libs/sourceTypeProperties'

  export default {
    name: 'SiteDashboardPage',
    components: {
      FontAwesomeIcon,
      MeasurementsBarChart
    },
    mixins: [IndicatorHelpersMixin, SourceTypesMixin],
    data: () => {
      return {
        siteId: undefined,
        siteInfo: null,
        otherMeasurements: null,
        mainBtnColor: '#00BCD4',
        fullscreen: false,
        siteAggregationMeasurements: null,
        availableAggreationBarChartProperties: [],
        barChartProperty: {
          key: 'pm25',
          name: 'PM2.5',
          unit: 'μg/m3'
        },
        barChart: {
          width: null,
          height: null,
          margin: null
        }
      }
    },
    computed: {
      ...mapGetters({
        site: 'siteWithLatestMeasurement',
        hourlyAggregationMeasurements: 'hourlyAggregationMeasurements'
      }),
      timeAgo: function () {
        if (this.siteInfo !== null) {
          return moment(this.siteInfo.latest_measurement.published_datetime).fromNow()
        }

        return null
      },
      level: function () {
        if (this.siteInfo !== null) {
          return this.getPM25LevelByValue(this.siteInfo.latest_measurement.pm25)
        }
      },
      fabIcon () {
        if (!this.fullscreen) {
          return faExpand
        }
        return faCompress
      },
      displayBarChart () {
        console.log(this.barChart.margin)
        return this.barChart.width !== null && this.barChart.height && this.barChart.margin
      }
    },
    methods: {
      handleSize () {
        this.handleBarChart()
      },
      fetchSiteLatestMeasurement () {
        this.$store.dispatch('getSiteWithLatestMeasurement', this.siteId)
      },
      fetchAggregationMeasurements () {
        let startDateTime = moment().subtract(24, 'hours').utc()
        let endDateTime = moment().utc()
        let periods = (_.invert(PERIOD_TYPES))
        let period = periods['hourly']

        this.$store.dispatch('getAggregationMeasurements', {
          id: this.siteId,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          period: period,
          limit: 24,
          order: 'asc'
        })
      },
      processLatestMeasurements () {
        const standard = this.getStandardInfo(Indicator.STANDARDS.custom.name)
        let self = this
        let siteInfo = this.siteInfo
        let sourceType = siteInfo.source_type
        let properties = this.getSourceTypes(sourceType)
        let latestMeasurement = siteInfo.latest_measurement
        let latestMeasurementProperties = Object.keys(latestMeasurement)
        let otherMeasurements = []

        properties.pollutionTypes.forEach(function (property) {
          if (latestMeasurementProperties.includes(property)) {
            const indicatorInfo = self.findIndicatorInfo(standard[property], latestMeasurement[property])
            const colorStop = indicatorInfo.colorStop
            const level = indicatorInfo.level

            otherMeasurements.push({
              name: property,
              value: latestMeasurement[property],
              color: colorStop[0],
              level: level
            })
          }
        })

        this.otherMeasurements = otherMeasurements
      },
      processAggregationMeasurements () {
        this.handleBarChart()
      },
      watchLatestMeasurements () {
        let self = this
        this.$store.watch(() => {
          return this.$store.getters.siteWithLatestMeasurement(self.siteId)
        }, (data) => {
          self.siteInfo = data
          if (data !== undefined) {
            self.processLatestMeasurements()
          }
        }, {
          immediate: true
        })
      },
      watchAggregationMeasurements () {
        let self = this

        this.$store.watch(() => {
          return this.$store.getters.hourlyAggregationMeasurements(self.siteId)
        }, (data) => {
          self.siteAggregationMeasurements = data
          if (data !== undefined) {
            self.processAggregationMeasurements()
            self.handleAggregationBarChartProperties(data.source_type)
          }
        }, {
          immediate: true
        })
      },
      clickFab () {
        this.$fullscreen.toggle(this.$refs.siteDashbaord, {
          wrap: false,
          callback: this.toggleFullscreenChange
        })
      },
      toggleFullscreenChange (fullscreen) {
        this.fullscreen = fullscreen
      },
      handleBarChart () {
        console.log('=== handleBarChart ===')
        let barChartElement = this.$refs.mBarChartWrapper

        if (!barChartElement) {
          console.log('barChartElement = ')
          console.log(barChartElement)
          return
        }

        this.barChart.width = barChartElement.offsetWidth
        this.barChart.height = barChartElement.offsetWidth * 0.8
        this.barChart.margin = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      },
      handleAggregationBarChartProperties (sourceType) {
        const sourceTypeInfo = SOURCE_TYPE_PROPERTIES[sourceType]
        if (sourceTypeInfo) {
          this.availableAggreationBarChartProperties = []
          const aggregationTypes = sourceTypeInfo.aggregationTypes
          const standardInfo = this.getStandardInfo(Indicator.STANDARDS.custom.name)

          aggregationTypes.forEach((property) => {
            this.availableAggreationBarChartProperties.push({
              key: property,
              name: this.$t(`site_measurement_info.${property}`),
              unit: standardInfo[property].unit
            })
          })
        }
      },
      switchBarChartProperty (property) {
        this.barChartProperty = property
      },
      activeProperty (property) {
        return property.key === this.barChartProperty.key
      }
    },
    created: function () {
      this.siteId = this.$route.params.siteId

      this.watchLatestMeasurements()
      this.watchAggregationMeasurements()
      this.fetchSiteLatestMeasurement()
      this.fetchAggregationMeasurements()

      setInterval(this.fetchSiteLatestMeasurement, 30000)
      setInterval(this.fetchAggregationMeasurements, 1800000)
    }
  }
</script>

<style scoped lang="scss">
  @import "~material-components-vue/dist/fab/fab.min.css";

  @mixin title-text() {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 1.6;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 1.9;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 2.2;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 2.5;
    }

    color: $gray-600;
  }

  @mixin pm25__name-font-size {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 2;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 2.5;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 3;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 3.5;
    }
  }

  @mixin pm25-font-size {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 9;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 11;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 13;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 19;
    }
  }

  @mixin level-font-size {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 2.6;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 2.8;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 4;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 5.5;
    }
  }

  @mixin pm25-unit-font-size {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 2.1;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 2.4;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 2.7;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 3;
    }
  }

  @mixin suggestions-group-title-font-size {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 1.5;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 1.8;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 2.1;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 2.3;
    }
  }

  @mixin suggestions-group-description-font-size {
    @include media-breakpoint-down(sm) {
      font-size: $font-size-base * 1.4;
    }

    @include media-breakpoint-only(md) {
      font-size: $font-size-base * 1.6;
    }

    @include media-breakpoint-only(lg) {
      font-size: $font-size-base * 1.8;
    }

    @include media-breakpoint-only(xl) {
      font-size: $font-size-base * 2;
    }
  }

  @mixin wrapper-section-padding {
    @include media-breakpoint-down(sm) {
      padding: 0.3em 3.9em;
    }

    @include media-breakpoint-only(md) {
      padding: 1.2em 4.2em;
    }

    @include media-breakpoint-only(lg) {
      padding: 2.1em 5.1em;
    }

    @include media-breakpoint-only(xl) {
      padding: 3em 6em;
    }
  }

  .site-dashboard {
    width: 100vw;


    @include media-breakpoint-down(md) {
      height: auto !important;
    }

    @include media-breakpoint-up(lg) {
      max-height: 100vh !important;
      height: 100vh !important;
    }

    &__wrapper {

      &__overview {
        background-color: $gray-200;
      }

      &__details {
        overflow-y: scroll;
        background-color: $white;

        &__other-pollution-measurements {
          &__title {
            @include title-text()
          }
        }

        &__measurements-bar-chart {
          &__title {
            @include title-text()
          }

          &__button-group {
            padding-top: 2em;
          }
        }
      }

      &__section {
        @include wrapper-section-padding();

        @media (max-height: 1199.98px) {
          height: auto !important;
        }

        @media (min-height: 1200px) {
          height: 100vh !important;
        }

        &__measurement-name {
          margin-bottom: ($spacer * 2) !important;
        }
        &__level {
          margin-top: ($spacer * 2) !important;
        }
        &__suggestions {
          &__title {
            @include title-text()
          }
          &__item {
            margin-bottom: 1em;
          }
        }
        &__meta {
          @include media-breakpoint-up(lg) {
            position: absolute;
            bottom: 3em;
            right: 6em;
          }
        }
      }
    }

    &__site-name {
      @include title-text();
      color: $gray-500;
    }

    &__pm25 {
      @include pm25-font-size();

      line-height: 0.9;

      &__name {
        color: $gray-600;

        @include pm25__name-font-size();
      }

      &__unit {
        @include pm25-unit-font-size();

        line-height: 0.8;
        color: $gray-600;
      }

      &--very_good {
        color: $indicator-custom-level-very_good;
      }

      &--good {
        color: $indicator-custom-level-good;
      }

      &--moderate {
        color: $indicator-custom-level-moderate;
      }

      &--bad {
        color: $indicator-custom-level-bad;
      }

      &--very_bad {
        color: $indicator-custom-level-very_bad;
      }
    }

    &__level {
      color: $white;
      font-weight: bold;

      @include level-font-size();

      &--very_good {
        color: $indicator-custom-level-very_good;
      }

      &--good {
        color: $indicator-custom-level-good;
      }

      &--moderate {
        color: $indicator-custom-level-moderate;
      }

      &--bad {
        color: $indicator-custom-level-bad;
      }

      &--very_bad {
        color: $indicator-custom-level-very_bad;
      }
    }
  }

  .suggestions__general-public, .suggestions__sensitive_groups {
    &__title {
      & > h5 {
        @include suggestions-group-title-font-size();

        line-height: 1.5;
      }
    }
    &__description {
      @include suggestions-group-description-font-size();
    }
  }

  .other-pollution-measurements {
    &__content {
      &__section {
        padding: 0.8em 0;

        &__name {
          font-size: medium;
        }

        &__value {
          background-color:transparent;
          border: 3px solid;
          height: 100px;
          border-radius: 50%;
          -moz-border-radius: 50%;
          -webkit-border-radius: 50%;
          width: 100px;
          line-height: 100px;
          vertical-align: center;
          font-size: $font-size-base * 3;

          &--very_good {
            border-color: $indicator-custom-level-very_good;
          }

          &--good {
            border-color: $indicator-custom-level-good;
          }

          &--moderate {
            border-color: $indicator-custom-level-moderate;
          }

          &--bad {
            border-color: $indicator-custom-level-bad;
          }

          &--very_bad {
            border-color: $indicator-custom-level-very_bad;
          }
        }
      }
    }
  }
</style>
