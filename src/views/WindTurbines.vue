<template>
  <v-container>
    <v-row>
      <v-flex>
        <v-card class="mx-auto rounded-t-lg mt-3" v-if="!selectedTurbine">
          <v-toolbar>
            <h2>Wind turbines</h2>
            <v-spacer></v-spacer>
            <open-dialog :buttonText="'Add turbine'">
              <template v-slot="{ dialog, close }">
                <turbine-form v-if="dialog" v-on:close="close"></turbine-form>
              </template>
            </open-dialog>
          </v-toolbar>
          <v-list>
            <div v-if="!turbineList" class="text-center">
              There are no wind turbines! Add new turbines!
            </div>
            <template v-for="(item, i) in turbineList">
              <v-list-item :key="item.turbineID" link>
                <v-list-item-content
                  @click="selectTurbine(item)"
                  v-if="item.turbine_name"
                >
                  <v-list-item-title>{{ item.turbine_name }}</v-list-item-title>
                  <v-list-item-subtitle
                    >Maximum power:
                    {{ item.maximum_power }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle
                    >Annual turbine maintenance:
                    {{ item.annual_turbine_maintenance }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action class="d-flex flex-row">
                  <v-btn
                    dark
                    color="red"
                    @click="deleteTurbine(item.turbineID)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="i" :inset="item.inset"></v-divider>
            </template>
          </v-list>
        </v-card>

        <v-card class="mx-auto rounded-t-lg mt-3 mb-3" v-if="selectedTurbine">
          <v-card-actions
            ><v-btn
              @click="unselectTurbine"
              top
              icon
              class="mx-1 align-self-center"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >
          </v-card-actions>
          <v-card-title>
            {{ selectedTurbine.turbine_name }}
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Maximum power</th>
                  <th class="text-left">Min wind speed</th>
                  <th class="text-left">Max wind speed</th>
                  <th class="text-left">Blades</th>
                  <th class="text-left">Tower height</th>
                  <th class="text-left">Rotor diameter</th>
                  <th class="text-left">Annual turbine maintenance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ selectedTurbine.maximum_power }}</td>
                  <td>{{ selectedTurbine.min_wind_speed }}</td>
                  <td>{{ selectedTurbine.max_wind_speed }}</td>
                  <td>{{ selectedTurbine.number_blades }}</td>
                  <td>{{ selectedTurbine.tower_height }}</td>
                  <td>{{ selectedTurbine.rotor_diameter }}</td>
                  <td>{{ selectedTurbine.annual_turbine_maintenance }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Power diagram</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <chart :data="chartData"></chart>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-col cols="6">
            <v-select
              v-model="selectedWindfarm"
              :items="windfarmList"
              item-text="windfarmName"
              item-value="windfarmId"
              label="Windfarm"
              persistent-hint
              return-object
              outlined
            ></v-select>
          </v-col>
          <icuf-table v-if="selectedWindfarm"
            :data="selectedTurbine"
            :windfarm="selectedWindfarm"
          ></icuf-table>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "../components/Chart.vue";
import OpenDialog from "../components/OpenDialog.vue";
import TurbineForm from "../components/TurbineForm.vue";
import IcufTable from "../components/IcufTable.vue";
export default {
  components: { OpenDialog, TurbineForm, Chart, IcufTable },
  data() {
    return {
      selectedWindfarm: null,
      selectedTurbine: null,
    };
  },
  methods: {
    deleteTurbine(id) {
      this.$store.dispatch("turbine/deleteTurbine", id).then(() => {
        this.$store.dispatch("turbine/getTurbines");
      });
    },
    selectTurbine(item) {
      this.selectedTurbine = item;
    },
    unselectTurbine() {
      this.selectedTurbine = null;
    },
  },
  computed: {
    windfarmList() {
      return this.$store.getters["windfarm/windfarms"];
    },
    turbineList() {
      return this.$store.getters["turbine/turbines"];
    },
    chartData() {
      return this.selectedTurbine.outputs.map((x) => x.production);
    },
  },
  mounted() {
    this.$store.dispatch("turbine/getTurbines");
    this.$store.dispatch("windfarm/getWindfarms");
  },
};
</script>

<style lang="scss" scoped>

</style>