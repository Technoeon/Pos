<template>
    <div class="paymant page">
        <form ref="form" method="POST" action="https://movit.com.my/movit/api/paymentprocess/" role="molpayseamless">
            <input type="hidden" name="x-api-key" value="123456">
            <div class="jumbotron">
                <div class="container">
                    <h4>Your Booking</h4>
                    <table class="table">
                        <tr class="ordertable-head">
                            <td>Description</td>
                            <td>Price</td>
                            <td align="center">Distance</td>
                            <td>Total</td>
                        </tr>
                        <tr>
                            <td width="70%">
                                <div class="row">
                                    <div class="col-md-2"><img :src="vehicle.img" height="100px" width="120px" />
                                        <br><span>{{vehicle.name}}</span><span v-if="vehicle.subCategory">- {{vehicle.subCategory + 'Tone'}}</span>
                                    </div>
                                    <div class="col-md-8">
                                        <span v-for="location in bookingLocation" :key="location.id">
                                            <span >
                                                <strong v-if="location.id === 1">From: </strong>
                                                <strong v-if="location.id !== 1">To: </strong>
                                            </span>
                                            <span>{{'Building Name: ' + location.buildingName + ', '}}</span>
                                            <span>{{'Unit Number: ' + location.unitNamber + ', '}}</span>
                                            {{location.address}}
                                            <br>
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="cur_span">MYR</span> {{distancePrice}}</td>
                            <td align="center">KM {{distance}}</td>
                            <td><span class="cur_span">MYR</span> {{distancePrice}}</td>
                        </tr>
                        <tr v-if="totalManpowerAddedCost != 0">
                            <td width="70%">
                                <div class="row">
                                    <div class="col-md-2">
                                    </div>
                                    <div class="col-md-8">
                                        <span>Manpower Charges<br></span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="cur_span">MYR </span>{{totalManpowerAddedCost}}</td>
                            <td align="center"></td>
                            <td><span class="cur_span">MYR</span> {{totalManpowerAddedCost}}</td>
                        </tr>
                        <tr v-for="sc in serviceCost" :key="sc.id">
                            <td width="70%">
                                <div class="row">
                                    <div class="col-md-2">
                                    </div>
                                    <div class="col-md-8">
                                        <span>{{sc.name}}</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="cur_span">MYR </span>{{sc.uniteprice}}</td>
                            <td align="center">QTY {{sc.qty}}</td>
                            <td><span class="cur_span">MYR</span> {{sc.cost}}</td>
                        </tr>
                        <tr>
                            <td colspan="4"><hr class="hrdesignp"/></td>
                        </tr>
                        <tr>
                            <td rowspan="2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <input placeholder="Enter your coupon code here" class="form-control" style="padding: 22px; margin-top: 5px;"/>
                                    </div>
                                    <div class="bttn-couponapply"><a class="btn btn-primary" href="">Apply</a></div>
                                </div>
                            </td>
                            <td>&nbsp;</td>
                            <td align="right"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td align="right"><strong>Total Amount &nbsp;</strong></td>
                            <td><strong><span class="cur_span">MYR</span>	{{totalCost}}</strong></td>
                        </tr>
                        <!-- <tr class="ordertable-total">
                            <td colspan="3" align="right">Order Total &nbsp;</td>
                            <td><span class="cur_span">MYR</span> 61.01</td>
                        </tr> -->
                    </table>
                </div>
            </div>
            <div class="container">	
                <h1 class="margintop">Billing Information</h1>
                <div class="row">
                    <div class="col-md-6 marginbttm">First Name <span class="mandatory">*</span>  <input type="fname" class="form-control" name="billingFirstName" id="billingFirstName" v-model="userName" required></div>
                    <div class="col-md-6 marginbttm">Email <span class="mandatory">*</span> <input type="email" class="form-control" name="billingEmail" id="billingEmail" v-model="email" required></div>
                    <div class="col-md-4 marginbttm">Phone <span class="mandatory">*</span> <input type="mobile" class="form-control" name="billingMobile" id="billingMobile" v-model="phone" required></div>
                    <div class="col-md-8 marginbttm">Address <span class="mandatory">*</span> <input type="address" class="form-control" name="billingAddress" id="billingAddress" v-model="address" required></div>
                    <div class="col-md-4 marginbttm">City <span class="mandatory">*</span> <input type="city" class="form-control" name="billingCity" id="billingCity" v-model="city" required></div>
                    <div class="col-md-4 marginbttm">State <span class="mandatory">*</span> <input type="state" class="form-control" name="billingState" id="billingState" v-model="states" required></div>
                    <div class="col-md-4 marginbttm">Postcode/ZIP <span class="mandatory">*</span> <input type="poscode" class="form-control" name="billingPostcode" id="billingPostcode" v-model="postCode" required></div>
                </div>
                
                <div class="smalltxt">
                    <input type="checkbox" name="chk_tnc" aria-label="Deliver to the same address" checked required> I’ve read and accept the terms & conditions.
                </div>
                
                
                <h1 class="margintop" style="margin-top:70px">Payment Method</h1>
                
                <p class="smalltxt">
                    <strong style="color:#7e287d;">Secure Online Payment by MOLPay</strong>
                    <br />
                    Please select a payment type from below to proceed for payment.
                </p>
                <transition mode="out-in" appear enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" :duration="500">
                    <div class="row" v-if="showPaymentOptions">
                        <div class="col-md-2 col-xs-6 marginbttm text-center myr" v-for="cnl in paymentChannel" :key="cnl.id">
                            <label class="hand" :for="cnl.channelName + cnl.id"></label>
                            <br />
                            <button type="button"
                                @click="submitPayment(cnl.channelName)"
                                style="background: rgb(224, 15, 15);"
                                :id="cnl.channelName + cnl.id"
                                class="btn btn-default"
                                data-toggle="molpayseamless"
                                data-mpsmerchantid="movit"
                                :data-mpschannel="cnl.channelName"
                                :data-mpsamount="totalCost"
                                :data-mpsorderid="bookingID"
                                :data-mpsbill_name="userName"
                                :data-mpsbill_email="email"
                                :data-mpsbill_mobile="phone"
                                :data-mpsbill_desc="address + '*:' + city + '*:' + states + '*:' + postCode"
                                data-mpscountry="MY"
                                :data-mpsvcode="mpsvcode"
                                data-mpscurrency="MYR"
                                data-mpslangcode="en"
                                data-mpstimer="3"
                                data-mpstimerbox="#counter"
                                data-mpscancelurl="https://movit.com.my/m/paymentcancle"
                                data-mpsreturnurl="https://movit.com.my/m/movitreturn">
                                <img :src="cnl.image"/>
                            </button>
                        </div>
                    </div>
                </transition>
                <!-- <div class="row">
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentcredit_alb-paymex"><img src="/static/img/images/payment-credit.jpg" title="ALB-Paymex" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentcredit_alb-paymex" value="credit" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentfpx"><img src="/static/img/images/payment-fpx.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentfpx" value="fpx" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentm2u"><img src="/static/img/images/payment-m2u.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentm2u" value="maybank2u" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymenthlb"><img src="/static/img/images/payment-hlb.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymenthlb" value="hlb" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentcimb"><img src="/static/img/images/payment-cimb.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentcimb" value="cimbclicks" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentcimbva"><img src="/static/img/images/payment-cimb-va.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentcimbva" value="cimb-va" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentrhb"><img src="/static/img/images/payment-rhb.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentrhb" value="rhb" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentaffin"><img src="/static/img/images/payment-affin.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentaffin" value="affinonline" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentam"><img src="/static/img/images/payment-amonline.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentam" value="amb" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentislam"><img src="/static/img/images/payment-bank-islam.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentislam" value="bankislam" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentpbe"><img src="/static/img/images/payment-pbe.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentpbe"  value="pbb" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="paymentmolwallet"><img src="/static/img/images/payment-molwallet.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paymentmolwallet" value="molwallet" required/>
                    </div>
                    
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="payment7e"><img src="/static/img/images/payment-7e.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="payment7e" value="cash-711" required/>
                    </div>
                    
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="esapay"><img src="/static/img/images/payment-esapay.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="esapay" value="cash-esapay" required/>
                    </div>
                    
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="jompay"><img src="/static/img/images/payment-jompay.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="jompay" value="jompay" required/>
                    </div>
                    
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="scb"><img src="/static/img/images/payment-scb.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="scb" value="TH_PB_SCBPN" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="krungthai"><img src="/static/img/images/payment-krungthai.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="krungthai" value="TH_PB_KTBPN" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="krungsri"><img src="/static/img/images/payment-krungsri.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="krungsri" value="TH_PB_BAYPN" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="bangkokbank"><img src="/static/img/images/payment-bangkokbank.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="bangkokbank" value="TH_PB_BBLPN" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="paysbuy"><img src="/static/img/images/payment-paysbuy.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="paysbuy" value="TH_PB_CASH" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="FPX_OCBC"><img src="/static/img/images/payment-ocbc.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="FPX_OCBC" value="FPX_OCBC" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center myr">
                        <label class="hand" for="FPX_SCB"><img src="/static/img/images/payment-standard-chartered.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="FPX_SCB" value="FPX_SCB" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="BigC"><img src="/static/img/images/payment-bigc.jpg" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="BigC" value="BigC" required/>
                    </div>
                    <div class="col-md-2 col-xs-6 marginbttm text-center thb">
                        <label class="hand" for="KBANK_PayPlus"><img src="/static/img/images/payment-Kasikornbank.png" /></label>
                        <br />
                        <input type="radio" name="payment_options" id="KBANK_PayPlus" value="KBANK_PayPlus" required/>
                    </div>
                    
                </div> -->
                <br/>
            </div>
            <input type="hidden" name="currency" id="currency" value="MYR" />
            <input type="hidden" name="total_amount" :value="totalCost" />
            <input type="hidden" name="molpaytimer" value="3" />
        </form>
        <div id="counter"></div>
        <div class="col-md-2 col-xs-6 marginbttm text-center myr">
            <!-- Button trigger MOLPay Seamless -->
            <!-- <button type="button" class="btn btn-primary btn-lg" 
                id="myPay1"
                data-toggle="molpayseamless" 
                data-mpsmerchantid="molpaymerchant"
                data-mpschannel="maybank2u"
                data-mpsamount="1.20"
                data-mpsorderid="TEST1139669863"
                data-mpsbill_name="Foyez Ahamed">
                Pay by Maybank2u
            </button> -->
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import CryptoJS from 'crypto-js/md5'
import firebase from 'firebase'
import db from '../helper/firebaseInit'
const jobAcceptRef = db.collection('jobaccept')
// import JQuery from 'jquery'
// let $ = JQuery
export default {
  created () {
    if (this.$route.query.address) {
      this.userName = this.$route.query.name
      this.email = this.$route.query.email
      this.phone = this.$route.query.mobile
      this.address = this.$route.query.address
      this.city = this.$route.query.city
      this.states = this.$route.query.state
      this.postCode = this.$route.query.postcode
    } else if (firebase.auth().currentUser) {
      this.email = firebase.auth().currentUser.email
      this.userName = firebase.auth().currentUser.displayName
    } else if (firebase.auth().currentUser.displayName === null) {
      this.userName = this.user.displayName
      this.email = this.user.email
      this.phone = this.user.phone
      this.address = this.user.address
    }
  },
  data () {
    return {
      merchantID: 'movit',
      paymentChannel: [
        {id: 1, channelName: 'credit', image: '/static/img/images/payment-credit.jpg'},
        {id: 2, channelName: 'fpx', image: '/static/img/images/payment-fpx.jpg'},
        {id: 3, channelName: 'maybank2u', image: '/static/img/images/payment-m2u.jpg'},
        {id: 4, channelName: 'hlb', image: '/static/img/images/payment-hlb.jpg'},
        {id: 5, channelName: 'cimbclicks', image: '/static/img/images/payment-cimb.jpg'},
        {id: 6, channelName: 'cimb-va', image: '/static/img/images/payment-cimb-va.jpg'},
        {id: 7, channelName: 'rhb', image: '/static/img/images/payment-rhb.jpg'},
        {id: 8, channelName: 'affinonline', image: '/static/img/images/payment-affin.jpg'},
        {id: 9, channelName: 'amb', image: '/static/img/images/payment-amonline.jpg'},
        {id: 10, channelName: 'bankislam', image: '/static/img/images/payment-bank-islam.jpg'},
        {id: 11, channelName: 'pbb', image: '/static/img/images/payment-pbe.jpg'},
        {id: 12, channelName: 'molwallet', image: '/static/img/images/payment-molwallet.jpg'},
        {id: 13, channelName: 'cash-711', image: '/static/img/images/payment-7e.jpg'},
        {id: 14, channelName: 'cash-esapay', image: '/static/img/images/payment-esapay.jpg'},
        {id: 15, channelName: 'jompay', image: '/static/img/images/payment-jompay.jpg'},
        {id: 16, channelName: 'TH_PB_SCBPN', image: '/static/img/images/payment-scb.jpg'},
        {id: 17, channelName: 'TH_PB_KTBPN', image: '/static/img/images/payment-krungthai.jpg'},
        {id: 18, channelName: 'TH_PB_BAYPN', image: '/static/img/images/payment-krungsri.jpg'},
        {id: 19, channelName: 'TH_PB_BBLPN', image: '/static/img/images/payment-bangkokbank.jpg'},
        {id: 20, channelName: 'TH_PB_CASH', image: '/static/img/images/payment-paysbuy.jpg'},
        {id: 21, channelName: 'FPX_OCBC', image: '/static/img/images/payment-ocbc.jpg'},
        {id: 22, channelName: 'FPX_SCB', image: '/static/img/images/payment-standard-chartered.jpg'},
        {id: 23, channelName: 'BigC', image: '/static/img/images/payment-bigc.jpg'},
        {id: 24, channelName: 'KBANK_PayPlus', image: '/static/img/images/payment-Kasikornbank.png'}
      ],
      userName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      states: '',
      postCode: ''
    }
  },
  computed: {
    ...mapGetters([
      'vehicle', 'bookingLocation', 'manpowerCost', 'distancePrice', 'distance', 'serviceCost', 'bookingID', 'user'
    ]),
    totalManpowerAddedCost () {
      let manpowerCost = this.manpowerCost
      let mpc = manpowerCost.reduce((a, b) => a + (parseInt(b['manCost']) || 0), 0)
      let mpcwl = manpowerCost.reduce((a, b) => a + (parseInt(b['liftCost']) || 0), 0)
      let totalManpowerCost = mpc + mpcwl
      return totalManpowerCost
    },
    totalAdditionalServiceCost () {
      let serviceCost = this.serviceCost
      let sc = serviceCost.reduce((a, b) => a + (parseInt(b['cost']) || 0), 0)
      return sc
    },
    totalCost () {
      let cost = parseInt(this.distancePrice) + parseInt(this.totalManpowerAddedCost) + parseInt(this.totalAdditionalServiceCost)
      return cost
    },
    mpsvcode () {
      let hash = CryptoJS(this.totalCost.toString() + this.merchantID.toString() + this.bookingID.toString() + '48109c189dda20526da9a5c1459b7297').toString()
      return hash
    },
    showPaymentOptions () {
      if (this.userName !== '' && this.email !== '' && this.phone !== '' && this.address !== '' && this.city !== '' && this.states !== '' && this.postCode !== '') {
        this.submitPayment('-')
        return true
      }
    }
  },
  methods: {
    async submitPayment (channelName) {
      let driverID = await this.getDriverID()
      const rootURL = 'https://movit.com.my/movit/api/'
      let urlPayment = rootURL + 'booking/billing'
      let headerConfig = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '123456'
        }
      }
      let user = {
        user: this.bookingID,
        password: this.userName
      }
      await axios.post(urlPayment, user, headerConfig)
        .then((res) => {
          this.$store.dispatch('loadBilling', paymentInfo)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getDriverID () {
      return jobAcceptRef.doc(this.bookingID.toString()).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          return docSnapshot.data()
        }
      })
    }
  }
}
</script>

