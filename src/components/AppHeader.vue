<template>
  <div>
    <v-navigation-drawer permanent expand-on-hover app>
      <v-list flat nav>
        <v-list-item logo>
          <v-list-item-icon logo>
            <img width="24" height="24" src="../assets/logo.png" />
          </v-list-item-icon>
          <v-list-item-title>WINDFARMS.RU</v-list-item-title>
        </v-list-item>
        <v-list-item flat>
          <v-list-item-content>
            <v-list-item-title class="title">
              psihachina@gmail.com
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item
          v-for="(item, i) in menuItems"
          link
          :key="`menuitem${i}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    menuItems() {
      return [
        {
          icon: "mdi-format-list-bulleted",
          title: "Windfarms",
          route: "/windfarms",
        },
        {
          icon: "mdi-weather-windy",
          title: "Wind history",
          route: "/windhistory",
        },
        {
          icon: "mdi-lightning-bolt",
          title: "Wind energy potential",
          route: "/wep",
        },
        {
          icon: "mdi-wind-turbine",
          title: "Wind turbines",
          route: "/windturbines",
        },
        {
          icon: "mdi-chart-bar",
          title: "ICUF",
          route: "/icuf",
        },
        {
          icon: "mdi-tools",
          title: "Work and equipment",
          route: "/wae",
        },
        {
          icon: "mdi-account-hard-hat",
          title: "Construction calculation",
          route: "/clccnstr",
        },
        {
          icon: "mdi-calculator",
          title: "Payback calculation",
          route: "/payback",
        },
      ];
    },
  },
};
</script>