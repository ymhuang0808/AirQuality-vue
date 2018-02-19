<template>
  <Slideout ref="measurementSlider" menu="#menu" panel="#panel" class="measurements-slider">
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
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 text-center"><span class="lead">{{ $t('slider.pm25_concentration') }}</span></div>
              <div class="col-12 text-center"><span :class="[ 'measurement__pm25-level', 'measurement__pm25-level--' + this.level ]">{{ $t(`levels.${this.level}.name`) }}</span></div>
              <div class="col-12">
                <div ref="linearGaugeParent" class="measurement__pm25 d-block">
                  <app-linear-gauge ref="linearGauge" :l-width.sync="lWidth" :stops="stops" :max-value="Number(80)" :l-value="pm25"></app-linear-gauge>
                </div>
              </div>
              <div class="col-6"><span class="measurement__temperature">{{ $t('slider.temperature') }}{{ temperature }}</span></div>
              <div class="col-6"><span class="measurement__humidity">{{ $t('slider.humidity') }}{{ humidity }}</span></div>
            </div>
          </div>
        </div>
        <hr />
        <div class="slider-content__container__suggestions">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12 text-center slider-content__container__suggestions__title"><span class="lead">{{ $t('slider.activity_suggestions') }}</span></div>
              <div class="col-12 slider-content__container__suggestions__item suggestions__general-public">
                <div class="row">
                  <div class="col-12 suggestions__general-public__title"><h5>{{ $t('groups.general_public') }}</h5></div>
                  <div class="col-12 suggestions__general-public__description" v-html="$t(`levels.${this.level}.activity_guidance.general_public`)"></div>
                </div>
              </div>
              <div class="col-12 slider-content__container__suggestions__item suggestions__sensitive_groups">
                <div class="row">
                  <div class="col-12 suggestions__sensitive_groups__title"><h5>{{ $t('groups.sensitive_groups') }}</h5></div>
                  <div class="col-12 suggestions__sensitive_groups__description" v-html="$t(`levels.${this.level}.activity_guidance.sensitive_groups`)"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="panel">
    </div>
  </Slideout>
</template>

<script>
  import Slideout from 'vue-slideout'
  import MeasurementInfoMixin from '../mixins/MeasurementInfoMixin'

  export default {
    name: 'MeasurementsSlider',
    mixins: [MeasurementInfoMixin],
    components: { Slideout },
    props: ['measurement'],
    methods: {
      close () {
        console.log('close slider')
        this.$children[0].slideout.close()
      }
    },
    data: () => {
      return {
        lWidth: 0
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
  .measurements-slider {
    height: 100%;
  }

  .slideout-menu {
    position: absolute;
    top: 80.7667px;
    bottom: 0;

    @include media-breakpoint-down(xl) {
      width: 30vw;
    }

    @include media-breakpoint-up(xl) {
      width: 25vw;
    }

    padding: 25px 10px;
    overflow-x: scroll;
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

      &__suggestions {
        &__title {
          margin-bottom: 1.1em;
        }

        &__item {
          margin-bottom: 1.2em;
        }
      }
    }
  }

</style>
