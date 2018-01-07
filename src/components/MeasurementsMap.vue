<template>
  <div class="map">
    <mapbox
      :access-token="access_token"
      :map-options="map_options"
      @map-load="mapLoaded"
      @map-click="mapClicked">
    </mapbox>
    <measurements-map-legend v-bind:color-stops="colorStops"></measurements-map-legend>
  </div>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import Inidcator from '../libs/indicator'
  import MeasurementsMapLegend from './MeasurementsMapLegend'
  import 'mapbox-gl/dist/mapbox-gl.css'

  const MAPBOX_API_ACCESS_TOKEN = process.env.MAPBOX_API_ACCESS_TOKEN

  export default {
    name: 'MeasurementsMap',
    components: { Mapbox, MeasurementsMapLegend },
    props: ['mapMeasurements'],
    data: () => {
      return {
        access_token: MAPBOX_API_ACCESS_TOKEN,
        map_options: {
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v9',
          center: [120, 23],
          zoom: 3
        },
        layers: [],
        colorStops: Inidcator.STANDARDS.custom.info.pm25.colorStops
      }
    },
    watch: {
      mapMeasurements: function (val) {
        console.log('mapMeasurements was changed')
        this.$emit('measurements-changed', val)
      }
    },
    methods: {
      mapLoaded (map) {
        // TODO: add icon images
        console.log('mapLoaded')

        this.addGeoJsonMarker(map, this.mapMeasurements)

        this.$on('measurements-changed', val => {
          // TODO: Remove existing layer
          this.addGeoJsonMarker(map, val)
        })
      },
      mapClicked (map, e) {
        console.log('Map was clicked')
        console.log(e)

        const features = map.queryRenderedFeatures(e.point, {
          layers: this.layers
        })
        if (!features.length) {
          return
        }

        const feature = features[0]
        this.$emit('feature-clicked', feature)
      },
      addGeoJsonMarker (map, data) {
        console.log('addGeoJsonLayer')
        let source = data.source
        let measurementsGeoJson

        if (source === undefined || source === null || source.length === 0) {
          return
        }

        source.forEach(name => {
          measurementsGeoJson = data.measurements[name].geojson
          // Add source data
          map.addSource(`${name}-measurements`, {
            type: 'geojson',
            data: measurementsGeoJson
          })
          // Add style layer
          map.addLayer({
            id: `${name}-measurements`,
            source: `${name}-measurements`,
            type: 'circle',
            paint: {
              'circle-color': {
                property: 'pm25',
                type: 'interval',
                stops: Inidcator.getPm25ColorStops(Inidcator.STANDARDS.custom.name)
              },
              'circle-radius': {
                base: 1.8,
                stops: [[5, 2], [8, 10], [22, 20]]
              },
              'circle-opacity': 1,
              'circle-blur': 0
            }
          })

          this.layers.push(`${name}-measurements`)
        })
      }
      // getMarkerInfo (feature) {
      //   console.log('getMarkerInfo')
      //
      // },
      // drawMarker (outerCircleColor, innerCircleColor, text) {
      //   console.log('drawMarker')
      // }
    }
  }
</script>

<style scoped>

</style>
