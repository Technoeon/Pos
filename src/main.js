import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import Checkout from './components/Checkout'

Vue.config.productionTip = false

const routes = [
  {path:'/',component: App},
  {path:'/checkout',component: Checkout}
]
const router = new VueRouter({
  routes
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
