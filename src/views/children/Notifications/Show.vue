<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <transition-group name="fadeInUp" mode="in-out">
      <!-- Start Main Loader -->
      <MainLoader key="loader" v-if="loading" />
      <!-- End Main Loader -->

      <div key="main" v-else>
        <!-- Start Statistics Card-->
        <div class="row mb-8 justify-content-center">
          <div class="col-md-6 mx-auto">
            <div class="card-table">
              <div class="image">
                <img
                  class="img-fluid"
                  :src="allData.sender_data.avatar"
                  :alt="allData.sender_data.fullname"
                />
              </div>

              <div class="logo-hidden">
                <img src="@/assets/images/icons/logo.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="details pt-6">
            <h3>
              <span>بيانات الاشعار</span>
            </h3>
            <div class="row">
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    icon="fal fa-user"
                    title="اسم المرسل"
                    :number="allData.sender_data.fullname"
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    icon="fal fa-phone"
                    title="هاتف المرسل"
                    :number="
                      allData.sender_data.phone_code + allData.sender_data.phone
                    "
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    icon="fal fa-phone"
                    title="عنوان الاشعار"
                    :number="allData.title"
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    title="محتوى الاشعار"
                    :number="allData.body"
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    title="الحالة"
                    :number="(allData.is_readed ? 'مقروء': 'غير مقروء')"
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    icon="fas fa-calender-alt"
                    title="تاريخ الانشاء"
                    :number="allData.created_at"
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    icon="fal fa-phone"
                    title="وقت الانشاء"
                    :number="allData.created_time"
                  ></stats-card>
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xxl-3">
                <div class="wrraper">
                  <stats-card
                    icon="fal fa-clock"
                    title="هاتف "
                    :number="allData.is_readed ? 'مقروء' : 'غير مقروء'"
                  ></stats-card>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Statistics Card-->
        <!-- Start:: Text Content Modal -->
        <DeleteModel
          :id="allData.id"
          @toggleModal="toggleDeleteModal"
          :modalIsActive="deleteModalIsOpen"
          :elementIdToGet="deleteItemToShow"
        />
        <!-- End:: Text Content Modal -->
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// Start:: Importing Modals
import DeleteModel from '@/components/Modals/DeleteModel.vue'
import UserMessage from '@/components/Global/UserMessage.vue'
// End:: Importing Modals

export default {
  props: ['id'],
  name: 'Withdraw',

  components: {
    DeleteModel,
    UserMessage,
  },

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
          text: this.$t('breadcrumb.notifications.title'),
          disabled: true,
          href: '',
        },
        // {
        //   text: this.$t("breadcrumb.transaction.products"),
        //   disabled: true,
        //   href: "",
        // },
      ],

      // ========== Statistics
      statisticsItem: {},

      // ========== Top Section
      search: '',

      rejectedReason: '',

      deleteModalIsOpen: false,
      deleteItemToShow: null,

      // ========== Your Data
      allData: null, // injected in created

      // ========== Loading
      loading: false,
      reportReasonToShow: null,
      btnIsLoading: false,
      e1: 1,
    }
  },

  watch: {
    [`paginations.current_page`]() {
      this.setRows()
    },
    id(newVal) {
      if (newVal) this.setRows()
    },
  },

  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),
  },

  methods: {
    // ===== Toggle Delete Modal =====
    toggleDeleteModal(item) {
      this.deleteItemToShow = item

      this.deleteModalIsOpen = !this.deleteModalIsOpen
    },

    // Set Rows
    setRows() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: 'notifications/' + this.id,
      })
        .then((res) => {
          this.allData = res.data.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
        })
    },
  },

  // ======= hooks
  created() {
    // Set Rows
    this.setRows()
  },
}
</script>

<style lang="scss" scoped>
.card-table .image {
  text-align: center;
}
.card-table .image img {
  margin-top: 20px;
  width: unset;
}
.btns_actions {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 5px;
  }
}
</style>
