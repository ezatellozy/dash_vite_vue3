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
        <!-- <main-filter payment="true" price="true" date="true" /> -->
        <!-- Start Statistics Card-->
        <!-- <div class="row mb-5">
          <div class="wrraper">
            <stats-card
              :title="$t('ordersNum')"
              :number="statisticsItem.number"
            ></stats-card>
          </div>
        </div> -->
        <!-- End Statistics Card-->

        <!-- Start Main Section -->
        <main>
          <v-data-table
            class="elevation-1 thumb diff_table"
            :headers="headers"
            :items="rows"
            :search="search"
            :custom-filter="helper_filterSearch"
            :loading="loading"
            :loading-text="$t('table.loadingData')"
            item-key="id"
            :items-per-page="paginations.items_per_page"
            hide-default-footer
          >
            <!-- ================== You Can use any slots you want ================== -->
            <!-- Select no data State -->
            <template v-slot:no-data>
              {{ $t("table.noData") }}
            </template>

            <template v-slot:[`item.index`]="{ index }">
              {{ index + 1 }}
            </template>
            <template v-slot:[`item.client`]="{ item }">
              <div class="d-flex flex-column">
                <img
                  :src="item.client.avatar"
                  :alt="item.client.fullname"
                  width="50"
                  height="50"
                  class="rounded-circle"
                  @click="show_model_1"
                />
                <span>{{ item.client.fullname }}</span>
              </div>
            </template>

            <template v-slot:[`item.is_payment`]="{ item }">
              <span class="status" :class="item.is_payment ? 'paid' : 'unpaid'">
                {{ item.is_payment ? "مدفوع" : "غير مدفوع" }}
              </span>
            </template>
            <template v-slot:[`item.order_details.status`]="{ item }">
              <!-- <span
                v-if="
                  item.status == 'admin_rejected' ||
                  item.status == 'admin_cancel' ||
                  item.status == 'client_cancel'
                "
                class="status canceled"
              >
                {{ item.status_trans }}
              </span>
              <span
                v-if="
                  item.status == 'admin_shipping' || item.status == 'pending'
                "
                class="status pending"
              >
                {{ item.status_trans }}
              </span>
              <span
                v-if="
                  item.status == 'admin_delivered' ||
                  item.status == 'admin_accept'
                "
                class="status success"
              >
                {{ item.status_trans }}
              </span> -->
              <div class="action">
                <div v-if="item.order_details.status == 'finished'">
                  <span class="status success">
                    {{ item.order_details.status_trans }}
                  </span>
                </div>
                <div v-else-if="item.order_details.status == 'store_reject'">
                  <span class="status canceled">
                    {{ item.order_details.status_trans }}
                  </span>
                </div>
                <div class="select-wrapper" v-else>
                  <div class="input_wrapper">
                    <v-select
                      :label="item.order_details.status_trans"
                      solo
                      :items="orderStatusList(item.order_details.status)"
                      @input="changeStatus($event, item.id)"
                    ></v-select>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:[`item.order_details.delivery_date`]="{ item }">
              <span>
                {{
                  item.order_details.delivery_date
                    ? item.order_details.delivery_date
                    : "لا يوجد"
                }}
              </span>
            </template>
            <template v-slot:[`item.order_details.delivery_timing`]="{ item }">
              <span>
                {{
                  item.order_details.delivery_date
                    ? item.order_details.delivery_date
                    : "لا يوجد"
                }}
              </span>
            </template>
            <template v-slot:[`item.to`]="{ item }">
              <router-link :to="`/users/show/${item.to.id}`">
                {{ item.to.fullname }}
              </router-link>
            </template>
            <!-- End:: Users Routes -->

            <!-- Start:: Report Reason Modal Button -->
            <template v-slot:[`item.report_reason`]="{ item }">
              <v-icon
                class="show"
                small
                @click="controlReportReasonModalModal(item.report_reason)"
                v-if="item.report_reason"
              >
                fal fa-eye
              </v-icon>

              <span v-else>_</span>
            </template>
            <!-- End:: Report Reason Modal Button -->

            <!-- Select actions-->
            <template v-slot:[`item.actions`]="{ item }">
              <div class="_actions">
                <v-icon class="show" small @click="showItem(item)">
                  fal fa-eye
                </v-icon>
                <!-- <v-icon class="edit" small @click="editItem(item)">
                  fal fa-edit
                </v-icon> -->
                <!-- <v-icon class="delete" small @click="deleteItem(item)">
                  fal fa-trash
                </v-icon> -->
              </div>
            </template>

            <!-- ======================== Start Top Section ======================== -->
            <template v-slot:top>
              <h3 class="title table-title">
                عدد الطلبات {{ statisticsItem.number }}
              </h3>
              <!-- Delete dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 justify-center">
                    {{ $t("table.deletedialog.areYouSure") }}
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1B5E20" @click="deleteItemConfirm">
                      {{ $t("table.deletedialog.ok") }}
                    </v-btn>
                    <v-btn color="#F44336" @click="dialogDelete = false">
                      {{ $t("table.deletedialog.cancel") }}
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Start:: Text Content Modal -->
              <TextContentModal
                @toggleModal="controlReportReasonModalModal"
                :modalIsActive="reportReasonModalIsOpen"
                :title="$t('reportReason')"
                :textContent="reportReasonToShow"
              />
              <!-- End:: Text Content Modal -->
            </template>
            <!-- ======================== End Top Section ======================== -->
          </v-data-table>
        </main>
        <!-- End Main Section -->

        <!-- Start Pagination -->
        <template>
          <div
            class="pagination_container text-center mb-5 d-flex justify-content-end"
          >
            <!-- <div class="select-pagination d-flex">
              <span class="first">{{ $t('show') }}</span>
              <v-select
                :items="[5, 20, 50, 100]"
                v-model="paginations.items_per_page"
              ></v-select>
              <span>{{ $t('entries') }}</span>
            </div> -->

            <v-pagination
              v-model.number="paginations.current_page"
              :length="paginations.last_page"
              :total-visible="5"
              @input="fetchData($event)"
            ></v-pagination>
          </div>
        </template>
        <!-- End Pagination -->
      </div>
    </transition-group>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// Start:: Importing Modals
