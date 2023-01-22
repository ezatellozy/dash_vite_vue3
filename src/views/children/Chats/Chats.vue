<template>
  <div class="wrraper">
    <!-- ============= Props In v-data-table -->
    <!--Start Statistics Card-->
    <div class="row mb-5">
      <div v-for="item in statisticsItems" class="col-md-4" :key="item.id">
        <button
          type="button"
          class="width-all text-right"
          @click="filterClick(item.title)"
        >
          <stats-card
            :icon="item.icon"
            :title="item.title"
            :number="item.number"
            :color="'rgb(11 36 21)'"
            :bgColor="'transparent'"
          ></stats-card>
        </button>
      </div>
    </div>

    <!--End Statistics Card-->
    <v-data-table
      class="elevation-1 thumb diff_table"
      :headers="headers"
      :items="rows"
      :search="search"
      :custom-filter="filterSearch"
      :loading="loading"
      :loading-text="$t('table.loadingData')"
      v-model="selected"
      show-select
      :single-select="singleSelect"
      item-key="id"
      hide-default-footer
    >
      <!-- ====== You Can use any slots you want ====== -->
      <!-- Select header field -->
      <template v-slot:[`header.name`]="{ header }">
        {{ header.text }}
      </template>

      <!-- Select row field -->
      <template v-slot:[`item.name`]="{ item }">
        <router-link to="/">{{ item.name }}</router-link>
      </template>

      <!-- Select no data State -->
      <template v-slot:no-data>
        {{ $t('table.noData') }}
      </template>

      <!-- Select actions-->
      <template v-slot:[`item.actions`]="{ item }">
        <div class="_actions">
          <v-icon class="show" small @click="showItem(item)">
            fas fa-eye
          </v-icon>
          <v-icon class="delete" small @click="deleteItem(item)">
            fal fa-trash
          </v-icon>
        </div>
      </template>

      <!-- Select Image-->
      <template v-slot:[`item.avatar`]="{ item }">
        <img @click="show_model_1" class="image" :src="item.avatar" />
      </template>
      <!-- ====== You Can use any slots you want ====== -->

      <!-- ======================== Start Top Section ======================== -->
      <template v-slot:top>
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

        <!-- Row -->
        <v-row>
          <v-col cols="12" sm="8">
            <!-- Search -->
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
                type="button"
                class="button_delete ml-5"
                v-if="selected.length != 0"
              >
                <i class="far fa-trash-alt"></i>
                &nbsp; حذف المحدد
              </button>
            </section>
          </v-col>
        </v-row>
      </template>
      <!-- ======================== End Top Section ======================== -->

      <!-- ======================== End Body Section ======================== -->
    </v-data-table>

    <!-- Pagination -->
    <template>
      <div class="pagination_container text-center mb-5">
        <v-pagination
          circle
          v-model="paginations.current_page"
          :length="paginations.last_page"
          :total-visible="8"
          @input="fetchData($event)"
        ></v-pagination>
      </div>
    </template>

    <!-- Model_1 -->
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
import { mapGetters } from 'vuex'
import StatsCard from './../../../components/Charts/ChartComponent.vue'
export default {
  data() {
    return {
      // ========== Breadcrumbs
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Main_Table',
          disabled: true,
          href: '',
        },
      ],
      statisticsItems: [
        {
          id: 1,
          icon: 'fal fa-chalkboard-teacher',
          title: 'كل المحادثات',
          number: '10',
        },
      ],
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

      // ========== elected Data
      selected: [],
      singleSelect: false,

      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 200,
      },

      // ========== Loding
      loading: false,
    }
  },
  components: {
    StatsCard,
  },
  computed: {
    ...mapGetters({
      lang: 'lang_module/lang',
    }),

    headers() {
      if (this.lang == 'ar') {
        return [
          {
            text: 'الصورة', // the name to display
            align: 'center', // [center, start]
            value: 'avatar', // must be equal to the name in rows object
          },
          { text: 'محادثة مع', value: 'name', align: 'center' },
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
            text: 'Avatar', // the name to display
            align: 'center', // [center, start]
            value: 'avatar', // must be equal to the name in rows object
          },
          { text: 'Chat With', value: 'name', align: 'center' },
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
    filterClick(word) {
      if (!this.loading) {
        if (word != 'كل المحادثات') {
          this.search = word
        } else {
          this.search = ''
        }
        this.filterSearch()
      }
    },
    // ===== Search Method =====
    // Here filter to only uppercase || it exist by default
    filterSearch(value, search, item) {
      console.log(`
        value: ${value},
        search: ${search},
        item: ${item}
      `)

      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      )
    },

    setRows() {
      this.loading = true

      // let pageIndex;
      // if (pageNumber) {
      //   pageIndex = pageNumber;
      // } else {
      //   pageIndex = 1;
      // }

      setTimeout(() => {
        this.rows = [
          {
            id: 1,
            avatar:
              'https://ui.alalmiyalhura.com/new_dashboard/img/joker.830f1452.jpg',
            name: 'Ahmed Ali',
          },
          {
            id: 2,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 3,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 4,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 5,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 6,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 7,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 8,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 9,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
          {
            id: 10,
            avatar:
              'https://inflco.o.aait-d.com/storage/images/user/D3lukOvbubcPoVvEoFKLuYTYMKkaE46kPEFSvdQH.png',
            name: 'Ahmed Ali',
          },
        ]

        // this.paginations.current_page = res.data.meta.current_page;
        // this.paginations.last_page = res.data.meta.last_page;

        this.loading = false
      }, 2000)
    },

    // img Model
    show_model_1(e) {
      this.model_1.model_img_src = e.target.src
      this.model_1.show_model = true
    },

    // ==================== CRUD ====================
    addItem() {
      console.log('Add Item')
    },
    showItem(item) {
      this.$router.push({ path: '/readOnly_chat/' + item.id })
      console.log(item)
    },
    editItem(item) {
      console.log('Edite Item')
      console.log(item)
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      console.log('delete Item')
      console.log(item)
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      console.log('delete Item confirm')
      console.log(this.itemtoDelete)
      this.dialogDelete = false
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

<style lang="scss" scoped></style>
