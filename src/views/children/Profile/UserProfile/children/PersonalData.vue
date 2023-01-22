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
                      <div class="icon">
                        <i class="fal fa-user"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.name") }}
                        </h5>
                        <p>
                          {{ userInfo.fullname }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-user"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.gender") }}
                        </h5>
                        <p>
                          {{ userInfo.gender == "male" ? "مذكر" : "مؤنث" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-futbol"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.phone") }}
                        </h5>
                        <p>
                          {{ userInfo.phone }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t("forms.labels.email") }}
                        </h5>
                        <p>
                          {{ userInfo.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">التفعيل</h5>
                        <p
                          :style="
                            userInfo.is_active ? 'color:green' : 'color:red'
                          "
                        >
                          {{ userInfo.is_active ? "مفعل" : "غير مفعل" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">الحظر</h5>
                        <p
                          :style="
                            !userInfo.is_ban ? 'color:green' : 'color:red'
                          "
                        >
                          {{ !userInfo.is_ban ? "غير محظور" : "محظور" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          النقاط الاسبوعية
                        </h5>
                        <p>
                          {{ userInfo.week_points }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          النقاط الاسبوعية
                        </h5>
                        <p>
                          {{ userInfo.week_points }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          النقاط السنوية
                        </h5>
                        <p>
                          {{ userInfo.year_points }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-info"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          اجمالي النقاط
                        </h5>
                        <p>
                          {{ userInfo.year_points }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div> -->
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
