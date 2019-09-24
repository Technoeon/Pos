<template>
  <v-app>
    <Checkout/>
    <!-- <Navigation/>
    

    <v-content>
      <HelloWorld/>
    </v-content>
     
    <router-view></router-view> -->
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Navigation from './components/Navigation';
// import Login from './components/Login'
import Checkout from './components/Checkout'
export default {
  name: 'App',
  components: {
    Checkout
    // Login,
    // HelloWorld,
    // Navigation
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
