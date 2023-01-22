<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <div class="custom_card">
      <div class="card-header">
        <h4 class="card-title">{{ $t("addNew") }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.question"
                />
                <label for="name_input" class="form-label">{{
                  $t("forms.labels.question_ar")
                }}</label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.question"
                />
                <label for="name_input" class="form-label">{{
                  $t("forms.labels.question_en")
                }}</label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">{{
                  $t("forms.labels.answer_ar")
                }}</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.ar.answer"
                ></textarea>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">{{
                  $t("forms.labels.answer_en")
                }}</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.en.answer"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1">
            {{ $t("forms.submit") }}
            <span class="btn_loader" v-if="btnIsLoading"></span>
          </button>
        </div>
      </form>
      <!-- ==== End Form ==== -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",

  data() {
    return {
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t("breadcrumb.mainPage"),
          disabled: false,
          href: "/",
        },
        {
          text: this.$t("breadcrumb.faqs.title"),
          disabled: false,
          href: "/sliders",
        },
        {
          text: this.$t("breadcrumb.faqs.add"),
          disabled: true,
          href: "",
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        image: null,
        ar: {
          question: null,
          answer: null,
        },
        en: {
          question: null,
          answer: null,
        },
      },
    };
  },

  methods: {
    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true;

      if (!this.data.ar.question) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("forms.validation.question_ar"),
          position: "bottomRight",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.data.en.question) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("forms.validation.question_en"),
          position: "bottomRight",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.data.en.answer) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("forms.validation.answer_en"),
          position: "bottomRight",
        });
        this.btnIsLoading = false;
        return;
      } else if (!this.data.ar.answer) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("forms.validation.answer_ar"),
          position: "bottomRight",
        });
        this.btnIsLoading = false;
        return;
      } else {
        this.submitData();
        return;
      }
    },

    // Submit Data
    submitData() {
      const submit_data = new FormData();
      submit_data.append("ar[name]", this.data.ar.question);
      submit_data.append("ar[desc]", this.data.ar.answer);
      submit_data.append("en[name]", this.data.en.question);
      submit_data.append("en[desc]", this.data.en.answer);

      this.$axios({
        method: "POST",
        url: "faq",
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("addSuccess"),
            position: "bottomRight",
          });
          this.$router.push({ path: "/faqs" });
          this.btnIsLoading = false;
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: "bottomRight",
          });
          this.btnIsLoading = false;
        });
    },
  },
};
</script>
