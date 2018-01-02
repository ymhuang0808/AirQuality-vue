<template>
  <div id="map-meausrements-page">
    <measurements-map :map-measurements="measurements" v-on:feature-clicked="siteClicked"></measurements-map>
    <measurements-slider ref="slider" :measurement="measurement"></measurements-slider>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MeasurementsMap from '../components/MeasurementsMap'
  import MeasurementsSlider from '../components/MeasurementsSlider'

  export default {
    components: { MeasurementsMap, MeasurementsSlider },
    name: 'MeasurementsMapPage',
    data: () => {
      return {
        measurement: null
      }
    },
    computed: mapGetters({
      measurements: 'allLatestMeasurements',
      isOpen: 'isShowMeasurementsSlider'
    }),
    methods: {
      siteClicked (feature) {
        this.$refs.slider.$children[0].slideout.open()
        this.measurement = feature
      }
    },
    created () {
      this.$store.dispatch('getAllLatestMeasurements')
      this.$store.dispatch('isShowMeasurementsSlider')
    }
  }
</script>

<style scoped>

</style>
