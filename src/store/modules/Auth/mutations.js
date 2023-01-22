export default {
  // ============================= Set_User_Dataa
  set_userId(state, payload) {
    localStorage.setItem('zoz_dash_User_Id', payload)
    state.user.id = payload
  },
  set_token(state, payload) {
    localStorage.setItem('zoz_dash_Token', payload)
    state.user.token = payload
  },
  set_usertype(state, payload) {
    localStorage.setItem('zoz_dash_User_Type', payload)
    state.user.usertype = payload
  },
  set_userImage(state, payload) {
    localStorage.setItem('zoz_dash_userImg', payload)
    state.user.image = payload
  },
  set_userPhone(state, payload) {
    localStorage.setItem('zoz_dash_userPhone', payload)
    state.user.phone = payload
  },

  // ============================= Remove_User_Dataa
  remove_user_data(state) {
    localStorage.removeItem('zoz_dash_User_Id')
    localStorage.removeItem('zoz_dash_Token')
    localStorage.removeItem('zoz_dash_User_Type')
    localStorage.removeItem('zoz_dash_userImg')
    localStorage.removeItem('zoz_dash_userPhone')
    state.user.id = null
    state.user.token = null
    state.user.image = null
    state.user.usertype = null
    state.user.phone = null
  },
}
