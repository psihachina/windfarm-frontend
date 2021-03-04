<template>
  <apexchart height="400" type="line" :options="chartOptions" :series="series">
  </apexchart>
</template>

<script>
export default {
  props: ["data", "name"],
  data() {
    return {
      chartOptions: {
        legend: {
          position: "top",
        },
        chart: {
          id: "power diagram",
        },
        xaxis: {
          categories: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
        },
      },
      series: [
        {
          name: this.name,
          data: this.data,
        }
      ],
    };
  },
};
</script>