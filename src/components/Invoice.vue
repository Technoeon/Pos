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
    <div align="center">

      <table class="crd" id="printTable">
        <tr>
          <th colspan="2">
            <h5>{{new Date().toLocaleString()}} Order 00001-008-0008</h5>
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
          <td><h5>(Chicken Masala Fry) - 1000.00</h5></td>
          <!-- <td>1000.00</td> -->
        </tr>
        
        <tr>
          <td><h6>Subtotal : 1000.00</h6></td>
          <!-- <td><h6>1000.00</h6> </td> -->
        </tr>
        <tr>
          <td><h5>Total : 1000.00</h5></td>
          <!-- <td>1000.00</td> -->
        </tr>
        <tr>
          <td>
            <h6>Cash(BDT) : 1000.00</h6>
          </td>
          <!-- <td>
            <h6>1000.00</h6>
          </td> -->
        </tr>
        <tr>
          <td>
            <h6>Change : 1000.00</h6>
          </td>
          <!-- <td>
            <h6>10.00</h6>
          </td> -->
        </tr>
      </table>
      <iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
    </div>
  </div>
</template>

 <script>
export default {
  name: "Invoice",

  data: () => ({
    //
  }),
  methods: {
      // printData(){
      //   var divToPrint= this.$refs.printTable
      //   newWin= window.open("");
      //   newWin.document.write(divToPrint.outerHTML);
      //   newWin.print();
      //   newWin.close();
      // }
     printData(){
         window.frames["print_frame"].document.body.innerHTML = document.getElementById("printTable").innerHTML;
         window.frames["print_frame"].window.focus();
         window.frames["print_frame"].window.print();
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
    page-break-inside: avoid;
    page-break-after:always;
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