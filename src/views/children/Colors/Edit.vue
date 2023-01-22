<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>
    <div class="custom_card fadeIn">
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-12">
              <uplode-image
                :data_src="data.image"
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
          <button class="button_style_1" :disabled="btnIsLoading">
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
  name: 'Update',

  props: ['id'],

  data() {
    return {
      loading: false,
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
        image: null,
        ordering: null,
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

        this.$iziToast.error({
          timeout: 2000,
          message: 'قم باختيار لون',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
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
      submit_data.append('hex', this.data.hex)
      submit_data.append('ordering', this.data.ordering)
      if (this.data.image?.img_file) {
        submit_data.append('image', this.data.image?.img_file)
      }
      submit_data.append('_method', 'PUT')

      this.$axios({
        method: 'POST',
        url: `color/${this.id}`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
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

    getData() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `color/${this.id}`,
      })
        .then((res) => {
          this.data.ar = res.data.data.ar
          this.data.en = res.data.data.en
          this.data.hex = res.data.data.hex
          this.data.image = res.data.data.image
          this.data.ordering = res.data.data.ordering
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  created() {
    this.getData()
  },
}
</script>
