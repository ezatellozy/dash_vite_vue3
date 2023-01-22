<template>
  <div class="create_wrapper product">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <div class="custom_card">
      <div class="card-header">
        <h4 class="card-title">{{ $t('edit') }}</h4>
      </div>
      <main-loader v-if="btnIsLoading"></main-loader>
      <!-- ==== Start Form ==== -->
      <form @submit.prevent="validateCreateForm" v-else>
        <div class="container">
          <div class="row justify-content-between product">
            <div class="col-lg-6 py-0" v-if="false">
              <v-switch
                v-model="selectAddType"
                label="صور عامة للمنتج"
              ></v-switch>
            </div>
            <div class="col-12 py-0"></div>
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
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
                <label for="textarea_1" class="form-label">
                  {{ $t('forms.labels.desc_ar') }}
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
                  {{ $t('forms.labels.desc_en') }}
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
                <label class="form-label">
                  {{ $t('forms.labels.category') }}
                </label>
                <treeselect
                  dir="rtl"
                  :multiple="true"
                  placeholder=""
                  :options="categories"
                  :disable-branch-nodes="true"
                  :show-count="true"
                  :flat="true"
                  @input="get_sizes_colors_featuers"
                  v-model="data.selected_ids"
                />
              </div>
            </div>

            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="text"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.code"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.product_code') }}
                </label>
              </div>
            </div>
            <div class="col-lg-6 py-0">
              <div class="input_wrapper top_label">
                <input
                  type="number"
                  class="form-control"
                  @input="helper_checkIfInputIsEmpty"
                  v-model.trim="data.ordering"
                />
                <label for="name_input" class="form-label">
                  {{ $t('forms.labels.ordering') }}
                </label>
              </div>
            </div>

            <!--Size Guide -->
            <h4>Size Guide</h4>
            <div class="row p-0">
              <div class="col-lg-4">
                <div class="row">
                  <div class="col-9">
                    <uplode-image
                      :data_src="data.size_guide"
                      @inputChanged="uplodeSizeGuide($event)"
                      placeHolder="ارفاق صورة "
                    ></uplode-image>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product images -->
            <div class="col-12" v-if="selectAddType">
              <div class="row productDetails mb-2">
                <h4>صور المنتج</h4>
                <div
                  class="col-lg-6"
                  v-for="(image, index) in data.images"
                  :key="index"
                >
                  <div class="row">
                    <div class="col-11">
                      <uplode-image
                        @inputChanged="uplodeProductImage($event, index)"
                        :data_src="image.image"
                        placeHolder="صورة المنتج"
                      ></uplode-image>
                    </div>

                    <div
                      class="col-1 py-0 d-flex justify-center align-center flex-column"
                    >
                      <span
                        v-if="index == data.images.length - 1"
                        class="append mx-1"
                        @click="appendImageRow"
                      >
                        <i class="fas fa-plus-circle"></i>
                      </span>

                      <span
                        v-if="data.images.length > 1"
                        class="append mx-1"
                        @click="deleteImageRow(index)"
                      >
                        <i class="fas fa-minus-circle"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Product images -->

            <!-- Product Details -->

            <div v-if="false">
              <div
                class="row disabled"
                v-for="(row, index) in data.product_details"
                :key="index"
              >
                <div class="col-11">
                  <section
                    :class="{ disabled: !data.selected_ids.length }"
                    class="productDetails p-3"
                  >
                    <h3>التفاصيل - {{ index + 1 }}</h3>
                    <div class="row">
                      <!-- Color -->
                      <div class="col-lg-6 py-0">
                        <div class="input_wrapper top_label">
                          <label class="form-label">اللون</label>
                          <multiselect
                            v-model="row.color"
                            :options="colors"
                            label="name"
                            track-by="id"
                            placeholder=" "
                            :searchable="true"
                            :allow-empty="true"
                            :show-labels="false"
                          >
                            <template slot="option" slot-scope="props">
                              <img
                                class="option__image"
                                :src="props.option.image"
                                v-if="!props.option.hex"
                              />
                              <div
                                class="option__desc d-flex justify-between"
                                v-if="props.option.hex"
                              >
                                <span class="option__title">
                                  {{ props.option.name }}
                                </span>
                                <span
                                  class="option__small"
                                  :style="{
                                    backgroundColor: props.option.hex,
                                  }"
                                ></span>
                              </div>
                            </template>
                          </multiselect>
                        </div>
                      </div>

                      <!-- Size -->
                      <div class="col-lg-6 py-0">
                        <div class="input_wrapper top_label">
                          <label class="form-label">الحجم</label>
                          <multiselect
                            v-model="row.size"
                            :options="sizes"
                            label="name"
                            track-by="id"
                            placeholder=" "
                            :searchable="true"
                            :allow-empty="true"
                            :show-labels="false"
                          >
                            <template slot="option" slot-scope="{ option }">
                              <div class="option__desc">
                                <span class="option__title">
                                  <strong>{{ option.name }}&nbsp;</strong>
                                </span>

                                <span class="option__small">
                                  ({{ option.tag }})
                                </span>
                              </div>
                            </template>
                          </multiselect>
                        </div>
                      </div>

                      <!-- Quantity -->
                      <!-- <div class="col-lg-3 py-0">
                      <div class="input_wrapper top_label">
                        <input
                          type="number"
                          class="form-control"
                          v-model.trim="row.quantity"
                        />
                        <label for="name_input" class="form-label">
                          الكمية
                        </label>
                      </div>
                    </div> -->

                      <!-- Price -->
                      <!-- <div class="col-lg-3 py-0">
                      <div class="input_wrapper top_label">
                        <input
                          type="number"
                          class="form-control"
                          v-model.trim="row.price"
                        />
                        <label for="name_input" class="form-label">
                          السعر
                        </label>
                      </div>
                    </div> -->

                      <!-- Featuers -->
                      <div class="featuers">
                        <h4>الخصائص</h4>
                        <div
                          class="row"
                          v-for="(feature, feat_index) in row.features"
                          :key="feature.id"
                        >
                          <div class="col-lg-5 py-0">
                            <div class="input_wrapper top_label">
                              <label class="form-label">الخاصية</label>
                              <multiselect
                                v-model="feature.feature"
                                :options="features"
                                label="name"
                                track-by="id"
                                placeholder=" "
                                :searchable="true"
                                :allow-empty="true"
                                :show-labels="false"
                                @input="
                                  setFeatuerValues(
                                    index,
                                    feat_index,
                                    feature.feature.id,
                                  )
                                "
                              ></multiselect>
                            </div>
                          </div>
                          <div class="col-lg-5 py-0">
                            <div
                              class="input_wrapper top_label"
                              :class="{ disabled: feature.feature == null }"
                            >
                              <label class="form-label">القيمة</label>
                              <multiselect
                                v-model="feature.value"
                                :options="feature.values"
                                label="value"
                                track-by="id"
                                placeholder=" "
                                :searchable="true"
                                :allow-empty="true"
                                :show-labels="false"
                              ></multiselect>
                            </div>
                          </div>
                          <div
                            class="col-lg-1 py-0 d-flex justify-center align-center"
                            v-if="
                              feat_index == row.features.length - 1 &&
                              features.length > 0
                            "
                          >
                            <span class="append" @click="appendFeatuer(index)">
                              <i class="fas fa-plus-circle"></i>
                            </span>
                          </div>
                          <div
                            class="col-lg-1 py-0 d-flex justify-center align-center"
                            v-if="row.features.length > 1"
                          >
                            <span
                              class="append"
                              @click="deleteFeatuer(index, feat_index)"
                            >
                              <i class="fas fa-minus-circle"></i>
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Images -->
                      <div v-if="!selectAddType">
                        <h4>صور المنتج</h4>
                        <div class="row">
                          <div
                            class="col-lg-6"
                            v-for="(img, img_index) in row.media"
                            :key="img_index"
                          >
                            <div class="row">
                              <div class="col-9">
                                <uplode-image
                                  @inputChanged="
                                    uplodeImg($event, index, img_index)
                                  "
                                  :data_src="img.image"
                                  placeHolder="صورة المنتج"
                                ></uplode-image>
                              </div>

                              <div
                                class="col-1 py-0 d-flex justify-center align-center mx-1"
                                v-if="img_index == row.media.length - 1"
                              >
                                <span class="append" @click="appendImg(index)">
                                  <i class="fas fa-plus-circle"></i>
                                </span>
                              </div>
                              <div
                                class="col-1 py-0 d-flex justify-center align-center mx-1"
                                v-if="row.media.length > 1"
                              >
                                <span
                                  class="append"
                                  @click="deleteImg(index, img_index, img.id)"
                                >
                                  <i class="fas fa-minus-circle"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div
                  class="col-1 py-0 d-flex justify-center align-center flex-column"
                >
                  <!-- <span
                  class="append mx-1"
                  @click="appendCopyDetailRow(row, index)"
                >
                  <i class="fas fa-copy"></i>
                </span> -->
                  <span
                    v-if="index == data.product_details.length - 1"
                    class="append mx-1"
                    @click="appendDetailRow"
                  >
                    <i class="fas fa-plus-circle"></i>
                  </span>

                  <span
                    v-if="product_details.length > 1"
                    class="append mx-1"
                    @click="deleteDetailRow(index, row.id)"
                  >
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </div>
              </div>
            </div>

            <!-- Start:: Is Active -->
            <div class="col-lg-6 py-0">
              <v-checkbox
                :label="$t('forms.labels.is_active')"
                v-model="data.is_active"
                color="success"
              ></v-checkbox>
            </div>
            <!-- End:: Is Active -->
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
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.products.title'),
          disabled: false,
          href: '/products/show-all',
        },
        {
          text: this.$t('breadcrumb.products.edit'),
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
          desc: null,
        },
        en: {
          name: null,
          desc: null,
        },
        category: null,
        code: null,

        product_details: [
          {
            quantity: null,
            price: null,
            color: null,
            size: null,
            features: [
              {
                feature: null,
                value: null,
                values: [],
              },
            ],
            media: [
              {
                image: null,
              },
            ],
          },
        ],
        images: [
          {
            image: null,
          },
        ],

        selected_ids: [],
        size_guide: null,
        is_active: true,
        ordering: null,
      },
      selectAddType: true,
      rootCategory: null,
      categories: [],

      colors: [],
      sizes: [],
      features: [],
    }
  },

  computed: {
    product_details() {
      return this.data.product_details
    },
  },

  methods: {
    // Validate Data
    validateCreateForm() {
      this.btnIsLoading = true
      for (let row of this.data.product_details) {
        // if (!row.color) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: 'اللون مطلوب',
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
        // } else if (!row.size) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: 'الحجم مطلوبة',
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
        // }
        // else if (!row.quantity) {
        //   if (row.quantity !== 0) {
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: 'الكمية مطلوبة',
        //       position: 'bottomRight',
        //     })
        //     this.btnIsLoading = false
        //     return
        //   }
        // } else if (!row.price) {
        //   this.$iziToast.error({
        //     timeout: 2000,
        //     message: 'السعر مطلوب',
        //     position: 'bottomRight',
        //   })
        //   this.btnIsLoading = false
        //   return
        // }
        // for (let featuer of row.features) {
        //   if (!featuer.value) {
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: 'قيم الخاصية مطلوبة',
        //       position: 'bottomRight',
        //     })
        //     this.btnIsLoading = false
        //     return
        //   }
        // }
        if (!this.selectAddType) {
          for (let image of row.media) {
            if (!image.image) {
              this.$iziToast.error({
                timeout: 2000,
                message: 'صوره المنتج مطلوبه',
                position: 'bottomRight',
              })
              this.btnIsLoading = false
              return
            }
          }
        }
      }

      if (!this.data.ar.desc) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t('forms.validation.title_ar'),
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (!this.data.en.desc) {
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
      } else if (!this.data.code) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الكود مطلوب',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else if (this.data.code.length < 3) {
        this.$iziToast.error({
          timeout: 2000,
          message: 'حقل الكود يجب ان يكون علي الاقل 3 ارقام/حروف',
          position: 'bottomRight',
        })
        this.btnIsLoading = false
        return
      } else {
        this.submitData()

        return
      }
    },

    resetAll() {
      this.data.product_details.forEach((item) => {
        item.quantity = null
        item.price = null
        item.color = null
        item.size = null
        item.features = [
          {
            feature: null,
            value: null,
            values: [],
          },
        ]
      })
    },

    filterFeat(id) {
      this.features = this.features.filter((feat) => {
        return feat.id != id
      })
    },

    setFeatuerValues(detail_index, feat_index, feet_id) {
      // this.filterFeat(feet_id);

      let detailRow = this.data.product_details[detail_index]
      let featRow = detailRow.features[feat_index]

      let current_values = featRow.feature.values
      featRow.values = current_values.map((item) => {
        return {
          id: item.id,
          value: `${item.value}`,
        }
      })
    },

    appendDetailRow() {
      this.data.product_details.push({
        quantity: null,
        price: null,
        color: null,
        size: null,
        features: [
          {
            feature: null,
            value: null,
            values: [],
          },
        ],
        media: [
          {
            image: null,
          },
        ],
      })
    },
    deleteDetailRow(index, detail_id) {
      if (detail_id) {
        this.$axios({
          method: 'DELETE',
          url: `products/${this.id}/details/${detail_id}`,
        }).then(() => {
          this.data.product_details.splice(index, 1)
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('deleteSuccess'),
            position: 'bottomRight',
          })
        })
      } else {
        this.data.product_details.splice(index, 1)
      }
    },
    appendImageRow() {
      this.data.images.push({
        image: null,
      })
    },
    deleteImageRow(index) {
      this.data.images.splice(index, 1)
    },

    appendFeatuer(detail_index) {
      this.data.product_details[detail_index].features.push({
        feature: null,
        value: null,
        values: [],
      })
    },
    deleteFeatuer(detail_index, feat_index) {
      this.data.product_details[detail_index].features.splice(feat_index, 1)
    },

    appendImg(detail_index) {
      this.data.product_details[detail_index].media.push({
        image: null,
      })
    },
    deleteImg(detail_index, img_index, img_id) {
      if (img_id) {
        this.$axios({
          method: 'DELETE',
          // url: `products/${this.id}/details/images/${img_id}`,
          url: `products/images/${img_id}`,
        }).then(() => {
          this.data.product_details[detail_index].media.splice(img_index, 1)

          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('deleteSuccess'),
            position: 'bottomRight',
          })
        })
      } else {
        this.data.product_details[detail_index].media.splice(img_index, 1)
      }
    },

    // Uplode Image
    uplodeImg(obj, detail_index, imgIndex) {
      this.data.product_details[detail_index].media[imgIndex].image = obj
    },
    uplodeSizeGuide(obj) {
      this.data.size_guide = obj
    },

    // Submit Data
    submitData() {
      const submit_data = new FormData()
      submit_data.append('ar[name]', this.data.ar.name)
      submit_data.append('ar[desc]', this.data.ar.desc)

      submit_data.append('en[name]', this.data.en.name)
      submit_data.append('en[desc]', this.data.en.desc)
      submit_data.append('code', this.data.code)

      submit_data.append('is_active', +this.data.is_active)
      submit_data.append('ordering', this.data.ordering)
      if (this.data.size_guide?.img_file) {
        submit_data.append(`size_guide`, this.data.size_guide)
      }

      if (this.data.selected_ids.length) {
        this.data.selected_ids.map((el, index) => {
          submit_data.append(`category_ids[${index}]`, el)
        })
      }

      if (this.selectAddType) {
        this.data.images.map((image, index) => {
          if (image.image?.img_file) {
            submit_data.append(
              `products_image[${index}][image]`,
              image.image?.img_file,
            )
          }
        })
      }

      this.data.product_details.map((detail, index) => {
        submit_data.append(
          `product_details[${index}][color_id]`,
          detail.color?.id || '',
        )
        submit_data.append(
          `product_details[${index}][size_id]`,
          detail.size?.id || '',
        )

        if (detail.id) {
          submit_data.append(
            `product_details[${index}][product_detail_id]`,
            detail.id,
          )
        }
        // submit_data.append(
        //   `product_details[${index}][price]`,
        //   detail.price || '',
        // )

        detail.features.map((feature, feet_index) => {
          submit_data.append(
            `product_details[${index}][features][${feet_index}][feature_id]`,
            feature.feature?.id || '',
          )
          submit_data.append(
            `product_details[${index}][features][${feet_index}][value_id]`,
            feature.value?.id || '',
          )
        })
        if (!this.selectAddType) {
          detail.media.map((img, img_index) => {
            if (img.image.img_file) {
              submit_data.append(
                `product_details[${index}][media][${img_index}][image]`,
                img.image.img_file,
              )
            }
          })
        }
      })

      submit_data.append('_method', 'PUT')

      this.$axios({
        method: 'POST',
        url: `products/${this.id}`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('editSuccess'),
            position: 'bottomRight',
          })
          this.$router.push({ path: '/products/show-all' })
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

    // ====== Main Categories
    getCategories() {
      this.$axios({
        method: 'GET',
        url: `category_tree`,
      }).then((res) => {
        this.categories = res.data.data
      })
    },

    get_sizes_colors_featuers() {
      if (this.data.selected_ids.length) {
        this.getRootCategory(this.data.selected_ids[0])

        let params = new URLSearchParams()
        this.data.selected_ids.map((el, index) => {
          params.append(`category_ids[${index}]`, el)
        })

        this.$axios({
          method: 'GET',
          url: `get_categories_features`,
          params: params,
        }).then((res) => {
          this.sizes = res.data.data.sizes.map((item) => {
            return {
              id: item.id,
              name: item.name,
              tag: item.tag,
            }
          })
          this.colors = res.data.data.colors.map((item) => {
            return {
              id: item.id,
              name: item.name,
              image: item.image,
              hex: item.hex,
            }
          })
          this.features = res.data.data.features
        })
      } else {
        this.getCategories()
        this.sizes = []
        this.colors = []
        this.features = []
      }
    },
    getMainData() {
      this.btnIsLoading = true
      this.$axios({
        method: 'GET',
        url: `products/${this.id}`,
      }).then((res) => {
        this.data.ar = res.data.data.ar
        this.data.en = res.data.data.en

        res.data.data.categories.map((el) => {
          this.data.selected_ids.push(el.id)
        })
        this.data.size_guide = res.data.data.size_guide

        this.data.code = res.data.data.code
        this.data.ordering = res.data.data.ordering
        this.data.category = res.data.data.main_category
        this.data.is_active = res.data.data.is_active
        // this.data.size_guide = res.data.data.size_guide
        this.data.product_details = res.data.data.product_details
        if (res.data.data.media.length) {
          this.data.images = res.data.data.media
        } else {
          this.selectAddType = false
          if (!this.data.product_details[0].media.length) {
            this.data.product_details[0].media = [
              {
                image: null,
              },
            ]
          }
        }
        this.btnIsLoading = false
        this.get_sizes_colors_featuers(this.data.selected_ids)
      })
    },
    appendCopyDetailRow(row, index) {
      let deepCopy = _.cloneDeep(row)
      deepCopy.id = null
      deepCopy.media = []
      deepCopy.media = [
        {
          image: null,
        },
      ]

      this.data.product_details.splice(index + 1, 0, deepCopy)
    },
    uplodeProductImage(image, index) {
      this.data.images[index].image = image
    },
    getRootCategory(id) {
      this.$axios({
        method: 'GET',
        url: `category/${id}/get_root`,
      }).then((res) => {
        this.rootCategory = res.data.data
        this.categories = this.categories.filter(
          (el) => el.id == res.data.data.id,
        )
      })
    },
  },

  created() {
    this.getCategories()
    this.getMainData()
  },
}
</script>

<style lang="scss">
.product {
  .chooseImage {
    width: auto !important;
  }
}

.productDetails {
  border: 1px solid #339989;
  border-radius: 15px;
  padding-block: 20px;

  &.disabled {
    cursor: not-allowed;

    h3 {
      color: gray;
      font-size: 25px;
    }

    h4 {
      font-size: 21px;
      color: gray;
    }

    & > * {
      pointer-events: none;
    }
  }
}
</style>
