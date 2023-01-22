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
                  {{ $t('forms.labels.name_ar') }}
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
                  {{ $t('forms.labels.name_en') }}
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
              <div class="input_wrapper top_label">
                <label class="form-label">
                  {{ $t('forms.labels.category') }}
                </label>
                <treeselect
                  dir="rtl"
                  :multiple="true"
                  :disableBranchNodes="true"
                  ref="treeselect"
                  :options="categories"
                  @select="handleSelect"
                  :flat="true"
                  :default-expand-level="1"
                  :auto-deselect-descendants="true"
                  placeholder=""
                  v-model="data.categories"
                ></treeselect>
                <!-- <multiselect
                  multiple
                  v-model="data.categories"
                  :options="categories"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                >
                </multiselect> -->
              </div>
            </div>

            <!-- Features -->
            <div class="col-12">
              <div
                class="row productDetails mb-2"
                v-for="(item, index) in data.values"
                :key="item.id"
              >
                <div class="col-lg-5 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="item.ar.value"
                    />
                    <label for="name_input" class="form-label">
                      اسم قيمة الخاصية (عربي)
                    </label>
                  </div>
                </div>
                <div class="col-lg-5 py-0">
                  <div class="input_wrapper top_label">
                    <input
                      type="text"
                      class="form-control"
                      v-model.trim="item.en.value"
                    />
                    <label for="name_input" class="form-label">
                      اسم قيمة الخاصية (انجليزي)
                    </label>
                  </div>
                </div>
                <div
                  class="col-lg-1 py-0 d-flex justify-center align-center"
                  v-if="index == data.values.length - 1"
                >
                  <span class="append" @click="appendValues">
                    <i class="fas fa-plus-circle"></i>
                  </span>
                </div>
                <div
                  class="col-lg-1 py-0 d-flex justify-center align-center"
                  v-if="index != 0"
                >
                  <span class="append" @click="deleteValue(index)">
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- Start:: Is Active -->
            <div class="col-lg-12 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->

            <!-- <div class="col-lg-6 py-0" v-if="data.type == 'sub_sub'">
              <div
                class="input_wrapper top_label"
                :class="{ disabled: data.category == null }"
              >
                <label class="form-label">{{
                  $t("forms.labels.sub_category")
                }}</label>
                <multiselect
                  v-model="data.sub_category"
                  :options="sub_features"
                  label="name"
                  track-by="id"
                  placeholder=" "
                  :searchable="true"
                  :allow-empty="true"
                  :show-labels="false"
                >
                </multiselect>
              </div>
            </div> -->
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
          text: this.$t('breadcrumb.features.title'),
          disabled: false,
          href: '/features',
        },
        {
          text: this.$t('breadcrumb.features.add'),
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
        },
        en: {
          name: null,
        },
        ordering: null,
        categories: [],
        values: [
          {
            ar: {
              value: null,
            },
            en: {
              value: null,
            },
          },
        ],
        is_active: true,
      },

      // Fixed Data
      categories: [],
    }
  },

  methods: {
    appendValues() {
      this.data.values.push({
        ar: {
          value: null,
        },
        en: {
          value: null,
        },
      })
    },

    handleSelect({ id }) {
      const { treeselect } = this.$refs
      const node = treeselect.getNode(id)
      let newValue

      if (node.isLeaf) {
        const { parentNode } = node
        if (parentNode && !treeselect.isSelected(parentNode)) {
          newValue = [id]
        }
      } else {
        newValue = [id]
        treeselect.traverseDescendantsBFS(node, (descendant) => {
          newValue.push(descendant.id)
        })
      }

      if (newValue)
        setTimeout(() => {
          this.value = newValue
        })
    },

    deleteValue(index) {
      this.data.values.splice(index, 1)
    },

    // Validate Data
    validateCreateForm() {
      // this.btnIsLoading = true

      // for (let item of this.data.values) {
      //   if (!item.ar.value || !item.en.value) {
      //     this.$iziToast.error({
      //       timeout: 2000,
      //       message: 'اسم وقيمة الخاصية مطلوبين',
      //       position: 'bottomRight',
      //     })
      //     this.btnIsLoading = false
      //     return
      //   }
      // }

      // if (!this.data.ar.name) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t('forms.validation.title_ar'),
      //     position: 'bottomRight',
      //   })
      //   this.btnIsLoading = false
      //   return
      // } else if (!this.data.en.name) {
      //   this.$iziToast.error({
      //     timeout: 2000,
      //     message: this.$t('forms.validation.title_en'),
      //     position: 'bottomRight',
      //   })
      //   this.btnIsLoading = false
      //   return
      // } else {
      //   return
      // }
      this.submitData()
    },

    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('en[name]', this.data.en.name)

      submit_data.append('is_active', +this.data.is_active)
      submit_data.append('ordering', this.data.ordering)

      this.data.categories.map((el, index) =>
        submit_data.append(`category_ids[${index}]`, el),
      )

      this.data.values.forEach((item, index) => {
        submit_data.append(`values[${index}][ar][value]`, item.ar.value)
        submit_data.append(`values[${index}][en][value]`, item.en.value)
      })

      this.$axios({
        method: 'POST',
        url: 'feature',
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('addSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/features/show-all' })
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

    // ====== Main features
    getCategories() {
      this.$axios({
        method: 'GET',
        url: 'category_tree',
      }).then((res) => {
        this.categories = res.data.data
        // this.categories = res.data.data.map((item) => {
        //   return {
        //     id: item.id,
        //     name: item.name,
        //   };
        // });
      })
    },
  },

  created() {
    this.getCategories()
  },
}
</script>