<style scoped>
.paymant {
    margin: 0px;
    padding: 0px;
	font-family: Arial, Helvetica, sans-serif
}

#header {
	width: 100%;
	height: 40px;
	background: #eeeeee;
	margin-bottom: 20px;
}

.smalltxt {
	font-size: 13px;
}

.marginbttm {
	/* margin-bottom: 20px;	*/
	padding: 7px;
}

h1.margintop {
	border-top: 1px solid #666;
	border-bottom: 1px solid #666;
	margin-top: 50px;
	margin-bottom: 20px;
	padding: 15px 0;
}

.mandatory { color: #ff0000; }


/*!Order Table */
.ordertable-head {
	padding: 10px 0;
	border-top: 1px solid #bbb;
	border-bottom: 1px solid #bbb;
	color: #666;
	font-weight: bold;
}

.ordertotal {
	border-top: 1px solid #bbb;
	border-bottom: 1px solid #bbb;
	padding: 10px;
	font-size: 15px;
	color: #444;
}

/*!Button */
.bttn-couponapply {
	display:inline-block;
	padding: 6px 0;
}

.bttn-couponapply a, .bttn-couponapply a:hover {
	color: #7e287d;
}

.hand { cursor: pointer; }

/*!Timer */
#counter {
	left: 1%;
	position: fixed;
	top: 30%;
	z-index: 999999;
	padding: 5px;
}
#counter .mpslabels {
	color: #fff;
	margin-bottom:10px;
}

