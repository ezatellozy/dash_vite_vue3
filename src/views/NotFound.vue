<template>
  <div class="notFound">
    <div class="shaps_bg_animation">
      <img src="../assets/images/icons/404/1.svg" />
      <img src="../assets/images/icons/404/2.svg" />
      <img src="../assets/images/icons/404/3.svg" />
      <img src="../assets/images/icons/404/3.svg" />
      <img src="../assets/images/icons/404/4.svg" />
      <img src="../assets/images/icons/404/1.svg" />
      <img src="../assets/images/icons/404/2.svg" />
      <img src="../assets/images/icons/404/3.svg" />
      <img src="../assets/images/icons/404/4.svg" />
      <img src="../assets/images/icons/404/2.svg" />

      <img src="../assets/images/icons/404/4.svg" />
      <img src="../assets/images/icons/404/1.svg" />
      <img src="../assets/images/icons/404/4.svg" />
      <img src="../assets/images/icons/404/2.svg" />
    </div>
    <div class="container">
      <h2>OOOOPS !</h2>
      <h1>
        4<span>0<img src="../assets/images/icons/404/7.svg" /></span>4
      </h1>
      <p>YOUR REQUESTED PAGE NOT FOUND</p>
      <router-link to="/"
        >Back To Home <i class="fal fa-angle-double-right"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},

  mounted() {},
};
</script>

<style lang="scss" scoped>
.notFound {
  background-image: linear-gradient(to right, #03cc8f, #0897c4);
  height: 100vh;
  direction: ltr;
  text-align: center;
  @include flexCenterAlignment;
  .container {
    isolation: isolate;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    background-image: url(../assets/images/icons/404/5.svg);
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    isolation: auto;
    opacity: 0.5;
  }
  h1 {
    font-size: 15rem;
    @include flexCenterAlignment;
    color: #fff;
    span {
      position: relative;
      img {
        animation: rotateAnimation 2s infinite;
        transform-origin: center;
        position: absolute;
        right: -10px;
        top: 80px;
      }
    }
  }
  h2 {
    font-size: 3rem;
    color: #fff;
  }
  p {
    color: rgba(255, 255, 255, 0.8);
  }
  a {
    font-weight: bold;
    color: #fff !important;
  }
  .shaps_bg_animation {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      &:nth-child(1) {
        left: 5%;
        top: 10%;
      }
      &:nth-child(2) {
        right: 5%;
        top: 10%;
      }
      &:nth-child(3) {
        left: 20%;
        top: 20%;
      }
      &:nth-child(4) {
        right: 20%;
        top: 20%;
        animation: rotateAnimation 2s infinite;
      }
      &:nth-child(5) {
        left: 30%;
        top: 30%;
        animation: rotateAnimation 2s infinite;
      }
      &:nth-child(6) {
        left: 30%;
        top: 30%;
      }
      &:nth-child(7) {
        right: 40%;
        top: 40%;
        animation: rotateAnimation 2s infinite;
      }
      &:nth-child(8) {
        left: 40%;
        top: 40%;
      }
      &:nth-child(9) {
        left: 50%;
        top: 50%;
        animation: rotateAnimation 2.6s infinite;
      }
      &:nth-child(10) {
        right: 50%;
        animation: rotateAnimation 1.8s infinite;
        bottom: 75%;
      }
      &:nth-child(11) {
        right: 20%;
        bottom: 40%;
        animation: rotateAnimation 1.5s infinite;
      }
      &:nth-child(12) {
        left: 30%;
        bottom: 20%;
        animation: rotateAnimation 2.4s infinite;
      }
      &:nth-child(13) {
        left: 10%;
        bottom: 20%;
      }
      &:nth-child(14) {
        right: 20%;
        bottom: 20%;
        animation: rotateAnimation 2.5s infinite;
      }
    }
  }
}
@keyframes rotateAnimation {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-10px);
  }
  // 50%  {}
  // 75%  {}
  // 100% {}
}
</style>
