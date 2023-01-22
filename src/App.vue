<template>
  <div id="app">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted() {
    // ===> Vuetify Direction
    console.log(this.$vuetify)
    // if (this.store.getters['lang_module/lang'] == 'ar') {
    //   this.vuetify.rtl = true
    // } else {
    //   console.log(this.vuetify)
    //   this.vuetify.rtl = false
    // }

    // ===> Vuetify Theme
    // if (this.store.getters['theme_module/current_theme'] == 'light') {
    //   this.vuetify.theme.dark = false
    // } else {
    //   this.vuetify.theme.dark = true
    // }

    // ===> Scroll To Top Alwayse
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  },
}
</script>
