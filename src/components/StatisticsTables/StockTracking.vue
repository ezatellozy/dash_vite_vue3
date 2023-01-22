<template>
  <div class="custom_card home_custom" :style="{ height: height }">
    <div class="flex_title">
      <h5>{{ title }}</h5>
      <span>{{ subTitle }}</span>
    </div>
    <div v-if="items.length">
      <router-link
        :to="`/products/show/${item.product.id}`"
        class="card_content"
        v-for="item in items"
        :key="item.id"
      >
        <div class="details_part">
          <!--Image-->
          <router-link :to="`/products/show/${item.product.id}`" class="image">
            <img :src="item.product.image" />
          </router-link>
          <!--Details-->
          <div class="exp">
            <h4>{{ item.product.name }}</h4>
            <span>{{ item.product.desc.substring(0, 40) + ".." }}</span>
          </div>
        </div>
        <!--Othor Part-->
        <div class="other_part qant">
          <h4>{{ item.quantity }}</h4>
        </div>
      </router-link>
    </div>
    <div v-else class="no_data">
      <i class="far fa-frown-open"></i>
      <p class="text-center fs-6">
        {{ $t("table.noData") }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items", "height", "title", "subTitle"],
};
</script>

<style lang="scss" scoped>
.home_custom {
  @include mainShadow();
  overflow-y: auto;
  .flex_title {
    @include flexSpaceBetweenAlignment;
    padding-bottom: 10px;
    padding-top: 5px;
    span {
      font-size: 16px;
      color: var(--cardTitle);
    }
    border-bottom: 1px solid #efefef;
  }
  .card_content {
    @include flexSpaceBetweenAlignment;
    align-items: center;
    border-bottom: 1px solid #efefef;
    padding-top: 8px;
    padding-bottom: 8px;
    &:last-of-type {
      border-bottom: 0;
    }
    .details_part {
      @include flexStartAlignment;
      align-items: center;
      .image {
        margin-inline-end: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
        }
      }
      .exp {
        padding-top: 10px;
        h4 {
          font-size: 14px;
          margin-bottom: 0;
          line-height: 18px;
        }
        span {
          font-size: 13px;
          line-height: 16px;
          display: inline-block;
          color: var(--cardTitle);
        }
      }
    }
    .other_part {
      h4 {
        font-size: 15px;
      }
      &.qant {
        h4 {
          color: #ff5967;
        }
      }
    }
  }
  .no_data {
    @include flexCenterAlignment;
    flex-direction: column;
    height: 100%;
    i {
      font-size: 55px;
      color: var(--mainColor-2);
    }
    p {
      font-size: 20px !important;
      color: var(--mainColor-2);
    }
  }
}
</style>
