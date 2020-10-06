import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    authStatus: '',
    token: localStorage.getItem('token') || '',
    user: {},
    loader: false,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    AUTH_REQUEST (state) {
      state.authStatus = 'loading'
      state.loader = true
    },
    AUTH_SUCCESS (state, { token, user }) {
      state.authStatus = 'success'
      state.token = token
      state.user = user
      state.loader = false
    },
    AUTH_ERROR (state) {
      state.authStatus = 'error'
      state.loader = false
    },
    LOGOUT (state) {
      state.authStatus = ''
      state.token = ''
    },
    LOADER (state, payload) {
      state.loader = payload
    },
  },
  actions: {
    login ({ commit }, userData) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios.post('/login_check', { username: userData.username, password: userData.password })
          .then(response => {
            const token = response.data.token
            const user = JSON.parse(atob(token.split('.')[1]))
            // storing jwt in localStorage. https cookie is safer place to store
            localStorage.setItem('token', token)
            localStorage.setItem('user', user.username)
            localStorage.setItem('role', user.roles[0])
            axios.defaults.headers.common.Authorization = 'Bearer ' + token
            // mutation to change state properties to the values passed along
            commit('AUTH_SUCCESS', { token, user })
            resolve(response)
          })
          .catch(err => {
            commit('AUTH_ERROR')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('role')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    },
    refreshtoken ({ commit }) {
      axios.get('/refresh')
        .then(response => {
          const token = response.data.access_token
          localStorage.setItem('token', token)
          axios.defaults.headers.common.Authorization = 'Bearer ' + token
          commit('AUTH_SUCCESS', { token })
        })
        .catch(error => {
          console.log(error)
          commit('LOGOUT')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('role')
        })
    },

    recoverPassword ({ commit }, username) {
      return new Promise((resolve, reject) => {
        axios.post('/recoverpassword', username)
          .then(response => {
            console.log('recover response: ', response.data)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
  },
  getters: {
    authorized: state => !!state.token,
    authstatus: state => state.authStatus,
  },
})
