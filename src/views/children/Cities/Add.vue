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
          <div class="row justify-content-start">
            <!-- Image -->
            <!-- <uplode-image @inputChanged="uplodeImg_1"></uplode-image> -->

            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="addDataLocalStorage()"
                  v-model.trim="data.ar.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_ar') }}
                </label>
              </div>
            </div>

            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="addDataLocalStorage()"
                  v-model.trim="data.en.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name_en') }}
                </label>
              </div>
            </div>

            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.country') }}
                </label>
                <multiselect
                  v-model="data.country"
                  :options="countries"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- Start:: Ar Slug -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="addDataLocalStorage()"
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
                  @input="addDataLocalStorage()"
                  v-model.trim="data.en.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_en') }}
                </label>
              </div>
            </div>
            <!-- End:: En Slug -->

            <!-- Start:: En Slug -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="addDataLocalStorage()"
                  v-model.trim="data.short_name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.short_name') }}
                </label>
              </div>
            </div>
            <!-- End:: En Slug -->

            <!-- Start:: Postal Code -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="addDataLocalStorage()"
                  v-model.trim="data.postal_code"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.postal_code') }}
                </label>
              </div>
            </div>
            <!-- End:: Postal Code -->

            <!-- Start:: Is Active -->
            <div class="col-12"></div>
            <div class="col-lg-6 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->

            <!-- Start:: Map -->
            <div class="col-lg-12" v-if="data.area">
              <div class="input_wrapper top_label">
                <base-map
                  @markersChanged="merkersChanged"
                  @getAddress="data.center = $event"
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
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.cities.title'),
          disabled: false,
          href: '/cities/show-all',
        },
        {
          text: this.$t('breadcrumb.cities.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        image: null,
        ar: {
          name: null,
          slug: null,
        },
        en: {
          name: null,
          slug: null,
        },
        phone_code: null,
        country: null,

        short_name: null,
        center: null,
        postal_code: null,
        area: [],
        is_active: true,
      },

      // Fixed Data
      countries: [],
    }
  },

  mounted() {
    this.getDataLocalStorage()
  },

  methods: {
    merkersChanged(data) {
      // console.log(data)
      this.data.area = data
    },
    addDataLocalStorage() {
      localStorage.setItem('cities_data', JSON.stringify(this.data))
    },

    getDataLocalStorage() {
      if (localStorage.getItem('cities_data')) {
        this.data = JSON.parse(localStorage.getItem('cities_data'))
      }
    },

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.image = obj
    },

    // Validate Data
    validateCreateForm() {
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
      } else if (!this.data.country) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.country'),
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
      submit_data.append('ar[slug]', this.data.ar.slug)
      submit_data.append('en[slug]', this.data.en.slug)
      submit_data.append('country_id', this.data.country.id)
      submit_data.append('short_cut', this.data.short_name)

      submit_data.append('is_active', +this.data.is_active)
      submit_data.append('postal_code', this.data.postal_code)
      this.data.area.forEach((item, index) => {
        submit_data.append(`area[${index}][lat]`, item.lat)
        submit_data.append(`area[${index}][lng]`, item.lng)
      })
      submit_data.append('lat', this.data.center.lat)
      submit_data.append('lng', this.data.center.lng)

      this.$axios({
        method: 'POST',
        url: 'city',
        data: submit_data,
      })
        .then(() => {
          // =============== Start:: Remove Form Data From LocalStorage =============== //
          localStorage.removeItem('cities_data')

          // =============== End:: Remove Form Data From LocalStorage =============== //
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/cities/show-all' })
          this.btnIsLoading = false
        })
        .catch((err) => {
          console.log(err.response)
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading = false
        })
    },

    // Get Data
    getData() {
      this.$axios({
        method: 'GET',
        url: `country_not_paginated`,
      }).then((res) => {
        this.countries = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.ar.name,
          }
        })
      })
    },
  },

  created() {
    this.getData()
  },
}
</script>
