<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/features/add"
      search_title="اضافه خصائص جديده"
      icon="fa-plus"
    />

    <!-- End Breadcrumb -->
    <main-filter @getResult="setRows" />
    <!-- End Breadcrumb -->
    <MainLoader v-if="loading"></MainLoader>

    <div class="fadeIn" v-else>
      <!-- Start Main Section -->
      <main>
        <v-data-table
          class="elevation-1 thumb diff_table"
          :headers="headers"
          :items="rows"
          :search="search"
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

          <template v-slot:[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>

          <!-- Start:: Users Routes -->

          <template v-slot:[`item.categories`]="{ item }">
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-header>الاقسام</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="has-badged">
                    <v-badge
                      v-for="sub in item.categories"
                      :key="sub.id"
                      color="#0e3958"
                      :content="sub.name"
                      inline
                    ></v-badge>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>

          <template v-slot:[`item.value_names`]="{ item }">
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  اسماء القيم
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="has-badged">
                    <v-badge
                      v-for="sub in item.values"
                      :key="sub.id"
                      color="#0e3958"
                      :content="sub.value"
                      inline
                    ></v-badge>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>

          <!-- Start:: Report Reason Modal Button -->
          <template v-slot:[`item.is_active`]="{ item }">
            <span
              class="status"
              :class="item.is_active ? 'success' : 'canceled'"
            >
              {{ item.is_active ? $t('active') : $t('inactive') }}
            </span>
          </template>
          <template v-slot:[`item.report_reason`]="{ item }">
            <v-icon class="show" small v-if="item.report_reason">
              fal fa-eye
            </v-icon>

            <span v-else>_</span>
          </template>
          <!-- End:: Report Reason Modal Button -->

          <!-- Select actions-->
          <template v-slot:[`item.actions`]="{ item }">
            <div class="_actions d-flex">
              <v-icon class="show" small @click="editItem(item)">
                fal fa-edit
              </v-icon>

              <v-icon class="delete" small @click="deleteItem(item)">
                fal fa-trash
              </v-icon>
            </div>
          </template>

          <!-- ======================== Start Top Section ======================== -->
          <template v-slot:top>
            <h3 class="table-title title">الخصائص</h3>
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
          </template>
          <!-- ======================== End Top Section ======================== -->
        </v-data-table>
      </main>

      <!-- End Statistics Card-->

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
            color="primary"
            v-model="paginations.current_page"
            :length="paginations.last_page"
            :total-visible="5"
            @input="fetchData($event)"
          ></v-pagination>
        </div>
      </template>
      <!-- End Pagination -->
    </div>
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
    <!-- End Image_Model -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
          text: this.$t('breadcrumb.features.all'),
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
      dialogDelete_selected: false,
      itemtoDelete: null,

      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },

      // ========== Your Data
      rows: [], // injected in created

      // ========== elected Data
      selected: [],
      singleSelect: false,

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 20,
      },

      // ========== Loding
      loading: false,
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
            text: '#',
            align: 'center',
            value: 'index',

            sortable: true,
          },
          {
            text: 'الاسم',
            align: 'center',
            value: 'name',
            sortable: true,
          },

          {
            text: 'ترتيب العرض',
            align: 'center',
            value: 'ordering',

            sortable: true,
          },

          {
            text: 'الاقسام',
            align: 'center',
            width: '250',
            value: 'categories',
            sortable: true,
          },
          {
            text: 'الحالة',
            align: 'center',

            value: 'is_active',
            sortable: true,
          },

          {
            text: 'الاجراءات',
            align: 'center',
            value: 'actions',
            width: '120',
            sortable: true,
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

    // img Model
    show_model_1(e) {
      this.model_1.model_img_src = e.target.src
      this.model_1.show_model = true
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: '/features/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/features/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/features/edit/' + item.id })
    },

    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `feature/${this.itemtoDelete.id}`,
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
    deleteSelected() {
      this.dialogDelete_selected = true
    },
    deleteSelectedConfirm() {
      this.$axios({
        method: 'POST',
        url: `feature/deleteAll`,
        data: { ids: this.selected.map((item) => item.id) },
      })
        .then(() => {
          this.rows = this.rows.filter((item) => {
            return !this.selected.filter((obj) => obj.id == item.id).length > 0
          })
          this.dialogDelete_selected = false
          this.$iziToast.error({
            timeout: 2000,
            message: this.$t('deleteSuccess'),
            position: 'bottomRight',
          })
        })
        .catch((err) => {
          this.dialogDelete_selected = false
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'bottomRight',
          })
        })
    },
    // ==================== End CRUD ====================

    // Set Rows
    setRows(e) {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: 'feature',
        params: {
          page: this.paginations.current_page,
          keyword: e?.searchInput ? e.searchInput : '',
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
    fetchData(e) {
      this.$router.replace({ query: { page: e } })
      this.setRows()
    },
  },

  // ======= hooks
  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page
    }
    this.setRows()
  },
}
</script>

<style lang="scss" scoped></style>
