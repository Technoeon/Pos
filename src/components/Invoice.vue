<template>
  <div>
    <div class="pa-12">
      <v-row>
        <div class="mx-auto">
          <v-btn class="ml-12">
            <v-icon>mdi-printer</v-icon>Print Receipt
          </v-btn>
        </div>
        <v-btn class="mx-auto" dark to="/">
          New Order
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
    </div>
    <div align="center">
      <v-card flat class="crd" color="#f0facd" align="center">
        <v-card-text class="pl-5">
          <p>09/25/2019 11:29:56 Order 00001-008-0008</p>
          <p>Cafe Gloria</p>
          <h6>Phone: +8801532599</h6>
          <h6>User: Michel Admin</h6>
          <v-row>
            <p>(Chicken Masala Fry) -</p>
            <p>1000.00 BDT</p>
          </v-row>
          <v-row>
            <h6>Subtotal :</h6>
            <h6 class="desgn">1000.00 BDT</h6>
          </v-row>
          <v-row>
            <p>Total :</p>
            <p>1000.00 BDT</p>
          </v-row>
          <v-row>
            <h6>Cash(BDT) :</h6>
            <h6>1000.00 BDT</h6>
          </v-row>
          <v-row>
            <h6>Change :</h6>
            <h6>10.00 BDT</h6>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

 <script>
export default {
  name: "Invoice",

  data: () => ({
    //
  })
};
</script>

 <style>
.btnstl {
  float: left;
  margin-right: 20px;
}
.crd {
  width: 300px;
  height: 310px;
  align-self: "center";
}
.desgn {
  float: right;
}
.sz {
  margin-left: 20px;
}
</style>