<template>
  <!-- START:: PROFILE CARD -->
  <div class="custom_card profile_card">
    <div class="profile_card_component">
      <router-link :to="link">
        <div :style="{ background: bgColor }" class="icon">
          <span :style="{ color: color }"><i :class="[icon]"></i></span>
        </div>
        <span class="title">{{ title }}</span>
      </router-link>
    </div>
  </div>
  <!-- END:: PROFILE CARD  -->
</template>

<script>
export default {
  props: ["icon", "title", "bgColor", "color", "link"],
};
</script>

<style></style>
