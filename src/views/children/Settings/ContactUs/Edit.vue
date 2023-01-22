<template>
  <div class="create_wrapper">
    <!-- START:: CARD TITLE -->
    <div class="card-header">
      <h4 class="card-title">{{ $t("CRUD.Update.main_title") }}</h4>
    </div>
    <!-- END:: CARD TITLE -->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loading">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->

    <!-- START:: UPDATE FORM WRAPPER -->
    <form @submit.prevent="validateCreateForm" v-else>
      <div class="container">
        <div class="row justify-content-between">
          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.project_name"
              />
              <label class="form-label">إسم المشروع</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="email"
                class="form-control"
                id="name_input2"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.email"
              />
              <label class="form-label">{{
                $t("settings.contactData.email")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input3"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.pinterest"
              />
              <label class="form-label">pinterest</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input3"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.whatsapp"
              />
              <label class="form-label">{{
                $t("settings.contactData.whatsapp")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input3"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.address"
              />
              <label class="form-label">العنوان</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input4"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.facebook"
              />
              <label class="form-label">{{
                $t("settings.contactData.facebook")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input5"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.twitter"
              />
              <label class="form-label">{{
                $t("settings.contactData.twitter")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input6"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.youtube"
              />
              <label class="form-label">{{
                $t("settings.contactData.youtube")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-12 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.instagram"
              />
              <label class="form-label">{{
                $t("settings.contactData.instagram")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.g_play_app"
              />
              <label class="form-label">{{
                $t("settings.contactData.link_android")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.app_store_app"
              />
              <label class="form-label">{{
                $t("settings.contactData.link_ios")
              }}</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.huawei_store_app"
              />
              <label class="form-label"> رابط التحميل من هواوي استور </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <!-- <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.map_api"
              />
              <label class="form-label">
                مفتاح الخريطه  
              </label>
            </div>
          </div> -->
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <!-- <div class="col-12">
            <div class="mt-5">
              <div class="large-map">
                <GmapMap
                  :center="center"
                  :zoom="7"
                  map-type-id="terrain"
                  style="width: 100%; height: 600px"
                >
                  <GmapMarker
                    v-for="(m, index) in markers"
                    :key="index"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @drag="updateCoordinates"
                    @click="clickMethod(m)"
                  />
                </GmapMap>
              </div>
            </div>
          </div> -->
          <!-- END:: INPUT WRAPPER -->
        </div>
      </div>

      <div class="buttons_wrapper">
        <!-- START:: BUTTON -->
        <button class="button_style_1">
          {{ $t("forms.submit") }}
          <span class="btn_loader" v-if="btnIsLoading"></span>
        </button>
        <!-- END:: BUTTON -->
      </div>
    </form>
    <!-- END:: UPDATE FORM WRAPPER -->
  </div>
</template>

<script>
export default {
  name: "Update",

  data() {
    return {
      // START:: BUTTON LOADER HANDLING DATA
      btnIsLoading: false,
      loading: false,
      // END:: BUTTON LOADER HANDLING DATA

      // START:: CREATE DATA
      updateData: {
        project_name: null,
        email: null,
        pinterest: null,
        address: null,
        whatsapp: null,
        facebook: null,
        twitter: null,
        instagram: null,
        // snapchat: null,
        youtube: null,
        // fax: null,
        g_play_app: null,
        app_store_app: null,
        huawei_store_app: null,
        map_api: null,
      },
      // END:: CREATE DATA

      // START:: MAP
      center: {},
      markers: null,
      coordinates_to_edit: { lat: 0, lng: 0 },
      // END:: MAP
    };
  },

  methods: {
    // START:: UPDATE LOCATION
    // updateCoordinates(location) {
    //   this.coordinates_to_edit = {
    //     lat: location.latLng.lat(),
    //     lng: location.latLng.lng(),
    //   };
    // },
    // clickMethod(m) {
    //   this.center = m.position;
    // },
    // END:: UPDATE LOCATION

    // ============== Get User Location
    // getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       // this.$axios({
    //       //   method: "get",
    //       //   url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAITrPfT5r_qmCm_8ekZyPmnebGo8o_r18`,
    //       // })
    //       //   .then((res) => {
    //       //     console.log(res.data.results[0].formatted_address);
    //       //   })
    //       //   .catch(() => {});

    //       this.markers = [
    //         {
    //           position: {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           },
    //         },
    //       ];
    //       this.center = this.markers[0].position;
    //       this.coordinates_to_edit.lat = this.center.lat;
    //       this.coordinates_to_edit.lng = this.center.lng;
    //     });
    //   }
    // },

    // START:: CHECK IF INPUT IS EMPTY (SPECIFIC TO ANIMATED PLACEHOLDER INPUTS)
    checkIfInputIsEmpty(e) {
      let inputElement = e.currentTarget;
      if (inputElement.value.length > 0) {
        inputElement.classList.add("not_empty");
      } else {
        inputElement.classList.remove("not_empty");
      }
    },
    // END:: CHECK IF INPUT IS EMPTY (SPECIFIC TO ANIMATED PLACEHOLDER INPUTS)

    //START:: GET DATA
    getData() {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "settings",
      }).then((res) => {
        let allData = res.data.data;
        this.updateData.phone = allData.phone;
        this.updateData.email = allData.email;
        this.updateData.address = allData.address;
        this.updateData.pinterest = allData.pinterest;
        this.updateData.project_name = allData.project_name;
        this.updateData.whatsapp = allData.whatsapp;
        this.updateData.facebook = allData.facebook;
        this.updateData.instagram = allData.instagram;
        this.updateData.twitter = allData.twitter;
        this.updateData.youtube = allData.youtube;
        this.updateData.g_play_app = allData.g_play_app;
        this.updateData.app_store_app = allData.app_store_app;
        this.updateData.huawei_store_app = allData.huawei_store_app;
        // this.coordinates_to_edit.lat = Number(allData.lat);
        // this.coordinates_to_edit.lng = Number(allData.lng);
        this.markers = [
          {
            position: {
              lat: Number(allData.lat),
              lng: Number(allData.lng),
            },
          },
        ];
        this.center = this.markers[0].position;
        this.loading = false;
      });
    },
    //END:: GET DATA

    // START:: VALIDATE CREATE FORM
    validateCreateForm() {
      this.btnIsLoading = true;
      const data = new FormData();

      data.append("phone", this.updateData.phone);
      data.append("email", this.updateData.email);
      data.append("address", this.updateData.address);
      data.append("pinterest", this.updateData.pinterest);
      data.append("project_name", this.updateData.project_name);
      data.append("whatsapp", this.updateData.whatsapp);
      data.append("facebook", this.updateData.facebook);
      data.append("instagram", this.updateData.instagram);
      data.append("twitter", this.updateData.twitter);
      data.append("youtube", this.updateData.youtube);
      data.append("g_play_app", this.updateData.g_play_app);
      data.append("app_store_app", this.updateData.app_store_app);
      data.append("huawei_store_app", this.updateData.huawei_store_app);

      this.$axios({
        method: "post",
        url: "settings",
        data: data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("editSuccess"),
            position: "bottomRight",
          });
          this.btnIsLoading = false;
          this.$router.push({ path: "/settings/contactUs" });
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: "bottomRight",
          });
          this.btnIsLoading = false;
        });
      // if (!this.updateData.phone) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.phone"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.email) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.email"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.whatsapp) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.whatsapp"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.fax) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.fax"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.facebook) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.facebook"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.twitter) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.twitter"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.instagram) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.instagram"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.snapchat) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.snapchat"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.youtube) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.youtube"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.link_android) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.link_android"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (!this.updateData.link_ios) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("settings.contactData.validation.link_ios"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else {
      //   const data = new FormData();
      //   data.append("phone", this.updateData.phone);
      //   data.append("email", this.updateData.email);
      //   data.append("whatsapp", this.updateData.whatsapp);
      //   data.append("facebook", this.updateData.facebook);
      //   data.append("twitter", this.updateData.twitter);
      //   data.append("instagram", this.updateData.instagram);
      //   data.append("snapchat", this.updateData.snapchat);
      //   data.append("youtube", this.updateData.youtube);
      //   data.append("lan_number", this.updateData.fax);
      //   data.append("lat", this.coordinates_to_edit.lat);
      //   data.append("lng", this.coordinates_to_edit.lng);
      //   data.append("link_ios", this.updateData.link_ios);
      //   data.append("link_android", this.updateData.link_android);
      //   this.$axios({
      //     method: "post",
      //     url: "settings",
      //     data: data,
      //   })
      //     .then(() => {
      //       this.$iziToast.success({
      //         timeout: 2000,
      //         message: this.$t("editSuccess"),
      //         position: "bottomRight",
      //       });
      //       this.btnIsLoading = false;
      //       this.$router.push({ path: "/contactUs" });
      //     })
      //     .catch((err) => {
      //       this.$iziToast.error({
      //         timeout: 2000,
      //         message: err.response.data.message,
      //         position: "bottomRight",
      //       });
      //       this.btnIsLoading = false;
      //     });
      // }
    },
    // END:: VALIDATE CREATE FORM
  },

  created() {
    // this.getLocation();
    this.getData();
    // this.getFax();
  },
};
</script>
