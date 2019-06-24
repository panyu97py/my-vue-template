// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './utils'
import api from './server'
import moment from 'moment'
import './components'
import './assets/icons'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
