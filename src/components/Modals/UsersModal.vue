<template>
  <div class="users_modal_content_wrapper" v-if="usersList">
    <v-dialog
      v-model="modalIsActive"
      @click:outside="toggleModal"
      max-width="600px"
    >
      <v-card>
        <!-- Start:: Title -->
        <v-card-title v-if="title">
          {{ title }}
        </v-card-title>
        <!-- End:: Title -->

        <!-- Start:: Users List -->
        <ul class="users_list">
          <li class="single_user" v-for="item in usersList" :key="item.id">
            <router-link :to="`/users/show/${item.id}`">
              <div class="avatar">
                <img
                  :src="item.avatar"
                  :alt="item.username"
                  width="90"
                  height="90"
                />
              </div>

              <div class="name">
                {{ item.username }}
              </div>
            </router-link>
          </li>
        </ul>
        <!-- End:: Users List -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "UsersModal",

  emits: ["toggleModal"],

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
    usersList: {
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    toggleModal() {
      this.$emit("toggleModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-dialog {
  .v-card {
    padding: 20px;
    .v-card__title {
      margin-bottom: 0;
      @include flexCenterAlignment;
    }

    .users_list {
      padding: 0;
      margin: 0;
      .single_user {
        padding-block: 20px 0;
        &:not(:last-child) {
          padding: 20px 15px;
          border-bottom: 1px solid var(--borderColor);
        }
        a {
          font-size: 15px;
          @include flexStartAlignment;
          column-gap: 15px;
          .avatar {
            width: 50px;
            height: 50px;
            overflow: hidden;
            border-radius: 100px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>
