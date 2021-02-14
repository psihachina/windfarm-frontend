<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="green darken-4"
        dark
        v-bind="attrs"
        v-on="on"
        width="100%"
        height="100%"
        outlined
        justify-end
      >
        <div class="wrapper">
          <div class="text-h5">Add new windfarm</div>
          <v-icon style="vertical-align: middle" x-large>mdi-plus-box</v-icon>
        </div>
      </v-btn>
    </template>
    <add-windfarm-card v-if="dialog" v-on:close="close"></add-windfarm-card>
  </v-dialog>
</template>

<script>
import AddWindfarmCard from "./AddWindfarmCard.vue";
export default {
  components: { AddWindfarmCard },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    close() {
      this.dialog = !this.dialog;
    },
  },
};
</script>