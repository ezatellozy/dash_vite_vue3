<template>
  <div class="login">
    <div class="login_box">
      <div class="inputs custom_card">
        <div class="card-header">
          <div class="log-img mb-5">
            <img src="@/assets/images/icons/logo.svg" width="250" height="80" />
          </div>
          <h4 class="mt-4">{{ $t('auth.title') }}</h4>
          <p>{{ $t('auth.desc') }}</p>
        </div>

        <form class="form form-horizontal" @submit.prevent="validateLoginForm">
          <div class="form-body">
            <div class="row">
              <div class="col-12">
                <!-- START:: EMAIL INPUT -->
                <div class="input_wrapper animated_placeholder">
                  <input
                    type="email"
                    class="form-control"
                    v-model.trim="data.email"
                    :placeholder="$t('forms.labels.email')"
                    @input="helper_checkIfInputIsEmpty"
                  />
                  <label for="login_email" class="form-label">
                    {{ $t('forms.labels.email') }}
                  </label>
                </div>
                <!-- END:: EMAIL INPUT -->

                <!-- START:: PASSWORD INPUT -->
                <div class="input_wrapper animated_placeholder">
                  <button
                    type="button"
                    class="toggle_pass_btn"
                    @click="helper_togglePasswordVisibility"
                  >
                    <i class="fal fa-eye open_eye"></i>
                    <i class="fal fa-eye-slash closed_eye"></i>
                  </button>
                  <input
                    type="password"
                    class="form-control"
                    :placeholder="$t('forms.labels.password')"
                    v-model.trim="data.password"
                    @input="helper_checkIfInputIsEmpty"
                  />
                  <label for="login_pass" class="form-label">
                    {{ $t('forms.labels.password') }}
                  </label>
                </div>
                <!-- END:: PASSWORD INPUT -->
              </div>
            </div>
          </div>

          <div class="buttons_wrapper">
            <button class="button_style_1">
              {{ $t('forms.login') }}
              <span class="btn_loader" v-if="btnIsLoading"></span>
            </button>
          </div>
        </form>
      </div>

      <!-- Image Side -->
      <div class="image">
        <img src="@/assets/images/pages/login/women.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Loading
      btnIsLoading: false,

      data: {
        email: null,
        password: null,
      },
    }
  },

  methods: {
    launch_resize_dispatch() {
      this.$store.dispatch('sideNav_module/onResize')
    },

    validateLoginForm() {
      this.btnIsLoading = true

      if (!this.data.email) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.email'),
          position: 'bottomCenter',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.password) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.password'),
          position: 'bottomCenter',
        })
        this.btnIsLoading = false
        return
      } else {
        this.submitLoginForm()
      }
    },

    submitLoginForm() {
      const submit_data = new FormData()
      submit_data.append('email', this.data.email)
      submit_data.append('password', this.data.password)

      this.$axios({
        method: 'post',
        url: 'login',
        data: submit_data,
      })
        .then((res) => {
          const data = {
            userId: res.data.data.id,
            token: res.data.data.token,
            userImage: res.data.data.avatar,
            userPhone: res.data.data.phone,
            // userType: res.data.data.user_type,
          }

          this.$store.dispatch('auth_module/logIn', data)

          this.$iziToast.success({
            timeout: 2000,
            message: res.response.data.message,
            position: 'bottomRight',
          })

          this.btnIsLoading = false
        })
        .catch((err) => {
          let message = ''
          err.response?.data.message
            ? (message = err.response.data.message)
            : (message = err.response.data.messages)

          this.$iziToast.error({
            timeout: 2000,
            message: message,
            position: 'bottomRight',
          })

          this.btnIsLoading = false
        })
    },
  },

  mounted() {
    if (this.$store.getters.resizeEventExisit == true) {
      window.removeEventListener('resize', this.launch_resize_dispatch, true)
      this.$store.commit('changeRessizeEvent')
    }

    document.querySelector('body').style.padding = '0 !important'
  },
}
</script>
