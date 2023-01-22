<template>
  <div class="video_media_card_content_wrapper">
    <div class="media_elemets">
      <!-- ********** Start:: Medai Card Image ********** -->
      <img class="media_image" v-lazy="item.image_thumbnail" />
      <!-- :src="item.image_thumbnail" -->
      <!-- ********** End:: Medai Card Image ********** -->

      <!-- ********** Start:: Video Card Overlay ********** -->
      <div class="video_card_overlay">
        <!-- Start:: Card Top Section -->
        <div class="card_top_section">
          <div class="action_buttons">
            <button class="delete" @click="deleteItem(item)">
              <i class="fal fa-trash-alt"></i>
            </button>
          </div>

          <router-link
            :to="`/users/show/${item.user.id}`"
            class="user_content_wrapper"
          >
            <div class="name">
              {{ item.user.username }}
            </div>

            <div class="avatar">
              <img
                :src="item.user.avatar"
                :alt="item.user.username"
                width="40"
                height="40"
              />
            </div>
          </router-link>
        </div>
        <!-- End:: Card Top Section -->

        <button class="play_btn" @click="palyVideoTrack(item.video_url)">
          <i class="fal fa-play"></i>
        </button>

        <!-- Start:: Card Bottom Section -->
        <div class="card_buttom_section">
          <!-- <transition-group name="fadeInUp" mode="out-ingit a -->
          <div
            class="title_container"
            :class="readMoreToggle ? 'auto-h fadeIn' : ''"
          >
            <p class="track_name">{{ item.text }} -</p>

            <div class="hashtags_wrapper">
              <v-chip small v-for="item in item.hashtags" :key="item.id">
                {{ item.name }}#
              </v-chip>
            </div>
          </div>

          <button
            type="button"
            @click="readMoreBtn()"
            class="read_more_btn"
            v-if="item.text.length > 80"
          >
          <span key="show_less" v-if="readMoreToggle">عرض اقل</span>
          <span  key="show_more" v-else>عرض المزيد ...</span>
          

          </button>

          <div class="likes_shares_comments_wrapper">
            <!-- Start:: Shares Button -->
            <button class="Shares_btn">
              <span class="count"> {{ item.shares_count }} </span>
              <i class="fas fa-share"></i>
            </button>
            <!-- End:: Shares Button -->

            <!-- Start:: Comments Button -->
            <button
              class="comments_btn"
              @click="controlCommentsModal(item.comments)"
            >
              <span class="count"> {{ item.comments_count }} </span>
              <i class="fas fa-comment-lines"></i>
            </button>
            <!-- End:: Comments Button -->

            <!-- Start:: favs Button -->
            <button
              class="favs_btn"
              @click="
                controlUsersModal(item.favs, `اضافوا الفيديو إلي المفضلة`)
              "
            >
              <span class="count"> {{ item.favs_count }} </span>
              <i class="fas fa-heart"></i>
            </button>
            <!-- End:: favs Button -->

            <!-- Start:: Likes Button -->
            <button
              class="likes_btn"
              @click="controlUsersModal(item.likers, `المعجبين بالفيديو`)"
            >
              <span class="count"> {{ item.likes_count }} </span>
              <i class="fas fa-thumbs-up"></i>
            </button>
            <!-- End:: Likes Button -->
          </div>
        </div>
        <!-- End:: Card Bottom Section -->
      </div>
      <!-- ********** End:: Video Card Overlay ********** -->
    </div>

    <!-- Start:: Video Modal -->
    <VideoModal
      @toggleModal="palyVideoTrack"
      :modalIsActive="videoModalIsOpen"
      :videoUrl="videoToPlay"
    />
    <!-- End:: Video Modal -->

    <!-- Start:: Users Modal -->
    <UsersModal
      @toggleModal="controlUsersModal"
      :modalIsActive="usersModalIsOpen"
      :title="usersListTitle"
      :usersList="usersToShow"
    />
    <!-- End:: Users Modal -->

    <!-- Start:: Users Modal -->
    <CommentsModal
      @toggleModal="controlCommentsModal"
      :modalIsActive="usersCommentsModalIsOpen"
      :commentsList="CommentsToShow"
    />
    <!-- End:: Users Modal -->

    <!-- Start Delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 justify-center">{{
          $t("table.deletedialog.areYouSure")
        }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#1B5E20" @click="deleteItemConfirm">{{
            $t("table.deletedialog.ok")
          }}</v-btn>
          <v-btn color="#F44336" @click="dialogDelete = false">{{
            $t("table.deletedialog.cancel")
          }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End Delete dialog -->
  </div>
</template>

<script>
// Start:: Importing Modals
import VideoModal from "@/components/Modals/VideoModal.vue";
import UsersModal from "@/components/Modals/UsersModal.vue";
import CommentsModal from "@/components/Modals/CommentsModal.vue";
// End:: Importing Modals

export default {
  name: "VideoMediaCard",

  components: {
    VideoModal,
    UsersModal,
    CommentsModal,
  },

  emits: ["getVideosData"],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialogDelete: false,
      itemtoDelete: null,
      videoModalIsOpen: false,
      videoToPlay: null,
      usersModalIsOpen: false,
      usersListTitle: null,
      usersToShow: false,
      usersCommentsModalIsOpen: false,
      CommentsToShow: null,
      readMoreToggle: false,
    };
  },

  methods: {
    // ===== Delete
    deleteItem(item) {
      this.dialogDelete = true;
      this.itemtoDelete = item;

      console.log("FFFFFFFFFFF", item);
      console.log("FFFFFFFFFFF", this.dialogDelete);
    },
    deleteItemConfirm() {
      this.$axios({
        method: "DELETE",
        url: `videos/${this.itemtoDelete.id}`,
      })
        .then(() => {
          this.dialogDelete = false;
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("deleteSuccess"),
            position: "bottomRight",
          });
          this.$emit("getVideosData");
        })
        .catch((err) => {
          this.dialogDelete = false;
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: "bottomRight",
          });
        });
    },

    // ===== Control Video Track
    palyVideoTrack(url) {
      this.videoModalIsOpen = !this.videoModalIsOpen;
      this.videoToPlay = url;
    },

    // ===== Get Video Comments
    getVideoComments() {
      this.$axios({
        method: "GET",
        url: `videos/${this.item.id}/comments`,
      })
        .then((res) => {
          this.CommentsToShow = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // ===== Control Modals
    controlUsersModal(users, title) {
      this.usersModalIsOpen = !this.usersModalIsOpen;
      this.usersListTitle = title;
      this.usersToShow = users;
    },

    controlCommentsModal(comments) {
      this.usersCommentsModalIsOpen = !this.usersCommentsModalIsOpen;
      this.CommentsToShow = comments;
      if (this.usersCommentsModalIsOpen) {
        this.getVideoComments();
      }
    },

    // ===== ReadMore
    readMoreBtn() {
      this.readMoreToggle = !this.readMoreToggle;
    },
  },
};
</script>

<style lang="scss" scoped>
.video_media_card_content_wrapper {
  margin-block: 8px;
  width: 350px;
  overflow: hidden;
  .media_elemets {
    overflow: hidden;
    border-radius: 15px;
    position: relative;
    .media_image {
      width: 350px;
      height: 400px;
      object-fit: cover;
    }
    .video_card_overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.6);
      @include flexSpaceBetweenAlignment;
      flex-direction: column;
      .card_top_section {
        width: 100%;
        @include flexSpaceBetweenAlignment;
        column-gap: 10px;
        .action_buttons {
          padding: 8px;
          @include flexStartAlignment;
          button {
            font-size: 18px;
            &.delete {
              svg,
              i {
                color: var(--danger);
              }
            }
          }
        }
        .user_content_wrapper {
          padding-block: 10px;
          padding-inline: 5px 15px;
          @include flexEndAlignment;
          column-gap: 10px;
          .name {
            font-size: 15px;
          }
          .avatar {
            img {
              border-radius: 50%;
              object-fit: cover;
            }
          }
        }
      }

      .play_btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border: 1px solid #fff;
        border-radius: 50%;
        @include flexCenterAlignment;
        i,
        svg {
          font-size: 25px;
        }
      }

      .card_buttom_section {
        width: 100%;
        .hashtags_wrapper {
          padding-inline: 10px;
          @include flexEndAlignment;
          column-gap: 5px;
          row-gap: 5px;
          flex-wrap: wrap;
          .v-chip {
            background-image: linear-gradient(to right, #03cc8f, #0897c4);
          }
        }

        .track_name {
          padding-inline: 10px;
          margin-block: 5px 0;
          text-align: start;
          font-size: 15px;
        }

        .likes_shares_comments_wrapper {
          margin-block: 5px 10px;
          padding-inline-end: 15px;
          @include flexEndAlignment;
          column-gap: 15px;

          button {
            font-size: 15px;
            &.Shares_btn {
              cursor: initial;
            }
          }
        }
      }
    }
  }

  .card_buttom_section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: self-end;
  }
  .title_container {
    max-height: 80px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &.auto-h {
      max-height: 200px;
      overflow-y: scroll;
      backdrop-filter: blur(10px);
    }
  }
  .read_more_btn {
    font-size: 14px;
    width: 100%;
    text-align: right;
    -webkit-padding-start: 10px;
    padding-inline-start: 10px;
    font-weight: bold;
  }
}
</style>
