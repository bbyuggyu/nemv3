import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    sb: {
      act: false,
      msg: '',
      color: 'error'
    },
    user: {
      name: '일반사용자',
      id: '없음',
      img: 'http://medfordgospelmission.org/wp-content/uploads/2018/06/default-user-image-female.png'
    }
  },
  mutations: {
    getToken (state, user) {
      state.token = localStorage.getItem('token')
      state.user = user
      console.log(24, user)
    },
    delToken (state) {
      localStorage.removeItem('token')
      state.token = null
      state.user = {
        name: '일반사용자',
        id: '없음',
        img: 'http://medfordgospelmission.org/wp-content/uploads/2018/06/default-user-image-female.png'
      }
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
