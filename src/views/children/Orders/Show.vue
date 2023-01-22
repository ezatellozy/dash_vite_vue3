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
        <div class="order-details-page mb-5">
          <div class="order-status">
            <h2 class="title">رقم الطلب: {{ `# ${allData.id}` }}</h2>
            <div class="status">
              <div class="date">
                <!-- <h5 v-if="allData.created_at">
                  <v-icon small>fa-solid fa-calendar-days</v-icon>
                  <span>{{ allData.created_at }}</span>
                </h5> -->
                <h5 v-if="allData.order_details.status_trans">
                  <span
                    v-if="allData.order_details.status == 'finished'"
                    class="status success bg-transparent"
                  >
                    {{ allData.order_details.status_trans }}
                  </span>
                  <span
                    v-else-if="allData.order_details.status == 'store_reject'"
                    class="status canceled bg-transparent"
                  >
                    {{ allData.order_details.status_trans }}
                  </span>
                  <span v-else class="status pending bg-transparent">
                    {{ allData.order_details.status_trans }}
                  </span>
                </h5>
              </div>
              <div class="action">
                <span
                  v-if="allData.order_details.status == 'finished'"
                  class="status success bg-transparent"
                >
                  {{ allData.order_details.status_trans }}
                </span>
                <span
                  v-else-if="allData.order_details.status == 'store_reject'"
                  class="status canceled bg-transparent"
                >
                  {{ allData.order_details.status_trans }}
                </span>

                <v-select
                  v-else
                  label="تغيير الحالة"
                  solo
                  :items="orderStatusList(allData.order_details.status)"
                  @input="changeStatus"
                ></v-select>
              </div>
            </div>
          </div>
          <hr class="line" />
          <div class="details border-right-0">
            <div class="row">
              <div class="col-sm-6 col-lg-4">
                <div class="customer">
                  <div class="item">
                    <div class="icon">
                      <v-icon>fa-regular fa-user</v-icon>
                    </div>
                    <div class="info">
                      <h5 class="title">بيانات العميل</h5>
                      <p>الاسم: {{ allData.client.fullname }}</p>

                      <p>
                        <span>رقم الموبايل:</span>
                        <span>
                          {{ allData.client.phone }}
                          {{ allData.client.phone_code }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-lg-4">
                <div class="order-info">
                  <div class="item">
                    <div class="icon">
                      <v-icon>fa-solid fa-cart-shopping</v-icon>
                    </div>
                    <div class="info">
                      <h5 class="title">تفاصيل الطلب</h5>
                      <p v-if="allData.order_details.distance">
                        <span>
                          المسافة:
                        </span>
                        <span>
                          {{ allData.order_details.distance }}
                        </span>
                      </p>
                      <p>
                        حالة الدفع:
                        {{ $t(allData.order_details.is_payment) }}
                      </p>
                      <p>
                        <span>
                          طريقة الدفع:
                        </span>
                        <span>
                          {{ allData.order_details.payment_type }}
                        </span>
                      </p>
                      <p v-if="allData.order_details.marchent_order_id">
                        <span>
                          رقم العملية
                        </span>
                        <span>
                          {{ allData.order_details.marchent_order_id }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-6 col-lg-4" v-if="allData.address">
                <div class="customer">
                  <div class="item">
                    <div class="icon">
                      <v-icon>fa-solid fa-truck-moving</v-icon>
                    </div>
                    <div class="info">
                      <h5 class="title">عنوان الشحن</h5>

                      <p v-if="allData.address.full_name != 'null'">
                        <span>الاسم:</span>
                        <span>{{ allData.address.full_name }}</span>
                      </p>
                      <p>
                        <span>وصف الموقع</span>
                        <span>
                          {{ allData.address.location_description }}
                        </span>
                      </p>
                      <p>
                        <span>رقم الموبايل:</span>
                        <span>{{ allData.address.phone }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr class="line" />
          <div class="product-details">
            <div class="row">
              <div class="col-lg-8">
                <h2 class="title">المنتجات</h2>
                <v-data-table
                  class="elevation-1 thumb diff_table"
                  :headers="headers"
                  :items="rows"
                  :search="search"
                  :loading="loading"
                  :loading-text="$t('table.loadingData')"
                  item-key="id"
                  hide-default-footer
                >
                  <template v-slot:[`item.product`]="{ item }">
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <img
                        :src="item.product.image"
                        :alt="item.product.title"
                        width="50"
                        height="50"
                        class="rounded-circle"
                      />
                      <span class="mx-2">{{ item.product.title }}</span>
                    </div>
                  </template>
                  <template v-slot:no-data>
                    {{ $t('table.noData') }}
                  </template>
                </v-data-table>
                <div v-if="allData.order_details.comment">
                  <h2 class="title mt-2">التعليق</h2>
                  <p class="fs-5 ps-5">"{{ allData.order_details.comment }}"</p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="order-summary">
                  <h2 class="title">ملخص الطلب</h2>
                  <hr class="line" />
                  <table>
                    <tbody>
                      <tr>
                        <td class="title">السلة</td>
                        <td class="value">{{ rows.length }}</td>
                      </tr>
                      <tr>
                        <td class="title">اجمالي السلة</td>
                        <td class="value">
                          {{ allData.order_details.total_product_price }}
                        </td>
                      </tr>
                      <tr>
                        <td class="title">الضريبة</td>
                        <td class="value">
                          {{ allData.order_details.vat_price }}
                        </td>
                      </tr>
                      <tr>
                        <td class="title">الخصم</td>
                        <td class="value">
                          {{ allData.order_details.discount }}
                        </td>
                      </tr>
                    </tbody>
                    <div class="line"></div>
                    <tfoot>
                      <tr>
                        <td class="title">الاجمالي</td>
                        <td class="value">
                          {{ allData.order_details.total_price }}
                        </td>
                      </tr>
                      <tr>
                        <td class="title status">الحالة</td>
                        <td class="value">
                          <span
                            v-if="allData.order_details.status == 'finished'"
                            class="status success bg-transparent"
                          >
                            {{ allData.order_details.status_trans }}
                          </span>
                          <span
                            v-else-if="
                              allData.order_details.status == 'store_reject'
                            "
                            class="status canceled bg-transparent"
                          >
                            {{ allData.order_details.status_trans }}
                          </span>
                          <span v-else class="status pending bg-transparent">
                            {{ allData.order_details.status_trans }}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
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
// End:: Importing Modals

export default {
  props: ['id'],
  name: 'Withdraw',

  components: {
    DeleteModel,
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
          text: this.$t('breadcrumb.orders.title'),
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
      rows: null,

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

  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),
    headers() {
      if (this.lang == 'ar') {
        return [
          {
            text: 'المنتج',
            align: 'center',
            value: 'product',
            sortable: false,
          },
          {
            text: 'الوصف',
            align: 'center',
            value: 'product.desc',
            sortable: false,
          },
          {
            text: 'السعر',
            align: 'center',
            value: 'price',
            sortable: false,
          },

          {
            text: 'الكمية',
            align: 'center',
            value: 'quantity',
            sortable: false,
          },
        ]
      } else {
        return [
          {
            text: '#',
            align: 'center',
            value: 'id',
            sortable: true,
          },
          {
            text: 'Reporter',
            align: 'center',
            value: 'from',
            sortable: false,
          },
          {
            text: 'Reported',
            align: 'center',
            value: 'to',
            sortable: false,
          },
          {
            text: 'Report Reason',
            align: 'center',
            value: 'report_reason',
            sortable: false,
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
            align: 'center',
          },
        ]
      }
    },

    orderStatusList(status) {
      if (status == 'pending') {
        return [
          {
            text: 'قبول',
            value: 'store_accept',
          },
          { text: 'رفض', value: 'store_reject' },
        ]
      } else if (status == 'store_accept') {
        return [
          { text: 'تنفيذ الطلب', value: 'in_progress' },
          { text: 'الغاء', value: 'store_cancel' },
        ]
      } else if (status == 'in_progress') {
        return [
          { text: 'انهاء الطلب', value: 'finished' },
          { text: 'الغاء', value: 'store_cancel' },
        ]
      }
    },
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
        url: 'orders/' + this.id,
      })
        .then((res) => {
          console.log(res.data.data)
          this.allData = res.data.data
          this.rows = res.data.data.order_details.items

          this.loading = false
        })
        .catch((err) => {
          this.loading = false
        })
    },
    //Change Status
    changeStatus(currStatus) {
      this.btnIsLoading = true
      let submit_data = new FormData()
      submit_data.append('_method', 'PUT')
      submit_data.append('status', currStatus)
      this.$axios({
        method: 'POST',
        url: `order/${this.allData.id}/change_status`,
        data: submit_data,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('sendSuccess'),
            position: 'bottomRight',
          })
          // this.$router.push({ path: "/transactions/all-transactions" });
          this.btnIsLoading = false
          this.setRows()
        })
        .catch((err) => {
          // console.log(err)
          if (err.response.data.status == 'fail') {
            this.$iziToast.error({
              timeout: 2000,
              message: err.response.data.message,
              position: 'bottomRight',
            })
          }

          this.setRows()
          this.btnIsLoading = false
        })
    },
    orderStatusList(status) {
      if (status == 'pending') {
        return [
          {
            text: 'قبول',
            value: 'store_accept',
          },
          { text: 'رفض', value: 'store_reject' },
        ]
      } else if (status == 'store_accept') {
        return [
          { text: 'تنفيذ الطلب', value: 'in_progress' },
          { text: 'الغاء', value: 'store_cancel' },
        ]
      } else if (status == 'in_progress') {
        return [
          { text: 'انهاء الطلب', value: 'finished' },
          { text: 'الغاء', value: 'store_cancel' },
        ]
      }
    },
    orderStatus(status) {
      let message = ''
      switch (status) {
        case 'pending':
          message = 'طلب جديد'
          break
        case 'store_accept ':
          message = 'تم القبول'

          break
        case 'in_progress':
          message = ''

          break
        case 'store_reject':
          message = 'تم الرفض '

          break
        case 'admin_cancel':
          message = 'تم الالغاء'

          break
        default:
      }
      return message
    },
  },
  created() {
    this.setRows()
  },

  // ======= hooks
}
</script>

