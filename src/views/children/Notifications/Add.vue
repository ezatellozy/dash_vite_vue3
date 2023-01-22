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
          <div class="row justify-content-between">
            <!-- Start:: Is Active -->
            <div class="col-lg-12 py-0">
              <v-checkbox
                :label="$t('forms.labels.for_all')"
                v-model="data.all"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->

            <div class="col-lg-12 py-0" v-if="data.all">
              <div class="input_wrapper top_label">
                <label class="form-label">المستخدمين</label>
                <multiselect
                  v-model="data.user_list"
                  :options="clients"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                  multiple
                ></multiselect>
                <!-- multiple -->
              </div>
            </div>
            <div class="col-lg-12 py-0" v-else>
              <div class="input_wrapper top_label">
                <label class="form-label">مستخدم</label>
                <multiselect
                  v-model="data.clients"
                  :options="clients"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                ></multiselect>
                <!-- multiple -->
              </div>
            </div>

            <!-- Start:: Title -->
            <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.title"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title') }}
                </label>
              </div>
            </div>
            <!-- End:: Title -->

            <!-- Start:: Ar desc -->
            <div class="col-lg-12 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.desc') }}
                </label>
                <textarea
                  v-model="data.desc"
                  class="form-control"
                  rows="5"
                ></textarea>
              </div>
            </div>
            <!-- End:: Ar desc -->
          </div>
        </div>

        <div class="buttons_wrapper">
          <button
            class="button_style_1"
            :class="btnIsLoading ? 'disabled' : ''"
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
      dateMenu: false,
      dateMenu2: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.notifications.title'),
          disabled: false,
          href: '/notifications',
        },
        {
          text: this.$t('breadcrumb.notifications.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

      // ========== create_data
      data: {
        all: false,
        clients: [],
        user_list: [],
        title: null,
        desc: null,
      },
      clients: [],
    }
  },

  methods: {
    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true

      if (!this.data.all && this.data.clients.length == 0) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.clients'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.title) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.desc'),
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
      if (this.data.all) {
        submit_data.append('user_id', 'all')
        if (this.data.user_list.length) {
          this.data.user_list.forEach((item, index) => {
            submit_data.append(`user_list[${index}]`, item.id)
          })
        }
      } else {
        submit_data.append(`user_id`, this.data.clients.id)

        // submit_data.append('user_id', 'all')
      }
      submit_data.append('title', this.data.title)
      submit_data.append('body', this.data.desc)

      this.$axios({
        method: 'POST',
        url: 'notification',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/notifications/all-notifications' })
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
    // ====== Clients
    getClients() {
      this.$axios({
        method: 'GET',
        url: `client`,
      }).then((res) => {
        this.clients = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.fullname,
          }
        })
      })
    },
  },

  created() {
    this.getClients()
  },
}
</script>

<style lang="scss">
.productRow {
  border: 1px solid #339989;
  border-radius: 15px;
  padding: 10px 10px 20px 10px;
  margin-bottom: 20px;

  .detail {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
    .detail_show {
      border: 1px solid #339989;
      padding: 10px;
      flex-grow: 1;
      border-radius: 15px;
      position: relative;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .rate {
        color: gray;
        position: absolute;
        top: 5px;
        left: 5px;
        font-size: 13px;

        span {
          color: yellow;
        }
      }

      .image {
        img {
          max-height: 50px;
        }
      }

      .color,
      .size {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .key {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
