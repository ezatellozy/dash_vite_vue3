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
            <!-- <div class="col-lg-6 py-0">
              <uplode-image
                @inputChanged="uplodeImg_1"
                placeHolder="صورة الغلاف"
              ></uplode-image>
          
            </div> -->
            <div class="col-lg-12 py-0">
              <uplode-image
                @inputChanged="uplodeImg_2"
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
                  v-model.trim="data.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.name') }}
                </label>
              </div>
            </div>
            <!-- End:: Name -->

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

            <!-- Start:: Phone Code -->
            <!-- <div class="col-lg-4 py-0" v-if="countries">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.phone_code') }}
                </label>
                <multiselect
                  v-model="data.phone_code"
                  :options="countries"
                  label="phoneCode"
                  track-by="phoneCode"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- Start:: Phone Code -->

            <!-- Start:: Country -->
            <!-- <div class="col-lg-6 py-0" v-if="countries">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.country') }}
                </label>
                <multiselect
                  v-model="data.country"
                  :options="countries"
                  @input="getCities()"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- Start:: Country -->

            <!-- Start:: City -->
            <!-- <div class="col-lg-6 py-0" v-if="cities">
              <div class="input_wrapper top_label">
                <label class="form-label">{{ $t('forms.labels.city') }}</label>
                <multiselect
                  v-model="data.city"
                  :options="cities"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- Start:: City -->

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

            <!-- Start:: Is Ban -->
            <!-- <div class="col-lg-4 py-0">
              <v-checkbox
                @change="!data.is_ban ? (data.ban_reason = '') : ''"
                :label="$t('forms.labels.is_ban')"
                v-model="data.is_ban"
                color="success"
              ></v-checkbox>
            </div> -->
            <!-- End:: Is Ban -->

            <!-- Start:: Is Active -->
            <!-- <div class="col-lg-4 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div> -->
            <!-- End:: Is Active -->

            <!-- Start:: Is Admin Active User -->
            <!-- <div class="col-lg-4 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_admin_active_user')"
                v-model="data.is_admin_active_user"
                color="success"
              ></v-checkbox>
            </div> -->
            <!-- Start:: Is Admin Active User -->

            <!-- Start:: Bio -->
            <!-- <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">{{
                  $t("forms.labels.bio")
                }}</label>
                <textarea
                  v-model="data.bio"
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>
            </div> -->
            <!-- End:: Bio -->

            <!-- Start:: Ban Reason -->
            <!-- <div class="col-lg-6 py-0">
              <div
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
              </div>
            </div> -->
            <!-- End:: Ban Reason -->
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
          text: this.$t('breadcrumb.users.title'),
          disabled: false,
          href: '/users',
        },
        {
          text: this.$t('breadcrumb.users.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        image: null,
        cover: null,
        name: null,
        phone: null,

        email: null,

        password: null,
        password_confirmation: null,
      },

      // ========== Select Lists Data
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
      countries: null,
      cities: null,
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
            phoneCode: item.phone_code,
          }
        })
      })
    },

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
      this.data.cover = obj
    },
    uplodeImg_2(obj) {
      this.data.image = obj
    },

    // Empty Form Data
    emptyFormData() {
      this.data.image = null
      this.data.cover = null
      this.name = null
      this.phone = null

      this.email = null

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
      } else {
        this.submitData()
        return
      }
    },

    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('image', this.data.image.img_file)
      if (this.data.cover) {
        submit_data.append('cover', this.data.cover.img_file)
      }
      submit_data.append('fullname', this.data.name)
      submit_data.append('phone', this.data.phone)
      // submit_data.append('phone_code', this.data.phone_code.phoneCode)
      // if (this.data.country) {
      //   // submit_data.append('country_id', this.data.country.id)
      // }
      // if (this.data.city) {
      //   submit_data.append('city_id', this.data.city.id)
      // }
      submit_data.append('email', this.data.email)
      // submit_data.append('gender', this.data.gender.id)
      submit_data.append('password', this.data.password)
      submit_data.append(
        'password_confirmation',
        this.data.password_confirmation,
      )
      // submit_data.append('is_ban', +this.data.is_ban)
      // submit_data.append('is_active', +this.data.is_active)
      // submit_data.append(
      //   'is_admin_active_user',
      //   +this.data.is_admin_active_user,
      // )
      // if (this.data.is_ban) {
      //   submit_data.append('ban_reason', this.data.ban_reason)
      // }
      // submit_data.append("bio", this.data.bio);

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
          this.$router.push({ path: '/users' })
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
    // End:: Fire Methods
  },
}
</script>
