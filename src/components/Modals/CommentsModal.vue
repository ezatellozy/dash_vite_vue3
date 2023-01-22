<template>
  <div class="comments_modal_content_wrapper" v-if="commentsList">
    <v-dialog
      v-model="modalIsActive"
      @click:outside="toggleModal"
      max-width="600px"
    >
      <v-card>
        <!-- Start:: Title -->
        <v-card-title>
          {{ $t("comments") }}
        </v-card-title>
        <!-- End:: Title -->

        <!-- Start:: Comments List -->
        <!-- @scroll="scrollSection" -->
        <ul class="comments_list heightScreen"  >
          <li
            class="single_comment"
            v-for="item in commentsList"
            :key="item.id"
          >
            <router-link :to="`/users/show/${item.user.id}`">
              <div class="avatar">
                <img
                  :src="item.user.avatar"
                  :alt="item.user.username"
                  width="40"
                  height="40"
                />
              </div>

              <div class="wrapper wrapper_bg">
                <div class="name">
                  {{ item.user.username }}
                </div>

                <div class="comment">
                  <p class="content">
                    {{ item.comment }}
                  </p>

                  <p class="date">
                    {{ item.ago }}
                  </p>
                </div>
                <ul class="icons">
                  <li>
                    {{ item.likes_count }}
                    <i class="fal fa-thumbs-up"></i>
                  </li>
                  <li>
                    {{ item.favs_count }}
                    <i class="fal fa-heart"></i>
                  </li>
                </ul>
              </div>
            </router-link>
            <v-row justify="center">
              <v-expansion-panels accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header v-if="item.replies.length > 0">
                    <i class="fal fa-reply-all"></i>
                    ردود علي التعليق
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ul class="single_comment single_replay">
                      <li v-for="replay in item.replies" :key="replay.id">
                        <router-link :to="`/users/show/${replay.user.id}`">
                          <div class="avatar">
                            <img
                              :src="replay.user.avatar"
                              :alt="replay.user.username"
                              width="30"
                              height="30"
                            />
                          </div>

                          <div class="wrapper wrapper_bg">
                            <div class="name">
                              {{ replay.user.username }}
                            </div>

                            <div class="comment">
                              <p class="content">
                                {{ replay.comment }}
                              </p>

                              <p class="date">
                                {{ replay.ago }}
                              </p>
                            </div>
                            <ul class="icons">
                              <li>
                                {{ replay.likes_count }}
                                <i class="fal fa-thumbs-up"></i>
                              </li>
                              <li>
                                {{ replay.favs_count }}
                                <i class="fal fa-heart"></i>
                              </li>
                            </ul>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </li>
        </ul>
        <!-- End:: Comments List -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "CommentsModal",

  emits: ["toggleModal"],

  props: {
    modalIsActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    commentsList: {
      required: true,
    },
  },

  data() {
    return {
      heightScreen: 1,
    };
  },

  methods: {
    toggleModal() {
      
      this.$emit("toggleModal");
    },
    // scrollSection() {
    //   var chatSection = document.querySelector(".heightScreen");
    //   if (chatSection.scrollTop == 0) {
    //     this.currentPage += 1;
    //     // this.getChatAgain();
    //   }
    //   // if (this.currentPage !== this.last_page) {
    //   // } else {
    //   //   this.endOfchat = true;
    //   // }
    // },
  },

  mounted() {
    // console.log(this.scrollSection());
  },
};
</script>

<style lang="scss" scoped>
.v-dialog {
  .icons {
    @include flexStartAlignment;
    margin-top: 0.5rem;
    li {
      font-size: 1rem;
      margin-inline-end: 0.8rem;
      @include flexCenterAlignment;
      column-gap: 5px;
      color: var(--mainColor-1);
      i {
        color: var(--mainColor-1);
      }
    }
  }
  .v-card {
    padding: 20px;
    .v-card__title {
      margin-bottom: 0;
      @include flexCenterAlignment;
    }

    .comments_list {
      padding: 0;
      margin: 0;
      .single_comment {
        &.single_replay {
          width: 85%;
          margin: 0 auto;
          padding-top: 0;
          li {
            margin-bottom: 1rem;
          }
          .icons {
            li {
              margin-bottom: 0;
            }
          }
        }
        padding-block: 20px 0;
        &:not(:last-child) {
          padding: 20px 15px;
          border-bottom: 1px solid var(--borderColor);
        }
        a {
          @include flexStartAlignment;
          column-gap: 15px;
          align-items: flex-start;
          .avatar {
            margin-top: 10px;
            img {
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .wrapper {
            width: 100%;
            .name {
              font-size: 1rem;
            }
            &.wrapper_bg {
              background-color: var(--cardBgColor);
              padding: 0.5rem 1rem;
              border-radius: 15px;
            }
            .comment {
              width: 100%;
              @include flexSpaceBetweenAlignment;
              .content,
              .date {
                margin-block: 0 0;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
