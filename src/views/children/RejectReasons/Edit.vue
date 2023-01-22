<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loading">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->

    <div class="custom_card" v-else>
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- Start:: Ar Name -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar Name -->

            <!-- Start:: En Name -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En Name -->

            <!-- Start:: Ar desc -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.desc"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.desc_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar desc -->

            <!-- Start:: En desc -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.desc"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.desc_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En desc -->

            <!-- Start:: Type -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.gender') }}
                </label>
                <multiselect
                  v-model="data.type"
                  :options="types"
                  label="name"
                  track-by="name"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Type -->
            <!-- Start:: Type -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  الاقسام
                </label>
                <multiselect
                  :loading="!categories.length"
                  v-model="data.category"
                  :options="categories"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Type -->
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
  name: 'Update',

  props: ['id'],

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
          text: this.$t('breadcrumb.reject_reasons.title'),
          disabled: false,
          href: '/reject-reasons/show-all',
        },
        {
          text: this.$t('breadcrumb.reject_reasons.edit'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,
      loading: false,

      btnIsLoading: false,

      data: {
        ar: {
          name: null,
          desc: null,
        },
        en: {
          name: null,
          desc: null,
        },
        type: null,
        category: null,
      },
      categories: [],
      types: [
        {
          id: 'client',
          name: this.$t('client'),
        },
        {
          id: 'provider',
          name: this.$t('provider'),
        },
      ],
    }
  },

  methods: {
    // Get Data
    getData() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `reject_reason/${this.id}`,
      }).then((res) => {
        this.data.ar.name = res.data.data.ar.name
        this.data.en.name = res.data.data.en.name
        this.data.ar.desc = res.data.data.ar.desc
        this.data.en.desc = res.data.data.en.desc
        this.data.category = res.data.data.category
        this.data.type = this.types.filter(
          (el) => el.id == res.data.data.type,
        )[0]

        this.loading = false
        // End:: Set Gender
      })
    },

    // Validate Data
    validateForm() {
      this.btnIsLoading = true

      if (!this.data.ar.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.desc_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.desc_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else {
        this.submitData()
        return
      }
    },
    getCategories() {
      this.$axios({
        method: 'GET',
        url: `get_all_category`,
      }).then((res) => {
        this.categories = res.data.data.map((el) => ({
          id: el.id,
          name: el.ar.name,
        }))
      })
    },
    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('_method', 'PUT')
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('en[name]', this.data.en.name)
      submit_data.append('ar[desc]', this.data.ar.desc)
      submit_data.append('en[desc]', this.data.en.desc)
      submit_data.append('type', this.data.type?.id)
      submit_data.append('category_id', this.data.category?.id)

      this.$axios({
        method: 'POST',
        url: `reject_reason/${this.id}`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/reject-reasons/show-all' })
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

  created() {
    // Start:: Fire Methods
    this.getCategories()
    this.getData()
    // End:: Fire Methods
  },
}
</script>
