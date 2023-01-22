import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: true,
  state() {
    return {
      default_theme: 'light',
      current_theme: localStorage.getItem('zoz_dash_Theme'),
    }
  },
  mutations,
  actions,
  getters,
}
