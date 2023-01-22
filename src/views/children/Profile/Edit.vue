<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loaderPage">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->

    <div class="custom_card" v-else>
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateFormUpdateProfile">
        <div class="container">
          <div class="row">
            <div class="col-12 py-0">
              <upload-image-direct
                @loading="btnIsLoading1 = $event"
                @inputChanged="uplodeImg_1"
                placeHolder="صورة المستخدم"
                :data_src="data.image.src"
                :model="model"
              ></upload-image-direct>
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

            <!-- Start:: gender -->
            <div class="py-0">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.gender') }}
                </label>
                <multiselect
                  v-model="data.gender"
                  :options="genders"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: gender -->

            <!-- Start:: Phone -->
            <!-- <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.phone"
                />
                <label for="name_input" class="form-label">
                  {{ $t("forms.labels.phone") }}
                </label>
              </div>
            </div> -->
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
                  placeholder=" "
                  :searchable="false"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div> -->
            <!-- End:: Gender -->

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
          <button class="button_style_1" :disabled="btnIsLoading1">
            {{ $t('forms.submit') }}
            <span class="btn_loader" v-if="btnIsLoading1"></span>
          </button>
        </div>
      </form>
      <!-- ==== End Form ==== -->
      <v-divider></v-divider>
      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateFormUpdatePhone">
        <div class="container">
          <h5>تغير الهاتف</h5>
          <div class="row">
            <!-- Start:: Phone Code -->
            <div class="col-lg-4 py-0" v-if="countries">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.phone_code') }}
                </label>
                <multiselect
                  v-model="data.phone_code"
                  :options="countries"
                  label="phone_code"
                  track-by="phone_code"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="false"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
            <!-- End:: Phone Code -->
            <!-- Start:: Phone -->
            <div class="col-lg-8 py-0">
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
            <template v-if="is_verifaction_send">
              <div class="col-lg-8 py-0">
                <div class="input_wrapper top_label">
                  <input
                    type="number"
                    class="form-control"
                    @input="helper_checkIfInputIsEmpty"
                    v-model.trim="data.verify_code"
                  />
                  <label for="name_input" class="form-label">
                    {{ $t('forms.labels.verfication_code') }}
                  </label>
                </div>
              </div>
              <div class="col-lg-4 py-0">
                <div class="input_wrapper top_label" style="border: none;">
                  <button
                    class="button_style_1"
                    @click="sendVerficationCode"
                    type="button"
                    :disabled="btnIsLoading4"
                  >
                    إرسال
                    <span class="btn_loader" v-if="btnIsLoading4"></span>
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1" :disabled="btnIsLoading2">
            {{ $t('forms.submit') }}
            <span class="btn_loader" v-if="btnIsLoading2"></span>
          </button>
        </div>
      </form>
      <!-- ==== End Form ==== -->
      <v-divider></v-divider>
      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateFormUpdatePassword">
        <div class="container">
          <h5>تغير كلمه المرور</h5>
          <div class="row">
            <!-- Start:: Password -->
            <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="password"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.currentPassword"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.currentPassword') }}
                </label>
              </div>
            </div>
            <!-- End:: Password -->
            <!-- Start:: Password -->
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="password"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.newPassword"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.newPassword') }}
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
          </div>
        </div>

        <div class="buttons_wrapper">
          <button class="button_style_1" :disabled="btnIsLoading3">
            {{ $t('forms.submit') }}
            <span class="btn_loader" v-if="btnIsLoading3"></span>
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

  // props: ['id'],

  data() {
    return {
      // ========== Main Loader
      loaderPage: false,
      model: 'users',
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.users.edit'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading1: false,
      btnIsLoading2: false,
      btnIsLoading3: false,
      btnIsLoading4: false,

      // ========== create_data
      data: {
        image: {
          title: '',
          src: '',
        },
        imagePreview: null,
        name: null,
        phone: null,
        phone_code: null,
        country: null,
        city: null,
        email: null,
        gender: null,
        currentPassword: null,
        newPassword: null,
        password_confirmation: null,
        is_ban: false,
        is_active: true,
        is_admin_active_user: false,
        ban_reason: null,
        bio: null,
        verify_code: null,
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
      is_verifaction_send: false,
    }
  },

  methods: {
    // ============ Get Main Data
    getData() {
      this.loaderPage = true
      this.$axios({
        method: 'GET',
        url: `profile`,
      }).then((res) => {
        this.loaderPage = false
        this.data.image.src = res.data.data.avatar

        this.data.name = res.data.data.fullname
        this.data.phone = res.data.data.phone
        this.data.email = res.data.data.email
        this.data.gender = this.genders.find(
          (gender) => gender.id == res.data.data.gender,
        )
        this.data.phone_code = this.countries.find(
          (country) => country.phone_code == res.data.data.phone_code,
        )

        // this.data.phone_code = res.data.data.phone_code
        // Start:: Set Phone Code
        // this.data.phone_code = this.countries.find(
        //   (item) => item.phoneCode == res.data.data.phone_code,
        // )
        // End:: Set Phone Code

        // Start:: Set Gender
        // if (res.data.data.gender == 'male') {
        //   this.data.gender = {
        //     id: 'male',
        //     name: this.$t('male'),
        //   }
        // } else if (res.data.data.gender == 'female') {
        //   this.data.gender = {
        //     id: 'female',
        //     name: this.$t('female'),
        //   }
        // }

        // End:: Set Gender
        // this.data.country = {
        //   id: res.data.data.country.id,
        //   name: res.data.data.country.ar.name,
        // }
        // this.data.city = {
        //   id: res.data.data.city.id,
        //   name: res.data.data.city.ar.name,
        // }
        // this.getCities()
        // this.data.is_ban = res.data.data.is_ban
        // this.data.is_active = res.data.data.is_active
        // this.data.is_admin_active_user = res.data.data.is_admin_active_user
        // this.data.ban_reason = res.data.data.ban_reason
        this.loaderPage = false
      })
    },

    // ============ Get Select Lists Data

    // Uplode Image
    uplodeImg_1(obj) {
      this.data.image.title = obj
    },
    uplodeImg_qr(obj) {
      this.data.qr_image = obj
    },

    // Validate update profile
    validateFormUpdateProfile() {
      this.btnIsLoading1 = true

      if (!this.data.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.name'),
          position: 'bottomRight',
        })
        this.btnIsLoading1 = false
        return
      }
      // else if (!this.data.phone) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t("forms.validation.phone"),
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (this.data.phone.length < 9) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: "رقم الهاتف يجب ان يكون اكبر من 9 ارقام",
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // } else if (this.data.phone.length > 11) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: "رقم الهاتف يجب ان يكون اقل من 11 رقم",
      //     position: "bottomRight",
      //   });
      //   this.btnIsLoading = false;
      //   return;
      // }
      else if (!this.data.email) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.email'),
          position: 'bottomRight',
        })
        this.btnIsLoading1 = false
        return
      } else {
        this.submitDataProfileUpdate()
        return
      }
    },

    // Submit update profile
    submitDataProfileUpdate() {
      const submit_data = new FormData()
      submit_data.append('_method', 'PATCH')
      if (this.data.image.title) {
        submit_data.append('avatar', this.data.image.title)
      }
      submit_data.append('fullname', this.data.name)
      submit_data.append('gender', this.data.gender.id)
      // submit_data.append('phone_code', this.data.phone_code.phoneCode)
      submit_data.append('email', this.data.email)
      // submit_data.append('gender', this.data.gender.id)
      // if (this.data.password && this.data.password_confirmation) {
      //   submit_data.append("password", this.data.password);
      //   submit_data.append(
      //     "password_confirmation",
      //     this.data.password_confirmation
      //   );
      // }
      // submit_data.append('is_ban', +this.data.is_ban)
      // submit_data.append('is_active', +this.data.is_active)
      // submit_data.append(
      //   'is_admin_active_user',
      //   +this.data.is_admin_active_user,
      // )
      // if (this.data.is_ban) {
      //   submit_data.append('ban_reason', this.data.ban_reason)
      // }

      this.$axios({
        method: 'POST',
        url: `update-profile`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/users" });
          this.btnIsLoading1 = false
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading1 = false
        })
    },
    // Validate update phone
    validateFormUpdatePhone() {
      this.btnIsLoading2 = true

      if (!this.data.phone) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.phone'),
          position: 'bottomRight',
        })
        this.btnIsLoading2 = false
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
      } else {
        this.submitDataPhoneUpdate()
        return
      }
    },
    //submitDataPhoneUpdate
    submitDataPhoneUpdate() {
      const submit_data = new FormData()
      submit_data.append('_method', 'PATCH')
      submit_data.append('phone', this.data.phone)
      submit_data.append('phone_code', this.data.phone_code.phone_code)
      this.$axios({
        method: 'POST',
        url: `edit-phone`,
        data: submit_data,
      })
        .then((res) => {
          this.$iziToast.success({
            timeout: 2000,
            message: res.data.message,
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/users" });
          this.btnIsLoading2 = false
          this.is_verifaction_send = true
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading3 = false
        })
    },
    sendVerficationCode() {
      if (!this.data.verify_code) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.verfication_code'),
          position: 'bottomRight',
        })
        return
      }
      this.btnIsLoading4 = true
      const submit_data = new FormData()
      submit_data.append('_method', 'PATCH')
      submit_data.append('phone', this.data.phone)
      submit_data.append('phone_code', this.data.phone_code.phone_code)
      submit_data.append('code', this.data.verify_code)
      this.$axios({
        method: 'POST',
        url: `update-phone`,
        data: submit_data,
      })
        .then((res) => {
          this.$iziToast.success({
            timeout: 2000,
            message: res.data.message,
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/users" });
          this.btnIsLoading4 = false
          this.is_verifaction_send = false
          this.getData()
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading4 = false
        })
    },
    // Validate update password
    validateFormUpdatePassword() {
      this.btnIsLoading3 = true

      if (!this.data.currentPassword) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.currentPassword'),
          position: 'bottomRight',
        })
        this.btnIsLoading3 = false
        return
      } else if (!this.data.newPassword) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'ادخل كلمه المرور الجديده',
          position: 'bottomRight',
        })
        this.btnIsLoading3 = false
        return
      } else if (this.data.newPassword != this.data.password_confirmation) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'كلمه المرور غير متوافقه',
          position: 'bottomRight',
        })
        this.btnIsLoading3 = false
        return
      } else {
        this.submitDataPasswordUpdate()
        return
      }
    },
    // submit profile update
    submitDataPasswordUpdate() {
      const submit_data = new FormData()
      submit_data.append('_method', 'PATCH')
      submit_data.append('current_password', this.data.currentPassword)
      submit_data.append('new_password', this.data.newPassword)
      // submit_data.append('phone_code', this.data.phone_code.phoneCode)
      submit_data.append(
        'new_password_confirmation',
        this.data.password_confirmation,
      )
      // submit_data.append('gender', this.data.gender.id)
      this.$axios({
        method: 'POST',
        url: `update-password`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/users" });
          this.btnIsLoading3 = false
          this.data.currentPassword = ''
          this.data.newPassword = ''
          this.data.password_confirmation = ''
        })
        .catch((err) => {
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
          this.btnIsLoading3 = false
        })
    },

    async getCountries() {
      const res = await this.$axios({
        method: 'GET',
        url: `https://wasselna.phpv8.aait-d.com/api/general/countries`,
      })

      this.countries = res.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          phone_code: item.phone_code,
        }
      })
    },
    // getData() {
    //   this.data.loading = true;
    //   this.$axios({
    //     method: "GET",
    //     url: `profile`,
    //   })
    //     .then((res) => {
    //       this.data.userInfo = res.data.data;
    //       this.data.userInfo.loading = false;
    //       console.log(this.data.userInfo);
    //       this.data.loading = false;
    //     })
    //     .catch((err) => {
    //       this.$iziToast.error({
    //         timeout: 2000,
    //         message: err.response.data.message,
    //         position: "bottomRight",
    //       });
    //       this.data.loading = false;
    //     });
    // },
  },

  async created() {
    // Start:: Fire Methods
    await this.getCountries()
    this.getData()
    // End:: Fire Methods
  },
}
</script>
