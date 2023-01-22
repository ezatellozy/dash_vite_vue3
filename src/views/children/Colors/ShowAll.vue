<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/colors/add"
      search_title="اضافه لون جديد"
      icon="fa-plus"
    />
    <!-- End Breadcrumb -->
    <main-filter @getResult="setRows" />
    <!-- Start Main Loader -->
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

          <template v-slot:[`item.color`]="{ item }">
            <div class="image d-flex justify-content-center">
              <ul
                class="types d-flex align-items-center justify-content-center"
              >
                <li
                  :title="item.hex"
                  :style="`background-color:${item.hex}; width: 60px; height: 20px;`"
                >
                  <span></span>
                </li>
              </ul>
              <img
                :src="item.image"
                v-if="item.image"
                :alt="item.hex"
                :title="item.hex"
                @click="show_model_1"
              />
            </div>
          </template>

          <!-- Start:: Report Reason Modal Button -->
          <template v-slot:[`item.report_reason`]="{ item }">
            <v-icon class="show" small v-if="item.report_reason">
              fal fa-eye
            </v-icon>

            <span v-else>_</span>
          </template>
          <!-- End:: Report Reason Modal Button -->

          <!-- Select actions-->
          <template v-slot:[`item.actions`]="{ item }">
            <div class="_actions">
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
            <h3 class="table-title title">الألوان</h3>
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
    <!-- End Image_Model -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // ========== Main Loader
      loaderPage: false,
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.colors.title'),
          disabled: false,
          href: '/colors/show-all',
        },
        {
          text: this.$t('breadcrumb.colors.all'),
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

      // ========== Body Section
      calories: '',

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
            text: 'اللون',
            align: 'center',
            value: 'color',
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
            text: 'الاجراءات',
            align: 'center',
            value: 'actions',
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
    // img Model
    show_model_1(e) {
      this.model_1.model_img_src = e.target.src
      this.model_1.show_model = true
    },

    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: '/colors/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/colors/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/colors/edit/' + item.id })
    },

    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `color/${this.itemtoDelete.id}`,
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
        url: `color/deleteAll`,
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
      this.loaderPage = true
      this.loading = true

      this.$axios({
        method: 'GET',
        url: 'color',
        params: {
          page: this.paginations.current_page,
          keyword: e?.searchInput ? e.searchInput : '',
        },
      })
        .then((res) => {
          this.rows = res.data.data

          this.paginations.last_page = res.data.meta.last_page
          this.paginations.items_per_page = res.data.meta.per_page

          this.statisticsItem.number = res.data.meta.total

          this.loading = false
          this.loaderPage = false
        })
        .catch((err) => {
          this.loading = false
          this.loaderPage = false
        })
    },
    fetchData(e) {
      this.$router.replace({ query: { page: e } })
      this.setRows()
    },
  },
  created() {
    if (this.$route.query.page) {
      this.paginations.current_page = +this.$route.query.page
    }
    this.setRows()
  },
}
</script>

<style lang="scss" scoped>
.image {
  width: 80px;
  img {
    width: 100%;
  }
}
</style>
