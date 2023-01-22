<template>
  <div class="create_wrapper fadeIn">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <div class="custom_card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('addNew') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-12 py-0">
              <uplode-image
                @inputChanged="uplodeImg_1"
                placeHolder="صورة اللون"
              ></uplode-image>
            </div>
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="data.ar.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title_ar') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="data.en.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title_en') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  v-model.trim="data.ordering"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.ordering') }}
                </label>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="input_wrapper top_label">
                <input
                  type="color"
                  class="form-control"
                  v-model.trim="data.hex"
                />
                <label for="name_input" class="form-label">اللون</label>
              </div>
            </div>
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1">
            {{ $t('forms.submit') }}
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
  name: 'Create',

  data() {
    return {
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.colors.title'),
          disabled: false,
          href: '/colors/show-all',
        },
        {
          text: this.$t('breadcrumb.colors.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        ar: {
          name: null,
        },
        en: {
          name: null,
        },
        hex: '',

        ordering: null,
        image: null,
      },
    }
  },

  methods: {
    uplodeImg_1(obj) {
      this.data.image = obj
    },
    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true

      if (!this.data.ar.name || !this.data.en.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
        // }
        // if (!this.data.hex || !this.data.image) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: 'قم باختيار لون',
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
      } else {
        this.submitData()
        return
      }
    },

    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('en[name]', this.data.en.name)
      if (this.data.image?.img_file) {
        submit_data.append('image', this.data.image?.img_file)
      }
      submit_data.append('hex', this.data.hex)
      submit_data.append('ordering', this.data.ordering)

      this.$axios({
        method: 'POST',
        url: 'color',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/colors/show-all' })
          this.btnIsLoading = false
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading = false
        })
    },
  },
}
</script>
