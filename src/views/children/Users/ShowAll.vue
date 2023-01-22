<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- <Breadcrumb
      :items="items"
      search_route="/users/add"
      search_title="إضافه مستخدم"
      icon="fa-plus"
    /> -->
    <!-- End Breadcrumb -->

    <!-- Start Statistics Card-->
    <!-- <div class="row mb-5">
      <div class="wrraper">
        <stats-card :number="statisticsItem.number"></stats-card>
      </div>
    </div> -->
    <!-- End Statistics Card-->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loaderPage">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->

    <template v-else>
      <MainFilter @getResult="setRows" />
      <!-- Start:: Filter -->
      <!-- <UsersFilter :title="$t('theUsers')" @filterData="filterTable" /> -->
      <!-- End:: Filter -->

      <!-- Start Statistics Card-->
      <!-- <div class="row mt-5 mb-5">
        <div class="wrraper">
          <stats-card
            :title="$t('userNum')"
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
          :loading="loading_table"
          :loading-text="$t('table.loadingData')"
          item-key="id"
          :items-per-page="paginations.items_per_page"
          hide-default-footer
        >
          <!-- ================== You Can use any slots you want ================== -->
          <!-- ====== Select row field ====== -->
          <!-- Image -->
          <template v-slot:[`item.avatar`]="{ item }">
            <img @click="show_model_1" class="image" :src="item.avatar" />
          </template>

          <template v-slot:[`item.index`]="{ index }">
            {{ index + 1 }}
          </template>

          <!-- Select no data State -->
          <template v-slot:no-data>
            {{ $t('table.noData') }}
          </template>

          <!-- IsActive -->
          <template v-slot:[`item.is_active`]="{ item }">
            <span class="status" :class="item.is_active ? 'paid' : 'unpaid'">
              {{ item.is_active ? 'نعم' : 'لا' }}
            </span>
          </template>
          <!-- <template v-slot:[`item.fullname`]="{ item }">
            <span v-if="!item.fullname || item.fullname == ''">لا يوجد</span>
            <span>{{ item.fullname }}</span>
          </template> -->
          <!-- <template v-slot:[`item.phone`]="{ item }">
            <span v-if="!item.phone || item.phone == ''">لا يوجد</span>
            <span>{{ item.phone_code + item.phone }}</span>
          </template> -->
          <!-- Select actions-->
          <template v-slot:[`item.actions`]="{ item }">
            <div class="_actions">
              <v-icon class="show" small @click="showItem(item)">
                fal fa-eye
              </v-icon>
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
            <h3 class="table-title title">المستخدمين</h3>
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

            <!-- Add & Delete -->
            <v-row>
              <v-col cols="12" sm="8"></v-col>
            </v-row>
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
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// START:: Main Loader

// END:: Main Loader
import MainFilter from '@/components/Filters/MainFilter.vue'

export default {
  components: {
    MainFilter,
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
          text: this.$t('breadcrumb.users.title'),
          disabled: false,
          href: '/users',
        },
        {
          text: this.$t('breadcrumb.users.all'),
          disabled: true,
          href: '',
        },
      ],

      // ========== Statistics
      statisticsItem: {},

      // ========== filterItems
      filterItems: null,

      // ========== Top Section
      search: '',

      // ========== dialog Status
      dialogDelete: false,
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

      // ========== Main Loader
      loaderPage: false,

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 20,
      },

      // ========== Loding
      loading: false,
      loading_table: false,
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
            text: 'الصورة',
            align: 'center',
            value: 'avatar',
            sortable: false,
          },
          {
            text: 'الاسم',
            value: 'full_name',
            align: 'center',
          },
          {
            text: 'رقم الهاتف',
            value: 'phone',
            align: 'center',
          },
          {
            text: 'البريد الالكتروني',
            value: 'email',
            align: 'center',
          },

          // {
          //   text: 'حالة التفعيل',
          //   value: 'is_active',
          //   align: 'center',
          // },
          {
            text: 'الدولة',
            value: 'country.name',
            align: 'center',
          },
          {
            text: 'التحكم',
            value: 'actions',
            align: 'center',
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
            text: 'image',
            align: 'center',
            value: 'image',
            sortable: false,
          },
          { text: 'Name', value: 'fullname', align: 'center' },
          { text: 'Followers', value: 'followers_count', align: 'center' },
          { text: 'Following', value: 'followings_count', align: 'center' },
          {
            text: 'Active',
            value: 'is_active',
            align: 'center',
          },
          {
            text: 'Permission',
            value: 'role',
            align: 'center',
          },
          {
            text: 'control',
            value: 'actions',
            align: 'center',
            sortable: false,
          },
        ]
      }
    },
    keyword() {
      if (this.$route.query.keyword) {
        return this.$route.query.keyword
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
      this.$router.push({ path: '/users/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/users/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/users/edit/' + item.id })
    },

    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `client/${this.itemtoDelete.id}`,
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

    // Filter Table
    filterTable(items) {
      this.rows = []
      this.filterItems = items
      this.setRows()
    },

    // Set Rows
    setRows() {
      this.loading_table = true
      this.$axios({
        method: 'GET',
        url: 'client',
        params: {
          page: this.paginations.current_page,
          fullname: this.keyword,
        },
      })
        .then((res) => {
          this.paginations.last_page = res.data.meta.last_page
          this.paginations.items_per_page = res.data.meta.per_page

          this.rows = res.data.data

          this.statisticsItem.number = res.data.meta.total

          this.loading_table = false
        })
        .catch((err) => {
          this.loading_table = false
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
