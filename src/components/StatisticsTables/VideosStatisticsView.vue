<template>
  <div class="wrraper">
    <!-- divider  -->
    <div class="divider_new">
      <span>{{ $t("reelsHubVideos") }}</span>
    </div>
    <!-- End:: Table Title -->

    <!-- Start Main Section -->
    <main>
      <div class="media_cards_wrapper">
        <div class="row">
          <!-- Start:: Media Card -->
          <div 
            class="col-md-3  d-flex justify-content-center my-3"
            v-for="item in tableRows"
            :key="item.id"
          >
            <VideoMedaCard
              :item="item"
              @getVideosData="this.$emit('getDataAgain')"
            />
          </div>
          <!-- End:: Media Card -->
        </div>
      </div>
    </main>
    <!-- End Main Section -->
  </div>
</template>

<script>
import VideoMedaCard from "@/components/UI/VideoMediaCard.vue";

export default {
  components: {
    VideoMedaCard,
  },

  emits: ["getDataAgain"],

  props: {
    tableRows: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.table_title {
  color: var(--mainColor-2);
  font-size: 25px;
  text-align: start;
  margin-block: 20px 0;
}
</style>
