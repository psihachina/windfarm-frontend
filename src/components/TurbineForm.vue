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
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="turbine.turbine_name"
                  label="Turbine name"
                  type="text"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="turbine.maximum_power"
                  label="Maximum power"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="turbine.max_wind_speed"
                  label="Maximum wind speed"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="turbine.min_wind_speed"
                  label="Minimal wind speed"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="turbine.tower_height"
                  label="Tower height"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="turbine.number_blades"
                  label="Number of blades"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="turbine.rotor_diameter"
                  label="Rotor diameter"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="turbine.annual_turbine_maintenance"
                  label="Annual turbine maintenance (нужно?)"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-title> Generator output at wind speed </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[0].production"
                  label="2 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[1].production"
                  label="4 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[2].production"
                  label="6 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[3].production"
                  label="8 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[4].production"
                  label="10 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[5].production"
                  label="12 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[6].production"
                  label="14 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[7].production"
                  label="16 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[8].production"
                  label="18 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[9].production"
                  label="20 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[10].production"
                  label="22 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[11].production"
                  label="24 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[12].production"
                  label="26 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[13].production"
                  label="28 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="turbine.outputs[14].production"
                  label="30 m/s"
                  type="number"
                  :rules="rules"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
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
export default {
  computed: {
    getStatus() {
      return this.$store.getters["turbine/status"];
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
          return "Enter turbine information";
        case 2:
          return "Enter details";
        default:
          return this.lastTitle;
      }
    },
    currentStepBtnNextTitle() {
      switch (this.step) {
        case 2:
          return "ADD TURBINE TO DATABASE";
        case 3:
          return "CLOSE";
        default:
          return "NEXT";
      }
    },
  },
  data() {
    return {
      turbine: {
        turbine_name: "",
        maximum_power: 0,
        max_wind_speed: 0,
        min_wind_speed: 0,
        tower_height: 0,
        number_blades: 0,
        rotor_diameter: 0,
        annual_turbine_maintenance: 0,
        outputs: [
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 },
          { production: 0 }
        ],
      },
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      step: 1,
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
          this.$store.dispatch("turbine/addTurbine", this.turbine).then(() => {
            this.$store.dispatch("turbine/getTurbines");
          });
          break;
        case 3:
          this.$emit("close");
          this.step = 1;
          break;
        default:
          break;
      }
    },
  },
};
</script>