<template>
  <div class="wrraper">
    <!-- Start Breadcrumb -->
    <Breadcrumb
      :items="items"
      search_route="/about/add"
      :search_title="$t('table.addNew')"
      icon="fa-plus"
    />
    <!-- End Breadcrumb -->

    <!-- Start Statistics Card-->
    <!-- <div class="row mb-5">
      <div class="wrraper">
        <stats-card :number="rows.length"></stats-card>
      </div>
    </div> -->
    <!-- End Statistics Card-->

    <!-- Start Main Section -->
    <!-- show-select -->
    <main>
      <v-data-table
        class="elevation-1 thumb diff_table"
        :headers="headers"
        :items="rows"
        :search="search"
        :loading="lodaing"
        :loading-text="$t('table.loadingData')"
        v-model="selected"
        :single-select="singleSelect"
        item-key="id"
        :items-per-page="paginations.items_per_page"
        hide-default-footer
      >
        <!-- ================== You Can use any slots you want ================== -->
        <template v-slot:[`item.image`]="{ item }">
          <img @click="show_model_1" class="image" :src="item.image" />
        </template>

        <!-- ====== Select row field ====== -->

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
            من نحن
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
          text: this.$t('breadcrumb.about.title'),
          disabled: false,
          href: '/settings/about',
        },
        {
          text: this.$t('breadcrumb.about.all'),
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
      rows: [],

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
      lodaing: false,
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
            text: 'الصورة',
            align: 'center',
            value: 'image',
            sortable: false,
          },
          {
            text: 'العنوان',
            align: 'center',
            value: 'title',
            sortable: false,
          },

          {
            text: 'السلج',
            align: 'center',
            value: 'slug',
            sortable: false,
          },
          {
            text: 'ترتيب العرض',
            align: 'center',
            value: 'ordering',
            sortable: false,
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
            text: 'Image',
            align: 'center',
            value: 'images.en',
            sortable: false,
          },
          {
            text: 'Title',
            align: 'center',
            value: 'en[title]',
            sortable: false,
          },
          {
            text: 'Description',
            align: 'center',
            value: 'en[desc]',
            sortable: false,
          },
          {
            text: 'Slug',
            align: 'center',
            value: 'en[slug]',
            sortable: false,
          },
          {
            text: 'التحكم',
            value: 'actions',
            align: 'center',
            sortable: false,
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
      this.$router.push({ path: '/about/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/about/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/about/edit/' + item.id })
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `about/${this.itemtoDelete.id}`,
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
        url: `about/deleteAll`,
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
        url: 'about',
      })
        .then((res) => {
          this.rows = res.data.data
          this.lodaing = false
        })
        .catch((err) => {
          this.lodaing = false
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
