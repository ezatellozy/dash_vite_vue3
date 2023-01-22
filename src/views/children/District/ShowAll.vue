<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/districts/add"
      search_title="اضافه حي جديد"
      icon="fa-plus"
    />
    <!-- End Breadcrumb -->

    <!-- Start Statistics Card-->
    <!-- <div class="row mb-5">
      <div class="wrraper">
        <stats-card :number="statisticsItem.number"></stats-card>
      </div>
    </div> -->
    <!-- End Statistics Card-->

    <!-- Start Main Section -->
    <main>
      <!-- show-select -->
      <v-data-table
        class="elevation-1 thumb diff_table"
        :headers="headers"
        :items="rows"
        :search="search"
        :loading="lodaing"
        :loading-text="$t('table.loadingData')"
        item-key="id"
        :items-per-page="paginations.items_per_page"
        hide-default-footer
      >
        <!-- ================== You Can use any slots you want ================== -->
        <!-- avatar -->
        <template v-slot:[`item.image`]="{ item }">
          <img @click="show_model_1" class="image" :src="item.image" />
        </template>
        <template v-slot:[`item.is_shapping`]="{ item }">
          <span
            class="status"
            :class="item.is_shapping ? 'success' : 'canceled'"
          >
            {{ item.is_shapping ? 'نعم' : 'لا' }}
          </span>
        </template>

        <!-- Select no data State -->
        <template v-slot:no-data>
          {{ $t('table.noData') }}
        </template>

        <!-- Select actions-->
        <template v-slot:[`item.actions`]="{ item }">
          <div class="_actions">
            <!-- <v-icon class="show" small @click="showItem(item)">
              fal fa-eye
            </v-icon> -->
            <v-icon class="edit" small @click="editItem(item)">
              fal fa-edit
            </v-icon>
            <v-icon class="delete" small @click="deleteItem(item)">
              fal fa-trash
            </v-icon>
          </div>
        </template>

        <!-- ======================== Start Top Section ======================== -->
        <template v-slot:top>
          <h3 class="title table-title d-inline-flex">
            الاحياء {{ statisticsItem }}
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

          <v-dialog v-model="dialogDelete_selected" max-width="500px">
            <v-card>
              <v-card-title class="text-h5 justify-center">
                {{ $t('table.deletedialog.areYouSure') }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#1B5E20" @click="deleteSelectedConfirm">
                  {{ $t('table.deletedialog.ok') }}
                </v-btn>
                <v-btn color="#F44336" @click="dialogDelete_selected = false">
                  {{ $t('table.deletedialog.cancel') }}
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Add & Delete -->

          <section
            class="table-buttons d-inline-flex p-0"
            style="width: fit-content;"
          >
            <!-- Add -->

            <!-- Delete -->
            <button
              type="button"
              class="button_delete ml-5"
              v-if="selected.length > 0"
              @click="deleteSelected"
            >
              <i class="far fa-trash-alt"></i>
              &nbsp;
              {{ $t('table.deleteSelected') }}
            </button>
          </section>
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
        <v-pagination
          v-model.number="paginations.current_page"
          :length="paginations.last_page"
          :total-visible="5"
          @input="fetchData($event)"
        ></v-pagination>
      </div>
    </template>
    <!-- End Pagination -->

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
      // ========== Breadcrumbs
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('breadcrumb.districts.title'),
          disabled: false,
          href: '/districts/show-all',
        },
        {
          text: this.$t('breadcrumb.districts.all'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Statistics
      statisticsItem: null,

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
        last_page: 2,
        items_per_page: 20,
      },

      // ========== Loding
      lodaing: false,
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
            text: 'المنطقة',
            align: 'center',
            value: 'name',
            sortable: false,
          },
          {
            text: 'المدينة',
            align: 'center',
            value: 'city.name',
            sortable: false,
          },

          {
            text: 'الرمز البريدي',
            align: 'center',
            value: 'postal_code',
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
            text: 'countryName',
            align: 'center',
            value: 'country.name',
            sortable: false,
          },
          {
            text: 'CityName (ar)',
            align: 'center',
            value: 'ar.name',
            sortable: false,
          },
          {
            text: 'CityName (en)',
            align: 'center',
            value: 'en.name',
            sortable: false,
          },

          {
            text: 'التحكم',
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
      if (!this.lodaing) {
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
      this.$router.push({ path: '/districts/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/districts/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/districts/edit/' + item.id })
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `district/${this.itemtoDelete.id}`,
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
        url: `district/deleteAll`,
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
    setRows() {
      this.lodaing = true
      this.$axios({
        method: 'GET',
        url: 'district',
        params: { page: this.paginations.current_page },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta.last_page
          this.paginations.items_per_page = res.data.meta.per_page

          this.rows = res.data.data

          this.statisticsItem = res.data.meta.total

          this.lodaing = false
        })
        .catch((err) => {
          this.lodaing = false
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

  // ======= hooks
}
</script>

<style lang="scss" scoped></style>
