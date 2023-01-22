<template>
  <div class="hashtag_slider_wrapper">
    <div class="card_title">

      <h3>
        <router-link :to="`/hashtags/show/${hashtagData.id}`">
          #{{ hashtagData.name }}
        </router-link>
      </h3>


      <div class="counts">

        <span>
          <i class="fal fa-video"></i>
          {{ (hashtagData.videos_count).toLocaleString() }}
        </span>
        
        <span>
          <i class="fal fa-eye"></i>
          {{ hashtagData.total_showing_video_count.toLocaleString() }}
        </span>

      </div>

    </div>
    <carousel v-bind="hashtagOptions" dir="ltr">
      <slide v-for="video in hashtagData.videos" :key="video.id" :class="col">
        <VideoMedaCard :item="video" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import VideoMedaCard from "@/components/UI/VideoMediaCard.vue";
export default {
  props: {
    hashtagData: {
      type: Object,
      required: true,
    },
  },

  components: {
    VideoMedaCard,
  },
  data() {
    return {
      hashtagOptions: {
        autoplay: true,
        autoplayHoverPause: true,
        scrollPerPage: true,
        autoplayTimeout: 5000,
        perPage: 10,
        perPageCustom: [
          [768, 2],
          [1300, 2],
          [1400, 3],
        ],
      },
      // hashtagData: null,
      hashtags: null,
      col: null,
    };
  },

  methods: {
    cardVideoSize() {
      if (window.innerWidth < 1400) {
        this.col = "col-6";
      } else if (window.innerWidth > 1300) {
        this.col = "col-lg-4 col-6";
      }
    },
  },

  mounted() {
    this.cardVideoSize();
  },
};
</script>

<style lang="scss" scoped>
.video_media_card_content_wrapper {
  width: 100%;
}
.counts{
  display: flex;
  span{
    margin-inline-end: 1rem;
  }
}
</style>
