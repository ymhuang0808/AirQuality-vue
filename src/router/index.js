import Vue from 'vue'
import Router from 'vue-router'
import MeasurementsMapPage from '../pages/MeasurementsMap'
import AboutPage from '../pages/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: MeasurementsMapPage
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    }
  ]
})
