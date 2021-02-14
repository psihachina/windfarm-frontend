<template>
  <div>
    <v-container>
      <v-row>
        <v-col><div class="text-h3">WINDFARMS</div></v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <add-windfarm-dialog>
          </add-windfarm-dialog>
        </v-col>
        <v-col
          cols="4"
          link
          v-for="(item, i) in windfarmList"
          :key="`windfarmitem${i}`"
          @click="selectWindfarm(item)"
        >
          <v-card>
            <v-card-title class="green darken-2 white--text">
              {{ item.windfarmName }}
            </v-card-title>
            <v-list flat>
              <v-list-item-group>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1"
                      >Description</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      item.windfarmDescription
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Capacity</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ item.windfarmCapacity }} kWh</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-card-actions>
              <more-dialog :windfarm="item"></more-dialog>
              <v-btn color="green darken-1" dark>
                <v-icon>mdi-pencil</v-icon>
                EDIT
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="deleteWindfarm(item.windfarmId)">
                <v-icon>mdi-delete</v-icon>
                DELETE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AddWindfarmDialog from "../components/AddWindfarmDialog.vue";
import MoreDialog from "../components/MoreDialog.vue";

export default {
  components: {
    AddWindfarmDialog,
    MoreDialog,
  },
  data() {
    return {
      step: 1,
      selectedWindfarm: null,
    };
  },
  mounted() {
    this.$store.dispatch("windfarm/getWindfarms");
  },
  computed: {
    windfarmList() {
      return this.$store.getters["windfarm/windfarms"];
    },
  },
  methods: {
    deleteWindfarm(id) {
      this.$store.dispatch("windfarm/deleteWindfarm", id).then(() => {
        this.$store.dispatch("windfarm/getWindfarms");
      });
    },
    selectWindfarm(item) {
      this.selectedWindfarm = item;
    },
  },
};
</script>

<style scoped>
</style>