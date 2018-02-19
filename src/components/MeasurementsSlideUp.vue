<template>
  <div :class="{ 'measurements-slide-up': true, 'measurements-slide-up--visible': visible, 'measurements-slide-up--invisible': !visible }">
    <div class="measurements-slide-up__container">
      <div class="measurements-slide-up__container__header d-flex flex-column">
        <div class="d-block">
          <div class="float-left">
            <img class="measurements-slide-up__container__header__source-img" v-bind:src="imgSrc" v-bind:alt="sourceType" />
            <span class="ml-2 measurement__time-ago">{{ timeAgo }}</span>
          </div>
          <div class="float-right">
            <button type="button" class="close" aria-label="Close" v-on:click="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div class="mt-3 d-block">
          <span class="measurements-slide-up__container__header__site-name text-truncate d-inline">{{ $t('sidebar.site_name') }}{{ siteName }}</span>
        </div>
      </div>
      <hr />
      <div class="measurements-slide-up__container__main d-flex flex-column">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 text-center"><span class="lead">{{ $t('sidebar.pm25_concentration') }}</span></div>
            <div class="col-12 text-center"><span :class="[ 'measurement__pm25-level', 'measurement__pm25-level--' + this.level ]">{{ $t(`levels.${this.level}.name`) }}</span></div>
            <div class="col-12">
              <div ref="linearGaugeParent" class="measurement__pm25 d-block">
                <app-linear-gauge ref="linearGauge" :l-width.sync="lWidth" :stops="stops" :max-value="Number(80)" :l-value="pm25"></app-linear-gauge>
              </div>
            </div>
            <div class="col-6"><span class="measurement__temperature">{{ $t('sidebar.temperature') }}{{ temperature }}</span></div>
            <div class="col-6"><span class="measurement__humidity">{{ $t('sidebar.humidity') }}{{ humidity }}</span></div>
          </div>
        </div>
      </div>
      <hr />
      <div class="measurements-slide-up__container__suggestions">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 text-center measurements-slide-up__container__suggestions__title"><span class="lead">{{ $t('sidebar.activity_suggestions') }}</span></div>
            <div class="col-12 measurements-slide-up__container__suggestions__item suggestions__general-public">
              <div class="row">
                <div class="col-12 suggestions__general-public__title"><h5>{{ $t('groups.general_public') }}</h5></div>
                <div class="col-12 suggestions__general-public__description" v-html="$t(`levels.${this.level}.activity_guidance.general_public`)"></div>
              </div>
            </div>
            <div class="col-12 measurements-slide-up__container__suggestions__item suggestions__sensitive_groups">
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
</template>

<script>
  import MeasurementInfoMixin from '../mixins/MeasurementInfoMixin'

  export default {
    name: 'MeasurementsSlideUp',
    mixins: [MeasurementInfoMixin],
    props: {
      measurement: Object,
      visible: Boolean
    },
    data: () => {
      return {
        lWidth: 0
      }
    },
    methods: {
      close () {
        this.$emit('toggleInvisible')
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

<style lang="scss">

  .measurements-slide-up {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    z-index: 99999999;
    background-color: $white;
    transition: 0.5s;

    &--visible {
      padding: 24px 0;
      @include box-shadow((4px 0 8px 0 rgba(0, 0, 0, 0.2), 6px 0 20px 0 rgba(0, 0, 0, 0.19)))
    }

    &--visible > &__container {
      padding: 0 15px;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      max-height: 36vh;
    }

    &--invisible {
      height: 0px;
    }

    &__container {

      .lead {
        text-align: center;
      }

      &__header {

        > .row > div {
          margin-bottom: 1em;
        }

        &__source-img {
          max-width: 80px;
          max-height: 60px;
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
