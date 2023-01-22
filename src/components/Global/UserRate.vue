<template>
  <div class="profile custom_card">
    <div class="user">
      <img v-if="image" :src="image" />
      <img v-else src="https://via.placeholder.com/100" alt="rater img" />

      <div class="user_info">
        <h3>{{ name }}</h3>
        <span class="user_title">{{ type }}</span>
        <p class="comment">
          {{ desc }}
        </p>
      </div>
    </div>
    <div class="rate">
      <rating-stars :rate="rateNum"></rating-stars>
    </div>
  </div>
</template>

<script>
import RatingStars from "../UI/RatingStars.vue";
export default {
  props: ["image", "name", "type", "desc", "rateNum"],
  components: { RatingStars },
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
  border: 2px solid var(--mainColor-2);
  .user {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-inline-end: 15px;
    }

    .user_info {
      h3 {
        font-size: 21px;
        margin-bottom: 0;
      }

      span {
        color: gray;
        font-size: 14px;
      }

      p {
        font-size: 15px;
        margin-bottom: 0;
      }
    }
  }

  .rate {
  }
}
</style>
