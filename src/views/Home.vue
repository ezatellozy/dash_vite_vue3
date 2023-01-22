<template>
  <div>
    <main-nav></main-nav>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import MainNav from "../components/Layouts/MainNav.vue";
import Sidebar from "../components/Layouts/Sidebar.vue";

export default {
  name: "Home",

  components: { MainNav, Sidebar },

  data() {
    return {
      isLoading: true,
    };
  },

  methods: {
    launch_resize_dispatch() {
      this.$store.dispatch("sideNav_module/onResize");
    },
  },

  mounted() {
    // ===> check if the page is login
    this.launch_resize_dispatch();
    if (this.$store.getters.resizeEventExisit == false) {
      window.addEventListener("resize", this.launch_resize_dispatch, true);
      this.$store.commit("changeRessizeEvent");
    }
  },
};
</script>
