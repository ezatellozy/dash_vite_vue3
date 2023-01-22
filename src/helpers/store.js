import Vue from 'vue'
import axios from 'axios'
import iziToast from 'izitoast'
import i18n from '../i18n'
import 'izitoast/dist/css/iziToast.min.css'
// Vue.prototype.$iziToast = iziToast // Glopal variable
// Vue.use(iziToast)
export default class GlobalStore {
  submitData({ data }, url) {
    let exeptions = [
      'inputType',
      'step',
      'options',
      'multiple',
      'time_from_modal',
      'time_to_modal',
      'exeptions',
      'image_model',
      'preview',
      'modal',
    ]

    const submit_data = new FormData()

    for (const [item, value] of Object.entries(data)) {
      if (value) {
        if (typeof value == 'object') {
          if (Array.isArray(value)) {
            value.map((main_el, main_index) => {
              for (const [objKey, objValue] of Object.entries(
                value[main_index],
              )) {
                const found = exeptions.find((found) => objKey == found)
                if (found != objKey) {
                  if (item == 'images') {
                    submit_data.append(
                      `${item}[${main_index}]`,
                      objValue?.id ? objValue.id : objValue,
                    )
                  } else {
                    submit_data.append(
                      `${item}[${main_index}][${objKey}]`,
                      objValue?.id ? objValue.id : objValue,
                    )
                  }
                }
              }
            })
          } else {
            for (const [k, v] of Object.entries(value)) {
              const found = exeptions.find((found) => k == found)
              if (k != found) {
                if (k != 'value') {
                  if (item == 'ar' || item == 'en') {
                    submit_data.append(`${item}[${k}]`, v?.value ? v.value : v)
                  } else {
                    if (k == 'id') {
                      submit_data.append(`${item}`, v)
                    }
                  }
                } else {
                  if (Array.isArray(v)) {
                    v.map((e, i) => submit_data.append(`${item}[${i}]`, e.id))
                  } else {
                    submit_data.append(item, v?.id ? v.id : v)
                  }
                }
              }
            }
          }
        } else {
          if (item != 'is_active') {
            submit_data.append(item, value)
          }
        }
      }
      if (item == 'is_active') {
        submit_data.append(item, +value)
      }
    }
    return axios({
      method: 'POST',
      url: url,
      data: submit_data,
    })
      .then((res) => {
        if (res.data.status == 'success') {
          iziToast.success({
            timeout: 2000,
            message: i18n.t('addSuccess'),
            position: 'bottomRight',
          })
        }
        return res.data
      })
      .catch((err) => {
        if (err.response) {
          iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
        }
        return err.response
      })
  }
}

Vue.prototype.$globalStore = new GlobalStore()
