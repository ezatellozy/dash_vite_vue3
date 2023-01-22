<template>
  <v-dialog
    v-model="modalIsActive"
    @click:outside="toggleModal"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h5 justify-center">
        هل انت متأكد من رفض العملية ؟
      </v-card-title>
      <div class="my_input">
        <div class="input_wrapper top_label">
          <label for="textarea_1" class="form-label">
            {{ $t('forms.labels.reject_reason') }}
          </label>
          <textarea
            class="form-control"
            rows="5"
            v-model="data.reject_reason"
          ></textarea>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#1B5E20" @click="submitConfirmForm">
          {{ $t('table.deletedialog.ok') }}
          <span class="btn_loader_model" v-if="btnIsLoading"></span>
        </v-btn>
        <v-btn color="#F44336" @click="toggleModal">
          {{ $t('table.deletedialog.cancel') }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'TheDeleteModal',

  emits: ['toggleModal, getProjectInfo'],

  props: {
    modalIsActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    elementStatus: {
      required: true,
    },
    elementIdToGet: {
      required: true,
    },
    nameUrl: {
      required: true,
    },
    routeToDirect: {
      required: true,
    },
  },

  data() {
    return {
      btnIsLoading: false,
      data: {
        reject_reason: null,
      },
    }
  },

  methods: {
    toggleModal() {
      this.$emit('toggleModal')
    },
    submitConfirmForm() {
      let newStatus = this.elementStatus

      this.btnIsLoading = true

      let submit_data = new FormData()
      submit_data.append('_method', 'PUT')
      submit_data.append('status', newStatus)
      if (this.data.reject_reason) {
        submit_data.append('rejected_reason', this.data.reject_reason)
      }
      this.$axios({
        method: 'POST',
        url: `${this.nameUrl}/${this.elementIdToGet.id}`,
        data: submit_data,
      })
        .then(() => {
          this.btnIsLoading = false
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t('global.confirmSuccess'),
            position: 'topRight',
          })
          // this.modalIsActive = false;
          this.$emit('getProjectInfo')
          this.$emit('toggleModal')
          this.$router.push(`/${this.routeToDirect}`)
        })
        .catch((err) => {
          this.btnIsLoading = false
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: 'topRight',
          })
        })
    },
  },
  mounted() {},
}
</script>

<style scoped>
.my_input {
  padding: 10px 20px;
}
</style>
