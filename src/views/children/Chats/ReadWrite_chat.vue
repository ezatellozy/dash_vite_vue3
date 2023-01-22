<template>
  <div class="chat">
    <!-- Start Breadcrumb -->
    <Breadcrumb title="ReadWrite_Chat" :items="items" />
    <!-- End Breadcrumb -->

    <chat-comp :chatObj="singleChat"></chat-comp>
  </div>
</template>

<script>
export default {
  props: ["id"],

  data() {
    return {
      // ========== Breadcrumbs
      items: [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },
        {
          text: "chat",
          disabled: true,
          href: "",
        },
      ],

      singleChat: {
        id: 1,
        chat: true,
        status: "active",
        messages: [
          {
            message_position: "me",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "me",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "me",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "me",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "me",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "other",
            message_type: "image",
            message: require("@/assets/images/slider/slider_1.png"),
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "other",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
          {
            message_position: "me",
            message_type: "text",
            message: "Lorem ipsum",
            sender_data: {
              image: require("@/assets/images/users/user_1.png"),
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
