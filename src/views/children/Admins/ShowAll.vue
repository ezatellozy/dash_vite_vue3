<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/admins/add"
      search_title="اضافه جديد"
      icon="fa-plus"
    />
    <!-- End Breadcrumb -->

    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loading">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->

    <template v-else>
      <!-- Start Statistics Card-->
      <!-- <div class="row mb-5">
        <div class="wrraper">
          <stats-card
            :title="$t('adminsNum')"
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
          <!-- ====== Select row field ====== -->
          <!-- Image -->
          <template v-slot:[`item.image`]="{ item }">
            <img @click="show_model_1" class="image" :src="item.image" />
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
            <h3 class="table-title title">
              المديرين
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

            <!-- Add & Delete -->
            <!-- <v-row>
              <v-col cols="12" sm="8">
              
                <v-text-field
                  v-model="search"
                  :label="$t('table.search')"
                  class="mx-4"
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <section class="table-buttons">
         
                  <button
                    @click="addItem"
                    to="/admins"
                    class="button_add_new ml-5"
                  >
                    <i class="fas fa-plus"></i>
                    &nbsp; {{ $t('table.addNew') }}
                  </button>
                </section>
              </v-col>
            </v-row> -->
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
          text: this.$t('breadcrumb.admins.title'),
          disabled: false,
          href: '/sliders',
        },
        {
          text: this.$t('breadcrumb.admins.all'),
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

      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },

      // ========== Body Section
      calories: '',

      // ========== Your Data
      rows: [], // injected in created

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
            value: 'id',
            sortable: true,
          },
          {
            text: 'الصورة',
            align: 'center',
            value: 'image',
            sortable: false,
          },
          {
            text: 'الاسم',
            value: 'fullname',
            align: 'center',
          },
          {
            text: 'الهاتف',
            value: 'phone',
            align: 'center',
          },
          {
            text: 'البريد الإلكتروني',
            value: 'email',
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
          {
            text: 'Email',
            value: 'email',
            align: 'center',
          },
          {
            text: 'Phone',
            value: 'phone',
            align: 'center',
          },
          {
            text: 'Active?',
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
      this.$router.push({ path: '/admins/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/admins/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/admins/edit/' + item.id })
    },

    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `admins/${this.itemtoDelete.id}`,
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
        url: 'manager',
        params: { page: this.paginations.current_page },
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
