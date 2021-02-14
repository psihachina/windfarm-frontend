<template>
  <gmaps-map @mounted="ready" id="map">
    <gmaps-polygon
      :editable=true
      :path="items"
      @pathChanged="items = $event"
      fillColor="red"
      strokeColor="dodgerblue"
      strokeWeight="5"
    />
  </gmaps-map>
</template>

<script>
import { gmapsMap, gmapsPolygon } from "x5-gmaps";

export default {
  components: { gmapsMap, gmapsPolygon },
  props: {
    windfarm: Object,
  },
  data() {
    return {
      map: null,
      service: null,
      directionsRenderer: null,
      directionsService: null,
      mode: null,
      items: null,
    };
  },
  methods: {
    ready(map) {
      this.map = map;
      this.$GMaps().then((maps) => {
        this.service = new maps.places.PlacesService(this.map);
        this.directionsRenderer = new maps.DirectionsRenderer();
        this.directionsService = new maps.DirectionsService();
        this.mode = maps.TravelMode["DRIVING"];
        this.getRouteToCity(maps);
      });
    },
    async getRouteToCity(maps) {
      console.log(this.windfarm.polygon.P);
      let start = new maps.LatLng(
        this.windfarm.windfarmLatitude,
        this.windfarm.windfarmLongitude
      );
      let end = new maps.LatLng(
        this.windfarm.cityLongitude,
        this.windfarm.cityLatitude
      );
      return new Promise((resolve, reject) =>
        this.directionsService.route(
          {
            origin: start,
            destination: end,
            travelMode: maps.TravelMode["DRIVING"],
          },
          (results, status) => {
            if (status == "OK") {
              this.directionsRenderer.setDirections(results);
              this.directionsRenderer.setMap(this.map);
              resolve(results);
            } else {
              reject("Request failed: " + status);
            }
          }
        )
      );
    },
    getPoints() {
      const temp = [];
      this.windfarm.polygon.P.forEach((element) => {
        temp.push({ lat: element.X, lng: element.Y });
      });
      this.items = temp;
    },
  },
  created() {
    this.getPoints();
    console.log(this.items);
  },
};
</script>

<style scoped>
#map {
  height: 400px;
}
</style>