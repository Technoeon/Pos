import Vue from 'vue';
import Login from './components/Login'
import HelloWorld from './components/HelloWorld'
import Checkout from './components/Checkout'
import Router from 'vue-router';

Vue.use(Router)

const router = new Router ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [ 
    {path: '/', component: HelloWorld},
    {path: '/login', component: Login},
    {path: '/checkout', component: Checkout}
]
})
   

export default router;