import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/store.js'
import WindTurbines from '../views/WindTurbines.vue'
import Windfarms from '../views/Windfarms.vue'
import WindEnergyPotential from '../views/WindEnergyPotential.vue'
import Icuf from '../views/Icuf.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/windturbines',
    name: 'WindTurbines',
    component: WindTurbines,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/windfarms',
    name: 'Windfarms',
    component: Windfarms,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/wep',
    name: 'Wind energy potential',
    component: WindEnergyPotential,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/icuf',
    name: 'ICUF',
    component: Icuf,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})


router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/windfarms')
  } else {
    next()
  }
})

export default router
