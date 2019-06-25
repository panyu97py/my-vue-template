// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
{{#vuex}}
import Vuex from 'vuex'
{{/vuex}}
{{#router}}
import router from './router'
{{/router}}
import utils from './utils'
import api from './server'
{{#moment}}
import moment from 'moment'
{{/moment}}
{{#elementUI}}
import ElementUI from 'element-ui'
{{/elementUI}}
import 'element-ui/lib/theme-chalk/index.css'
import './components'
import './assets/icons'
{{#vuex}}
Vue.use(Vuex)
{{/vuex}}
{{#elementUI}}
Vue.use(ElementUI)
{{/elementUI}}
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils
{{#moment}}
Vue.prototype.$moment = moment
{{/moment}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  components: { App },
  template: '<App/>'{{#elementUI}},
  render: h => h(App){{/elementUI}}
})
