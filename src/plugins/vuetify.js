import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#CD201F',
      },
    },
  },
})

const app = createApp(App)

app.use(vuetify)
app.mount('#app')
