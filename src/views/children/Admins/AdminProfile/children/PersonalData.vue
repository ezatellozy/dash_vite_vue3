<template>
  <div class="teacher_data">
    <div class="personal_data_wrapper" v-if="userInfo">
      <div class="order-details-page mt-5 mb-5">
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
                          {{ $t('forms.labels.name') }}
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
                        <i class="fal fa-futbol"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.phone') }}
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
                          {{ $t('forms.labels.email') }}
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
                        <h5 class="title">
                          {{ $t('forms.labels.userType') }}
                        </h5>
                        <p>
                          {{ userInfo.role }}
                        </p>
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
  props: ['userInfo'],

  data() {
    return {
      data: {},
    }
  },

  computed: {
    isActive() {
      return this.userInfo.is_active ? this.$t('active') : this.$t('inactive')
    },

    isBan() {
      return this.userInfo.is_ban ? this.$t('ban') : this.$t('inban')
    },
  },

  methods: {},
}
</script>

<style></style>
