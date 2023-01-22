<template>
  <div class="profile_wrapper most_profile">
    <div class="container-fluid px-0" v-if="userInfo">
      <div class="row">
        <!-- START:: USER DATA-->
        <div class="col-md-4">
          <profile-card
            :link="`/users/show/${userInfo.id}/data`"
            :icon="'fal fa-user'"
            :title="$t('users.personalData.title')"
            :color="'rgb(14 57 88)'"
            :bgColor="'rgba(14, 57, 88,0.1)'"
          ></profile-card>
        </div>
        <!-- END:: USER DATA-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userInfo"],

  data() {
    return {};
  },

  methods: {},
};
</script>

<style></style>
