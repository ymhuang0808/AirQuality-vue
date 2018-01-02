<template>
  <mapbox
    :access-token="access_token"
    :map-options="map_options"
    @map-load="mapLoaded"
    @map-click="mapClicked">
  </mapbox>
</template>

<script>
  import Mapbox from 'mapbox-gl-vue'
  import 'mapbox-gl/dist/mapbox-gl.css'

  const MAPBOX_API_ACCESS_TOKEN = process.env.MAPBOX_API_ACCESS_TOKEN

  export default {
    name: 'MeasurementsMap',
    components: { Mapbox },
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
        layers: []
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

        this.addGeoJsonLayer(map, this.mapMeasurements)

        this.$on('measurements-changed', val => {
          // TODO: Remove existing layer
          this.addGeoJsonLayer(map, val)
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

        console.log('feature clicked')
        const feature = features[0]
        this.$emit('feature-clicked', feature)
      },
      addGeoJsonLayer (map, data) {
        console.log('addGeoJsonLayer')
        let source = data.source

        source.forEach(name => {
          console.log(name)
          let measurements = data.measurements[name].geojson
          let layer = `measurements-${name}`
          this.layers.push(layer)
          map.addLayer({
            id: layer,
            type: 'symbol',
            source: {
              type: 'geojson',
              data: measurements
            },
            layout: {
              'icon-image': 'monument-15',
              'text-field': '{name}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
            }
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
