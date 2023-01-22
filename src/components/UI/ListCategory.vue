<template>
  <li>
    <!--parent-->
    <a v-if="isFolder" href="javascript:" @click="toggle">
      <span class="fa fa-fw" :class="icon"></span>
      {{ data.name }}
    </a>
    <!--if not folding, we do not need an binding event-->
    <a v-else href="javascript:" :title="data.name">
      <span class="fa fa-fw fa-circle-o"></span>
      {{ data.name }}
    </a>
    <!--children-->
    <ul v-if="isFolder" :class="isShow">
      <list-category
        v-for="(data, index) in data.children"
        :key="index"
        :data="data"
        :search="search"
      ></list-category>
    </ul>
  </li>
</template>
<script>
export default {
  props: ['data', 'categoryId'],
  data() {
    return {
      open: false,
    }
  },
  computed: {
    icon() {
      return {
        'fa-plus': !this.open,
        'fa-minus': this.open,
      }
    },
    isFolder() {
      return this.data.children && this.data.children.length
    },
    isShow() {
      return this.open ? 'show' : 'hide'
    },
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>
