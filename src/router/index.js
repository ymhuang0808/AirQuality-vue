import Vue from 'vue'
import Router from 'vue-router'
import NavigationBarPage from '../pages/NavigationBar'
import MeasurementsMapPage from '../pages/MeasurementsMap'
import SiteDashboardPage from '../pages/SiteDashboard'
import AboutPage from '../pages/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/site/:siteId/dashboard',
      name: 'SiteDashboard',
      component: SiteDashboardPage
    },
    {
      path: '/',
      component: NavigationBarPage,
      children: [
        {
          path: '',
          name: 'Map',
          component: MeasurementsMapPage
        },
        {
          path: 'about',
          name: 'About',
          component: AboutPage
        }
      ]
    }
  ]
})
