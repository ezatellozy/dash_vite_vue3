<template>
  <div class="create_wrapper">
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
            <!-- Start:: Image Ar -->
            <div class="col-lg-6">
              <uplode-image
                @inputChanged="uplodeImg_1"
                :placeHolder="$t('forms.labels.image_ar')"
              ></uplode-image>
            </div>
            <!-- End:: Image Ar -->

            <!-- Start:: Image Ar -->
            <div class="col-lg-6">
              <uplode-image
                @inputChanged="uplodeImg_2"
                :placeHolder="$t('forms.labels.image_en')"
              ></uplode-image>
            </div>
            <!-- End:: Image Ar -->

            <!-- Start:: Ar title -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.title"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar title -->

            <!-- Start:: En title -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.title"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En title -->
            <!-- Start:: Ar slug -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar title -->

            <!-- Start:: En slug -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En slug -->

            <!-- Start:: En slug -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ordering"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.ordering') }}
                </label>
              </div>
            </div>
            <!-- End:: En slug -->
            <div class="col-lg-6 py-0"></div>
            <!-- Start:: Ar desc -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.desc_ar') }}
                </label>
                <ckeditor class="col-12" v-model="data.ar.desc" />
              </div>
            </div>
            <!-- End:: Ar desc -->

            <!-- Start:: En desc -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.desc_en') }}
                </label>
                <ckeditor class="col-12" v-model="data.en.desc" />
              </div>
            </div>
            <!-- End:: En desc -->
          </div>
        </div>

        <div class="buttons_wrapper">
          <button
            class="button_style_1"
            :class="btnIsLoading ? 'disabled' : ''"
            :disabled="btnIsLoading"
          >
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
      dateMenu: false,
      dateMenu2: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.about.title'),
          disabled: false,
          href: '/settings/about',
        },
        {
          text: this.$t('breadcrumb.about.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        ar: {
          image: null,
          title: null,
          desc: null,
          slug: null,
        },
        en: {
          image: null,
          title: null,
          desc: null,
          slug: null,
        },
        ordering: null,
      },
    }
  },

  methods: {
    // Uplode Image
    uplodeImg_1(obj) {
      this.data.ar.image = obj
    },
    // Uplode Image
    uplodeImg_2(obj) {
      this.data.en.image = obj
    },

    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true
      if (!this.data.ar.image || !this.data.en.image) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.image'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
      } else if (!this.data.ar.title || !this.data.en.title) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.desc || !this.data.en.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.desc'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ordering) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.ordering'),
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

      submit_data.append('ar[image]', this.data.ar.image?.img_file || '')
      submit_data.append('en[image]', this.data.en.image?.img_file || '')

      submit_data.append('ar[title]', this.data.ar.title || '')
      submit_data.append('en[title]', this.data.en.title || '')

      submit_data.append('ar[desc]', this.data.ar.desc || '')
      submit_data.append('en[desc]', this.data.en.desc || '')

      submit_data.append('ar[slug]', this.data.ar.slug || '')
      submit_data.append('en[slug]', this.data.en.slug || '')

      submit_data.append('ordering', this.data.ordering || '')

      this.$axios({
        method: 'POST',
        url: 'about',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/about/show-all' })
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

  created() {},
}
</script>
