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
      <form @submit.prevent="validateCreateForm">
        <div class="container">
          <div class="row justify-content-between">
            <!-- Image -->
            <uplode-image
              @inputChanged="uplodeImg_1"
              placeHolder="صورة التصنيف"
              :data_src="data.image"
            ></uplode-image>
            <!-- Start:: Is Active -->
            <div class="col-lg-12 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.title"
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
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.title"
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
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ar.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_ar') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.en.slug"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.slug_en') }}
                </label>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.content_ar') }}
                </label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.ar.desc"
                ></textarea>
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.content_en') }}
                </label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.en.desc"
                ></textarea>
              </div>
            </div>
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.ordering') }}
                </label>
                <input
                  type="number"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model="data.ordering"
                />
              </div>
            </div>
            <div class="col-12 py-0 my-5" v-if="data.type == 'main'">
              <div class="row">
                <!-- Start:: Is provider_add_product -->
                <div class="col-lg-6 py-0">
                  <v-checkbox
                    :label="$t('forms.labels.provider_add_product')"
                    v-model="data.provider_add_product"
                    color="success"
                  ></v-checkbox>
                </div>
                <!-- End:: Is provider_add_product -->
                <!-- Start:: have_color -->
                <div class="col-lg-3 py-0">
                  <v-checkbox
                    :label="$t('forms.labels.have_color')"
                    v-model="data.have_color"
                    color="success"
                  ></v-checkbox>
                </div>
                <!-- End:: have_color -->
                <!-- Start:: have_size -->
                <div class="col-lg-3 py-0">
                  <v-checkbox
                    :label="$t('forms.labels.have_size')"
                    v-model="data.have_size"
                    color="success"
                  ></v-checkbox>
                </div>
                <!-- End:: have_size -->
              </div>
            </div>

            <v-radio-group v-model="data.type" row>
              <v-radio label="اضافة ك قسم رئيسي" value="main"></v-radio>
              <v-radio
                label="اضافة ك قسم فرعي"
                @click="getCategories"
                value="sub"
              ></v-radio>
            </v-radio-group>

            <div class="col-lg-6 py-0" v-if="data.type == 'sub'">
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.category') }}
                </label>
                <multiselect
                  v-model="data.category"
                  :options="categories"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                ></multiselect>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center fs-6" v-if="data.type == 'sub'">
          <span class="status canceled">
            في حالة نقل القسم الفرعي الي قسم اخر يرجي مراجعه المنتجات المتعلقة
            به
          </span>
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
          text: this.$t('breadcrumb.categories.title'),
          disabled: false,
          href: '/categories/show-all',
        },
        {
          text: this.$t('breadcrumb.categories.edit'),
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
          title: null,
          desc: null,
          slug: null,
        },
        en: {
          title: null,
          desc: null,
          slug: null,
        },
        have_size: false,
        have_color: false,
        provider_add_product: false,
        type: 'main',
        category: null,
        ordering: null,
        is_active: null,
        sub_category: null,
      },

      // Fixed Data
      categories: [],
      sub_categories: [],
    }
  },

  methods: {
    // Uplode Image
    uplodeImg_1(obj) {
      this.data.image = obj
    },

    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true

      if (!this.data.ar.title) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.title) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.content_en'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.ar.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.content_ar'),
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
      this.btnIsLoading = true
      if (this.data.type == 'sub' && !this.data.category) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'يجب اختيار قسم فرعي',
          position: 'bottomRight',
        })
        this.btnIsLoading = false

        return
      } else {
        const submit_data = new FormData()
        if (this.data.image?.img_file) {
          submit_data.append('image', this.data.image.img_file)
        }
        submit_data.append('ar[name]', this.data.ar.title)
        submit_data.append('ar[desc]', this.data.ar.desc)
        submit_data.append('en[name]', this.data.en.title)
        submit_data.append('en[desc]', this.data.en.desc)
        submit_data.append('ar[slug]', this.data.ar.slug)
        submit_data.append('en[slug]', this.data.en.slug)
        submit_data.append(
          'ordering',
          this.data.ordering ? this.data.ordering : '',
        )
        submit_data.append('is_active', +this.data.is_active)
        if (this.data.type == 'sub') {
          if (this.data.category) {
            submit_data.append('parent_id', this.data.category)
          }
        }
        if (this.data.type == 'main') {
          submit_data.append('parent_id', '')

          submit_data.append(
            'provider_add_product',
            +this.data.provider_add_product,
          )
          submit_data.append('have_size', +this.data.have_size)
          submit_data.append('have_color', +this.data.have_color)
        }

        submit_data.append('_method', 'PUT')

        this.$axios({
          method: 'POST',
          url: `category/${this.id}`,
          data: submit_data,
        })
          .then(() => {
            this.$iziToast.success({
              timeout: 2000,
              message: this.$t('editSuccess'),
              position: 'bottomRight',
            })

            this.$router.push({ path: '/categories/show-all' })

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
      }
    },

    recursion(items) {
      items.map((child, child_index) => {
        if (child.children) {
          if (child.children.length) {
            this.recursion(child.children)
          }
        }
        if (child.id == this.id) {
          items.splice(child_index, 1)
        }
      })
    },

    // ====== Main Categories
    getCategories() {
      this.$axios({
        method: 'GET',
        url: `get_all_category`,
      }).then((res) => {
        // this.categories = res.data.data

        res.data.data.map((el, index) => {
          if (el.id == this.id) {
            res.data.data.splice(index, 1)
            // el.id != this.id
          } else {
            if (el.children) {
              if (el.children) {
                this.recursion(el.children)
              }
            }
          }
        })
        this.categories = res.data.data.map((el) => ({
          id: el.id,
          name: el.ar.label,
        }))
        // this.categories = res.data.data
        // console.log(res.data.data)
      })
    },

    // ====== Sub Categories
    getSubCategories(id) {
      this.$axios({
        method: 'GET',
        url: `categories?category_id=${id}`,
      }).then((res) => {
        this.data.sub_category = ''
        this.sub_categories = res.data.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        })
      })
    },

    getData() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `category/${this.id}`,
      }).then((res) => {
        this.loading = false
        this.data.image = res.data.data.image

        this.data.ar.title = res.data.data.ar.label
        this.data.ar.desc = res.data.data.ar.desc

        this.data.en.title = res.data.data.en.label
        this.data.en.desc = res.data.data.en.desc
        this.data.ar.slug = res.data.data.ar.slug
        this.data.en.slug = res.data.data.en.slug
        this.data.ordering = res.data.data.ordering
        this.data.is_active = res.data.data.is_active
        this.data.provider_add_product = res.data.data.provider_add_product
        this.data.have_color = res.data.data.have_color
        this.data.have_size = res.data.data.have_size
        if (res.data.data.parent) {
          this.data.category = res.data.data.parent.id
          this.data.type = 'sub'
        } else {
          this.data.type = 'main'
        }
      })
    },
  },

  mounted() {
    this.getCategories()
    this.getData()
  },
}
</script>
