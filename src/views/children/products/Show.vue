<template>
  <div class="wrraper custom_card">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />

    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>
    <div class="row" v-else>
      <!--Product Slider-->
      <div class="col-md-6">
        <div
          class="single_slider"
          v-if="allData || products_details_media.length"
        >
          <div class="slider_for" v-if="!changeData">
            <vue-slick
              ref="c1"
              :asNavFor="c2"
              :focusOnSelect="true"
              :slidesToShow="1"
              :dots="false"
              :draggable="true"
              :arrows="false"
              @beforeChange="syncSliderBehavior"
            >
              <div
                v-for="media in allData.media.length
                  ? allData.media
                  : products_details_media"
                :key="media.id"
              >
                <img :src="media.image" v-if="media.image" />
              </div>
            </vue-slick>
          </div>
          <div v-if="changeData">
            <img class="img-fluid" src="@/assets/images/loader.gif" alt="" />
          </div>
          <div class="slider_nav" v-if="!changeData">
            <vue-slick
              ref="c2"
              :asNavFor="c1"
              :focusOnSelect="true"
              :slidesToShow="4"
              :dots="false"
              :arrows="false"
              :draggable="true"
              @beforeChange="syncSliderBehavior"
            >
              <div
                v-for="media in allData.media.length
                  ? allData.media
                  : products_details_media"
                :key="media.id"
              >
                <img :src="media.image" v-if="media.image" />
              </div>
            </vue-slick>
          </div>
        </div>
      </div>
      <!--Product details-->
      <div class="col-md-6">
        <div class="product_details" v-if="products_details">
          <!--Product Head-->
          <div class="product_head">
            <!--Title-->
            <div class="pro_det_tit">
              <h4>{{ allData.ar.name }}</h4>
            </div>
            <!--Reviews-->
            <div class="review">
              <!-- <RatingStars :rate="products_details.rate_avg"></RatingStars>
              <span>({{ products_details.rate_avg }}) المراجعات</span> -->
            </div>
          </div>
          <hr class="line" />
          <!--Description-->
          <div class="product_desc">
            <!--Title-->
            <div class="pro_det_tit">
              <h4>وصف المنتج</h4>
            </div>
            <div class="desc">
              <p>
                {{ allData.ar.desc }}
              </p>
            </div>
            <!-- <div class="price_qun">
              <div>
             
                <div class="pro_det_tit">
                  <h4>السعر</h4>
                </div>
                <div class="desc">
                  <v-chip color="#0e3958" text-color="#fff">
                    {{ products_details.price + ' ' + 'جنيه' }}
                  </v-chip>
                </div>
              </div>
              <div>
         
                <div class="pro_det_tit">
                  <h4>الكمية</h4>
                </div>
                <div class="desc">
                  <v-chip color="#0e3958" text-color="#fff">
                    {{ products_details.quantity }}
                  </v-chip>
                </div>
              </div>
            </div> -->
          </div>
          <hr class="line" />
          <!--Title-->

          <v-expansion-panels>
            <v-expansion-panel
              v-for="detail in products_details"
              :key="detail.id"
              class="product_features product_desc d-flex flex-wrap product_desc"
            >
              <v-expansion-panel-header>
                <div class="pro_det_tit">
                  <h4>تفاصيل المنتج</h4>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="w-100">
                <!-- ********** Start:: Product Colors ********** -->
                <div class="d-flex">
                  <div
                    class="product_colors_wrapper p-2 w-50"
                    v-if="detail.color"
                  >
                    <div class="d-flex flex-column">
                      <div class="pro_det_tit">
                        <h4>اللون</h4>
                      </div>

                      <div class="radio_input_wrapper">
                        <input
                          :id="'color' + detail.color.id"
                          class="radio_input"
                          type="radio"
                          name="product_colors"
                          :value="detail.color.id"
                        />
                        <!-- v-model="selectedColor" -->
                        <!-- @change="getProductDetailsColor(selectedColor)" -->
                        <label
                          v-if="detail.color.image"
                          class="radio_label"
                          :for="'color' + detail.id"
                        >
                          <img
                            :src="detail.color.image"
                            alt=""
                            width="25"
                            height="25"
                          />
                        </label>
                        <label
                          v-else
                          class="radio_label"
                          :for="'color' + detail.color.id"
                          :style="`background: ${detail.color.hex}`"
                        ></label>
                      </div>
                    </div>
                    <!-- ********** End:: Product Colors ********** -->
                  </div>
                  <hr class="line" />
                  <!-- ********** Start:: Product Sizes ********** -->
                  <div class="product_sizes_wrapper w-50" v-if="detail.size">
                    <div class="d-flex flex-column">
                      <div class="pro_det_tit">
                        <h4>الحجم</h4>
                      </div>

                      <div class="radio_input_wrapper">
                        <input
                          :id="`size_${detail.size.id}`"
                          class="radio_input"
                          type="radio"
                          name="product_sizes"
                        />
                        <label class="radio_label">
                          {{ detail.size.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                  <!-- ********** End:: Product Sizes ********** -->
                </div>
                <hr class="line" />
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      خصائص المنتج
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div
                        class="specfication_card"
                        v-for="item in detail.features"
                        :key="item.id"
                      >
                        <div class="key">
                          <span>{{ item.feature.name }}</span>
                        </div>
                        <div class="value">
                          <span>{{ item.value.value }}</span>
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <hr class="line" />
                <a
                  v-if="detail.media.length"
                  role="button"
                  @click="changeDetailsImage(detail.media)"
                >
                  <div class="pro_det_tit fs-6">
                    <h4>صور المنتج</h4>
                    <hr class="line" />
                  </div>
                </a>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <!--Title-->
          <div v-if="products_details.rates">
            <div class="pro_det_tit">
              <h4>تقيمات المنتج</h4>
            </div>
            <UserRate rateNum="5"></UserRate>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-md-6">
        <UserRate name="Diaa Mashaly" rateNum="5" desc="منتج ممتاز"></UserRate>
      </div>
      <div class="col-md-6">
        <UserRate name="Diaa Mashaly" rateNum="5" desc="منتج ممتاز"></UserRate>
      </div>
      <div class="col-md-6">
        <UserRate name="Diaa Mashaly" rateNum="5" desc="منتج ممتاز"></UserRate>
      </div>
      <div class="col-md-6">
        <UserRate name="Diaa Mashaly" rateNum="5" desc="منتج ممتاز"></UserRate>
      </div>
    </div> -->
    <!-- Start Image_Model -->
    <base-model
      @closeModel="model_1.show_model = false"
      :show="model_1.show_model"
    >
      <div class="image">
        <img
          v-if="model_1.model_img_src"
          :src="model_1.model_img_src"
          alt="..."
        />
      </div>
    </base-model>

    <!-- End Image_Model -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RatingStars from '@/components/UI/RatingStars.vue'
import UserRate from '@/components/Global/UserRate.vue'

export default {
  props: ['id'],
  components: {
    RatingStars,
    UserRate,
  },
  data() {
    return {
      selectedColor: null,
      selectedSize: null,
      products_details_media: [],
      changeData: false,

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
          href: '/products',
        },
        {
          text: this.$t('breadcrumb.products.all'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },

      //Data
      allData: null,
      products_details: null,

      c1: undefined,
      c2: undefined, // ========== Loding
      loading: false,

      // ========== Table
    }
  },

  watch: {
    [`paginations.current_page`]() {},
  },

  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),
  },

  methods: {
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word
        this.helper_filterSearch()
      }
    },

    // img Model
    show_model_1(e) {
      this.model_1.model_img_src = e.target.src
      this.model_1.show_model = true
    },
    //Get Prosuct
    getProduct() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `products/${this.id}`,
      }).then((res) => {
        this.allData = res.data.data
        this.products_details = res.data.data.product_details
        if (res.data.data.product_details[0].media.length) {
          this.products_details_media = res.data.data.product_details[0].media
        }

        this.loading = false
      })
    },

    getProductDetailsColor(id) {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: `products/${this.id}/show`,
        params: { color_id: id },
      }).then((res) => {
        this.loading = false
        this.products_details = res.data.data.product_details[0]
      })
    },
    changeDetailsImage(e) {
      this.changeData = true
      setTimeout(() => {
        this.products_details_media = e
        this.changeData = false
      }, 300)
    },
    // Start:: Sync Slider Behavior Method
    syncSliderBehavior(_, nextPosition) {
      this.$refs.c1.goTo(nextPosition)
      this.$refs.c2.goTo(nextPosition)
    },
    // End:: Sync Slider Behavior Method
  },

  // ======= hooks
  mounted() {
    this.c1 = this.$refs.c1
    this.c2 = this.$refs.c2
    this.getProduct()
  },
}
</script>

<style lang="scss" scoped>
span.color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
}
</style>
