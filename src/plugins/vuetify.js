// import '@mdi/font/css/materialdesignicons.css'
// import 'vuetify/styles'

// import App from './App.vue'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// const { createApp } = Vue
// const { createVuetify } = Vuetify

// const vuetify = createVuetify({
//   components,
//   directives,
//   theme: {
//     themes: {
//       light: {
//         primary: '#CD201F',
//       },
//     },
//   },
// })

// const app = createApp(App)

// app.use(vuetify)
// app.mount('#app')

import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp().use(vuetify).mount('#app')
