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
      <form @submit.prevent="validateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- Start:: Flag Input -->
            <uplode-image
              @inputChanged="uplodeImg_1"
              placeHolder="علم الدولة"
            ></uplode-image>
            <!-- End:: Flag Input -->

            <!-- Start:: Ar Name -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.ar.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar Name -->

            <!-- Start:: En Name -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.en.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En Name -->

            <!-- Start:: Ar Slug -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.ar.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar Slug -->

            <!-- Start:: En Slug -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.en.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En Slug -->

            <!-- Start:: Ar nationality -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.ar.nationality"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.nationality_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar nationality -->

            <!-- Start:: En nationality -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.en.nationality"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.nationality_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En nationality -->

            <!-- Start:: Short Name -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.short_name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.short_name') }}
                </label>
              </div>
            </div>
            <!-- Start:: Short Name -->

            <!-- Start:: Ar Currency -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.ar.currency"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.currency_ar') }}
                </label>
              </div>
            </div>
            <!-- End:: Ar Currency -->

            <!-- Start:: En Currency -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.en.currency"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.currency_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En Currency -->

            <!-- Start:: Contenent -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.contenent') }}
                </label>
                <multiselect
                  v-model="data.continent"
                  :options="continents"
                  label="name"
                  track-by="name"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Contenent -->

            <!-- Start:: Country Phone Code -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.phone_code"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.phone_code') }}
                </label>
              </div>
            </div>
            <!-- End:: Country Phone Code -->

            <!-- Start:: Country Phone Length -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="
                    helper_checkIfInputIsEmpty()
                    addDataLocalStorage()
                  "
                  v-model.trim="data.phone_number_limit"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.phone_length') }}
                </label>
              </div>
            </div>
            <!-- End:: Country Phone Length -->
            <!-- Start:: Is Active -->
            <div class="col-lg-12 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->

            <!-- Start:: Map -->
            <div class="col-lg-12">
              <div class="input_wrapper top_label">
                <!-- v-if="data.area" -->
                <base-map
                  @markersChanged="merkersChanged"
                  :biggingMarkers="data.area"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.area') }}
                </label>
              </div>
            </div>
            <!-- end:: Map -->
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
import { json } from 'body-parser'

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
          text: this.$t('breadcrumb.countries.title'),
          disabled: false,
          href: '/countries/show-all',
        },
        {
          text: this.$t('breadcrumb.countries.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== Data
      data: {
        flag: null,
        ar: {
          name: null,
          nationality: null,
          currency: null,
          slug: null,
        },
        en: {
          name: null,
          nationality: null,
          currency: null,
          slug: null,
        },
        short_name: null,
        continent: null,
        phone_code: null,
        phone_number_limit: null,
        area: [],
        is_active: true,
      },

      // ========== Select Lists Data
    }
  },

  mounted() {
    this.getDataLocalStorage()
  },

  methods: {
    // Uplode Image
    uplodeImg_1(obj) {
      this.data.flag = obj
    },

    merkersChanged(data) {
      this.data.area = data
    },

    addDataLocalStorage() {
      localStorage.setItem('country_data', JSON.stringify(this.data))
    },

    getDataLocalStorage() {
      if (localStorage.getItem('country_data')) {
        this.data = JSON.parse(localStorage.getItem('country_data'))
      }
    },

    // Empty Form Data
    emptyFormData() {
      this.data.flag = null
      this.data.ar.name = null
      this.data.en.name = null
      this.data.ar.slug = null
      this.data.en.slug = null
      this.data.short_name = null
      this.data.ar.currency = null
      this.data.en.currency = null
      this.data.continent = null
      this.data.phone_code = null
      this.data.is_active = null
    },

    // Validate Data
    validateForm() {
      this.btnIsLoading = true

      if (!this.data.flag?.img_src) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.image'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.name) {
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
      } else if (!this.data.ar.slug) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.slug_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.slug) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.slug_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.short_name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.short_name'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.currency) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.currency_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.currency) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.currency_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.continent) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.continent'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.phone_code) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.phone_code'),
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
      submit_data.append('image', this.data.flag?.img_file)
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('en[name]', this.data.en.name)
      submit_data.append('ar[nationality]', this.data.ar.nationality)
      submit_data.append('en[nationality]', this.data.en.nationality)
      submit_data.append('ar[slug]', this.data.ar.slug)
      submit_data.append('en[slug]', this.data.en.slug)
      submit_data.append('short_name', this.data.short_name)
      submit_data.append('ar[currency]', this.data.ar.currency)
      submit_data.append('en[currency]', this.data.en.currency)
      submit_data.append('continent', this.data.continent.id)
      submit_data.append('phone_code', this.data.phone_code)
      submit_data.append('is_active', +this.data.is_active)
      submit_data.append('phone_limit', this.data.phone_number_limit)

      this.data.area.forEach((item, index) => {
        submit_data.append(`area[${index}][lat]`, item.lat)
        submit_data.append(`area[${index}][lng]`, item.lng)
      })

      this.$axios({
        method: 'POST',
        url: 'country',
        data: submit_data,
      })
        .then(() => {
          // =============== Start:: Remove Form Data From LocalStorage =============== //
          localStorage.removeItem('country_data')

          // =============== End:: Remove Form Data From LocalStorage =============== //
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/countries/show-all' })
          this.btnIsLoading = false
          this.emptyFormData()
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
