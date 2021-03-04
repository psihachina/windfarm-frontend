 <script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  name: "BarChart",
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    options: function (newOptions, oldOption) {
      console.log(newOptions, oldOption);
      this._chart.destroy();
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRadio: false,
      });
    },
  },
};
</script>