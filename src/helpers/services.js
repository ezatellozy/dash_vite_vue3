import Vue from 'vue'
import axios from 'axios'
import i18n from '../i18n'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

export default class GlobalService {
  getData(endPoint) {
    return axios.get(endPoint).then((data) => data.data.data)
  }

  validation(data) {
    return fetch(data).then(() => {
      for (const [key, value] of Object.entries(data.data)) {
        if (!value) {
          if (key != 'is_active') {
            iziToast.error({
              timeout: 2000,
              message: i18n.t(`forms.validation.${key}`),
              position: 'bottomRight',
            })
            return
          }
        } else {
          if (typeof value == 'object') {
            if (value.length) {
              for (let row of value) {
                if (key == 'images') {
                  if (!row.image) {
                    iziToast.error({
                      timeout: 2000,
                      message: i18n.t(`forms.validation.${key}`),
                      position: 'bottomRight',
                    })
                    return
                  }
                }
              }
            } else {
              for (const [skey, item] of Object.entries(value)) {
                if (!item) {
                  iziToast.error({
                    timeout: 2000,
                    message: i18n.t(`forms.validation.${key}.${skey}`),
                    position: 'bottomRight',
                  })
                  return
                }
              }
            }
          }
        }
      }
      return true
    })
  }
}

Vue.prototype.$globalService = new GlobalService()
