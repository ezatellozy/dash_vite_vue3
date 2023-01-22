<template>
  <div class="teacher_data">
    <!-- Start Main Loader -->

    <!-- End Main Loader -->
    <div class="personal_data_wrapper fadeIn">
      <div class="order-details-page mb-5">
        <div class="row py-2 mx-1 justify-content-center align-items-center">
          <div class="col-12">
            <div class="details border-right-0">
              <div class="row">
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.name") }}
                        </h5>
                        <p>
                          {{ userInfo.full_name }}
                        </p>
                      </div>
                      <div class="icon">
                        <i class="fal fa-user"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer" v-if="userInfo.phone">
                    <div class="item">
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.phone") }}
                        </h5>
                        <p>{{ userInfo.phone }} - {{ userInfo.phone_code }}</p>
                      </div>
                      <div class="icon">
                        <i class="fal fa-phone"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer" v-if="userInfo.email">
                    <div class="item">
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.email") }}
                        </h5>
                        <p>{{ userInfo.email }}</p>
                      </div>
                      <div class="icon">
                        <i class="fal fa-envelope"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer" v-if="userInfo.country">
                    <div class="item">
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.country") }}
                        </h5>
                        <p>{{ userInfo.country.name }}</p>
                      </div>
                      <div class="icon">
                        <i class="fal fa-globe"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer" v-if="userInfo.country">
                    <div class="item">
                      <div class="info">
                        <h5 class="title">العملة</h5>
                        <p>{{ userInfo.country.currency }}</p>
                      </div>
                      <div class="icon">
                        <i class="fal fa-money-bill-alt"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer" v-if="userInfo.is_active">
                    <div class="item">
                      <div class="info">
                        <h5 class="title">مفعل ؟</h5>
                        <p>{{ userInfo.is_active ? "مفعل" : "غير مفعل" }}</p>
                      </div>
                      <div class="icon">
                        <i class="fal fa-user-check"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userInfo"],

  data() {
    return {
      data: {},
    };
  },

  computed: {
    isActive() {
      return this.userInfo.is_active ? this.$t("active") : this.$t("inactive");
    },

    isBan() {
      return this.userInfo.is_ban ? this.$t("ban") : this.$t("inban");
    },
    isActiveManager() {
      return this.userInfo.is_ban ? "غير مفعل" : " مفعل";
    },
  },

  methods: {},
};
</script>

<style>
.border-right-0 {
  border-right-width: 0 !important;
}
</style>
