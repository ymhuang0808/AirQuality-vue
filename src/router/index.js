import Vue from 'vue'
import Router from 'vue-router'
import MeasurementsMapPage from '../pages/MeasurementsMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: MeasurementsMapPage
    }
  ]
})