#counter .mpsdelimeter {
	float: left;
	padding: 5px;
	font-size: 30px;
	color: #2d2d2d;
}
#counter .mpsminutes, #counter .mpsseconds {
	color: #fff;
	float: left;
	font-size: 40px;
	padding: 5px 12px;
	text-align: center;
	background: #333;
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
	border-radius: 6px;
	border: 0;
}
#counter .mpsseconds.red {
	color: #FF0000;
}
#counter small {
	font-size: 15px;
}
/*
#counter {
	left: 1%;
	position: fixed;
	top: 30%;
	z-index: 999999;
	padding: 5px;
}
#counter .mpsdelimeter {
	float: left;
	padding: 5px;
	font-size: 30px;
	color: #2d2d2d;
}
#counter .mpsminutes, #counter .mpsseconds {
	color: #fff;
	float: left;
	font-size: 30px;
	padding: 5px 10px;
	text-align: center;
	background: #333;
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
	border-radius: 6px;
	border: 0;
}
#counter small {
	font-size: 15px;
}
*/

/*Footer*/
#footer {
	background: #f4f4f4;
    color: #666;
    padding: 20px 0;
	margin-top: 50px;
}

ul.social {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.social li {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 22px;
    display: inline-block;
    height: 22px;
    width: 22px;
}
.hrdesignp {
    margin:0;
    padding: 1px;
    background: #bbb;
}
</style>
