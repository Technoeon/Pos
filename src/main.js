import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import vuetify from './plugins/vuetify';
// import Vuetify from "vuetify";
// import VueRouter from 'vue-router'
import router from './routes'

Vue.config.productionTip = false

// const router = new VueRouter({
//   routes
// })
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
