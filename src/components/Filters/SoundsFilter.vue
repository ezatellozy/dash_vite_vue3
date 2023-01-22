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
      <!-- ********** Start:: Sound Name Input ********** -->
      <div class="col-12 py-0">
        <div class="input_wrapper top_label">
          <input
            type="text"
            class="form-control"
            v-model="filterKeys.name"
          />
          <label for="name_input" class="form-label">{{
            $t("forms.labels.name")
          }}</label>
        </div>
      </div>
      <!-- ********** Start:: Sound Name Input ********** -->

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
  name: "SoundsFilter",

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      //  ====== Start:: Filter Keys
      filterKeys: {
        name: null,
      },
      //  ====== End:: Filter Keys
    }
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
      border-color:  var(--mainColor-2_2);
      opacity: 1;
    }
  }

  .input_wrapper {
    input,
    .form-label {
      background-color: var(--mainBgColor);
    }
  }

  .buttons_wrapper {
    width: 100%;
    @include flexCenterAlignment;
  }
}
</style>