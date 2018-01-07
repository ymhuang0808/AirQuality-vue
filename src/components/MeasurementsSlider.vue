<template>
  <Slideout ref="measurementSlider" menu="#menu" panel="#panel">
    <div id="menu" class="slider-content">
      <div class="slider-content__container measurement" v-if="measurement">
        <div class="slider-content__container__header d-flex flex-column">
          <div class="d-block">
            <div class="float-left">
              <img class="slider-content__container__header__source-img" v-bind:src="imgSrc" v-bind:alt="sourceType" />
              <span class="ml-2 measurement__time-ago">{{ timeAgo }}</span>
            </div>
            <div class="float-right">
              <button type="button" class="close" aria-label="Close" v-on:click="close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="mt-3 d-block">
            <span class="slider-content__container__header__site-name text-truncate d-inline">{{ $t('slider.site_name') }}{{ siteName }}</span>
          </div>
        </div>
        <hr />
        <div class="slider-content__container__main d-flex flex-column">
          <span class="lead">{{ $t('slider.pm25_concentration') }} </span>
          <div ref="linearGaugeParent" class="measurement__pm25 d-block mb-3">
            <app-linear-gauge ref="linearGauge" :l-width.sync="lWidth" :stops="stops" :max-value="Number(80)" :l-value="pm25"></app-linear-gauge>
          </div>
          <div class="d-block">
            <div class="w-50 float-left"><span class="measurement__temperature">{{ $t('slider.temperature') }}{{ temperature }}</span></div>
            <div class="w-50 float-left"><span class="measurement__humidity">{{ $t('slider.humidity') }}{{ humidity }}</span></div>
          </div>
        </div>
        <hr />
        <div class="slider-content__container__suggestions d-flex flex-column">
          <span class="lead">{{ $t('slider.activity_suggestions') }}</span>
        </div>
      </div>
    </div>
    <div id="panel">
    </div>
  </Slideout>
</template>

<script>
  import Slideout from 'vue-slideout'
  import AppLinearGauge from './AppLinearGauge'
  import Indicator from '../libs/indicator'
  import { sourceLogo } from '../utils/source-logo'
  import moment from 'moment'

  export default {
    name: 'MeasurementsSlider',
    components: { Slideout, AppLinearGauge },
    props: ['measurement'],
    methods: {
      close () {
        console.log('close slider')
        this.$children[0].slideout.close()
      }
    },
    data: () => {
      return {
        stops: Indicator.STANDARDS.custom.info.pm25.colorStops,
        lWidth: 0
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
      }
    },
    updated: function () {
      console.log('updated')

      if (this.$refs.hasOwnProperty('linearGaugeParent')) {
        this.lWidth = this.$refs.linearGaugeParent.clientWidth
        this.$refs.linearGauge.draw()
      }
    }
  }
</script>

<style lang="scss" scoped>
  body {
    width: 100%;
    height: 100%;
  }

  .slideout-menu {
    position: relative;
    top: 0;
    bottom: 0;
    width: 28vw;
    min-height: 100vh;
    margin-top: 52px;
    padding: 25px 10px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
    display: none;
    will-change: transform;
    background-color: #FFF;

    @include box-shadow(0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19))
  }

  .slideout-menu-left {
    left: 0;
  }

  .slideout-menu-right {
    right: 0;
  }

  .slideout-panel {
    z-index: -1000;
    width: 0;
    height: 0;
    display: none;
  }

  .slideout-open,
  .slideout-open body,
  .slideout-open .slideout-panel {
    overflow: hidden;
  }

  .slideout-open .slideout-menu {
    display: block;
  }

  .slider-content {
    &__container {
      .lead {
        text-align: center;
      }

      &__header {
        > .row > div {
          margin-bottom: 1em;
        }

        &__source-img {
          max-width: 70px;
          max-height: 50px;
        }

        &__site-name {
          font-size: 1.5em;
          font-weight: bold;
        }
      }
    }
  }

  .measurement {
    &__temperature, &__humidity {
      font-size: medium;
    }
  }
</style>
