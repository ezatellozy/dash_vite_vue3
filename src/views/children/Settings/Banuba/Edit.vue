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
          <div class="col-lg-12 py-0">
            <div class="input_wrapper top_label">
              <textarea
                type="text"
                class="form-control"
                id="name_input"
                @input="checkIfInputIsEmpty"
                v-model.trim="banuba_token"
              ></textarea>
              <label class="form-label">Banuba</label>
            </div>
          </div>
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
        banuba_token: null,
      // END:: CREATE DATA
    };
  },

  methods: {
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
        this.banuba_token = allData.banuba_token;
        this.loading = false;
      });
    },
    //END:: GET DATA

    // START:: VALIDATE CREATE FORM
    validateCreateForm() {
      this.btnIsLoading = true;
      const data = new FormData();
      data.append("banuba_token", this.banuba_token);

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
          this.$router.push({ path: "/settings/banuba" });
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
    this.getData();
  },
};
</script>
