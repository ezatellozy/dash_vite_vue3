import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: true,
  state() {
    return {
      user: {
        id: localStorage.getItem('zoz_dash_User_Id'),
        token: localStorage.getItem('zoz_dash_Token'),
        usertype: localStorage.getItem('zoz_dash_User_Type'),
        image: localStorage.getItem('zoz_dash_userImg'),
        phone: localStorage.getItem('zoz_dash_userPhone'),
      },
    }
  },
  mutations,
  actions,
  getters,
}
