import i18n from '../../../i18n'
import Cookies from 'js-cookie'

export default {
  handleLang(context) {
    let lang = context.getters.lang
    let default_lang = context.getters.default_lang

    if (!lang) {
      lang = default_lang
    }

    Cookies.set('zoz_dash_Lang', lang)
    document.documentElement['lang'] = lang

    i18n.locale = lang

    if (lang == 'ar') {
      document.querySelector('body').classList.add('rtl')
      document.querySelector('body').classList.remove('ltr')
    } else if (lang == 'en') {
      document.querySelector('body').classList.add('ltr')
      document.querySelector('body').classList.remove('rtl')
    }
  },

  switchLang(conetxt) {
    let lang

    if (conetxt.getters.lang == 'ar') {
      Cookies.set('zoz_dash_Lang', 'en')

      lang = 'en'
    } else if (conetxt.getters.lang == 'en') {
      Cookies.set('zoz_dash_Lang', 'ar')

      lang = 'ar'
    }

    i18n.locale = lang
    location.reload()
  },
}
