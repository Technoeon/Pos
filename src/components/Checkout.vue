<template>
  <div>
    <Navigation />
    <div class="pa-6">
      <v-row>
        <v-btn to="/">
          <v-icon>mdi-arrow-left</v-icon>Back
        </v-btn>
        <h2 class="mx-auto">Payment</h2>
        <v-btn>
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
            <v-sheet color="green lighten-3" class="sz4"><h2>1100</h2></v-sheet>
            <v-sheet color="yellow lighten-3" class="sz4"><h2>1200</h2></v-sheet>
            <v-sheet color="teal lighten-3" class="sz4"><h2>100</h2></v-sheet>
            <v-sheet color="grey lighten-1" class="sz4"><h2>(Cash)</h2></v-sheet>
            <v-sheet color="grey lighten-1" class="sz5"><v-icon class="pt-1">mdi-close</v-icon></v-sheet>
          </v-row>
        
        <v-divider></v-divider>
        <v-row class="pt-12">
          <v-card class="calc" dark>
            <v-container>
              <div>
                <v-btn outlined color="white" large>1</v-btn>
                <v-btn outlined color="white" large>2</v-btn>
                <v-btn outlined color="white" large>3</v-btn>
                <v-btn outlined color="white" large>+10</v-btn>
              </div>
              <div :class="size">
                <v-btn outlined color="white" large>4</v-btn>
                <v-btn outlined color="white" large>5</v-btn>
                <v-btn outlined color="white" large>6</v-btn>
                <v-btn outlined color="white" large>+20</v-btn>
              </div>
              <div :class="size">
                <v-btn outlined color="white" large>7</v-btn>
                <v-btn outlined color="white" large>8</v-btn>
                <v-btn outlined color="white" large>9</v-btn>
                <v-btn outlined color="white" large>+50</v-btn>
              </div>
              <div :class="size">
                <v-btn outlined color="white" large>C</v-btn>
                <v-btn outlined color="white" large>0</v-btn>
                <v-btn outlined color="white" large>.</v-btn>
                <v-btn outlined color="white" large>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-container>
          </v-card>
          <div class="pl-4">
            <v-btn class="sz" color="grey">
              <v-icon>mdi-account</v-icon>Customer
            </v-btn>
          </div>
        </v-row>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Navigation from "./Navigation";
export default {
  name: "Checkout",
  components: {
    Navigation
  },
  data: () => ({
    //
  })
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