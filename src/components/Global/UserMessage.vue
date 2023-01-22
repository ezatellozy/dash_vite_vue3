<template>
  <div class="profile custom_card">
    <div class="user">
      <img :src="image" alt="rater img" />
      <div class="user_info">
        <h3><i class="fas fa-user"></i> {{ name }}</h3>
        <span class="user_title"><i class="fas fa-phone"></i> {{ title }}</span>
        <p class="comment"><i class="fas fa-envelope"></i>{{ desc }}</p>
      </div>
    </div>
    <div class="rate">
      <span>{{ date }}</span
      ><i class="fas fa-calendar-alt"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "name", "title", "desc", "date"],
};
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px 0;
  border: 2px solid #339989;
  border-radius: 25px 5px 25px 5px;
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
      i {
        margin-inline-end: 5px;
      }
      h3 {
        font-size: 20px;
        margin-bottom: 0;
      }

      span {
        color: #fff;
        font-size: 15px;
      }

      p {
        font-size: 15px;
        margin-bottom: 0;
        color: #fff;
      }
    }
  }

  .rate {
    span {
      font-size: 15px;
      margin-inline-end: 5px;
      i {
        margin-inline-end: 5px;
      }
    }
  }
}
</style>
