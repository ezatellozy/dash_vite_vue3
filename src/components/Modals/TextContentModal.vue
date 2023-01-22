<template>
  <div class="text_modal_content_wrapper" v-if="textContent">
    <!-- v-model="modalIsActive"  -->
    <v-dialog @click:outside="toggleModal" max-width="600px">
      <v-card>
        <!-- Start:: Title -->
        <v-card-title v-if="title">
          {{ title }}
        </v-card-title>
        <!-- End:: Title -->

        <!-- Start:: Text Content -->

        <div class="text_contet_wrapper">
          {{ textContent }}
        </div>
        <!-- End:: Text Content -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'TextContentModal',

  emits: ['toggleModal'],

  props: {
    modalIsActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: false,
    },
    textContent: {
      required: true,
    },
  },

  data() {
    return {}
  },

  methods: {
    toggleModal() {
      this.$emit('toggleModal')
    },
  },
}
</script>

<style lang="scss" scoped>
.v-dialog {
  .v-card {
    padding-block: 10px 20px;
    padding-inline: 20px;
    .v-card__title {
      padding-top: 0;
      margin-bottom: 8px;
      @include flexCenterAlignment;
      color: var(--danger);
    }

    .text_contet_wrapper {
      padding: 6px 10px;
      border: 1px solid var(--danger);
      border-radius: 8px !important;
    }
  }
}
</style>
