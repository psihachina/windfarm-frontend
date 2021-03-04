<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on">
        <div>
          {{ buttonText }}
          <v-icon style="vertical-align: middle">{{ icon }}</v-icon>
        </div>
      </v-btn>
    </template>
    <slot :dialog="dialog" :close="close"></slot>
  </v-dialog>
</template>

<script>
export default {
  props: ["buttonText", "icon"],
  data() {
    return {
      dialog:false
    }
  },
  methods: {
    close() {
      this.dialog = !this.dialog;
    },
  },
};
</script>