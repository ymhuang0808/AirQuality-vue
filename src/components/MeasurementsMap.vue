<template>
  <div class="map">
    <mapbox
      :access-token="access_token"
      :map-options="map_options"
      @map-load="mapLoaded"
      @map-click="mapClicked">
    </mapbox>
    <!--<measurements-map-legend v-bind:color-stops="colorStops"></measurements-map-legend>-->
  </div>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import Inidcator from '../libs/indicator'
  import * as types from '../store/mutation-types'
  import _ from 'lodash'
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
        map: null,
        layers: [],
        visibleLayers: [],
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
        console.log('mapLoaded')

        this.addGeoJsonMarker(map, this.mapMeasurements)

        this.$on('measurements-changed', val => {
          // TODO: Remove existing layer
          this.addGeoJsonMarker(map, val)
        })
        this.$on('layer-toggle', val => {
          console.log('$on(), layer-toggle')
          console.log(val)
          let layer = val.layer
          let visibility = val.visible ? 'visible' : 'none'
          console.log('layer = ' + layer)
          console.log('visibility = ' + visibility)
          map.setLayoutProperty(layer, 'visibility', visibility)
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
        let visibleSource = this.$store.getters.navFilterSelected
        let isVisible
        let measurementsGeoJson
        let mapSource

        if (source === undefined || source === null || source.length === 0) {
          return
        }

        source.forEach(name => {
          isVisible = visibleSource.indexOf(name) !== -1
          measurementsGeoJson = data.measurements[name].geojson

          console.log(`source = ${name}-measurements`)

          mapSource = map.getSource(`${name}-measurements`)

          if (mapSource === undefined) {
            // Add source data
            map.addSource(`${name}-measurements`, {
              type: 'geojson',
              data: measurementsGeoJson
            })
          } else {
            mapSource.setData(measurementsGeoJson)
          }
          if (map.getLayer(`${name}-measurements`) === undefined) {
            // Add style layer
            map.addLayer({
              id: `${name}-measurements`,
              source: `${name}-measurements`,
              type: 'circle',
              layout: {
                visibility: isVisible ? 'visible' : 'none'
              },
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
            if (isVisible) {
              this.visibleLayers.push(name)
            }
          }
        })
      }
    },
    mounted: function () {
      let self = this
      this.$store.subscribe(function (mutation, state) {
        console.log('subscribe')
        console.log(mutation)

        if (mutation.type === types.SET_NAV_FILTER_SELECTED) {
          let original = _.cloneDeep(self.visibleLayers)
          let current = _.cloneDeep(mutation.payload)
          let diff = _.xor(original, current)
          let toggle = {}

          diff.forEach(function (item) {
            toggle.layer = `${item}-measurements`

            // Check if the source exists for not
            if (self.visibleLayers.indexOf(item) === -1) {
              // Not exists
              toggle.visible = true
              self.visibleLayers.push(item)
            } else {
              toggle.visible = false
              _.pull(self.visibleLayers, item)
            }

            self.$emit('layer-toggle', toggle)
          })
        }
      })
    }
  }
</script>

<style scoped>

</style>
