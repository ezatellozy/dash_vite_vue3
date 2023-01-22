<template>
  <div class="video_modal_content_wrapper" v-if="videoUrl">
    <v-dialog 
      v-model="modalIsActive" 
      @click:outside="toggleModal"
      max-width="800px"
    > 
      <v-card>
        <video controls>
          <source :src="videoUrl" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "VideoModal",

  emits: ["toggleModal"],

  props: {
    modalIsActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    videoUrl: {
      required: true,
    },
  },


  data() {
    return {
    }
  },

  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
  },
}
</script>

<style lang="scss" scoped>
  .v-dialog {
    .v-card {
      box-shadow: none;
      padding: 0;
      video {
        margin: 0;
        width: 100%;
        height: 600px;
      }
    }
  }
</style>