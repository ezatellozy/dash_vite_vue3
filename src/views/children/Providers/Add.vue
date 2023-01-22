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
          <div class="row">
            <div class="productDetails mb-2">
              <h2 class="title">بيانات مزود الخدمة</h2>
              <div class="row">
                <div class="col-lg-12 py-0">
                  <uplode-image
                    @inputChanged="uplodeImg_1"
                    placeHolder="صورة المستخدم"
                  ></uplode-image>
                </div>

                <!-- Start:: Name -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="text"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.full_name"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.name') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Name -->

                <!-- Start:: Email -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="email"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.email"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.email') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Email -->

                <!-- Start:: Image -->
                <!-- End:: Image -->

                <!-- Start:: Country -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <label class="form-label">
                      {{ $t('forms.labels.country') }}
                    </label>
                    <multiselect
                      :loading="!countries.length"
                      v-model="data.country"
                      :options="countries"
                      label="name"
                      track-by="id"
                      placeholder=" "
                      :searchable="true"
                      :allow-empty="false"
                      :show-labels="false"
                    ></multiselect>
                  </div>
                </div>

                <!-- Start:: Country -->

                <!-- Start:: Phone -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="number"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.phone"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.phone') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Phone -->

                <!-- Start:: Password -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="password"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.password"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.password') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Password -->

                <!-- Start:: Password  Confirmation-->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="password"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.password_confirmation"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.confirmPassword') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Password  Confirmation-->
              </div>
            </div>

            <!-- Start Provider Details -->
            <div class="productDetails">
              <h2 class="title">بيانات المخزن</h2>
              <div class="row">
                <!-- Start:: Image -->
                <div class="col-12 py-0">
                  <uplode-image
                    @inputChanged="uplodeImg_2"
                    placeHolder="مزود الخدمة"
                  ></uplode-image>
                </div>
                <!-- End:: Image -->

                <!-- Start:: Name -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="text"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.store_name"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.store_name') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Name -->

                <!-- Start:: Email -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="email"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.provider_email"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.email') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Email -->

                <!-- Start:: Phone -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="number"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.provider_phone"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.phone') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Phone -->
                <!-- Start:: category -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <label class="form-label">
                      {{ $t('forms.labels.category') }}
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

                <!-- Start:: category -->

                <!-- Start:: Country -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <label class="form-label">
                      {{ $t('forms.labels.country') }}
                    </label>
                    <multiselect
                      :loading="!countries.length"
                      v-model="data.provider_country"
                      :options="countries"
                      @input="getCities"
                      label="name"
                      track-by="id"
                      placeholder=" "
                      :searchable="true"
                      :allow-empty="false"
                      :show-labels="false"
                    ></multiselect>
                  </div>
                </div>

                <!-- Start:: Country -->

                <!-- Start:: city -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <label class="form-label">
                      {{ $t('forms.labels.city') }}
                    </label>
                    <multiselect
                      :disabled="!cities.length"
                      v-model="data.city"
                      :options="cities"
                      @input="getDistricts"
                      label="name"
                      track-by="id"
                      placeholder=" "
                      :searchable="true"
                      :allow-empty="false"
                      :show-labels="false"
                    ></multiselect>
                  </div>
                </div>

                <!-- Start:: city -->

                <!-- Start:: districts -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <label class="form-label">
                      {{ $t('forms.labels.district') }}
                    </label>
                    <multiselect
                      :disabled="!districts.length"
                      v-model="data.district"
                      :options="districts"
                      label="name"
                      track-by="id"
                      placeholder=" "
                      :searchable="true"
                      :allow-empty="false"
                      :show-labels="false"
                    ></multiselect>
                  </div>
                </div>

                <!-- Start:: districts -->

                <!-- Start:: Name -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="text"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.location_description"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.location_description') }}
                    </label>
                  </div>
                </div>
                <!-- End:: Name -->
                <!-- Start:: location -->
                <div class="col-lg-6 col-xxl-4 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="text"
                      class="form-control"
                      @input="helper_checkIfInputIsEmpty"
                      v-model.trim="data.location_instruction"
                    />
                    <label for="name_input" class="form-label">
                      {{ $t('forms.labels.location_instruction') }}
                    </label>
                  </div>
                </div>
                <!-- End:: location -->
                <div class="col-12 py-0"></div>

                <!-- Start:: Is Open -->
                <div class="col-lg-4 py-0">
                  <v-checkbox
                    :label="$t('forms.labels.is_open')"
                    v-model="data.is_open"
                    color="success"
                  ></v-checkbox>
                </div>
                <!-- End:: Is Open -->
              </div>
            </div>
            <!-- End Provider Details -->

            <!-- START:: MAP -->
            <div class="col-12 fadeIn">
              <div class="large-map">
                <div class="input_wrapper top_label">
                  <input
                    type="text"
                    class="form-control"
                    id="autocomplete_ar"
                    placeholder="ابحث على الخريطة"
                    @click="getAddressAr"
                  />
                </div>
                <GmapMap
                  style="width: 100%; min-height: 300px; max-height: 100%;"
                  :center="coordinates_to_edit"
                  :zoom="7"
                  :draggable="true"
                  map-type-id="terrain"
                >
                  <GmapMarker
                    :position="coordinates_to_edit"
                    :clickable="true"
                    :draggable="true"
                    @dragend="updateMarker($event.latLng)"
                  />
                </GmapMap>
              </div>
            </div>
            <!-- END:: MAP -->

            <!-- Start:: Is Active -->
            <div class="col-lg-4 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->
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
          text: this.$t('breadcrumb.providers.title'),
          disabled: false,
          href: '/providers/show-all',
        },
        {
          text: this.$t('breadcrumb.providers.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,
      center: {
        lat: 0,
        lng: 0,
      },
      markers: null,
      coordinates_to_edit: { lat: 0, lng: 0 },
      // ========== create_data
      data: {
        full_name: null,
        password: null,
        password_confirmation: null,
        email: null,
        phone: null,
        avatar: null,
        country: null,
        store_name: null,
        image: null,
        provider_email: null,
        provider_phone: null,
        provider_country: null,
        location_description: null,
        location_instruction: null,

        city: null,
        district: null,
        category: null,
        is_open: false,
        is_active: true,
      },

      countries: [],
      cities: [],
      districts: [],
      categories: [],
    }
  },

  methods: {
    // START:: UPDATE LOCATION
    updateMarker(location) {
      this.coordinates_to_edit = {
        lat: location.lat(),
        lng: location.lng(),
      }

      // this.henlo = location.lat();
    },
    // END:: UPDATE LOCATION

    // START:: G-MAP GET ADDRESS
    getAddressAr() {
      var self = this
      var input = document.getElementById('autocomplete_ar')
      var searchBox = new google.maps.places.SearchBox(input)
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces()
        if (places.length == 0) {
          return
        }
        var bounds = new google.maps.LatLngBounds()
        places.forEach(function (place) {
          bounds.extend(place.geometry.location)
          place.geometry.location.lat()
          place.geometry.location.lng()
          place.formatted_address
          // self.data.address = place.formatted_address;
          self.coordinates_to_edit = {
            lat: Number(place.geometry.location.lat()),
            lng: Number(place.geometry.location.lng()),
          }
          // self.markers[0].position.lat = place.geometry.location.lat();
          // self.markers[0].position.lng = place.geometry.location.lat();
        })
      })
    },
    // START:: G-MAP GET ADDRESS

    // ============== Get User Location
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.markers = [
            {
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
          ]
          this.center = this.markers[0].position
          this.coordinates_to_edit.lat = this.center.lat
          this.coordinates_to_edit.lng = this.center.lng
        })
      }
    },

    // ============ Get Select Lists Data
    getCountries() {
      this.$axios({
        method: 'GET',
        url: `countries_without_pagination`,
      }).then((res) => {
        this.countries = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
      })
    },
    // ============ Get Select Lists Data
    getDistricts(e) {
      this.$axios({
        method: 'GET',
        url: `city/${e.id}/districts`,
      }).then((res) => {
        this.districts = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
      })
    },
    // ============ Get Select Lists Data
    getCities(e) {
      this.$axios({
        method: 'GET',
        url: `country/${e.id}/cities`,
      }).then((res) => {
        this.cities = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
      })
    },
    getCategories() {
      this.$axios({
        method: 'GET',
        url: `get_all_category`,
      }).then((res) => {
        this.categories = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.ar.name,
          }
        })
      })
    },

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.avatar = obj
    },
    uplodeImg_2(obj) {
      this.data.image = obj
    },

    // Empty Form Data
    emptyFormData() {
      this.data.avatar = null

      this.name = null
      this.phone = null

      this.email = null

      this.password = null
      this.password_confirmation = null
    },

    // Validate Data
    validateForm() {
      this.btnIsLoading = true

      if (!this.data.avatar?.img_file) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.image'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.full_name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.phone) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.phone'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.phone.length < 9) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'رقم الهاتف يجب ان يكون اكبر من 9 ارقام',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.phone.length > 11) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'رقم الهاتف يجب ان يكون اقل من 11 رقم',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.email) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.email'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.password) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.password'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.password != this.data.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'تاكيد الباسورد يجب  ان يساوي الباسورد',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.image?.img_file) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل صورة مزود الخدمة ملطوب',
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
      submit_data.append('avatar', this.data.avatar.img_file)

      submit_data.append('full_name', this.data.full_name)
      submit_data.append('phone', this.data.phone)

      if (this.data.country) {
        submit_data.append('country_id', this.data.country.id)
      }

      submit_data.append('email', this.data.email)
      submit_data.append('location_description', this.data.location_description)
      submit_data.append('lat', this.coordinates_to_edit.lat)
      submit_data.append('lng', this.coordinates_to_edit.lng)
      submit_data.append('password', this.data.password)
      submit_data.append('is_active', +this.data.is_active)

      // start provider
      submit_data.append('image', this.data.image?.img_file)
      submit_data.append('store_name', this.data.store_name)
      submit_data.append('provider_email', this.data.provider_email)
      submit_data.append('provider_phone', this.data.provider_phone)
      submit_data.append('provider_country_id', this.data.provider_country?.id)
      submit_data.append('city_id', this.data.city?.id)
      submit_data.append('provider_country_id', this.data.district?.id)
      submit_data.append('category_id', this.data.category?.id)
      submit_data.append('district_id', this.data.district?.id)
      submit_data.append('location_instruction', this.data.location_instruction)
      submit_data.append('is_open', +this.data.is_open)
      // end provider

      this.$axios({
        method: 'POST',
        url: 'provider',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/providers/show-all' })
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
    this.getCountries()
    this.getCategories()
    this.getLocation()
    // End:: Fire Methods
  },
}
</script>