<style lang="scss">
.order-details-page {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 11%);
  padding: 20px 0;
  h2.title {
    font-size: 14px !important;
    padding: 0 10px;
    font-weight: bold !important;
    text-align: start !important;
  }
  span.status {
    font-size: 14px;
    &.finished {
      color: #02bc77;
    }
    &.pendding {
      color: #ffc800;
    }
    &.shipping {
      color: #a900ff;
    }
  }
  .status {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 10px;
  }
  .action {
    .v-input {
      padding: 0;
      margin: 0;
    }
    .v-input__control {
      background: #e7e7e7;
      padding: 8px;
      max-width: 200px;
      border-radius: 5px;
    }
    .v-text-field__details {
      display: none !important;
    }
    .v-input__slot {
      margin: 0;
      &::before {
        content: unset !important;
      }
    }
    .v-select__slot {
      &::after {
        content: unset !important;
      }
    }
    input[role='readonly'] {
      display: none !important;
    }
  }
  .details {
    padding: 0 10px;
    h5.title {
      color: #000;
      font-size: 14px !important;
      font-weight: bold;
      margin-bottom: 0%;
    }
    .item {
      display: flex;
      align-items: flex-start;
      .icon {
        background: #f5f5fa;
        border-radius: 50%;
        width: 50px !important;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px !important;
        * {
          color: #000;
        }
      }
      .info {
        flex: 1;
        margin-inline-start: 8px;
        background: none !important;
        p {
          font-size: 14px;
          color: #8d8d8d;
          margin-bottom: 0;
          &:not(:last-child) {
            margin-bottom: 4px;
          }
        }
      }
    }
  }
  .product-details {
    padding: 0 10px;
    h2.title {
      font-size: 18px !important;
    }
  }
  table {
    width: 100%;
    td.title {
      font-size: 16px !important;
      line-height: 1.7;
      &.status {
        font-size: 14px !important;
        padding: 0;
      }
    }
    td.value {
      font-size: 14px !important;
      font-weight: bold;
      text-align: end;

      span.status {
        justify-content: flex-end;
        padding: 0;
      }
    }
  }

  div.line {
    padding: 10px 0;
  }
  tfoot {
    border-top-width: 1px;
    margin-top: 10px;
  }
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
