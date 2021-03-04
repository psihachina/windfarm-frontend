import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify';
import Axios from 'axios'
import x5GMaps from 'x5-gmaps'
import VueApexCharts from 'vue-apexcharts'

Vue.use(x5GMaps, { key: 'AIzaSyDTs3gjp3pl-TRUyYh_LOsTjI4CphPBYq4', libraries: ['places', "drawing"] })
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.prototype.$http = Axios;


const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
