<template>
  <div class="wrraper home_tables">
    <!-- divider  -->
    <div class="table_tit">
      <span>طلبات السحب</span>
    </div>
    <!-- End:: Table Title -->

    <!-- Start Main Section -->
    <main>
      <v-data-table
        class="elevation-1 thumb diff_table fixed_height"
        :headers="headers"
        :items="tableRows"
        :loading-text="$t('table.loadingData')"
        item-key="id"
        hide-default-footer
      >
        <!-- ================== You Can use any slots you want ================== -->
        <!-- ====== Select row field ====== -->
        <!-- Image -->
        <template v-slot:no-data>
          {{ $t('table.noData') }}
        </template>

        <!-- Start:: Users Routes -->
        <template v-slot:[`item.bank_name`]="{ item }">
          <span>
            {{ item.bank_name + ' ' + item.branch + ' ' + item.city }}
          </span>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
          <span>{{ item.amount + ' ' + item.currency }}</span>
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
              <v-col cols="12" sm="8"> </v-col>
            </v-row> -->
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
  name: 'UsersStatisticsTable',

  emits: ['getDataAgain'],

  props: {
    tableRows: {
      required: true,
    },
  },

  data() {
    return {
      // ========== dialog Status
      dialogDelete: false,
      itemtoDelete: null,

      // ========== Model
      model_1: {
        show_model: false,
        model_img_src: '',
      },
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
            width: '70px',
          },
          {
            text: 'رقم الحساب',
            align: 'center',
            value: 'account_number',
            sortable: false,
          },
          {
            text: 'اسم البنك',
            align: 'center',
            value: 'bank_name',
            sortable: false,
            width: '200px',
          },
          {
            text: 'رقم الايبان',
            align: 'center',
            value: 'iban',
            sortable: false,
          },
          {
            text: 'المبلغ',
            align: 'center',
            value: 'amount',
            sortable: false,
            width: '120px',
          },
          {
            text: 'الحالة',
            align: 'center',
            value: 'status',
            sortable: false,
            width: '120px',
          },
          {
            text: 'التاريخ',
            align: 'center',
            value: 'created_at',
            sortable: false,
            width: '120px',
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
            text: 'image',
            align: 'center',
            value: 'image',
            sortable: false,
          },
          { text: 'Name', value: 'fullname', align: 'center' },
          { text: 'Videos', value: 'videos_count', align: 'center' },
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
  },

  methods: {
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
        url: `clients/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.dialogDelete = false
          this.$emit('getDataAgain')
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
  },
}
</script>

<style lang="scss" scoped>
.wrraper.home_tables {
  @include mainShadow();
}
.table_tit {
  color: var(--mainColor-2);
  font-size: 25px;
  text-align: start;
  padding-block: 20px;
}
.home_tables {
  .table_tit {
    background-color: var(--cardBgColor);
    color: var(--cardTitle);
    font-size: 17px;
    text-align: start;
    padding: 7px 10px;
    border-radius: 7px 7px 0 0;
  }
}
</style>
