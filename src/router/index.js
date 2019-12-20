import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Register from '@/views/Register'
import Filebucket from '@/views/Filebucket'


Vue.use(VueRouter)

const routes = [
  {
     path: '/promo/:promoCode',
     name: 'promo',
     component: require('@/components/Promo').default
  },
  {
    path: '/bucket',
    name: 'filebucket',
    component: Filebucket,
    meta: {
      // noLoginRequired: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      loginRequired: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      noLoginRequired: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      noLoginRequired: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      loginRequired: true
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
