<template>
  <div>
    <div class="pa-12">
      <v-row>
        <div class="mx-auto">
          {{detailOrder.orderItem}}
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
          <th colspan="3">
            <h5 align="center">{{new Date().toLocaleString()}} Order No:{{detailOrder.orderNumber}}</h5>
          </th>
        </tr>
        <tr>
          <th colspan="3"><h5 align="center">Cafe Gloria</h5></th>
        </tr>
        <tr>
          <th colspan="3">
            <h6 align="center">13-14,Zoo Road,Mollik Tower,Mirpur-1,Dhaka-1216, Phone:9007719,9007742</h6>
          </th>
        </tr>
        <tr>
          <th colspan="3">
            <h6 align="center">Email: cafegloriabd@gmail.com</h6>
          </th>
        </tr>
        <tr>
          <td colspan="3"></td>
        </tr>
        <tr align="center" v-for="(order, index) in detailOrder.orderItem" :key="order.id">
          <td >{{index + 1}}<h5>({{order.product_name}}) </h5></td>
          <td>{{order.unit_price}} * {{order.qty}}</td>
          <td>{{order.sub_price}}</td>
        </tr>
        
        <tr>
          <td colspan="2"><h6>Subtotal : </h6></td>
          <td><h6>{{detailOrder.subtotal}} & Vat ({{detailOrder.vat}})</h6> </td>
        </tr>
        <tr>
          <td colspan="2"><h5>Total : </h5></td>
          <td><h5>{{detailOrder.total}}</h5></td>
        </tr>
        <tr>
          <td colspan="2">
            <h6>Cash(BDT) : </h6>
          </td>
          <td>
            <h6>{{detailOrder.cash}}</h6>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <h6>Change : </h6>
          </td>
          <td>
            <h6>{{detailOrder.change}}</h6>
          </td>
        </tr>
      </table>
      <div class="table-brak"></div>
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
      let proUrl = 'http://localhost/pos/api/order/' + id
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
@media print {
  * {
    display: none;
  }
  #printTable {
    display: block;
  }
}
  .table-brak { page-break-after:auto }
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
.cen {
  align-self: center;
}
</style>