import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import Cookies from 'js-cookie'
export default {
  namespaced: true,

  state() {
    return {
      default_lang: 'ar',
      lang: Cookies.get('zoz_dash_Lang') || 'ar',
    }
  },
  mutations,
  actions,
  getters,
}
