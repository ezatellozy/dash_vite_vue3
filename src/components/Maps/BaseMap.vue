<template>
  <div style="width: 100%; border-radius: 15px; overflow: hidden;">
    <!-- path != null ? {lat: 0, lng: 0}: path[0] -->
    <!-- {{ $route.path.includes('cities') }} -->
    <div class="input_wrapper top_label">
      <input
        type="text"
        class="form-control"
        aria-describedby="searchMap"
        placeholder="اختر موقع "
        id="autocomplete_ar"
        @click="getAddress"
      />
    </div>
    <GmapMap
      style="width: 100%; min-height: 300px; max-height: 100%;"
      :zoom="10"
      :center="mapCenter"
      ref="map"
      @click="generate"
    >
      <!-- ========= Draw Path -->

      <gmap-custom-marker :marker="mapCenter">
        <img width="40" src="@/assets/images/marker.png" />
      </gmap-custom-marker>
      <div v-if="multiMarkers">
        <gmap-polyline
          :path.sync="markers"
          :options="{ strokeColor: strokeColor, strokeWeight: 5 }"
        ></gmap-polyline>
        <GmapMarker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker"
          :draggable="true"
          @drag="markerdraged(index, $event)"
          @click="removeMarker(index)"
        />
      </div>
    </GmapMap>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker'
export default {
  props: {
    strokeColor: {
      type: String,
      required: false,
      default: '#1A73E8',
    },
    biggingMarkers: {
      type: Array,
      required: false,
    },
    multiMarkers: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  components: { GmapCustomMarker },

  data() {
    return {
      markers: [],
      path: [],
      place: null,
      mapCenter: {
        lat:
          this.biggingMarkers.length > 0
            ? this.biggingMarkers[0].lat
            : 25.81186323287363,
        lng:
          this.biggingMarkers.length > 0
            ? this.biggingMarkers[0].lng
            : 45.31568515062242,
      },
    }
  },

  methods: {
    // START:: GET ADDRESS METHOD
    getAddress() {
      var self = this
      var input = document.getElementById('autocomplete_ar')
      var searchBox = new google.maps.places.SearchBox(input)
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces()
        if (places.length == 0) {
          return
        }
        var bounds = new google.maps.LatLngBounds()
        places.forEach(function (place) {
          bounds.extend(place.geometry.location)
          place.geometry.location.lng()
          place.geometry.location.lat()
          place.formatted_address
          self.mapCenter.lng = place.geometry.location.lng()
          self.mapCenter.lat = place.geometry.location.lat()
          // self.firestStepRegisterUserData.location.address =
          //     place.formatted_address;
        })
        self.$emit('getAddress', self.mapCenter)
      })
    },
    // END: GET ADDRESS METHOD

    generate(e) {
      let marker = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.center = {
        ...marker,
      }

      this.markers.push(marker)
      // this.path.push(marker);

      this.$emit('markersChanged', this.markers)
    },

    removeMarker(index) {
      this.markers.splice(index, 1)
      this.$emit('markersChanged', this.markers)
    },

    markerdraged(index, e) {
      let marker = { lat: e.latLng.lat(), lng: e.latLng.lng() }

      this.center = {
        ...marker,
      }

      this.$set(this.markers, index, marker)
      this.$set(this.path, index, marker)

      this.$emit('markersChanged', this.markers)
    },
  },

  created() {
    this.markers = this.biggingMarkers
    // this.path = this.biggingMarkers;
  },
}
</script>
