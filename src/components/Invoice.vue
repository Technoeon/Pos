<template>
  <div>
    <div class="pa-12">
      <v-row>
        <div class="mx-auto">
          <v-btn class="ml-12" @click="printData">
            <v-icon>mdi-printer</v-icon>Print Receipt
          </v-btn>
        </div>
        <v-btn class="mx-auto" dark to="/">
          New Order
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
    </div>
     <!-- {{detailOrder}} -->

    <div align="center">
      <table class="crd" id="printTable">
        <tr>
          <th colspan="2">
            <h5>{{new Date().toLocaleString()}} Order No:{{detailOrder.orderNumber}}</h5>
          </th>
        </tr>
        <tr>
          <th colspan="2">Cafe Gloria</th>
        </tr>
        <tr>
          <th colspan="2">
            <h6>Phone: +8801532599</h6>
          </th>
        </tr>
        <tr>
          <th colspan="2">
            <h6>User: Michel Admin</h6>
          </th>
        </tr>
        <tr>
          <td v-for="order in detailOrder.orderItem" :key="order"><h5>({{order.product_name}}) - {{order.unit_price}} * {{order.qty}}</h5></td>
          <!-- <td>1000.00</td> -->
        </tr>
        
        <tr>
          <td><h6>Subtotal : {{detailOrder.subtotal}} & Vat ({{detailOrder.vat}})</h6></td>
          <!-- <td><h6>1000.00</h6> </td> -->
        </tr>
        <tr>
          <td><h5>Total : {{detailOrder.total}}</h5></td>
          <!-- <td>1000.00</td> -->
        </tr>
        <tr>
          <td>
            <h6>Cash(BDT) : {{detailOrder.cash}}</h6>
          </td>
          <!-- <td>
            <h6>1000.00</h6>
          </td> -->
        </tr>
        <tr>
          <td>
            <h6>Change : {{detailOrder.change}}</h6>
          </td>
          <!-- <td>
            <h6>10.00</h6>
          </td> -->
        </tr>
      </table>
      <iframe name="print_frame" width="0" height="0" frameborder="1" src="about:blank"></iframe>
    </div>
  </div>
</template>

 <script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: "Invoice",
  created () {
    this.fetchOrder(this.$route.params.id)
  },
  data: () => ({
    detailOrder: null
  }),
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
     printData () {
      window.frames["print_frame"].document.body.innerHTML = document.getElementById("printTable").innerHTML;
      window.frames["print_frame"].window.focus();
      window.frames["print_frame"].window.print();
     },
     fetchOrder (id) {
      let proUrl = 'http://192.168.43.204/pos/api/order/' + id
      let userData = this.userData;
      let headerConfigProduct = {
        headers: {
          "x-api-key": "123456",
          Authorization: userData.token
        }
      };
      axios.get(proUrl, headerConfigProduct)
        .then(res => {
          this.detailOrder = res.data.data
        })
        .catch(err => {
          alert(err);
        });
     }
  }
};
</script>

 <style>
 /* @media print{
  #printTable { display: block; };
  *{ display: none; };
  
} */
@media print {
  * {
    display: none;
  }
  #printTable {
    display: block;
  }
}
  /* table { page-break-after:auto }
  tr    { page-break-inside:avoid; page-break-after:auto }
  td    { page-break-inside:avoid; page-break-after:auto } */

.btnstl {
  float: left;
  margin-right: 20px;
}
.crd {
  width: 300px;
  height: 320px;
  background-color: #f0facd;
  page-break-inside: avoid;
}
.desgn {
  float: right;
}
.sz {
  margin-left: 10px;
}
</style>