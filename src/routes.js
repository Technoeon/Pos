import Vue from 'vue'
import store from './store'
import Login from './components/Login'
import HelloWorld from './components/HelloWorld'
import Checkout from './components/Checkout'
import Invoice from './components/Invoice'
import Router from 'vue-router';

Vue.use(Router)


const router = new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [ 
    {
        path: '/', 
        component: Login,
        meta: {
        requiresGuest: true
      }
    },
    {
        path: '/home', 
        component: HelloWorld,
        meta: {
        requiresAuth: true
      }
    },
    {
        path: '/checkout', 
        component: Checkout,
        meta: {
        requiresAuth: true
      }
    },
    {
        path:'/invoice', 
        component: Invoice,
        meta: {
        requiresAuth: true
      }
    }
]
})
// console.log('check user', store.state.userData)
// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!store.state.userData) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (store.state.userData) {
      // Go to login
      next({
        path: '/home',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router;