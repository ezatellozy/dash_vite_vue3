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
        <!-- <div class="row mb-5">
          <div class="wrraper">
            <stats-card
              :title="$t('productsReportsNum')"
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
              {{ $t('table.noData') }}
            </template>

            <!-- Start:: Users Routes -->
            <template v-slot:[`item.from`]="{ item }">
              <router-link :to="`/users/show/${item.from.id}`">
                {{ item.from.fullname }}
              </router-link>
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
                <!-- <v-icon class="show" small @click="showItem(item)">
                  fal fa-eye
                </v-icon> -->
                <!-- <v-icon class="edit" small @click="editItem(item)">
                  fal fa-edit
                </v-icon> -->
                <v-icon class="delete" small @click="deleteItem(item)">
                  fal fa-trash
                </v-icon>
              </div>
            </template>

            <!-- ======================== Start Top Section ======================== -->
            <template v-slot:top>
              <h3 class="title table-title">
                البلاغات علي المنتجات
              </h3>
              <!-- Delete dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5 justify-center">
                    {{ $t('table.deletedialog.areYouSure') }}
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="#1B5E20" @click="deleteItemConfirm">
                      {{ $t('table.deletedialog.ok') }}
                    </v-btn>
                    <v-btn color="#F44336" @click="dialogDelete = false">
                      {{ $t('table.deletedialog.cancel') }}
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
            class="pagination_container text-center mb-5 d-flex justify-content-between"
          >
            <div class="select-pagination d-flex">
              <span class="first">{{ $t('show') }}</span>
              <v-select
                :items="[5, 20, 50, 100]"
                v-model="paginations.items_per_page"
              ></v-select>
              <span>{{ $t('entries') }}</span>
            </div>

            <v-pagination
              v-model.number="paginations.current_page"
              :length="paginations.last_page"
              :total-visible="5"
            ></v-pagination>
          </div>
        </template>
        <!-- End Pagination -->
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// Start:: Importing Modals
import TextContentModal from '@/components/Modals/TextContentModal.vue'
// End:: Importing Modals

export default {
  name: 'UsersReports',

  components: {
    TextContentModal,
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
          text: this.$t('breadcrumb.app_reports.title'),
          disabled: true,
          href: '',
        },
        {
          text: this.$t('breadcrumb.app_reports.products'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Statistics
      statisticsItem: {},

      // ========== Top Section
      search: '',

      // ========== dialog Status
      dialogDelete: false,
      itemtoDelete: null,
      reportReasonModalIsOpen: false,
      reportReasonToShow: null,

      // ========== Your Data
      rows: [], // injected in created

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 20,
      },

      // ========== Loading
      loading: false,
    }
  },

  watch: {
    [`paginations.current_page`]() {
      this.setRows()
    },
  },

  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),

    headers() {
      if (this.lang == 'ar') {
        return [
          {
            text: '#',
            align: 'center',
            value: 'id',
            sortable: true,
          },
          {
            text: 'المبلغ',
            align: 'center',
            value: 'from',
            sortable: false,
          },
          {
            text: 'المبلغ عنه',
            align: 'center',
            value: 'to',
            sortable: false,
          },
          {
            text: 'سبب الإبلاغ',
            align: 'center',
            value: 'report_reason',
            sortable: false,
          },
          {
            text: 'التحكم',
            value: 'actions',
            sortable: false,
            align: 'center',
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
  },

  methods: {
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word
        this.helper_filterSearch()
      }
    },

    // ===== Toggle Report Reason Modal =====
    controlReportReasonModalModal(selectedReportReason) {
      this.reportReasonToShow = selectedReportReason
      this.reportReasonModalIsOpen = !this.reportReasonModalIsOpen
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: '/reports/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/reports/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/reports/edit/' + item.id })
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `user_reports/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.rows = this.rows.filter((item) => {
            return item.id != this.itemtoDelete.id
          })
          this.dialogDelete = false
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('deleteSuccess'),
            position: 'bottomRight',
          })
        })
        .catch((err) => {
          this.dialogDelete = false
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
        })
    },
    // ==================== End CRUD ====================

    // Set Rows
    setRows() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: 'user_reports',
        params: {
          page: this.paginations.current_page,
        },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta.last_page
          this.paginations.items_per_page = res.data.meta.per_page

          this.rows = res.data.data

          this.statisticsItem.number = res.data.meta.total

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

<style lang="scss" scoped></style>
