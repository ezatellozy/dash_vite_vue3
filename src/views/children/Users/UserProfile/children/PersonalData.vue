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
                <div class="col-12 fadeIn">
                  <div class="large-map">
                    <GmapMap
                      style="width: 100%; min-height: 300px; max-height: 100%"
                      :center="{
                        lat: userInfo.lat
                          ? userInfo.lat
                          : coordinates_to_edit.lat,
                        lng: userInfo.lng
                          ? userInfo.lng
                          : coordinates_to_edit.lng,
                      }"
                      :zoom="7"
                      :draggable="true"
                      map-type-id="terrain"
                    >
                      <GmapMarker
                        :position="{
                          lat: userInfo.lat
                            ? userInfo.lat
                            : coordinates_to_edit.lat,
                          lng: userInfo.lng
                            ? userInfo.lng
                            : coordinates_to_edit.lng,
                        }"
                        :clickable="false"
                        :draggable="false"
                      />
                    </GmapMap>
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
      center: {},
      markers: null,
      coordinates_to_edit: { lat: 0, lng: 0 },
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

  methods: {
    // ============== Get User Location
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // this.$axios({
          //   method: "get",
          //   url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyAITrPfT5r_qmCm_8ekZyPmnebGo8o_r18`,
          // })
          //   .then((res) => {
          //     console.log(res.data.results[0].formatted_address);
          //   })
          //   .catch(() => {});
          console.log(position);

          this.markers = [
            {
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
          ];
          this.center = this.markers[0].position;
          this.coordinates_to_edit.lat = this.center.lat;
          this.coordinates_to_edit.lng = this.center.lng;
        });
      }
    },
  },
  created() {
    this.getLocation();
  },
};
</script>

<style>
.border-right-0 {
  border-right-width: 0 !important;
}
</style>
