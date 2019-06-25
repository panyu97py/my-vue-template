import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'//vue本地持久化 localstage
import modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
  // plugins: [createPersistedState()],
  modules
})

export default store
