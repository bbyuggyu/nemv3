import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from '../store'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

Vue.prototype.$axios = axios
const apiRootPath = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : '/api/'
Vue.prototype.$apiRootPath = apiRootPath
axios.defaults.baseURL = apiRootPath
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') // add

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const token = response.data.token
  console.log(token)
  if (token) localStorage.setItem('token', token)
  return response
}, function (error) {
  // Do something with response error
  // console.log(error.response)
  switch (error.response.status) {
    case 400:
      store.commit('pop', { msg: `잘못된 요청입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
    case 401:
      store.commit('delToken')
      store.commit('pop', { msg: `인증 오류입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
    case 403:
      store.commit('pop', { msg: `이용 권한이 없습니다(${error.response.status}:${error.message})`, color: 'warning' })
      break
    default:
      store.commit('pop', { msg: `알수 없는 오류입니다(${error.response.status}:${error.message})`, color: 'error' })
      break
  }
  return Promise.reject(error)
})

const pageCheck = (to, from, next) => {
  // return next()
  axios.post(`${apiRootPath}page`, { name: to.path.replace('/', '') }, { headers: { Authorization: localStorage.getItem('token') || '' } })
  // axios.post('page', { name: to.path })
    .then((r) => {
      if (!r.data.success) throw new Error(r.data.msg)
      next()
    })
    .catch((e) => {
      // console.error(e.message)
      // next(`/block/${e.message}`)
      // next(`/block/${e.message.replace(/\//gi, ' ')}`)
      if (!e.response) store.commit('pop', { msg: e.message, color: 'warning' })
      next(false)
    })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/dashboard'),
    beforeEnter: pageCheck
  },
  {
    path: '/board/:name',
    name: 'board',
    component: () => import('../views/board'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv0',
    name: 'lv0',
    component: () => import('../views/lv0'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv1',
    name: 'lv1',
    component: () => import('../views/lv1'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv2',
    name: 'lv2',
    component: () => import('../views/lv2'),
    beforeEnter: pageCheck
  },
  {
    path: '/lv3',
    name: 'lv3',
    component: () => import('../views/lv3'),
    beforeEnter: pageCheck
  },
  {
    path: '/manage/boards',
    name: 'manageBoards',
    component: () => import('../views/manage/boards'),
    beforeEnter: pageCheck
  },
  {
    path: '/site',
    name: '사이트',
    component: () => import('../views/site'),
    beforeEnter: pageCheck
  },
  {
    path: '/user',
    name: '사용자',
    component: () => import('../views/User'),
    beforeEnter: pageCheck
  },
  {
    path: '/page',
    name: '페이지',
    component: () => import('../views/page'),
    beforeEnter: pageCheck
  },
  {
    path: '/block/:msg',
    name: '차단',
    component: () => import('../views/block')
  },
  {
    path: '/sign',
    name: '로그인',
    component: () => import('../views/sign.vue')
  },
  {
    path: '/register',
    name: '회원가입',
    component: () => import('../views/register.vue')
  },
  {
    path: '/revise',
    name: 'revise',
    component: () => import('../views/revise'),
    beforeEnter: pageCheck
  },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/e404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
