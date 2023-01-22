<template>
  <div class="all_settings custom_card">
    <div class="container-fluid px-0">
      <div class="row">
        <div class="col-sm-12">
          <v-sheet class="settings-tab mb-5">
            <v-tabs
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab v-for="(nav, index) in navs_link" :key="index">
                <router-link class="nav_link" :to="nav.path">
                  {{ $t(`settings.${nav.name}`) }}
                </router-link>
              </v-tab>
            </v-tabs>
          </v-sheet>

          <div class="setting_tabs_content">
            <transition name="fadeIn" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navs_link: [
        { name: 'global', path: '/settings' },
        { name: 'about', path: '/settings/about' },
        { name: 'terms', path: '/settings/terms' },
        { name: 'policy', path: '/settings/policy' },
      ],
    }
  },
}
</script>
<style lang="scss">
.v-sheet.settings-tab {
  .theme--light.v-tabs > .v-tabs-bar {
    background: none !important;
  }
  .v-tab {
    margin-inline-end: 10px;
    padding: 0 !important;
    &::before {
      border-radius: 15px 7px 15px 7px;
    }
    .nav_link {
      font-size: var(--Small);
      color: var(--mainColor-2) !important;
      padding: 0 16px;
      &.router-link-exact-active.router-link-active {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
        background-color: var(--mainColor-2) !important;
        border-radius: 15px 7px 15px 7px;
        color: #fff !important;
      }
    }
  }
  align-items: center;
  .v-tabs-slider-wrapper {
    display: none;
  }
}
</style>
