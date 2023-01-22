<template>
  <div class="main_filter_content_wrapper">
    <!-- Start:: Filter Divider -->
    <div class="divider">
      <h4>{{ $t("searchAt", { filterTitle: title }) }}</h4>
      <hr
        role="separator"
        aria-orientation="horizontal"
        class="v-divider theme--dark"
      />
    </div>
    <!-- End:: Filter Divider -->

    <!-- Start:: Filter Row -->
    <div class="row">
      <!-- ********** Start:: Users Input ********** -->
      <div class="col-12 py-0">
        <div class="input_wrapper top_label auto_complete">
          <label class="form-label">{{ $t("username") }}</label>
          <v-autocomplete
            v-model="filterKeys.username"
            :search-input.sync="filterKeyWords.user"
            :items="selectLists.users"
            item-text="fullname"
            item-value="fullname"
            @input="addUserData(filterKeys.username)"
            :hide-no-data="!selectLists.users"
            dense
          ></v-autocomplete>
          <button class="button_style_1 load_inline" v-if="isGettingUsers">
            <span class="btn_loader"></span>
          </button>
        </div>
      </div>
      <!-- ********** End:: Users Input ********** -->

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
  name: "UsersFilter",

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      //  ====== Start:: Loaders Control Data
      isGettingUsers: false,
      //  ====== End:: Loaders Control Data

      //  ====== Start:: Search Options Data
      filterKeyWords: {
        user: "",
      },
      //  ====== Start:: Search Options Data

      //  ====== Start:: Select Lists Data
      selectLists: {
        users: null,
      },
      //  ====== End:: Select Lists Data

      //  ====== Start:: Filter Keys
      filterKeys: {
        username: null,
      },
      //  ====== End:: Filter Keys
    };
  },

  watch: {
    [`filterKeyWords.user`](newVal, oldVal) {
      if (!newVal || newVal.length < 1) {
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
  },

  methods: {
    // Start:: Users Filter
    addUserData(item) {
      this.filterKeys.username
        ? (this.filterKeys.username = item)
        : (this.filterKeys.username = null);
    },
    get_filterd_users(keyword) {
      this.isGettingUsers = true;
      this.$axios({
        method: "GET",
        url: `client?keyword=${keyword}`,
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
  },
};
</script>

<style lang="scss" scoped>
.main_filter_content_wrapper {
  padding-block: 25px;
  margin-bottom: 25px;
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
