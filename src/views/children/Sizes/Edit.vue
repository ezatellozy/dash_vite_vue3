<template>
  <div class="create_wrapper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>
    <div class="custom_card fadeIn" v-else>
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>

      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm" v-if="data">
        <div class="container">
          <div class="row justify-content-between">
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="data.ar.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title_ar') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="data.en.name"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.title_en') }}
                </label>
              </div>
            </div>
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="data.ar.tag"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.tag_ar') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="data.en.tag"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.tag_en') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  v-model.trim="data.ordering"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.ordering') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label" v-if="categories">
                <label class="form-label">الأقسام</label>

                <!-- :disable-branch-nodes="true" -->
                <multiselect
                  v-model="data.categories"
                  :options="categories"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :multiple="true"
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                ></multiselect>
                <!-- :name="name" -->
              </div>
            </div>
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.desc_ar') }}
                </label>

                <ckeditor v-model="data.ar.desc" />
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.desc_en') }}
                </label>
                <ckeditor v-model="data.en.desc" />
              </div>
            </div>
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
  name: 'Update',

  props: ['id'],

  data() {
    return {
      loading: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.sizes.title'),
          disabled: false,
          href: '/sizes/show-all',
        },
        {
          text: this.$t('breadcrumb.sizes.edit'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,
      sortValueBy: [],
      // ========== create_data
      data: {
        ar: {
          name: null,
          tag: null,
          desc: null,
        },
        en: {
          name: null,
          tag: null,
          desc: null,
        },
        ordering: null,
        categories: null,
      },
      categories: null,
    }
  },

  methods: {
    // Validate Data
    loadChildren(e) {
      console.log(e)
    },
    validateCreateForm() {
      this.btnIsLoading = true

      if (!this.data.ar.name || !this.data.en.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
      }
      if (!this.data.ar.tag || !this.data.en.tag) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.tag'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
      }
      if (this.data.categories.length < 1) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'قم باختيار قسم واحد علي الأقل',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
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
      submit_data.append('ar[tag]', this.data.ar.tag)
      submit_data.append('en[tag]', this.data.en.tag)
      submit_data.append('ar[desc]', this.data.ar.desc)
      submit_data.append('en[desc]', this.data.en.desc)
      this.data.categories.map((cat, index) => {
        submit_data.append(`category_ids[${index}]`, cat.id)
      })
      submit_data.append(
        'ordering',
        this.data.ordering ? this.data.ordering : '',
      )

      submit_data.append('_method', 'PUT')

      this.$axios({
        method: 'POST',
        url: `size/${this.id}`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/sizes/show-all' })
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
    getCategories() {
      this.$axios({
        method: 'GET',
        url: `get_all_category`,
      }).then((res) => {
        this.categories = res.data.data.map((el) => ({
          id: el.id,
          name: el.ar.name,
        }))
      })
    },

    getData() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `size/${this.id}`,
      }).then((res) => {
        this.data.ar = res.data.data.ar
        this.data.en = res.data.data.en

        this.data.ordering = res.data.data.ordering
        this.data.categories = res.data.data.categories.map((el) => ({
          id: el.id,
          name: el.name,
        }))
        this.getCategories()
        this.loading = false
      })
    },
  },

  mounted() {
    this.getData()
  },
}
</script>
