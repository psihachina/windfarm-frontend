<template>
  <div>
    <v-card-title>
      {{title}}
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="this.data"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  props: ["title","data"],
  data() {
    return {
      headers: [
        {
          text: "Time",
          value: "time",
        },
        {
          text: "15",
          value: "15",
        },
        {
          text: "30",
          value: "30",
        },
        {
          text: "50",
          value: "50",
        },
        {
          text: "75",
          value: "75",
        },
        {
          text: "100",
          value: "100",
        },
        {
          text: "150",
          value: "150",
        },
        {
          text: "200",
          value: "200",
        },
      ],
    }
  },
  methods: {
    items() {
      return this.data;
    },
  },
};
</script>