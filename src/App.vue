<template>
  <v-app>
    <!-- <Checkout/>
    <Navigation/> -->
    

    <!-- <v-content> -->
      <Navigation/>
    <!-- </v-content> -->
    <!-- <router-link to='/'>HelloWorld</router-link>
    <router-link to='/login'>Login</router-link>
    <router-link to='/checkout'>Checkout</router-link>
      -->
    <router-view></router-view>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
 import Navigation from './components/Navigation';
 //import Login from './components/Login'
//import Checkout from './components/Checkout'
//import Invoice from './components/Invoice'

export default {
  name: 'App',
  components: {
    //Checkout
    // Login,
    // HelloWorld,
     Navigation
    // Invoice
  },
  data: () => ({
   drawer: false,
   items: [{
     icon: 'mdi-account',
     href: '#',
     title: 'Account'
   }]
  }),
};
</script>