import TextContentModal from "@/components/Modals/TextContentModal.vue";

// End:: Importing Modals

export default {
  name: "UsersReports",

  components: {
    TextContentModal,
  },

  data() {
    return {
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t("breadcrumb.mainPage"),
          disabled: false,
          href: "/",
        },
        {
          text: this.$t("breadcrumb.orders.title"),
          disabled: true,
          href: "",
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
      search: "",

      // ========== dialog Status
      dialogDelete: false,
      itemtoDelete: null,
      reportReasonModalIsOpen: false,
      reportReasonToShow: null,
      model_1: {
        show_model: false,
        model_img_src: "",
      },
      // ========== Your Data
      rows: [], // injected in created

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 2,
        items_per_page: 20,
      },

      // ========== Loading
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      lang: "lang_module/lang",
    }),

    headers() {
      if (this.lang == "ar") {
        return [
          {
            text: "#",
            align: "center",
            value: "index",
            sortable: true,
            width: "80",
          },
          {
            text: "العميل",
            align: "center",
            value: "client",
            sortable: false,
          },
          {
            text: "رقم الطلب",
            align: "center",
            value: "id",
            sortable: false,
          },
          {
            text: "اجمالي السعر",
            align: "center",
            value: "order_details.total_price",
            sortable: false,
          },

          {
            text: "نوع الطلب",
            align: "center",
            value: "order_details.order_type",
            sortable: false,
          },
          {
            text: "الحالة",
            align: "center",
            value: `order_details.status`,
            sortable: false,
            width: "200",
            padding: "2",
          },

          {
            text: "تاريخ التوصيل",
            align: "center",
            value: "order_details.delivery_date",
            sortable: false,
          },
          {
            text: "وقت التوصيل",
            align: "center",
            value: "order_details.delivery_timing",
            sortable: false,
          },
          {
            text: "التحكم",
            value: "actions",
            sortable: false,
            align: "center",
          },
        ];
      } else {
        return [
          {
            text: "#",
            align: "center",
            value: "id",
            sortable: true,
          },
          {
            text: "Reporter",
            align: "center",
            value: "from",
            sortable: false,
          },
          {
            text: "Reported",
            align: "center",
            value: "to",
            sortable: false,
          },
          {
            text: "Report Reason",
            align: "center",
            value: "report_reason",
            sortable: false,
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
            align: "center",
          },
        ];
      }
    },
    orderStatusItems() {
      return [
        {
          label: "انتظار قبول الادارة",
          name: "pending",
        },
        {
          label: "قبول من قبل الادارة",
          name: "store_accept",
        },
        {
          label: "الالغاء من قبل الادارة",
          name: "store_reject",
        },
        {
          label: "الغاء من قبل العميل",
          name: "client_cancel",
        },
        {
          label: "جاري الشحن",
          name: "admin_shipping",
        },
        {
          label: "تم التوصيل",
          name: "admin_delivered",
        },
        {
          label: "الانتهاء للعميل",
          name: "client_finished",
        },
      ];
    },
  },

  methods: {
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word;
        this.helper_filterSearch();
      }
    },
    changeStatus(currStatus, id) {
      this.btnIsLoading = true;
      let submit_data = new FormData();

      submit_data.append("status", currStatus);
      this.$axios({
        method: "POST",
        url: `orders/${id}/change_status`,
        data: submit_data,
      })
        .then((res) => {
          this.$iziToast.success({
            timeout: 2000,
            message: res.data.message,
            position: "bottomRight",
          });
          // this.$router.push({ path: "/transactions/all-transactions" });
          this.btnIsLoading = false;
          this.setRows();
        })
        .catch((err) => {
          if (err.response.data.status == "fail") {
            this.$iziToast.error({
              timeout: 2000,
              message: err.response.data.message,
              position: "bottomRight",
            });
          }

          this.setRows();
          this.btnIsLoading = false;
        });
    },
    show_model_1(e) {
      this.model_1.model_img_src = e;
      this.model_1.show_model = true;
    },
    orderStatusList(status) {
      if (status == "pending") {
        return [
          {
            text: "قبول",
            value: "store_accept",
          },
          { text: "رفض", value: "store_reject" },
        ];
      } else if (status == "store_accept") {
        return [
          { text: "تنفيذ الطلب", value: "in_progress" },
          { text: "الغاء", value: "store_cancel" },
        ];
      } else if (status == "in_progress") {
        return [
          { text: "انهاء الطلب", value: "finished" },
          { text: "الغاء", value: "store_cancel" },
        ];
      }
    },
    // ===== Toggle Report Reason Modal =====
    controlReportReasonModalModal(selectedReportReason) {
      this.reportReasonToShow = selectedReportReason;
      this.reportReasonModalIsOpen = !this.reportReasonModalIsOpen;
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: "/orders/add" });
    },
    showItem(item) {
      this.$router.push({ path: "/orders/show/" + item.id });
    },
    editItem(item) {
      this.$router.push({ path: "/orders/edit/" + item.id });
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true;
      this.itemtoDelete = item;
    },
    deleteItemConfirm() {
      this.$axios({
        method: "DELETE",
        url: `order/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.rows = this.rows.filter((item) => {
            return item.id != this.itemtoDelete.id;
          });
          this.dialogDelete = false;
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("deleteSuccess"),
            position: "bottomRight",
          });
        })
        .catch((err) => {
          this.dialogDelete = false;
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: "bottomRight",
          });
        });
    },
    // ==================== End CRUD ====================

    // Set Rows
    setRows(e) {
      this.loading = true;
      this.$axios({
        method: "GET",
        url: "orders",
        params: {
          page: this.paginations.current_page,
          from: e?.dateStart ? e.dateStart : "",
          to: e?.dateEnd ? e.dateEnd : "",
          status: e?.status ? e.status.name : "",
          is_payment: e?.paidStatus ? e.paidStatus.name : "",
          pay_type: e?.payment ? e.payment.name : "",
        },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta.last_page;
          this.paginations.items_per_page = res.data.meta.per_page;

          this.rows = res.data.data;

          this.statisticsItem.number = res.data.meta.total;

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    fetchData(e) {
      this.$router.replace({ query: { page: e } });
      this.setRows();
    },
  },
  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page;
    }
    this.setRows();
  },

  // ======= hooks
};
</script>

<style lang="scss">
.v-text-field__details {
  display: none !important;
}
.v-input__slot {
  margin-bottom: 0 !important;
}
</style>
