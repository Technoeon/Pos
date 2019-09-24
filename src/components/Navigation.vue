    <template>
    <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-title-title>
              Menu
            </v-list-title-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        
        <template v-for="(item,index) in items">
          <v-list-tile :key="index" :href="item.href">
           <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
           </v-list-tile-action>
           <v-list-tile-action>
            <v-list-title-title v-html="item.title"></v-list-title-title>
           </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark>
     <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
     <v-toolbar-title to="/">Cafe Gloria</v-toolbar-title>
     <v-spacer></v-spacer>
     <v-toolbar-item>
       <v-btn flat to="/checkout">
       <v-badge left color="green">
         <span slot="badge">5</span>
       <v-icon>mdi-cart</v-icon>Basket
       </v-badge>
       </v-btn>
       <!-- <v-btn flat>Basket</v-btn> -->
       <v-btn flat to="/login"  @click="logout" data-cy="logout">logout</v-btn> 
     </v-toolbar-item>
     </v-app-bar>
    </div>
     </template>

<script>
// import Login from './Login'
import router from '../routes'
export default {
  name: 'Navigation',
  // components: {
  //   Login
  // },
  // methods: {
  //   logout: function(){
  //     console.log('works')
  //   }
  // },
  data: () => ({
   drawer: false,
   items: [{
     icon: 'mdi-account',
     href: '#',
     title: 'Account'
   }]
  }),
  methods: {
    logout(){
      router.push('/login')
    }
  }
};
</script>
