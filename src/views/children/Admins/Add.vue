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
            <!-- Start:: Image -->
            <uplode-image
              @inputChanged="uplodeImg_1"
              placeHolder="صورة المدير"
            ></uplode-image>
            <!-- End:: Image -->

            <!-- Start:: Name -->
            <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name') }}
                </label>
              </div>
            </div>
            <!-- End:: Name -->

            <!-- Start:: Phone -->
            <div class="col-lg-4 py-0">
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

            <!-- Start:: Email -->
            <div class="col-lg-4 py-0">
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
            <!-- <div class="col-lg-4 py-0">
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
                  :allow-empty="false"
                  :show-labels="false"
                  @input="getCities(data.country.id)"
                ></multiselect>
              </div>
            </div> -->
            <!-- End:: Country -->

            <!-- Start:: City -->
            <!-- <div class="col-lg-4 py-0">
              <div
                class="input_wrapper top_label"
                :class="{ disabled: data.country == null }"
              >
                <label class="form-label">{{ $t('forms.labels.city') }}</label>
                <multiselect
                  v-model="data.city"
                  :options="cities"
                  label="name"
                  track-by="id"
                  placeholder=""
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- End:: City -->

            <!-- Start:: Gender -->
            <!-- <div class="col-lg-4 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.gender') }}
                </label>
                <multiselect
                  v-model="data.gender"
                  :options="genders"
                  label="name"
                  track-by="name"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- End:: Gender -->

            <!-- Permission -->
            <!-- <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">{{
                  $t("forms.labels.permissions")
                }}</label>
                <multiselect
                  v-model="data.permission"
                  :options="permissions"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                >
                </multiselect>
              </div>
            </div> -->

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

            <!-- Start:: Is Ban -->
            <!-- <div class="col-lg-6 py-0">
              <v-checkbox
                @change="!data.is_ban ? (data.ban_reason = '') : ''"
                :label="$t('forms.labels.is_ban')"
                v-model="data.is_ban"
                color="success"
              ></v-checkbox>
            </div> -->
            <!-- End:: Is Ban -->

            <!-- Start:: Is Active -->
            <!-- <div class="col-lg-6 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div> -->
            <!-- End:: Is Active -->

            <!-- Start:: Ban Reason -->
            <!-- <div
              class="input_wrapper top_label"
              :class="{ disabled: !data.is_ban }"
            >
              <label for="textarea_1" class="form-label">
                {{ $t('forms.labels.ban_reason') }}
              </label>
              <textarea
                v-model="data.ban_reason"
                class="form-control"
                rows="5"
              ></textarea>
            </div> -->
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
          text: this.$t('breadcrumb.admins.title'),
          disabled: false,
          href: '/sliders',
        },
        {
          text: this.$t('breadcrumb.admins.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        image: null,
        name: null,
        phone: null,
        email: null,
        city: null,
        country: null,
        phone_code: null,
        gender: null,
        password: null,
        password_confirmation: null,
        is_ban: false,
        is_active: true,
        ban_reason: null,
      },

      // ========== Select Lists Data
      countries: [],
      cities: [],
      genders: [
        {
          id: 'male',
          name: this.$t('male'),
        },
        {
          id: 'female',
          name: this.$t('female'),
        },
      ],
    }
  },

  methods: {
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
            phone_code: item.phone_code,
          }
        })
        this.getCities()
      })
    },
    // ============ Get Select Lists Data
    getCities() {
      this.$axios({
        method: 'GET',
        url: `countries/${this.data.country.id}/cities`,
      }).then((res) => {
        this.cities = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.ar.name,
          }
        })
      })
    },

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.image = obj
    },

    // Empty Form Data
    emptyFormData() {
      this.data.image = null
      this.name = null
      this.phone = null
      this.email = null
      // this.country = null
      // this.data.phone_code = null
      // this.gender = null
      this.password = null
      this.password_confirmation = null
    },

    // Validate Data
    validateForm() {
      this.btnIsLoading = true

      if (!this.data.image?.img_file) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.image'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.name) {
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
        // } else if (!this.data.country) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: this.$t('forms.validation.country'),
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
        // } else if (!this.data.gender) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: this.$t('forms.validation.gender'),
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
      } else if (!this.data.password) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.password'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.confirmPassword'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
        // } else if (this.data.is_ban && !this.data.ban_reason) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: this.$t('forms.validation.ban_reason'),
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
      submit_data.append('image', this.data.image.img_file)
      submit_data.append('fullname', this.data.name)
      submit_data.append('phone', this.data.phone)
      submit_data.append('email', this.data.email)
      submit_data.append('role_id', 1)
      // submit_data.append('country_id', this.data.country.id)
      // submit_data.append('city_id', this.data.city.id)
      // submit_data.append('phone_code', this.data.country.phone_code)
      // submit_data.append('gender', this.data.gender.id)
      submit_data.append('password', this.data.password)
      submit_data.append(
        'password_confirmation',
        this.data.password_confirmation,
      )
      // submit_data.append('is_ban', +this.data.is_ban)
      // submit_data.append('is_active', +this.data.is_active)
      // if (this.data.is_ban) {
      //   submit_data.append('ban_reason', this.data.ban_reason)
      // }

      this.$axios({
        method: 'POST',
        url: 'manager',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/admins' })
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
    // this.getCountries()
    // End:: Fire Methods
  },
}
</script>
