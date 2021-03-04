<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center pa-2" v-for="(item, i) in headers" :key="i">
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in dataTable" :key="i">
            <td class="text-center pa-2" v-for="(item, i) in data" :key="i">
              {{ item }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-col cols="6">
      <v-text-field
        label="Number of turbines"
        hide-details="auto"
        type="number"
        v-model="numberTurbines"
      ></v-text-field>
    </v-col>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center pa-2">Average power (Kw)</th>
            <th class="text-center pa-2">ICUF(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center pa-2">{{ avg.toFixed(2) }}</td>
            <td class="text-center pa-2">{{ icuf }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import {
  compare,
  filterWindsByTime,
  splitWindsHourly,
  dataToArray,
} from "../functions/winds";

export default {
  props: ["data", "windfarm"],
  watch: {
    windfarm: function (newWindfarm) {
      this.$store.dispatch("wind/getWinds", newWindfarm.windfarmId).then(() => {
        this.dataTable = this.getIcufData();
      });
    },
  },
  data() {
    return {
      numberTurbines: 1,
      sum: 0,
      maxProd: 0,
      headers: [],
      dataTable: [],
    };
  },
  methods: {
    getIcufHeaders() {
      let headers = [];
      headers.push("Time");
      for (let index = 0; index < 31; index++) {
        headers.push(index);
      }
      headers.push("AVG");
      headers.push("ICUF (%)");
      return headers;
    },
    generateHours(data, hourMid) {
      let newData = [];
      for (const i in data) {
        for (let j = 0; j <= 5; j++) {
          let hour = parseInt(data[i].time.split(":")[0]) + j;
          newData.push({
            ...data[i],
            time: hour + ":00:00",
            wind_speed:
              parseFloat(data[i].wind_speed) +
              parseFloat(hourMid[hour][data[i].altitude].c) * j,
          });
        }
      }
      return newData;
    },
    getIcufData() {
      let data = [];

      let height = this.data.tower_height;

      if (height < 15) {
        height = [15, 15, parseInt(height)];
      } else if (height > 15 && height < 30) {
        height = [15, 30, parseInt(height)];
      } else if (height > 30 && height < 50) {
        height = [30, 50, parseInt(height)];
      } else if (height > 50 && height < 75) {
        height = [50, 75, parseInt(height)];
      } else if (height > 75 && height < 100) {
        height = [75, 100, parseInt(height)];
      } else if (height > 100) {
        height = [parseInt(height), parseInt(height), parseInt(height)];
      }

      if (
        height == 15 ||
        height == 30 ||
        height == 50 ||
        height == 75 ||
        height == 100
      )
        height = [parseInt(height), parseInt(height), parseInt(height)];
      let nTurbineProd = [0, 0];
      for (let i = 0; i < this.data.outputs.length; i++) {
        nTurbineProd.push(this.data.outputs[i].production);

        //Мощность для нечетных скоростей ветра
        if (this.data.outputs[i + 1] != undefined)
          nTurbineProd.push(
            (this.data.outputs[i + 1].production -
              this.data.outputs[i].production) /
              2 +
              this.data.outputs[i].production
          );
      }

      let winds = filterWindsByTime(this.winds);

      let hoursData = splitWindsHourly(winds);

      let globAvg = compare(winds)
      console.log(hoursData);

      console.log(globAvg);


      let hourD = this.generateHours(this.winds.data, hoursData);

      console.log(hourD);

      let sumArray = [];
      let maxProd = Math.max.apply(null, nTurbineProd);

      let dh = height[0] >= 100 ? 100 : height[0];
      for (let i = 0; i < 24; i++) {
        let y = dataToArray(hourD, dh, [i, i + 1]);
        console.log(y);
        let k =
          (globAvg[i][height[1]] - globAvg[i][height[0]]) /
          (height[1] - height[0]);
        k = (height[2] - height[0]) * k + globAvg[i][height[0]];

        k = k / globAvg[i][height[0]];

        if (height[0] == height[1]) k = 1;
        if (height[0] > 100) {
          k = (height[0] / 100).toFixed(1);
          k = k > 1.5 ? 1.5 : k;
        }

        data.push({ time: `${i}-${i + 1}` });

        let sum = 0;

        for (let row in y) {
          data[i] = { ...data[i], [row]: y[row] };
          if (nTurbineProd[row]) {
            sum += y[row] * nTurbineProd[row];
          }
        }
        sum = sum * k;
        sumArray.push(parseFloat((sum / 365).toFixed(2)));
        data[i] = { ...data[i], avg: (sum / 365).toFixed(2) };
        data[i] = {
          ...data[i],
          icuf: ((sum / 365 / maxProd) * 100).toFixed(2),
        };
      }

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.sum = sumArray.reduce(reducer) / 24;
      this.maxProd = maxProd;
      console.log(this.sum, this.maxProd);
      return data;
    },
  },
  computed: {
    winds() {
      return this.$store.getters["wind/winds"];
    },
    icuf() {
      return ((this.sum / this.maxProd) * 100).toFixed(2);
    },
    avg() {
      return this.sum * this.numberTurbines;
    },
  },
  mounted() {
    this.headers = this.getIcufHeaders();
    this.$store.dispatch("wind/getWinds", this.windfarm.windfarmId).then(() => {
      this.dataTable = this.getIcufData();
    });
  },
};
</script>

<style>
.v-table th {
  font-size: 8px;
}
.v-table td {
  font-size: 8px;
}
</style>