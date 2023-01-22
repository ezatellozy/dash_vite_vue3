<template>
  <div class="teacher_data">
    <!-- Start Main Loader -->

    <!-- End Main Loader -->
    <div class="personal_data_wrapper fadeIn">
      <div class="order-details-page mb-5">
        <div class="row py-2 mx-1 justify-content-center align-items-center">
          <div class="col-12">
            <div class="details border-right-0">
              <div class="col-6 mx-auto mb-5">
                <div class="card-table">
                  <div class="image">
                    <img :src="userInfo.store_data.image" class="img-fluid" />
                  </div>
                  <div class="logo-hidden">
                    <img src="/dashboard/adha/img/logo.dd69a67a.svg" alt="" />
                  </div>
                </div>
              </div>
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
                          {{ userInfo.store_data.store_name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-phone"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.phone') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.phone }} -
                          {{ userInfo.store_data.phone_code }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-envelope"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.email') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.email }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-th-large"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.category') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.category.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-globe"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.country') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.country.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-globe"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.city') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.city.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-globe"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.district') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.district.name }}
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
                        <h5 class="title">{{ $t('forms.labels.is_open') }}؟</h5>
                        <p>
                          <span
                            class="status"
                            :class="
                              userInfo.store_data.is_open
                                ? 'success'
                                : 'canceled'
                            "
                          >
                            {{ userInfo.store_data.is_open ? 'مفتوح' : 'مغلق' }}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-map"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.location_description') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.location_description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 pt-0">
                  <div class="customer">
                    <div class="item">
                      <div class="icon">
                        <i class="fal fa-map"></i>
                      </div>
                      <div class="info">
                        <h5 class="title">
                          {{ $t('forms.labels.location_instruction') }}
                        </h5>
                        <p>
                          {{ userInfo.store_data.location_instruction }}
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
    isActiveManager() {
      return this.userInfo.is_ban ? 'غير مفعل' : ' مفعل'
    },
  },

  methods: {},
}
</script>

<style>
.border-right-0 {
  border-right-width: 0 !important;
}
</style>
