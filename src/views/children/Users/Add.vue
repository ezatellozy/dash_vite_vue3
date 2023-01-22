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
            <div class="col-lg-12 py-0">
              <uplode-image
                @inputChanged="uplodeImg_1"
                placeHolder="صورة المستخدم"
              ></uplode-image>
              <!-- End:: Image -->
            </div>
            <!-- Start:: Image -->

            <!-- Start:: Name -->
            <div class="col-lg-6 py-0">
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
            <div class="col-lg-6 py-0">
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
            <!-- Start:: Country -->
            <div class="col-lg-6 py-0">
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
            <div class="col-lg-6 py-0">
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

            <!-- Start:: Gender -->
            <!-- <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.gender') }}
                </label>
                <multiselect
                  v-model="data.gender"
                  :options="genders"
                  label="name"
                  track-by="id"
                  placeholder=""
                  :searchable="false"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- End:: Gender -->

            <!-- Start:: Password -->
            <div class="col-lg-6 py-0">
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
            <div class="col-lg-6 py-0">
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

            <!-- Start:: Name -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.location_description"
                />
                <label for="name_input" class="form-label">
                  وصف الموقع
                </label>
              </div>
            </div>
            <!-- End:: Name -->
            <div class="col-lg-6 py-0"></div>

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
          text: this.$t('breadcrumb.users.title'),
          disabled: false,
          href: '/users/show-all',
        },
        {
          text: this.$t('breadcrumb.users.add'),
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

        location_description: null,
        is_active: true,
      },

      countries: [],
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

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.avatar = obj
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

      this.$axios({
        method: 'POST',
        url: 'client',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/users/show-all' })
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
    this.getLocation()
    // End:: Fire Methods
  },
}
</script>
