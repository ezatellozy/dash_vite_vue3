<template>
  <transition name="fadeInUp">
    <div @click="closeModel" v-if="show" class="model_container">
      <span v-if="showCloseIcon" @click="closeModel" class="close"
        ><i class="fas fa-times"></i
      ></span>

      <main @click.stop class="main_body" :class="{ 'w-100': w100 }">
        <slot></slot>
      </main>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Model",

  props: {
    show: {
      type: Boolean,
      required: true,
    },
    showCloseIcon: {
      type: Boolean,
      required: false,
    },
    w100: {
      type: Boolean,
      required: false,
    },
  },

  emits: ["closeModel"],

  methods: {
    closeModel() {
      this.$emit("closeModel");
    },
  },
};
</script>
