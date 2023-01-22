import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
import en from './locales/en.json'
import ar from './locales/ar.json'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */

export default createI18n({
  legacy: false,
  locale: Cookies.get('zoz_dash_Lang') || 'ar',
  fallbackLocale: Cookies.get('zoz_dash_Lang') || 'ar',

  messages: {
    ar,
    en,
  },
})
