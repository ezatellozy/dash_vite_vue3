<template>
  <div class="sound_wave_wrapper">
    <div 
      class="wave-bar"
      v-for="item in 25"
      :key="item"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SoundWave",
}
</script>

<style lang="scss" scoped>
.sound_wave_wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  // @include flexCenterAlignment;
  display: none;
  & .wave-bar {
    display: inline-block;
    width: 10px;
    height: 100px;
    background-color: #169e8c;
    animation: beat1 1s infinite;
    transform-origin: 0 100%;
    transform: scaleY(0.1);
    border-radius: 8px 8px 0 0;

    &:nth-child(2n) {
      animation-name: beat2;
      animation-delay: 0.2s;
      background-color: #2287ac;
    }
    &:nth-child(3n) {
      animation-name: beat3;
      animation-delay: 0.5s;
      animation-duration: 0.5s;
      background-color: #44ffe6;
    }
    &:nth-child(4n) {
      animation-name: beat2;
      animation-delay: 0.4s;
      animation-duration: 0.8s;
    }
    &:nth-child(5n) {
      animation-delay: 0.6s;
    }
    &:nth-child(6n) {
      animation-delay: 0.2s;
      background-color: #66d6ff;
    }
  }
}

@keyframes beat1 {
  0% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(0.7);
  }
  100% {
    transform: scaleY(0);
  }
}

@keyframes beat2 {
  0% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(0);
  }
}

@keyframes beat3 {
  0% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(0.3);
  }
  100% {
    transform: scaleY(0);
  }
}
</style>
