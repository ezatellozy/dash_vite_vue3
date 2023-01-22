<template>
  <div class="col-lg-3">
    <div class="input_wrapper top_label only_read my-2">
      <label class="form-label">{{ key }}</label>
      <input
        type="text"
        class="form-control"
        v-if="value"
        v-model.trim="value"
        readonly
      />
      <input v-else type="text" class="form-control" value="لا يوجد" readonly />
    </div>
  </div>
</template>

<script>
export default {
  props: ["key", "value"],

  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
