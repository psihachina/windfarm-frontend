import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify';
import Axios from 'axios'
import x5GMaps from 'x5-gmaps'

Vue.use(x5GMaps, { key: 'AIzaSyDTs3gjp3pl-TRUyYh_LOsTjI4CphPBYq4', libraries: ['places',"drawing"] })

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
