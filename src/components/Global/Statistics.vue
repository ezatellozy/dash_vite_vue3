<template>
  <div class="chart_component">
    <main>
      <span class="title">{{ title }}</span>
    </main>

    <div class="icon">
      <span>
        <i :class="icon"></i>
      </span>
      <h3 class="number">{{ number }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      deafult: 0,
    },
    icon: {
      default: 'fal fa-analytics',
    },
    title: {
      deafult: 'title',
    },
  },
}
</script>
