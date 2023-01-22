<template>
  <div class="chats_data">
    <div class="personal_data_wrapper">
      <div class="container">
        <div class="chats_cards_wrapper">
          <div class="row">
            <!-- Start:: Chat Component -->
            <ChatComp v-if="chatData" readOnly :messages="chatData" />
            <!-- End:: Chat Component -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatComp from "@/components/Global/ChatComp";
export default {
  props: ["id", "chatID"],

  components: {
    ChatComp,
  },

  data() {
    return {
      chatData: null,
    };
  },

  computed: {},

  methods: {
    getData() {
      this.$axios({
        method: "GET",
        url: `conversion/${this.chatID}/chats?user_id=${this.id}`,
      }).then((res) => {
        this.chatData = res.data.data;
        console.log("Chat", this.chatData);
      });
    },
  },
  created() {
    this.getData();
  },
};
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
