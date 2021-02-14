<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="elevation-12">
          <v-window v-model="step" revers>
            <v-window-item :value="1">
              <v-row class="fill-height">
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 text-3">
                      Sing in to Windfarms.ru
                    </h1>
                    <div class="text-center" mt-4>
                      <h4 class="text-center mlt-4">
                        Ensure your email for registration
                      </h4>
                    </div>
                    <v-form>
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="email"
                        v-model="email"
                      >
                      </v-text-field>
                      <v-text-field
                        id="password"
                        label="Password"
                        name="Password"
                        prepend-icon="mdi-lock"
                        v-model="password"
                        type="password"
                      >
                      </v-text-field>
                    </v-form>
                    <h5 class="text-center mt-2 px2">Forget your password?</h5>
                  </v-card-text>
                  <div class="text-center mb-2">
                    <v-btn color="green" dark @click="login"> SING IN </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="green">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center dispaly-1">Hello, frends !</h1>
                    <h5 class="text-center">
                      Enter your personal details and jornay with us
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn outlined="" dark @click="step++">SING UP</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="green">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center dispaly-1">Welcome Back !</h1>
                    <h5 class="text-center">
                      To Keep connected with us please login ith your personal
                      info
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn outlined="" dark @click="step--">SING IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 text-3">Create account</h1>
                    <div class="text-center" mt-4>
                      <h4 class="text-center mlt-4">
                        Ensure your email for registration
                      </h4>
                    </div>

                    <v-form>
                      <v-text-field
                        label="Email"
                        name="Email"
                        prepend-icon="mdi-email"
                        v-model="email"
                        type="email"
                      >
                      </v-text-field>
                      <v-text-field
                        id="password"
                        label="Password"
                        name="Password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                      >
                      </v-text-field>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-5 mb-5">
                    <v-btn color="green" dark @click="register">
                      SING UP
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("auth/login", { email, password })
        .then(() => this.$router.push("/windfarms"))
        .catch((err) => console.log(err));
    },
    register: function () {
      let data = {
        email: this.email,
        password: this.password,
      };
      this.$store
        .dispatch("auth/register", data)
        .then(() => this.$router.push("/windfarms"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.px2 {
  margin-bottom: 2px;
}
</style>