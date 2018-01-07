<template>
  <div class="map__legend p-2">
    <div class="map__legend__container">
      <span class="map__legend__unit float-left mr-3"> PM2.5 (µg/m³)</span>
      <ul class="color-indicator float-left">
        <li v-for="colorStop in colorStops" class="color-indicator__item float-left" v-bind:style="getStyle(colorStop)"><span class="color-indicator__value">{{ colorStop[0] }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MeasurementsMapLegend',
    props: ['colorStops'],
    methods: {
      getStyle (colorStop) {
        let style = {
          backgroundColor: colorStop[1]
        }
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map__legend {
    position: absolute;
    bottom: 30px;
    right: 10px;
    z-index: 1000;
    background-color: $white;
  }

  .map__legend {
    width: auto;

    @include box-shadow(2px 2px 2px 2px rgba(0, 0, 0, 0.2));

    &__unit {
      padding: 1.25rem 0 0;
      line-height: 1rem;
    }
  }

  .color-indicator {
    list-style: none;
    padding: 1.25rem 0 0;
    margin: 0;

    &__item {
      width: 40px;
      line-height: 1rem;
    }

    &__value {
      position: relative;
      bottom: 1rem;
      right: 0.5rem;
    }
  }
</style>
