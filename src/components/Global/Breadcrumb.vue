<template>
  <section class="headSection">
    <div class="d-flex bread_flex flex-wrap">
      <v-breadcrumbs divider=">>" :items="items">
        <template v-slot:item="{ item }">
          <router-link :to="item.href" :disabled="item.disabled">
            {{ item.text.toUpperCase() }}
          </router-link>
        </template>
      </v-breadcrumbs>
      <div class="filter_icon frm-action" v-if="search_route">
        <router-link :to="search_route" class="btn w-100">
          <span>
            <i :class="'fas ' + icon"></i>
            {{ search_title }}
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['items', 'title', 'search_title', 'search_route', 'icon'],
}
</script>

<style lang="scss" scoped>
.frm-action a.btn {
  background: var(--mainColor-2) !important;
  color: #fff !important;
  height: 45px;
  font-size: 16px;
  min-width: 200px;
  line-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
