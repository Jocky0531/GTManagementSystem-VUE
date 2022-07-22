import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid:sessionStorage.getItem('userid')?sessionStorage.getItem('userid'):'',
    teacherid:sessionStorage.getItem('teacherid')?sessionStorage.getItem('teacherid'):'',
    role:sessionStorage.getItem('role')?sessionStorage.getItem('role'):'',
    username:''
  },
  getters: {
  },
  mutations: {
    SET_USERID:(state,userid)=>{
      sessionStorage.setItem('userid',userid)
      state.userid = userid
    },
    SET_TEACHERID:(state,teacherid)=>{
      sessionStorage.setItem('teacherid',teacherid)
      state.teacherid = teacherid
    },
    SET_ROLE:(state,role)=>{
      sessionStorage.setItem('role',role)
      state.role = role
    },
    SET_USERNAME:(state,username)=>{
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
