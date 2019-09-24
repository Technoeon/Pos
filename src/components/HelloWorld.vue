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
            <h6>(Chicken pasta)- </h6>
            <h5 class="divid">1150 BDT</h5>
          </v-row>
          <v-divider></v-divider>
          </v-card>
          <div><h4 class="flexy">= 1180 BDT</h4>
          <p class="flexy">1150 BDT + (15% tax)</p></div>
        </v-card>
        <v-card class="pt-20" dark>
          <v-container>
            <div>
              <v-btn outlined color="white" large>1</v-btn>
              <v-btn outlined color="white" large>2</v-btn>
              <v-btn outlined color="white" large>3</v-btn>
              <v-btn outlined color="white" large>Qty</v-btn>
            </div>
            <div :class="size">
              <v-btn outlined color="white" large>4</v-btn>
              <v-btn outlined color="white" large>5</v-btn>
              <v-btn outlined color="white" large>6</v-btn>
              <v-btn outlined color="white" large>Disc</v-btn>
            </div>
            <div :class="size">
              <v-btn outlined color="white" large>7</v-btn>
              <v-btn outlined color="white" large>8</v-btn>
              <v-btn outlined color="white" large>9</v-btn>
              <v-btn outlined color="white" large>Pric</v-btn>
            </div>
            <div :class="size">
              <v-btn outlined color="white" large>+/-</v-btn>
              <v-btn outlined color="white" large>0</v-btn>
              <v-btn outlined color="white" large>.</v-btn>
              <v-btn outlined color="white" large to="/checkout"><v-icon>mdi-arrow-right</v-icon></v-btn>
            </div>
          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs8 class="pa-4">
        <!-- <div>
          <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        </div> -->
         <v-tabs dark>
            <v-tab>Snacks</v-tab>
            <v-tab>Juice</v-tab>
            <v-tab>Tea</v-tab>
            <v-tab>Coffee</v-tab>
            <v-tab>Set Menu</v-tab>
            <v-tab>Soft drinks</v-tab>
          </v-tabs>
        <v-row>
        <template v-for="(product,index) in products">
        <v-flex pa-2  class="mx-4" :key="index">
        
        <v-hover>
          <v-card slot-scope="{hover}" class="mx-auto" color="gray lighten-4" max-width="400" height="250" @click="counter">
        <v-img :src="product.src" :aspect-ratio="16/9">
        <v-expand-transition>
          <div v-if="hover" class="d-flex transition-fast-in-fast-out orange draken-2 display-1 v-card--reveal display3 black--text" style="height:100%">
          ${{product.price}}
          </div>
        </v-expand-transition>
        </v-img>
        <v-card-text class="pt-4" style="position:relative">
          <v-btn absolute color="orange" class="shite--text" fab medium right top>
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        <div class="font-weight-light grey--text title mb-2" style="font-size:18px">
          {{product.title}}
        </div>
        <h3 class="font-weight-light orange--text mb-2" style="font-size:16px">
          {{product.category}}
        </h3>
        <!-- <div class="font-weight-light mb-2">
          Our vintage kichen food made by chef and tasted by people
        </div> -->
        </v-card-text>

          </v-card>
        </v-hover>
        </v-flex>
        </template>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
 </v-content>
</div>
</template>

<script>
import Navigation from './Navigation'
export default {
   components: {
     Navigation
  },
  // methods: {
  //   counter : function(){
  //     var count = 0
  //     return count = count + 1
  //     console.log(count)
  //   }
  // },
  data: () => ({
    items: [
      {
        text: "Dashboard",
        disabled: false,
        href: "dashboard"
      },
      {
        text: "Link 1",
        disabled: false,
        href: "link_1"
      },
      {
        text: "Link 2",
        disabled: true,
        href: "link_2"
      }
    ],

    products: [{
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },
    {
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },
    {
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },
    {
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },{
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },{
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },
    {
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },
    {
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    },
    // {
    //   price:14.99,
    //   src:'https://picsum.photos/id/11/500/300',
    //   category:'For the perfect',
    //   title:'Fried Chicken pasta',
    //   description:'Our vintage kichen food made by chef and tasted by people'

    // },
    {
      price:14.99,
      src:'https://picsum.photos/id/11/500/300',
      category:'For the perfect',
      title:'Fried Chicken pasta',
      description:'Our vintage kichen food made by chef and tasted by people'

    }]
  })
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
</style>
