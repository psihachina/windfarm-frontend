<template>
  <v-card>
    <v-card-title>
      <span class="headline">
        <v-icon color="red" large v-if="getStatus === 'error' && step === 3"
          >mdi-alert-octagon</v-icon
        >
        <v-icon color="green" large v-if="getStatus === 'success' && step === 3"
          >mdi-checkbox-marked</v-icon
        >
        {{ currentStepTitle }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-window v-model="step">
        <v-window-item :value="1">
          <add-windfarm-map :reset="resetMap" />
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              v-model="windfarmName"
              label="Windfarm name"
              type="text"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="windfarmDescription"
              label="Windfarm description"
              type="text"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="windfarmCapacity"
              label="Windfarm capacity ( kWh )"
              type="number"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <span class="caption grey--text text--darken-1">
              Please enter a name, description and capacity for new windfarm
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center" v-if="getStatus == 'loading'">
            <v-progress-circular
              :size="70"
              :width="7"
              color="green"
              indeterminate
            ></v-progress-circular>
          </div>
          <div class="pa-2 text-center">
            <v-btn
              color="green"
              outlined
              v-if="step === 3 && !isLoading"
              @click="windowNext"
            >
              OK
            </v-btn>
          </div>
        </v-window-item>
      </v-window>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="step !== 3">
      <v-btn :disabled="step === 3" text @click="windowBack"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!isLoading" color="primary" depressed @click="windowNext">
        {{ currentStepBtnNextTitle }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AddWindfarmMap from "./AddWindfarmMap.vue";
export default {
  components: { AddWindfarmMap },
  computed: {
    getStatus() {
      return this.$store.getters["wind/status"];
    },
    isLoading() {
      if (this.getStatus == "loading") {
        return true;
      } else {
        return false;
      }
    },
    lastTitle() {
      switch (this.getStatus) {
        case "success":
          return "Success";
        case "loading":
          return "Loading ...";
        default:
          return "Error";
      }
    },
    currentStepTitle() {
      switch (this.step) {
        case 1:
          return "Select area for windfarm";
        case 2:
          return "Enter details";
        default:
          return this.lastTitle;
      }
    },
    currentStepBtnNextTitle() {
      switch (this.step) {
        case 3:
          return "CLOSE";
        default:
          return "NEXT";
      }
    },
  },
  data() {
    return {
      resetMap: {},
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      step: 1,
      windfarmLatitude: 0,
      windfarmLongitude: 0,
      cityLatitude: 0,
      cityLongitude: 0,
      rangeToCity: 0,
      rangeToRoad: 0,
      rangeToCityLine: 0,
      windfarmName: "",
      windfarmCapacity: 0,
      windfarmDescription: "",
    };
  },
  methods: {
    windowBack() {
      switch (this.step) {
        case 1:
          this.$emit("close");

          break;
        case 2:
          this.step--;
          break;
        default:
          break;
      }
    },
    windowNext() {
      switch (this.step) {
        case 1:
          this.step++;
          break;
        case 2:
          this.step++;
          this.$store.dispatch("windfarm/setDetail", {
            windfarmName: this.windfarmName,
            windfarmDescription: this.windfarmDescription,
            windfarmCapacity: this.windfarmCapacity,
          });
          this.$store.dispatch("windfarm/addWindfarm").then((res) => {
            this.$store.dispatch("wind/addWinds", res.data.id).then((res) => {
              console.log(res);
              this.$store.dispatch("windfarm/getWindfarms");
            });
          });
          break;
        case 3:
          this.$emit("close");
          this.step = 1;
          this.resetData();
          this.resetMap = {};
          break;
        default:
          break;
      }
    },
    resetData() {
      this.windfarmLatitude = 0;
      this.windfarmLongitude = 0;
      this.cityLatitude = 0;
      this.cityLongitude = 0;
      this.rangeToCity = 0;
      this.rangeToRoad = 0;
      this.rangeToCityLine = 0;
    },
  },
};
</script>