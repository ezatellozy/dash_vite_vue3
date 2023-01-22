<template>
  <v-app>
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <router-view></router-view>
  </v-app>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import vuetify from './plugins/vuetify'

const store = useStore()

onMounted(() => {
  if (store.getters['lang_module/lang'] == 'ar') {
    vuetify.locale.rtl.value = true
    document.querySelector('body').classList.add('rtl')
    document.querySelector('body').classList.remove('ltr')
    // document.body.dir = 'rtl'
  } else {
    document.querySelector('body').classList.add('rtl')
    vuetify.locale.rtl.value = false
    document.querySelector('body').classList.add('ltr')
    document.querySelector('body').classList.remove('rtl')
  }
})

// export default {
//   name: 'App',

//   mounted() {
//     // ===> Vuetify Direction
//     console.log(vuetify)
//     // if (this.store.getters['lang_module/lang'] == 'ar') {
//     //   this.vuetify.rtl = true
//     // } else {
//     //   console.log(this.vuetify)
//     //   this.vuetify.rtl = false
//     // }

//     // ===> Vuetify Theme
//     // if (this.store.getters['theme_module/current_theme'] == 'light') {
//     //   this.vuetify.theme.dark = false
//     // } else {
//     //   this.vuetify.theme.dark = true
//     // }

//     // ===> Scroll To Top Alwayse
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: 'smooth',
//     })
//   },
// }
</script>
<style scss>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
