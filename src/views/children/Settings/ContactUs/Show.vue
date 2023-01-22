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
        <h4>{{ $t("settings.contact") }}</h4>
      </div>
      <!--END:: ROUTE TITLE -->

      <!-- START:: EDIT ROUTE WRAPPER -->
      <div class="edit_route_wrapper">
        <router-link to="/settings/contact/edit">
          <i class="fal fa-edit"></i>
        </router-link>
      </div>
      <!-- END:: EDIT ROUTE WRAPPER -->
    </div>
    <!--END:: SETTING CONTENT HEADER-->
    <div class="row">
      <!-- START:: EMAIL -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">إسم المشروع</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.project_name"
            readonly
          />
        </div>
      </div>
      <!-- START:: EMAIL -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">البريد الإلكتروني</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.email"
            readonly
          />
        </div>
      </div>
      <!-- START:: pinterest -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">Pinterest</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.pinterest"
            readonly
          />
        </div>
      </div>
      <!-- END:: pinterest -->

      <!-- END:: EMAIL -->

      <!-- START:: WHATSAPP -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">رقم الواتساب</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.whatsapp"
            readonly
          />
        </div>
      </div>
      <!-- END:: WHATSAPP -->

      <!-- START:: WHATSAPP -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">العنوان</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.address"
            readonly
          />
        </div>
      </div>
      <!-- END:: WHATSAPP -->

      <!-- START:: FACEBOOK -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">الفيسبوك</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.facebook"
            readonly
          />
        </div>
      </div>
      <!-- END:: FACEBOOK -->

      <!-- START:: TWITTER -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">تويتر</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.twitter"
            readonly
          />
        </div>
      </div>
      <!-- END:: TWITTER -->

      <!-- START:: INSTAGRAM -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">انستجرام</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.instagram"
            readonly
          />
        </div>
      </div>
      <!-- END:: INSTAGRAM -->

      <!-- START:: YOUTUBE -->
      <div class="col-lg-12">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">يوتيوب</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.youtube"
            readonly
          />
        </div>
      </div>
      <!-- END:: YOUTUBE -->

      <!-- START:: SNAPCHAT -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label"
            >رابط التحميل من جوجل بلاي <i class="fab fa-google-play"></i
          ></label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.g_play_app"
            readonly
          />
        </div>
      </div>
      <!-- END:: SNAPCHAT -->

      <!-- START:: SNAPCHAT -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label"
            >رابط التحميل من اب استور <i class="fab fa-app-store-ios"></i
          ></label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.app_store_app"
            readonly
          />
        </div>
      </div>
      <!-- END:: SNAPCHAT -->

      <!-- START:: SNAPCHAT -->
      <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label">رابط التحميل من هواوي استور </label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.huawei_store_app"
            readonly
          />
        </div>
      </div>
      <!-- END:: SNAPCHAT -->

      <!-- START:: SNAPCHAT -->
      <!-- <div class="col-lg-6">
        <div class="input_wrapper top_label only_read my-2">
          <label class="form-label"
            >مفتاح الخريطه <i class="fas fa-map"></i
          ></label>
          <input
            type="text"
            class="form-control"
            v-model.trim="contactData.map_api"
            readonly
          />
        </div>
      </div> -->
      <!-- END:: SNAPCHAT -->

      <!-- START:: MAP -->
      <!-- <div class="col-lg-12">
        <div class="mt-5">
          <div class="large-map">
            <GmapMap :center="mapPosition" :zoom="7" map-type-id="terrain">
              <GmapMarker
                :position="mapPosition"
                :clickable="true"
                :draggable="false"
              />
              />
            </GmapMap>
          </div>
        </div>
      </div> -->
      <!-- END:: MAP -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //ALL DATA
      contactData: {
        phone: null,
        email: null,
        whatsapp: null,
        lan_number: null,
        facebook: null,
        twitter: null,
        instagram: null,
        snapchat: null,
        youtube: null,
        footer_text_ar:
          "لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) يد",
        footer_text_en:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .",
      },
      vat_value: null,
      //ALL DATA

      //LOADING
      loading: false,
      //LOADING

      //MAP
      mapPosition: {
        lat: "24.774265",
        lng: "46.738586",
      },
      //MAP
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
        this.mapPosition.lat = Number(this.contactData.lat);
        this.mapPosition.lng = Number(this.contactData.lng);
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

<style>
.vue-map-container {
  height: 450px;
}
</style>
