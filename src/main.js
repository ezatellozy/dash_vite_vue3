import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store'
import App from './App.vue'
import i18n from './i18n'
import helpers from './Mixins/helpers'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/scss/main.scss'

const USER_TOKEN = store.getters['auth_module/currentUser'].token
const CURRENT_LANG = store.getters['lang_module/lang']

// Global Headers
axios.defaults.baseURL = 'http://zoz.phpv8.aait-d.com/api/admin' // baseurl
axios.defaults.headers.common['cache-control'] = 'no-cache'
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Accept-language'] = CURRENT_LANG
axios.defaults.headers.common['lang'] = CURRENT_LANG
import MainFilter from '@/components/Filters/MainFilter.vue'
// Set Token If Exists
if (USER_TOKEN) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + USER_TOKEN
}

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    if (error.response.status == '403') {
      router.push('/permission-required')
    }
    if (error.response.status == '401') {
      store.dispatch('auth_module/logOut')
    }
    return Promise.reject(error)
  },
)
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == '403') {
      router.push('/permission-required')
    }
    if (error.response.status == '401') {
      store.dispatch('auth_module/logOut')
    }
    return Promise.reject(error)
  },
)

const app = createApp(App)

app.mixin(helpers)
app.use(router)
app.use(VueAxios, axios)
app.use(i18n)
app.use(store)
app.mount('#app')
