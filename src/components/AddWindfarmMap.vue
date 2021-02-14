<template>
  <gmaps-map @mounted="ready" :options="mapOptions" id="map"> </gmaps-map>
</template> 

<script>
import { gmapsMap } from "x5-gmaps";

export default {
  components: { gmapsMap },
  props: ["reset"],
  watch: {
    reset() {
      this.markerWindfarm.setMap(null);
      this.overlay.setMap(null);
      this.windfarmToCityLine.setMap(null);
      this.service = null;
      this.directionsRenderer.setMap(null);
      this.directionsService = null;
      this.map = null;
      this.initMap();
    },
  },
  data() {
    return {
      mapOptions: { center: { lat: 55.75, lng: 37.61 }, zoom: 7 },
      map: null,
      service: null,
      directionsRenderer: null,
      directionsService: null,
      drawingManager: null,
      radius: 30000,
      step: 10,
      polygon: [],
      windfarmLatLng: {},
      cityLatLng: {},
      rangeToRoad: null,
      rangeToCity: null,
      rangeToCityLine: null,
      area: 0,
      elevationsWindfarm: new Array(),
      markerWindfarm: null,
      overlay: null,
      city: null,
    };
  },
  methods: {
    ready(map) {
      this.map = map;
      this.$GMaps().then((maps) => {
        this.service = new maps.places.PlacesService(this.map);
        this.directionsRenderer = new maps.DirectionsRenderer();
        this.directionsService = new maps.DirectionsService();
        this.drawingManager = new maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: maps.ControlPosition.TOP_CENTER,
            drawingModes: [maps.drawing.OverlayType.POLYGON],
          },
        });
        this.drawingManager.setMap(this.map);
        this.mode = maps.TravelMode["DRIVING"];

        maps.event.addListener(
          this.drawingManager,
          "overlaycomplete",
          (event) => {
            this.getPolygon(event, maps);
            this.getNearbyCity(maps).then((res) => {
              console.log("getNearbyCity: ", res);
              console.log("getNearbyCity: ", this.cityLatLng);
              this.getRouteToCity(maps).then((res) => {
                this.rangeToCityLine = this.haversineDistance(
                  this.windfarmLatLng,
                  this.cityLatLng
                );
                this.rangeToRoad = this.haversineDistance(
                  this.windfarmLatLng,
                  res.routes[0].legs[0].start_location
                );
                this.rangeToCity =
                  this.rangeToRoad +
                  res.routes[0].legs[0].distance.value / 1000;
                console.log("cityLat: ", this.cityLatLng.lat());
                console.log("cityLng: ", this.cityLatLng.lng());
                console.log("windfarmLat: ", this.windfarmLatLng.lat());
                console.log("windfarmLng: ", this.windfarmLatLng.lng());
                this.$store.dispatch("windfarm/setMapData", {
                  polygon: this.polygon,
                  windfarmLatitude: this.windfarmLatLng.lat(),
                  windfarmLongitude: this.windfarmLatLng.lng(),
                  cityLatitude: this.cityLatLng.lat(),
                  cityLongitude: this.cityLatLng.lng(),
                  rangeToCityLine: this.rangeToCityLine,
                  rangeToRoad: this.rangeToRoad,
                  rangeToCity: this.rangeToCity,
                });
                console.log(this.$store.getters["windfarm/windfarm"]);
              });
            });
          }
        );
      });
    },
    routeCallback(results, status) {
      console.log(status);
      console.log(results);
      if (status == "OK") {
        this.directionsRenderer.setDirections(results);
        this.directionsRenderer.setMap(this.map);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    },
    async getRouteToCity(maps) {
      let start = new maps.LatLng(
        this.windfarmLatLng.lat(),
        this.windfarmLatLng.lng()
      );
      let end = new maps.LatLng(this.cityLatLng.lat(), this.cityLatLng.lng());
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
    async getNearbyCity(maps) {
      let request = {
        location: this.center,
        radius: 30000,
        type: ["administrative_area_level_3", "political", "locality"],
      };

      return new Promise((resolve, reject) =>
        this.service.nearbySearch(request, (results, status) => {
          if (status == maps.places.PlacesServiceStatus.OK) {
            this.city = results[0];
            console.log(results[0]);
            this.cityLatLng = results[0].geometry.location;
            console.log("nearbyCallback ", this.cityLatLng);
            this.markerWindfarm = new maps.Marker({
              map: this.map,
              position: new maps.LatLng(
                this.cityLatLng.lat(),
                this.cityLatLng.lng()
              ),
            });
            resolve(results[0]);
          } else {
            reject("Request failed: " + status);
          }
        })
      );
    },
    getPolygon(event, maps) {
      if (this.markerWindfarm != null || this.overlay != null) {
        this.markerWindfarm.setMap(null);
        this.overlay.setMap(null);
      }
      this.overlay = event.overlay;
      if (event.type == "polygon") {
        this.elevations = [];
        let bounds = new maps.LatLngBounds();
        this.area = maps.geometry.spherical.computeArea(this.overlay.getPath());
        console.log("Path", this.overlay.getPath());
        let poly = "";
        this.overlay.getPath().forEach(function (element) {
          bounds.extend(element);
          poly += `(${element.lat()},${element.lng()}),`;
        });
        this.polygon = poly;
        console.log(this.polygon);
        console.log(bounds);
        this.center = bounds.getCenter();
        this.windfarmLatLng = this.center;
      }
    },
    drawLine(start, end) {
      this.$GMaps().then((maps) => {
        let line = new maps.Polygon({
          pathis: [start, end],
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
        line.setMap(this.map);
        return line;
      });
    },
    haversineDistance(mk1, mk2) {
      var R = 6371; // Radius of the Earth in km
      var rlat1 = mk1.lat() * (Math.PI / 180); // Convert degrees to radians
      var rlat2 = mk2.lat() * (Math.PI / 180); // Convert degrees to radians
      var difflat = rlat2 - rlat1; // Radian difference (latitudes)
      var difflon = (mk2.lng() - mk1.lng()) * (Math.PI / 180); // Radian difference (longitudes)

      var d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );
      return d;
    },
  },
};
</script>

<style scoped>
#map {
  height: 400px;
}
</style>