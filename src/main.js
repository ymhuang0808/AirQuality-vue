// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store/index'
import { i18n } from './setup/i18n-setup'
import VueResize from 'vue-resize'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueResize)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
