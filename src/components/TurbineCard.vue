<template>
    <v-tabs fixed-tabs centered>
      <v-btn
        @click="$emit('unselectWindfarm')"
        top
        icon
        class="mx-1 align-self-center"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >

      <v-tab> map </v-tab>
      <v-tab> winds </v-tab>
      <v-tab> wind characteristics </v-tab>
      <v-tab> turbines </v-tab>
      <v-tab-item :key="1" transition="scroll-y-transition">
        <v-container>
          <show-windfarm-map :windfarm="windfarm"></show-windfarm-map>
        </v-container>
      </v-tab-item>
      <v-tab-item :key="2" transition="scroll-y-transition">
        <v-container>
          <v-data-table
            :headers="headers"
            :items="winds.data"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
          <v-select
            v-model="selectedHeight"
            :items="height"
            label="Height"
          ></v-select>
          <v-range-slider
            thumb-label
            v-model="hours"
            :max="24"
            :min="0"
            hide-details
            class="align-center"
          />

          <v-row>
            <v-col cols="4"
              ><bar-chart :chart-data="chartEd"></bar-chart
            ></v-col>
            <v-col cols="4">
              <bar-chart :chart-data="chartDd"></bar-chart
            ></v-col>
            <v-col cols="4"
              ><bar-chart :chart-data="chartWe"></bar-chart
            ></v-col>
          </v-row>
        </v-container>
      </v-tab-item>

      <v-tab-item :key="3" transition="scroll-y-transition">
        <v-container>
          <wind-characteristics-table
            title="Average wind speed"
            :data="tableData.avgData"
          ></wind-characteristics-table>

          <wind-characteristics-table
            title="Mean square deviation"
            :data="tableData.stDeData"
          ></wind-characteristics-table>

          <wind-characteristics-table
            title="Dispersion"
            :data="tableData.dpData"
          ></wind-characteristics-table>
        </v-container>
      </v-tab-item>

      <v-tab-item :key="4" transition="scroll-y-transition">
        <v-container><v-btn @click="getAvgData"></v-btn> </v-container>
      </v-tab-item>
    </v-tabs>
</template>

<script>
import ShowWindfarmMap from "./ShowWindfarmMap.vue";
import WindCharacteristicsTable from "./WindCharacteristicsTable.vue";
import BarChart from "./BarChart.vue";

export default {
  components: { ShowWindfarmMap, WindCharacteristicsTable, BarChart },
  props: ["windfarm"],
  watch: {
    hours: function () {
      this.getChartData();
    },
    selectedHeight: function () {
      this.getChartData();
    },
  },
  data() {
    return {
      hours: [0, 24],
      selectedHeight: 200,
      height: [15, 30, 50, 75, 100, 150, 200],
      tableData: {
        avgData: [],
        stDeData: [],
        dpData: [],
      },
      chartData: [],
      chartEd: {},
      chartDd: {},
      chartWe: {},
      options: {
        avgWindponsive: true,
        maintainAspectRatio: false,
      },
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      headers: [
        {
          text: "Date",
          value: "date",
        },
        {
          text: "Time",
          value: "time",
        },
        {
          text: "Speed ( m/s )",
          value: "wind_speed",
        },
        {
          text: "Altitude ( m )",
          value: "altitude",
        },
      ],
    };
  },
  mounted() {
    this.$store
      .dispatch("wind/getWinds", this.windfarm.windfarmId)
      .then(() => this.getAvgData())
      .then(() => {
        this.getChartData();
      });
  }
};
</script>