<template>
  <div class="main_filter_content_wrapper">
    <!-- Start:: Filter Divider -->
    <div class="divider">
      <h4>{{ $t('searchAt', { filterTitle: title }) }}</h4>
      <hr
        role="separator"
        aria-orientation="horizontal"
        class="v-divider theme--dark"
      />
    </div>
    <!-- End:: Filter Divider -->

    <!-- Start:: Filter Row -->
    <div class="row">
      <!-- ********** Start:: Hashtags Input ********** -->
      <div class="col-12 py-0">
        <div class="input_wrapper top_label auto_complete">
          <label class="form-label">{{$t("hashtag")}}</label>
          <v-autocomplete
            v-model="filterKeys.hashtag_id"
            :search-input.sync="filterKeyWords.hashtag"
            :items="selectLists.hashtags"
            item-text="name"
            item-value="id"
            @input="addHashtagData(filterKeys.hashtag_id)"
            :hide-no-data="!selectLists.hashtags"
            dense
          ></v-autocomplete>
          <button class="button_style_1 load_inline" v-if="isGettingHashtags">
            <span class="btn_loader"></span>
          </button>
        </div>
      </div>
      <!-- ********** End:: Hashtags Input ********** -->

      <!-- ********** Start:: Submit Button ********** -->
      <div class="buttons_wrapper my-2">
        <button
          class="button_style_1"
          @click="$emit('filterData', filterKeys)"
        >
          {{$t("table.search")}}
        </button>
      </div>
      <!-- ********** End:: Submit Button ********** -->
    </div>
    <!-- End:: Filter Row -->
  </div>
</template>

<script>
export default {
  name: "HashtagsFilter",

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      //  ====== Start:: Loaders Control Data
      isGettingHashtags: false,
      //  ====== End:: Loaders Control Data

      //  ====== Start:: Search Options Data
      filterKeyWords: {
        hashtag: "",
      },
        //  ====== Start:: Search Options Data

      //  ====== Start:: Select Lists Data
      selectLists: {
        hashtags: null,
      },
      //  ====== End:: Select Lists Data

      //  ====== Start:: Filter Keys
      filterKeys: {
        hashtag_id: null,
      },
      //  ====== End:: Filter Keys
    }
  },

    watch: {
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
    // Start:: Hashtags Filter
    addHashtagData(item) {
      this.filterKeys.hashtag_id ?  this.filterKeys.hashtag_id = item : this.filterKeys.hashtag_id = null;
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
    // End:: Hashtags Filter
  },
}
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
      border-color:  var(--mainColor-2_2);
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