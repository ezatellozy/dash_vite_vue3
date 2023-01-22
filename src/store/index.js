import { createApp } from 'vue'
import { createStore } from 'vuex'
import lang from './modules/lang/index.js'
import sideNav from './modules/sideNav/index.js'
import auth from './modules/Auth/index.js'
import theme from './modules/Theme/index.js'
import socket from './modules/SocketGetters/index.js'

const store = createStore({
  modules: {
    lang_module: lang,
    sideNav_module: sideNav,
    auth_module: auth,
    theme_module: theme,
    socket_module: socket,
  },

  state() {
    return {
      offerTypeEdit: '',
      resizeEventExisit: false,
    }
  },
  getters: {
    resizeEventExisit(state) {
      return state.resizeEventExisit
    },
    offerTypeEdit(state) {
      return state.offerTypeEdit
    },
  },
  mutations: {
    changeRessizeEvent(state) {
      state.resizeEventExisit = !state.resizeEventExisit
    },
    offerTypeEdit(state, paylod) {
      state.offerTypeEdit = paylod
    },
  },
  actions: {},
})

export default store
