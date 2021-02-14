import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/store.js'
import ConstructionCalculation from '../views/ConstructionCalculation.vue'
import WorkAndEquipment from '../views/WorkAndEquipment.vue'
import WindTurbines from '../views/WindTurbines.vue'
import Windfarms from '../views/Windfarms.vue'
import WindHistory from '../views/WindHistory.vue'
import WindEnergyPotential from '../views/WindEnergyPotential.vue'
import Payback from '../views/Payback.vue'
import Icuf from '../views/Icuf.vue'
import Logistic from '../views/Logistic.vue'
import Singup from '../views/Singup.vue'
import Singin from '../views/Singin.vue'

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
    path: '/clccnstr',
    name: 'ConstructionCalculation',
    component: ConstructionCalculation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/wae',
    name: 'WorkAndEquipment',
    component: WorkAndEquipment,
    meta: {
      requiresAuth: true
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
    path: '/windhistory',
    name: 'Wind history',
    component: WindHistory,
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
  },
  {
    path: '/payback',
    name: 'Payback',
    component: Payback,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logistic',
    name: 'Logistic',
    component: Logistic,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/singin',
    name: 'Singin',
    component: Singin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/singup',
    name: 'Singup',
    component: Singup,
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
