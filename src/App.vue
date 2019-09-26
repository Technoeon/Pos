<template>
  <v-app>
  
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  // components: {
  //   //Checkout
  //   // Login,
  //   // HelloWorld,
  //   // Navigation
  //   // Invoice
  // },
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
