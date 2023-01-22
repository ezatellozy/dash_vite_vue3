<template>
  <div class="create_wrapper fadeIn">
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
                <!-- <textarea
                  class="form-control"
                  rows="5"
                  v-model="data.ar.desc"
                ></textarea> -->
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
          text: this.$t('breadcrumb.sizes.title'),
          disabled: false,
          href: '/sizes/show-all',
        },
        {
          text: this.$t('breadcrumb.sizes.add'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Loading
      btnIsLoading: false,

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

      sortValueBy: 'ORDER_SELECTED',

      categories: null,
    }
  },

  methods: {
    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true

      if (!this.data.ar.name || !this.data.en.name) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      }
      if (!this.data.ar.tag || !this.data.en.tag) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.tag'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
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
      submit_data.append(
        'ordering',
        this.data.ordering ? this.data.ordering : '',
      )

      this.data.categories.map((cat, index) => {
        submit_data.append(`category_ids[${index}]`, cat.id)
      })

      this.$axios({
        method: 'POST',
        url: 'size',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
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

    // selectUnique(ev) {
    //   if (!ev || ev.length < this.data.categories.length) {
    //     this.data.categories = ev;
    //     return;
    //   }

    //   let newValue = ev.filter(
    //     (x) => this.data.categories.indexOf(x) === -1
    //   )[0];
    //   let group = this.getGroupByLib(newValue);
    //   if (this.value.some((x) => this.getGroupByLib(x) === group)) {
    //     this.data.categories = this.data.categories.filter(
    //       (x) => this.getGroupByLib(x) !== group
    //     );
    //     this.data.categories.push(newValue);
    //   } else this.data.categories = ev;
    // },
    // getGroupByLib(lib) {
    //   return this.categories.filter((x) =>
    //     x.children.some((y) => y.name === lib.name)
    //   )[0].name;
    // },
  },

  mounted() {
    this.getCategories()
  },
}
</script>
