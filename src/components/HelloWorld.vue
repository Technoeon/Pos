<template>
<div>
<Navigation/>
 <v-content>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs4>
        <v-card height="360">
          <p><b>Orders</b></p>
          <v-card
            outlined
            height="280"
            value="1150"
            class="tvalue"
          >
          <v-row  class="flexy">
          </v-row>
          <v-divider></v-divider>
          <table>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Price</th>
            </tr>
            <tr v-for="cartItem in shoppingCart" :key="cartItem.id" :class="{'trt': cartItem.selected}" @click="cartSelect(cartItem.id)">
              <td>{{cartItem.name}}</td>
              <td>{{cartItem.qty}}</td>
              <!-- <td v-else>{{cartItem.qty}}</td> -->
              <td>{{cartItem.price}}</td>
              <td>{{cartItem.subprice}}</td>
              <!-- <td v-else>{{cartItem.price}}</td> -->
            </tr>
          </table>
          </v-card>
          <h3 v-if="shoppingCart.length > 0" class="flexy2"> Total: {{subTotal}}.00 + Vat ({{vat}}.00) = {{total}}.00 </h3>
        </v-card>
        <v-card class="pt-20" dark>
          <v-container>
            <div>
              <v-btn outlined color="white" large @click="pqty = pqty + '1'">1</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '2'">2</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '3'">3</v-btn>
              <v-btn outlined color="white" large >Qty</v-btn>
            </div>
            <div class="size">
              <v-btn outlined color="white" large @click="pqty = pqty + '4'">4</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '5'">5</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '6'">6</v-btn>
              <v-btn outlined color="white" large>Disc</v-btn>
            </div>
            <div class="size">
              <v-btn outlined color="white" large @click="pqty = pqty + '7'">7</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '8'">8</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '9'">9</v-btn>
              <v-btn outlined color="white" large>Pric</v-btn>
            </div>
            <div class="size">
              <v-btn outlined color="white" large @click="setSelectedItemZero">C</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '0'">0</v-btn>
              <v-btn outlined color="white" large @click="pqty = pqty + '.'">.</v-btn>
              <v-btn outlined color="white" large to="/checkout"><v-icon>mdi-arrow-right</v-icon></v-btn>
            </div>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs8 class="pa-4">
        <v-tabs dark>
            <v-tab v-for="pro in products" :key="pro.id">{{pro.title}}</v-tab>
          <v-tab-item v-for="pro in products" :key="pro.id">
            <v-row>
              <template v-for="product in pro.product" >
                <v-flex pa-2  class="mx-4" :key="product.id">
                
                  <v-hover>
                    <v-card slot-scope="{hover}" class="mx-auto" color="gray lighten-4" max-width="300" height="250">
                    <v-img :src="product.img" :aspect-ratio="16/9">
                    <v-expand-transition>
                      <div v-if="hover" class="d-flex transition-fast-in-fast-out orange draken-2 display-1 v-card--reveal display3 black--text" style="height:100%">
                      {{product.price}}
                      </div>
                    </v-expand-transition>
                    </v-img>
                    <v-card-text class="pt-4" style="position:relative">
                      <v-btn
                        @click="addToCart(product)" 
                        absolute 
                        color="orange"                  class="shite--text" 
                        fab medium right top>
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    <!-- <div class="font-weight-light grey--text title mb-2" style="font-size:18px">
                      Product Title
                    </div> -->
                    <h2 class="font-weight-light black--text mt-5" style="font-size:20px">
                      {{product.name}}
                    </h2>
                    <!-- <div class="font-weight-light mb-2">
                      Our vintage kichen food made by chef and tasted by people
                    </div> -->
                    </v-card-text>

                    </v-card>
                  </v-hover>
                </v-flex>
              </template>
            </v-row>
          </v-tab-item>
        </v-tabs> 
      </v-flex>
    </v-layout>
  </v-container>
 </v-content>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './Navigation'
export default {
   components: {
     Navigation
  },
  data() {
    return {
      selected: false,
      pqty: '1'
    }
  },
  computed: {
    ...mapGetters(['products','shoppingCart','userData','subTotal', 'vat', 'total'])
  },
  watch: {
    pqty (val) {
      let qty = parseInt(val)
      this.$store.dispatch('updateCartQuantity', qty)
    },
    shoppingCart (val) {
      this.pqty = ''
    }
  },
  methods: {
    addToCart (product) {
        product.qty = 1
        product.selected = true
        this.$store.dispatch('addToCart', product)
    },
    cartSelect (id) {
      this.$store.dispatch('selectCart', id)
    },
    setSelectedItemZero () {
      this.$store.dispatch('setItemZero')
    }
  }
};
</script>
<style>
 .size {
   width:50;
   height:90;
 }
 .v-card--reveal {
   align-items: center;
   justify-content: center;
   opacity: 0.5;
   width: 100%;
 }
 .v-card h3.display-1 {
   font-size: 24px !important
 }
 .tvalue {
   font-size: 22px;
   size: 30px;
 }
 .flexy {
   float: right;
   margin-right: 20px;
 }
 .divid {
   margin-right: 20px;
 }
 table {
  font-size: 16px;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.trt {
  background-color: #dddddd;
}
.flexy2 {
  float: right;
  margin-right: 10px;
}
</style>
