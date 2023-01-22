<template>
  <div class="custom_card home_custom" :style="{ height: height }">
    <h5>{{ title }}</h5>
    <div v-if="items.length">
      <div v-for="item in items" :key="item.id" class="card_content">
        <router-link :to="`/rates/show/${item.id}`">
          <div class="details_part">
            <!--Image-->
            <div class="image">
              <img :src="item.product_details.product.image" />
            </div>
            <!--Details-->
            <div class="exp">
              <h4>{{ item.product_details.product.name }}</h4>
              <span>{{ item.user.fullname }}</span>
            </div>
          </div>
        </router-link>
        <!--Othor Part-->
        <div class="other_part">
          <RatingStars :rate="item.rate"></RatingStars>
          <button
            class="btn"
            type="button"
            @click="$set(item, 'show', !item.show)"
          >
            <i class="fal fa-angle-down"></i>
          </button>
        </div>
        <!--ToolTip-->
        <div class="my_tooltip custom_card" v-if="item.show">
          <div class="top_part">
            <div class="details_part">
              <!--Image-->
              <div class="image">
                <img :src="item.product_details.product.image" />
              </div>
              <!--Details-->
              <div class="exp">
                <h4>{{ item.product_details.product.name }}</h4>
                <span>{{ item.user.fullname }}</span>
              </div>
            </div>
            <!--Othor Part-->
            <div class="other_part">
              <RatingStars :rate="item.rate"></RatingStars>
              <button
                class="btn"
                type="button"
                @click="$set(item, 'show', !item.show)"
              >
                <i class="fal fa-times"></i>
              </button>
            </div>
          </div>
          <div class="bottom_part">
            <p>{{ item.comment }}</p>
            <div class="images" v-for="img in item.rate_images" :key="img.id">
              <img :src="img.url" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center fs-6">
        {{ $t("table.noData") }}
      </p>
    </div>
  </div>
</template>

<script>
import RatingStars from "../../components/UI/RatingStars.vue";
export default {
  props: ["items", "height", "title"],
  components: {
    RatingStars,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.home_custom {
  @include mainShadow();
  overflow-y: auto;
  .card_content {
    position: relative;
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
          border-radius: 50%;
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
      @include flexStartAlignment;
      h4 {
        font-size: 15px;
      }
      &.qant {
        h4 {
          color: #ff5967;
        }
      }
      .btn {
        padding: 0;
        margin: 0;
        font-size: 20px;
        &:focus {
          outline: none;
          box-shadow: none;
        }
      }
    }
    .my_tooltip {
      position: absolute;
      width: 100%;
      top: 80%;
      z-index: 2;
      box-shadow: 0 0 10px #ddd2d2;
      .top_part {
        @include flexSpaceBetweenAlignment;
        align-items: center;
        margin-bottom: 10px;
        .details_part {
          @include flexStartAlignment;
          align-items: center;
          .image {
            margin-inline-end: 10px;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
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
          @include flexStartAlignment;
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
      .bottom_part {
        p {
          font-size: 15px;
        }
        .images {
          @include flexStartAlignment;
          img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
