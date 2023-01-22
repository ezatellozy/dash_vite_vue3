<template>
  <!-- Start Main Loader -->
  <transition name="fadeInUp" mode="out-in" v-if="loading">
    <MainLoader />
  </transition>
  <!-- End Main Loader -->
  <div class="setting_content" v-else>
    <!--START:: SETTING CONTENT HEADER-->
    <div class="setting_content_header">
      <!--START:: ROUTE TITLE -->
      <div class="route_title">
        <h4>{{ $t("Banuba") }}</h4>
      </div>
      <!--END:: ROUTE TITLE -->

      <!-- START:: EDIT ROUTE WRAPPER -->
      <div class="edit_route_wrapper">
        <router-link to="/settings/banuba/edit">
          <i class="fal fa-edit"></i>
        </router-link>
      </div>
      <!-- END:: EDIT ROUTE WRAPPER -->
    </div>
    <!--END:: SETTING CONTENT HEADER-->
    <div class="row">
      <div class="col-lg-12">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">Banuba</label>
          <p class="text">{{ banuba_token }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //ALL DATA
      banuba_token: null,
      //ALL DATA

      //LOADING
      loading: false,
      //LOADING
    };
  },
  methods: {
    //START:: GET DATA
    getData() {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "settings",
      }).then((res) => {
        this.banuba_token = res.data.data.banuba_token;
        this.loading = false;
      });
    },
    //END:: GET DATA
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.text {
  width: 100%;
  word-break: break-word;
  font-size: 1rem;
}
</style>