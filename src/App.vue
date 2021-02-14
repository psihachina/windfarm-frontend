<template>
  <v-app>
    <app-header v-if="isLoggedIn"></app-header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader";
import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    AppHeader,
  },
  computed: {
    ...mapGetters("auth", {
      isLoggedIn: "isLoggedIn",
    }),
  },
  created: function () {
    this.$http.interceptors.response.use(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      (err) => {
        if (err.response.status) {
          switch (err.response.status) {
            case 401:
              this.$store.dispatch("auth/logout");
              break;

            default:
              break;
          }
        }
      }
    );
  },
};
</script>

<style>
</style>
