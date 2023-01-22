<template>
  <div class="profile_wrapper most_profile">
    <div class="container-fluid px-0" v-if="userInfo">
      <div class="row">
        <!-- START:: USER DATA-->
        <div class="col-md-4">
          <profile-card
            :link="`/admins/show/${userInfo.id}/data`"
            :icon="'fal fa-user'"
            :title="$t('admins.personalData.title')"
            :color="'rgb(48 167 94)'"
            :bgColor="'rgba(8, 167, 94,0.1)'"
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
