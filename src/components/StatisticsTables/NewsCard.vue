<template>
  <div class="custom_card home_custom" :style="{ height: height }">
    <div class="flex_title">
      <h5>{{ title }}</h5>
    </div>

    <div v-if="items.length">
      <router-link
        :to="`/news/show/${item.id}`"
        class="card_content"
        v-for="item in items"
        :key="item.id"
      >
        <div class="details_part">
          <!--Image-->
          <div class="image">
            <img :src="item.image" />
          </div>
          <!--Details-->
          <div class="exp">
            <h4>
              {{
                item.title.length > 25
                  ? `${item.title.slice(0, 25)}...`
                  : item.title
              }}
            </h4>
            <span>
              {{
                item.desc.length > 50
                  ? `${item.desc.slice(0, 50)}...`
                  : item.desc
              }}
            </span>
            <p class="time">{{ item.created_at }}</p>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else>
      <p class="text-center fs-6">
        {{ $t('table.noData') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items', 'height', 'title'],
  components: {},
}
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
          border-radius: 10px;
          width: 50px;
          height: 50px;
        }
      }
      .exp {
        padding-top: 10px;
        h4 {
          font-size: 14px;
          margin-bottom: 0;
          line-height: 14px;
        }
        span {
          font-size: 13px;
          display: inline-block;
          color: var(--cardTitle);
          margin-bottom: 8px;
        }
        p {
          font-size: 13px;
          margin-bottom: 0;
          line-height: 16px;
          color: var(--cardTitle);
        }
      }
    }
    .other_part {
      h4 {
        font-size: 15px;
      }
    }
  }
}
</style>
