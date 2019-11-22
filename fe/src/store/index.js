import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: false,
    sb: {
      act: false,
      msg: '',
      color: 'error'
    },
  },
  mutations: {
    login (state) {
      state.admin = true
    },
    pop (state, d) {
      state.sb.msg = d.msg
      state.sb.color = d.color
      state.sb.act = false
      if (d.act === undefined) state.sb.act = true
    }
  },
  actions: {
  },
  modules: {
  }
})
