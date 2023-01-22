<template>
  <div class="create_wrapper custom_card">
    <!-- START:: CARD TITLE -->
    <div class="card-header">
      <h4 class="card-title">{{ $t('CRUD.Update.main_title') }}</h4>
    </div>
    <!-- END:: CARD TITLE -->

    <!-- START:: UPDATE FORM WRAPPER -->
    <form @submit.prevent="validateCreateForm">
      <div class="container">
        <div class="row justify-content-between">
          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input"
                v-model.trim="updateData.app_link"
              />
              <label class="form-label">اسم المشروع</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="textarea"
                class="form-control"
                id="name_input"
                v-model.trim="updateData.app_link"
              />
              <label class="form-label">لينك الموقع</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="number"
                class="form-control"
                id="name_input"
                v-model.trim="updateData.phone"
              />
              <label class="form-label">
                {{ $t('settings.contactData.phone') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="email"
                class="form-control"
                id="name_input2"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.email"
              />
              <label class="form-label">
                {{ $t('settings.contactData.email') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input3"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.whatsapp"
              />
              <label class="form-label">
                {{ $t('settings.contactData.whatsapp') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="url"
                class="form-control"
                id="name_input4"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.facebook"
              />
              <label class="form-label">
                {{ $t('settings.contactData.facebook') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="url"
                class="form-control"
                id="name_input5"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.twitter"
              />
              <label class="form-label">
                {{ $t('settings.contactData.twitter') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="url"
                class="form-control"
                id="name_input6"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.youtube"
              />
              <label class="form-label">
                {{ $t('settings.contactData.youtube') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="url"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.instagram"
              />
              <label class="form-label">
                {{ $t('settings.contactData.instagram') }}
              </label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="url"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.app_store_app"
              />
              <label class="form-label">آب ستور</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="url"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.g_play_app"
              />
              <label class="form-label">جوجل بلاي</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.driver"
              />
              <label class="form-label">driver</label>
            </div>
          </div>

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.host"
              />
              <label class="form-label">الاستضافة</label>
            </div>
          </div>
          <!--END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="number"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.port"
              />
              <label class="form-label">البورت</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->
          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.username"
              />
              <label class="form-label">اسم المستخدم</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->
          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <multiselect
                v-model="updateData.encry"
                :options="encryValue"
                label="name"
                track-by="value"
                placeholder=" "
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
              ></multiselect>

              <label class="form-label">بروتوكول التشفير</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->
          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.from_name"
              />
              <label class="form-label">from_name</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.from_address"
              />
              <label class="form-label">from_address</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <multiselect
                v-model="updateData.use_sms_service"
                :options="smsStatus"
                label="name"
                track-by="value"
                placeholder=" "
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
              ></multiselect>

              <label class="form-label">use_sms_service</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <multiselect
                v-model="updateData.sms_provider"
                :options="smsProviders"
                label="name"
                track-by="value"
                placeholder=" "
                :searchable="true"
                :allow-empty="false"
                :show-labels="false"
              ></multiselect>

              <label class="form-label">sms_provider</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.sms_username"
              />
              <label class="form-label">sms_username</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.sms_password"
              />
              <label class="form-label">sms_password</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: INPUT WRAPPER -->
          <div class="col-lg-6 py-0">
            <div class="input_wrapper top_label">
              <input
                type="text"
                class="form-control"
                id="name_input8"
                @input="checkIfInputIsEmpty"
                v-model.trim="updateData.sms_sender_name"
              />
              <label class="form-label">sms_sender_name</label>
            </div>
          </div>
          <!-- END:: INPUT WRAPPER -->

          <!-- START:: MAP -->
          <!-- <div class="col-12 fadeIn">
            <div class="large-map">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  id="autocomplete_ar"
                  placeholder=""
                  @input="getAddressAr"
                  v-model="updateData.address"
                />
                <label class="form-label">العنوان</label>
              </div>

              <GmapMap
                :center="center"
                :zoom="12"
                map-type-id="terrain"
                style="width: 100%; height: 600px;"
              >
                <GmapMarker
                  v-for="(m, index) in markers"
                  :key="index"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @drag="updateCoordinates"
                  @click="clickMethod(m)"
                />
              </GmapMap>
            </div>
          </div> -->
          <!-- END:: MAP -->
        </div>
      </div>

      <div class="buttons_wrapper">
        <!-- START:: BUTTON -->
        <button class="button_style_1" :class="btnIsLoading ? 'disabled' : ''">
          {{ $t('forms.submit') }}
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
  name: 'Update',
  data() {
    return {
      // START:: BUTTON LOADER HANDLING DATA
      btnIsLoading: false,
      // END:: BUTTON LOADER HANDLING DATA

      // START:: CREATE DATA
      updateData: {
        app_name: null,
        app_link: null,
        phone: null,
        email: null,
        whatsapp: null,
        facebook: null,
        twitter: null,
        youtube: null,
        instagram: null,
        app_store_app: null,
        g_play_app: null,
        driver: null,
        host: null,
        port: null,
        username: null,
        encry: { name: null },
        from_name: null,
        from_address: null,
        use_sms_service: null,
        sms_provider: null,
        sms_username: null,
        sms_password: null,
        sms_sender_name: null,
      },
      // END:: CREATE DATA
      encryValue: [
        { name: 'ssl', value: 'ssl' },
        { name: 'tls', value: 'tls' },
      ],
      smsStatus: [
        { name: 'مفعل', value: 'enable' },
        { name: 'غير مفعل', value: 'disable' },
      ],
      smsProviders: [
        { name: 'HISMS', value: 'hisms' },
        { name: 'Net powers', value: 'net_powers' },
        { name: 'SMS Gateway', value: 'sms_gateway' },
      ],
      // START:: MAP
      center: {
        lat: null,
        lng: null,
      },

      markers: [],
      coordinates_to_edit: { lat: 0, lng: 0 },
      // END:: MAP
    }
  },
  methods: {
    // START:: UPDATE LOCATION
    updateCoordinates(location) {
      this.updateData = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      }
    },

    clickMethod(m) {
      this.center = m.position
    },
    // END:: UPDATE LOCATION

    // ============== Get User Location
    // getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.markers = [
    //         {
    //           position: {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           },
    //         },
    //       ]
    //       this.center = this.markers[0].position
    //       this.updateData.lat = this.center.lat
    //       this.updateData.lng = this.center.lng
    //     })
    //   }
    // },

    // START:: G-MAP GET ADDRESS
    // getAddressAr() {
    //   var self = this
    //   var input = document.getElementById('autocomplete_ar')
    //   var searchBox = new google.maps.places.SearchBox(input)
    //   searchBox.addListener('places_changed', function () {
    //     var places = searchBox.getPlaces()
    //     if (places.length == 0) {
    //       return
    //     }
    //     var bounds = new google.maps.LatLngBounds()
    //     places.forEach(function (place) {
    //       bounds.extend(place.geometry.location)
    //       place.geometry.location.lat()
    //       place.geometry.location.lng()
    //       place.formatted_address
    //       self.updateData.address = place.formatted_address
    //       self.center.lat = place.geometry.location.lat()
    //       self.center.lng = place.geometry.location.lng()
    //       self.updateData.lat = place.geometry.location.lat()
    //       self.updateData.lng = place.geometry.location.lng()
    //       self.markers[0].position.lat = place.geometry.location.lat()
    //       self.markers[0].position.lng = place.geometry.location.lat()
    //     })
    //   })
    // },

    // START:: G-MAP GET ADDRESS

    // START:: CHECK IF INPUT IS EMPTY (SPECIFIC TO ANIMATED PLACEHOLDER INPUTS)
    checkIfInputIsEmpty(e) {
      let inputElement = e.currentTarget
      if (inputElement.value.length > 0) {
        inputElement.classList.add('not_empty')
      } else {
        inputElement.classList.remove('not_empty')
      }
    },
    // END:: CHECK IF INPUT IS EMPTY (SPECIFIC TO ANIMATED PLACEHOLDER INPUTS)

    //START:: GET DATA
    getData() {
      this.$axios({
        method: 'GET',
        url: 'setting',
      }).then((res) => {
        const result = res.data.data
        result.map((el) => {
          if (el.key == 'encry') {
            this.updateData[el.key] = {
              name: el.value,
              value: el.value,
            }
          } else if (el.key == 'sms_provider') {
            this.updateData[el.key] = {
              name: el.value,
              value: el.value,
            }
          } else if (el.key == 'use_sms_service') {
            this.updateData[el.key] = {
              name: el.value,
              value: el.value,
            }
          } else {
            this.updateData[el.key] = el.value
          }
        })
      })
    },
    //END:: GET DATA

    // START:: VALIDATE CREATE FORM
    validateCreateForm() {
      this.btnIsLoading = true
      // if (!this.updateData.phone) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t('settings.contactData.validation.phone'),
      //     position: 'bottomRight',
      //   })
      //   this.btnIsLoading = false
      //   return
      // } else {
      const data = new FormData()
      for (const [key, value] of Object.entries(this.updateData)) {
        if (value) {
          if (typeof value == 'object') {
            data.append(key, value.value)
          } else {
            data.append(key, value)
          }
        }
      }
      this.$axios({
        method: 'post',
        url: 'setting',
        data: data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          this.btnIsLoading = false
          this.$router.push({ path: '/' })
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
    // END:: VALIDATE CREATE FORM
  },
  computed: {
    shipping_on() {
      return [
        {
          id: 'city',
          name: 'مدينة',
        },
        {
          id: 'distance',
          name: 'مسافة',
        },
      ]
    },
  },
  created() {
    // this.getLocation()
    this.getData()
  },
}
</script>
