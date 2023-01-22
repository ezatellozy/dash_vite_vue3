<template>
  <div>
    <!-- Start Main Loader -->
    <transition name="fadeInUp" mode="out-in" v-if="loading">
      <MainLoader />
    </transition>
    <!-- End Main Loader -->
    <div class="fadeIn" v-else>
      <NotFound v-if="chatsData.length == 0" text="لا يوجد محادثات"></NotFound>
      <div class="chats_data" v-else>
        <div class="personal_data_wrapper">
          <div class="row">
            <div class="col-lg-4">
              <div class="input_wrapper top_label only_read my-2">
                <label class="form-label">
                  {{ $t('forms.labels.chats_count') }}
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="chatsData.length"
                  readonly
                />
              </div>
            </div>
          </div>

          <UsersFilter title="المحادثات" @filterData="filterTable" />

          <div class="chats_cards_wrapper">
            <div class="row">
              <!-- Start:: Chat Card -->
              <div
                class="col-lg-4 my-3"
                v-for="item in chatsData"
                :key="item.id"
              >
                <router-link
                  :to="`/users/show/${id}/data/chats/single/${item.id}`"
                  class="chat_card_content"
                >
                  <div class="image_wrapper">
                    <img
                      :src="item.receiver.avatar"
                      :alt="item.receiver.username"
                      width="85"
                      height="85"
                    />
                  </div>

                  <div class="message_data_wrapper">
                    <h5 class="name">{{ item.receiver.username }}</h5>
                    <div class="last_message_wrapper">
                      <div class="message">{{ item.last_message }}</div>
                      <div class="date">{{ item.last_update }}</div>
                    </div>
                  </div>
                </router-link>
              </div>
              <!-- End:: Chat Card -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersFilter from '@/components/Filters/UsersFilter.vue'
export default {
  props: ['id'],

  components: {
    UsersFilter,
  },

  data() {
    return {
      chatsData: null,
      // ========== pagination
      paginations: {
        current_page: 1,
        last_page: 1,
        items_per_page: 20,
      },
      // ========== filterItems
      filterItems: null,
      // ========== Statistics
      statisticsItem: {},

      loading: false,
    }
  },

  computed: {},

  watch: {
    [`paginations.current_page`]() {
      this.getData()
    },
  },

  methods: {
    // ===== Search Method =====
    filterClick(word) {
      if (!this.loading) {
        this.search = word
        this.helper_filterSearch()
      }
    },
    // Filter Table
    filterTable(items) {
      this.rows = []
      this.filterItems = items
      this.getData()
    },
    getData() {
      this.$axios({
        method: 'GET',
        url: `client/${this.id}/conversions`,
        params: {
          text: this.filterItems ? this.filterItems.text : null,
          username: this.filterItems ? this.filterItems.username : null,
        },
      }).then((res) => {
        this.chatsData = res.data.data

        console.log('chatData', this.chatsData)
      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped>
.chats_data {
  .personal_data_wrapper {
    .chats_cards_wrapper {
      margin-top: 20px;

      .chat_card_content {
        padding: 25px 12px;
        background: var(--cardBgColor);
        @include flexStartAlignment;
        column-gap: 16px;
        border-radius: 20px 15px;

        .image_wrapper {
          img {
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .message_data_wrapper {
          width: 100%;

          .last_message_wrapper {
            @include flexSpaceBetweenAlignment;
            width: 100%;

            .message {
              font-size: 16px;
              width: 78%;
              @include textEllipsis;
            }

            .date {
              font-size: 14px;
              width: 22%;
            }
          }
        }
      }
    }
  }
}
</style>
