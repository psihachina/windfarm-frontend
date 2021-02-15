<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Show more </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="green">
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-tabs color="deep-purple accent-4" background-color="green">
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab> map </v-tab>
          <v-tab> winds </v-tab>
          <v-tab> wind characteristics </v-tab>
          <v-tab> turbines </v-tab>

          <v-tab-item :key="1">
            <v-container>
              <show-windfarm-map :windfarm="windfarm"></show-windfarm-map>
            </v-container>
          </v-tab-item>

          <v-tab-item :key="2">
            <v-container>
              <v-data-table
                :headers="headers"
                :items="winds.data"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>

              <bar-chart :chart-data="chartData" :options="options"></bar-chart>
            </v-container>
          </v-tab-item>

          <v-tab-item :key="3">
            <v-container>
              <wind-characteristics-table
                title="Average wind speed"
                :data="avgData"
              ></wind-characteristics-table>

              <wind-characteristics-table
                title="Mean square deviation"
                :data="stDeData"
              ></wind-characteristics-table>

              <wind-characteristics-table
                title="Dispersion"
                :data="dpData"
              ></wind-characteristics-table>
            </v-container>
          </v-tab-item>

          <v-tab-item :key="4">
            <v-container><v-btn @click="getAvgData"></v-btn> </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import BarChart from "./BarChart.vue";
import ShowWindfarmMap from "./ShowWindfarmMap.vue";
import WindCharacteristicsTable from "./WindCharacteristicsTable.vue";

export default {
  components: { ShowWindfarmMap, BarChart, WindCharacteristicsTable },
  props: ["windfarm"],
  data() {
    return {
      avgData: [],
      stDeData: [],
      dpData: [],
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Data One",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
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
      .then(() => this.getAvgData());
  },
  computed: {
    winds() {
      return this.$store.getters["wind/winds"];
    },
  },
  methods: {
    getAvgData() {
      let filter = [];
      for (let i = 0; i < this.winds.data.length; i++) {
        let windH = this.winds.data[i].altitude;
        if (!filter[windH]) {
          filter[windH] = [];
        }
        if (!filter[windH][this.winds.data[i].time]) {
          filter[windH][this.winds.data[i].time] = [];
        }
        filter[windH][this.winds.data[i].time].push(this.winds.data[i]);
      }

      let dat = {};
      for (const height in filter) {
        for (const time in filter[height]) {
          if (!dat[time]) dat[time] = [];
          dat[time][height] = {
            avg: (
              filter[height][time].reduce((a, b) => {
                return (
                  (parseFloat(a.wind_speed) || a) + parseFloat(b.wind_speed)
                );
              }) / filter[height][time].length
            ).toFixed(4),
          };
        }
      }

      let avgWindTable = {};

      for (const i in [...Array(24).keys()]) {
        avgWindTable[i] = {};
      }

      this.compare(dat["00:00:00"], dat["06:00:00"], 1, 6, "00:00:00");
      this.compare(dat["06:00:00"], dat["12:00:00"], 7, 12, "06:00:00");
      this.compare(dat["12:00:00"], dat["18:00:00"], 13, 18, "12:00:00");
      this.compare(dat["00:00:00"], dat["18:00:00"], 19, 24, "18:00:00");
    },
    compare(ar1, ar2, h1, h2, time) {
      let avgWind = [];
      let stDeWind = [];
      let dpWind = [];

      for (let i = h1; i <= h2; i++) {
        avgWind[i] = i;
        stDeWind[i] = i;
        dpWind[i] = i;
      }

      for (const height in ar1) {
        let c = (ar2[height].avg - ar1[height].avg) / 6;
        let counter = 0;
        for (const i in avgWind) {
          let avg = (parseFloat(ar1[height].avg) + c * counter).toFixed(4);
          let st_de_ar = this.winds.data.filter(
            (it) => it.time == time && it.altitude == height
          );
          let st_de = st_de_ar.reduce((acc, it) => {
            if (acc.wind_speed)
              return (acc.wind_speed - avg) ** 2 + (it.wind_speed - avg) ** 2;
            return acc + (it.wind_speed - avg) ** 2;
          });
          st_de = Math.sqrt(st_de / st_de_ar.length).toFixed(4);

          let dp_ar = this.winds.data.filter(
            (it) => it.time == time && it.altitude == height
          );
          let dp =
            dp_ar.reduce((acc, it) => {
              if (acc.wind_speed)
                return acc.wind_speed ** 2 + it.wind_speed ** 2;
              return acc + it.wind_speed ** 2;
            }) / dp_ar.length;
          dp = Math.abs(dp - avg ** 2).toFixed(4);

          avgWind[i] = { ...avgWind[i], [height]: avg };
          stDeWind[i] = { ...stDeWind[i], [height]: st_de };
          dpWind[i] = { ...dpWind[i], [height]: dp };

          counter++;
        }
        for (let i = h1; i <= h2; i++) {
          avgWind[i] = { ...avgWind[i], time: i - 1 };
          stDeWind[i] = { ...stDeWind[i], time: i - 1 };
          dpWind[i] = { ...dpWind[i], time: i - 1 };
        }
      }

      this.avgData = [...this.avgData, ...Object.values(avgWind)];
      this.stDeData = [...this.stDeData, ...Object.values(stDeWind)];
      this.dpData = [...this.dpData, ...Object.values(dpWind)];
    },
  },
};
</script>