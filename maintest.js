// ======== core Vue
import Vue from 'vue'

// ======== Main app
import App from './App.vue'

// ======== Router
import router from './router'

// ======== Store
import store from './store'

// ======== language
store.dispatch('lang_module/handleLang') // ==> Store (Vuex) <==
store.dispatch('theme_module/handleTheme') // ==> Store (Vuex) <==

// **** CONSTS
const USER_TOKEN = store.getters['auth_module/currentUser'].token
const CURRENT_LANG = store.getters['lang_module/lang']

// ========  Start Axios
import axios from 'axios'
Vue.prototype.$axios = axios // Glopal variable

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
// ======== vue-particles
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// ======== Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// ======== iziToast
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
Vue.prototype.$iziToast = iziToast // Glopal variable
Vue.use(iziToast)

// ======== VueLazyload
import VueLazyload from 'vue-lazyload'
import loaderGIF from './assets/images/loader.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: loaderGIF,
  loading: loaderGIF,
  attempt: 1,
})

// ======== Moment
const moment = require('moment')
if (CURRENT_LANG == 'ar') {
  require('moment/locale/ar')
}
Vue.use(require('vue-moment'), {
  moment,
})

// ======== AOS
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

// ======== i18n
import i18n from './i18n'

// ======= vuetify
import vuetify from './plugins/vuetify'
// ======= vuetify

import VueCarousel from 'vue-carousel'

Vue.use(VueCarousel)

// =============> Vue Slike Carousal
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
Vue.component('vue-slick', VueSlickCarousel)

// =============> Multiselect
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
Vue.component('multiselect', Multiselect)
// =============> tree
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
Vue.component('treeselect', Treeselect)

// ========  Main Style
import './assets/scss/main.scss'

// =============> Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'AIzaSyDRymdCLWxCwLHFnwv36iieKAMjiwk8sdc',
    libraries: 'places', // This is required if you use the Auto complete plug-in
  },
})

// ============> Ckeditor
import CKEditor from 'ckeditor4-vue'
Vue.use(CKEditor)

// START:: IMPORTING VUE APEX CHARTS
import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)
Vue.use(VueApexCharts)
// END:: IMPORTING VUE APEX CHARTS

// =========== Start Import && Register Global Components ===========
import Breadcrumb from './components/Global/Breadcrumb.vue'
import ProfileCard from './components/Global/ProfileCard.vue'
import Statistics from './components/Global/Statistics.vue'

import BaseModel from './components/UI/BaseModel.vue'
import BaseMap from './components/Maps/BaseMap.vue'
import BaseCard from './components/UI/BaseCard.vue'

import UplodeImage from './components/Uploads/UplodeImage.vue'
import UploadImageDirect from './components/Uploads/UploadImageDirect.vue'
import UplodeMultiple from './components/Uploads/UplodeMultiple.vue'
import NotFound from './components/Global/not-found'

// START:: Main Loader
import MainLoader from '@/components/Loaders/MainLoader.vue'
// END:: Main Loader

Vue.component('MainLoader', MainLoader)
Vue.component('Breadcrumb', Breadcrumb)
Vue.component('profile-card', ProfileCard)
Vue.component('base-model', BaseModel)
Vue.component('base-map', BaseMap)
Vue.component('base-card', BaseCard)
Vue.component('main-filter', MainFilter)
Vue.component('uplode-image', UplodeImage)
Vue.component('upload-image-direct', UploadImageDirect)
Vue.component('uplode-multiple', UplodeMultiple)
Vue.component('stats-card', Statistics)
Vue.component('NotFound', NotFound)
// =========== End Import && Register Global Components ===========

// =========== Mixins
import helpers from './Mixins/helpers'
Vue.mixin(helpers)

// ======== Attatch and Mount
Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
