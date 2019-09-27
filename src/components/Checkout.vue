<template>
  <div>
    <Navigation />
    <div class="pa-6">
      <v-row>
        <v-btn to="/">
          <v-icon>mdi-arrow-left</v-icon>Back
        </v-btn>
        <h2 class="mx-auto">Payment</h2>
        <v-btn v-if="total<=numb" @click="postData">
          Validate
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
    </div>
    <v-divider></v-divider>
    <v-layout text-center wrap>
      <v-flex xs4>
        <div class="mt-12">
          <v-btn class="sz" x-large color="grey">Cash(BDT)</v-btn>
        </div>
      </v-flex>
      <v-flex 8 xs>
        <!-- <div class="mt-12">
    <h1 class="sz1" >$ 1571.00</h1>
        </div>-->
          <v-sheet
          class="sz2"
          color="grey lighten-1"
        >
        <v-row class="pt-2">
          <h4 class="pl-12">Due</h4>
          <h4 class="pl-12">Tendered</h4>
          <h4 class="pl-12">Change</h4>
          <h4 class="pl-12">Method</h4>
          </v-row>
          </v-sheet>
          <v-row class="pl-3">
            <v-sheet color="green lighten-3" class="sz4"><h2>{{total}}</h2></v-sheet>
            <v-sheet color="yellow lighten-3" class="sz4"><h2>{{numb}}</h2></v-sheet>
            <v-sheet color="teal lighten-3" class="sz4" v-if="total<numb"><h2>{{parseInt(numb)-total}}</h2></v-sheet>
            <v-sheet color="grey lighten-1" class="sz4"><h2>(Cash)</h2></v-sheet>
            <v-sheet color="grey lighten-1" class="sz5" v-if="total<numb" @click="numb = ''" ><v-icon class="pt-1">mdi-close</v-icon></v-sheet>
          </v-row>
          <v-sheet color="green lighten-3" class="sz4" v-if="parseInt(numb) > 0"><h2>{{total-parseInt(numb)}}</h2></v-sheet>
        
        <v-divider></v-divider>
        <v-row class="pa-12">
          <v-card class="calc" dark>
            <v-container>
              <div>
                <v-btn outlined color="white" large @click="numb = numb + '1'">1</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'2'">2</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'3'">3</v-btn>
                <v-btn outlined color="white" large @click="numb = parseInt(numb) + 10">+10</v-btn>
              </div>
              <div :class="size">
                <v-btn outlined color="white" large @click="numb = numb +'4'">4</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'5'">5</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'6'">6</v-btn>
                <v-btn outlined color="white" large @click="numb = parseInt(numb) + 20">+20</v-btn>
              </div>
              <div :class="size">
                <v-btn outlined color="white" large @click="numb = numb +'7'">7</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'8'">8</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'9'">9</v-btn>
                <v-btn outlined color="white" large @click="numb = parseInt(numb) + 50">+50</v-btn>
              </div>
              <div :class="size">
                <v-btn outlined color="white" large @click="numb = ''">C</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'0'">0</v-btn>
                <v-btn outlined color="white" large @click="numb = numb +'.'">.</v-btn>
                <v-btn outlined color="white" large @click="numb = numb.slice(0, -1)">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
              </div>
            </v-container>
          </v-card>
        </v-row>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "./Navigation";
import { mapGetters } from 'vuex'
export default {
  name: "Checkout",
  components: {
    Navigation
  },
  data: () => ({
    numb: '',
    closeState: false
  }),
   computed: {
    ...mapGetters(['products','shoppingCart','userData','subTotal', 'vat', 'total'])
  },
  methods: {
    clear(){
     if(parseInt(numb)-total > 0){
       return closeState = true;
     } 
    },
    async postData(){
      let proUrl = "http://192.168.43.204/pos/api/order";
      let userData = this.userData;
      let headerConfig = {
        headers: {
          "x-api-key": "123456",
          Authorization: userData.token
        }
      };
      let cart = this.shoppingCart.map(sp => {
        return {
          id: sp.id,
          name: sp.name,
          qty: sp.qty
        }
      })
      let orderDetails = {
        total: this.total,
        vat: this.vat,
        cash: this.numb,
        change: parseInt(this.numb) - this.total,
        cart: cart
      }
      await axios.post(proUrl, orderDetails, headerConfig)
        .then(res => {
          // console.log("product Data", res.data.data);
          let orderId = res.data.data;
          this.$store.dispatch('clearCart')
          this.$router.push('/invoice/'+orderId);
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style>
.sz {
  width: 300px;
  height: 400px;
}
.sz1 {
  font-size: 45px;
}
.calc {
  padding-top: 40px;
  width: 400px;
  height: 270px;
}
.sz2 {
  width: 700px;
  height:40px;
}
.sz4 {
  width:110px;
}
.sz5 {
  width:30px;
}
</style>