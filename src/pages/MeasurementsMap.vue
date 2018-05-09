<template>
  <div id="map-measurements-page">
    <resize-observer @notify="handleResize" />
    <measurements-map :map-measurements="measurements" v-on:feature-clicked="siteClicked"></measurements-map>
    <measurement-sidebar v-if="!hideSlideUp" ref="mSidebar" :measurement="measurement"></measurement-sidebar>
    <measurement-slide-up v-if="hideSlideUp" ref="mSlideUp" :measurement="measurement" :visible="slideUpVisible" @toggleInvisible="toggleSlideUpInvisible"></measurement-slide-up>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MeasurementsMap from '../components/MeasurementsMap'
  import MeasurementSidebar from '../components/MeasurementSidebar'
  import verge from 'verge'
  import MeasurementSlideUp from '../components/MeasurementSlideUp'

  export default {
    components: {
      MeasurementSlideUp,
      MeasurementsMap,
      MeasurementSidebar: MeasurementSidebar
    },
    name: 'MeasurementsMapPage',
    data: () => {
      return {
        measurement: null,
        hideSlideUp: true,
        slideUpVisible: false
      }
    },
    computed: mapGetters({
      measurements: 'allLatestMeasurements',
      isOpen: 'isShowMeasurementSidebar'
    }),
    methods: {
      siteClicked (feature) {
        this.measurement = null

        if (!this.hideSlideUp) {
          this.$refs.mSidebar.$children[0].slideout.open()
        } else {
          this.slideUpVisible = true
        }

        this.measurement = feature
      },
      handleResize () {
        this.hideSlideUp = verge.viewportW() < 800
      },
      toggleSlideUpInvisible () {
        this.slideUpVisible = false
      },
      fetchMeasurements () {
        this.$store.dispatch('getAllLatestMeasurements').then((measurement) => {
          let selected = this.$store.getters.navFilterSelected

          this.$store.dispatch('setNavFilter', {
            isVisible: true,
            source: measurement.source,
            selected: (selected.length === 0) ? measurement.source : selected
          })
        })
      }
    },
    created () {
      this.fetchMeasurements()
      // Periodically fetch and update the measurements
      setInterval(this.fetchMeasurements, 60000)

      this.$store.dispatch('isShowMeasurementSidebar')
    },
    mounted () {
      this.handleResize()
    },
    beforeDestroy () {
      this.measurement = null
    }
  }
</script>

<style scoped>

</style>
