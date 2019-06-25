export default {
  state: {
    logoClickTimes:0
  },
  getters: {
    logoClickTimes:state=>state.logoClickTimes
  },
  mutations: {
    SET_LOGO_CLICK_TIMES(state,times){
      state.logoClickTimes=times
    }
  },
  actions: {
    setLogoClickTimes({commit,state}){
      commit('SET_LOGO_CLICK_TIMES',state.logoClickTimes+1)
      console.log('vuex',`logo click times is ${state.logoClickTimes+1}`)
    }
  }
}
