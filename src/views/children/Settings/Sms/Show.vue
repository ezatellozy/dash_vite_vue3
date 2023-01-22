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
        <h4>{{ $t("settings.sms") }}</h4>
      </div>
      <!--END:: ROUTE TITLE -->

      <!-- START:: EDIT ROUTE WRAPPER -->
      <div class="edit_route_wrapper">
        <router-link to="/settings/sms/edit">
          <i class="fal fa-edit"></i>
        </router-link>
      </div>
      <!-- END:: EDIT ROUTE WRAPPER -->
    </div>
    <!--END:: SETTING CONTENT HEADER-->
    <div class="row">
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">اسم المرسل</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.sms_sender_name"
            readonly
          />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">كلمة مرور </label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.sms_password"
            readonly
          />
        </div>
      </div>

      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">اسم المستخدم </label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.sms_username"
            readonly
          />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">مزود الرسائل القصيرة</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.sms_provider"
            readonly
          />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">حالة الخدمة </label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.use_sms_service"
            readonly
          />
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
      contactData: {
        sms_sender_name: null,
        sms_password: null,
        sms_username: null,
        sms_provider: null,
        use_sms_service: null,
      },
      vat_value: null,
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
        this.contactData = res.data.data;
        // this.mapPosition.lat = Number(this.contactData.lat);
        // this.mapPosition.lng = Number(this.contactData.lng);
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
