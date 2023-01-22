<template>
  <div class="wrraper">
    <!-- divider  -->
    <div class="divider_new">
      <span>{{ $t('hashtag') }}</span>
    </div>
    <!-- End:: Table Title -->

    <!-- Start Main Section -->
    <main>
      <v-data-table
        class="elevation-1 thumb diff_table"
        :headers="headers"
        :items="tableRows"
        :loading-text="$t('table.loadingData')"
        item-key="id"
        hide-default-footer
      >
        <!-- ================== You Can use any slots you want ================== -->
        <!-- Select no data State -->
        <template v-slot:no-data>
          {{ $t('table.noData') }}
        </template>

        <!-- Link -->
        <template v-slot:[`item.link`]="{ item }">
          <a :href="item.link" target="_blank">{{ item.link }}</a>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HashtagsStatisticsTable',

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
            text: 'الإسم',
            align: 'center',
            value: 'name',
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
            text: 'Name',
            align: 'center',
            value: 'name',
            sortable: false,
          },
          {
            text: 'Action',
            value: 'actions',
            sortable: false,
            align: 'center',
          },
        ]
      }
    },
  },

  methods: {
    // ==================== Start CRUD ====================
    addItem() {
      this.$router.push({ path: '/hashtags/add' })
    },
    showItem(item) {
      this.$router.push({ path: '/hashtags/show/' + item.id })
    },
    editItem(item) {
      this.$router.push({ path: '/hashtags/edit/' + item.id })
    },
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true
      this.itemtoDelete = item
    },
    deleteItemConfirm() {
      this.$axios({
        method: 'DELETE',
        url: `hashtags/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.$emit('getDataAgain')
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
  },
}
</script>

<style lang="scss" scoped>
.table_title {
  color: var(--mainColor-2);
  font-size: 25px;
  text-align: start;
  margin-block: 20px;
}
</style>
