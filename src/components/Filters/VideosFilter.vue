<template>
  <div class="main_filter_content_wrapper">
    <!-- Start:: Filter Divider -->
    <div class="divider">
      <h4>{{ $t('searchAt', { filterTitle: title }) }}</h4>
      <hr role="separator" aria-orientation="horizontal" class="v-divider theme--dark" />
    </div>
    <!-- End:: Filter Divider -->

    <!-- Start:: Filter Row -->
    <div class="row">
      <!-- ********** Start:: Video Name Input ********** -->
      <div class="py-0" :class="{ 'col-lg-4': !type , 'col-lg-6': type}">
        <div class="input_wrapper top_label">
          <input type="text" class="form-control" v-model="filterKeys.text" />
          <label for="name_input" class="form-label">{{
              $t("forms.labels.video_name")
          }}</label>
        </div>
      </div>
      <!-- ********** End:: Video Name Input ********** -->

      <!-- ********** Start:: Users Input ********** -->
      <div class="col-lg-4 py-0" v-if="!type">
        <div class="input_wrapper top_label auto_complete">
          <label class="form-label">{{ $t("username") }}</label>
          <v-autocomplete v-model="filterKeys.user" :search-input.sync="filterKeyWords.user"
            :items="selectLists.users" item-text="fullname" return-object @input="addUserData(filterKeys.user)"
            :hide-no-data="!selectLists.users" dense></v-autocomplete>
          <button class="button_style_1 load_inline" v-if="isGettingUsers">
            <span class="btn_loader"></span>
          </button>
        </div>
      </div>
      <!-- ********** End:: Users Input ********** -->

      <!-- ********** Start:: Hashtag Input ********** -->
      <div class="py-0" :class="{ 'col-lg-4': !type , 'col-lg-6': type}">
        <div class="input_wrapper top_label auto_complete">
          <label class="form-label">{{ $t("hashtag") }}</label>
          <v-autocomplete v-model="filterKeys.hashtag" :search-input.sync="filterKeyWords.hashtag"
            :items="selectLists.hashtags" item-text="name" return-object @input="addHashtagData(filterKeys.hashtag)"
            :hide-no-data="!selectLists.hashtags" dense></v-autocomplete>
          <button class="button_style_1 load_inline" v-if="isGettingHashtags">
            <span class="btn_loader"></span>
          </button>
        </div>
      </div>
      <!-- ********** End:: Hashtag Input ********** -->

      <!-- ********** Start:: Submit Button ********** -->
      <div class="buttons_wrapper my-2">
        <button class="button_style_1" @click="$emit('filterData', filterKeys)">
          {{ $t("table.search") }}
        </button>
      </div>
      <!-- ********** End:: Submit Button ********** -->
    </div>
    <!-- End:: Filter Row -->
  </div>
</template>

<script>
export default {
  name: "VideosFilter",

  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      //  ====== Start:: Loaders Control Data
      isGettingUsers: false,
      isGettingHashtags: false,
      //  ====== End:: Loaders Control Data

      //  ====== Start:: Search Options Data
      filterKeyWords: {
        user: "",
        hashtag: "",
      },
      //  ====== Start:: Search Options Data

      //  ====== Start:: Select Lists Data
      selectLists: {
        users: null,
        hashtags: null,
      },
      //  ====== End:: Select Lists Data

      //  ====== Start:: Filter Keys
      filterKeys: {
        text: null,
        user: null,
        user_id: null,
        user_name: null,
        hashtag: null,
        hashtag_id: null,
        hashtag_name: null,
      },
      //  ====== End:: Filter Keys
    }
  },

  watch: {
    [`filterKeyWords.user`](newVal, oldVal) {
      if (!newVal || newVal.length < 3) {
        this.selectLists.users = null;
      } else {
        if (!newVal & (oldVal == "")) {
          this.get_filterd_users(oldVal);
        } else if ((newVal == "") & (oldVal != "")) {
          this.get_filterd_users(newVal);
        } else {
          this.get_filterd_users(newVal);
        }
      }
    },
    [`filterKeyWords.hashtag`](newVal, oldVal) {
      if (!newVal || newVal.length < 3) {
        this.selectLists.hashtags = null;
      } else {
        if (!newVal & (oldVal == "")) {
          this.get_filterd_hashtags(oldVal);
        } else if ((newVal == "") & (oldVal != "")) {
          this.get_filterd_hashtags(newVal);
        } else {
          this.get_filterd_hashtags(newVal);
        }
      }
    },
  },

  methods: {
    // Start:: Users Filter
    addUserData(item) {
      console.log(item)
      if (this.filterKeys.user) {
        this.filterKeys.user_id = item.id;
        this.filterKeys.user_name = item.fullname;
      }
      else {
        this.filterKeys.user_id = null;
        this.filterKeys.user_name = null;
      }
    },
    get_filterd_users(keyword) {
      this.isGettingUsers = true;
      this.$axios({
        method: "GET",
        url: `client/search?keyword=${keyword}`,
      })
        .then((res) => {
          this.isGettingUsers = false;
          this.selectLists.users = res.data.data;
        })
        .catch((err) => {
          this.isGettingUsers = false;
        });
    },
    // End:: Users Filter

    // Start:: Hashtag Filter
    addHashtagData(item) {
      if (this.filterKeys.hashtag) {
        this.filterKeys.hashtag_id = item.id;
        this.filterKeys.hashtag_name = item.name;
      }
      else {
        this.filterKeys.hashtag_id = null;
        this.filterKeys.hashtag_name = null;
      }
    },
    get_filterd_hashtags(keyword) {
      this.isGettingHashtags = true;
      this.$axios({
        method: "GET",
        url: `hashtag/search?keyword=${keyword}`,
      })
        .then((res) => {
          this.isGettingHashtags = false;
          this.selectLists.hashtags = res.data.data;
        })
        .catch((err) => {
          this.isGettingHashtags = false;
        });
    },
    // End:: Hashtag Filter
  },
}
</script>

<style lang="scss" scoped>
.main_filter_content_wrapper {
  padding-block: 25px;
  border-bottom: 1px solid var(--mainColor-2_2);

  .divider {
    position: relative;

    h4 {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      padding-inline: 15px;
      background-color: var(--mainBgColor);
      color: var(--mainColor-2_2);
      font-size: 17px;
      height: 30px;
      margin-bottom: 0;
      @include flexCenterAlignment;
    }

    .v-divider {
      border-color: var(--mainColor-2_2);
      opacity: 1;
    }
  }

  .input_wrapper {

    input,
    .form-label {
      background-color: var(--mainBgColor);
    }

    .load_inline {
      background-color: transparent;
      width: 40px;
    }
  }

  .buttons_wrapper {
    width: 100%;
    @include flexCenterAlignment;
  }
}
</style>