<template >
  <div class="body">
    <div class="login-box" pt-8>
      <div class="lb-header">
        <a href="#" class="active" id="login-box-link">Login</a>
        <!-- <a href="#" id="signup-box-link">Sign Up</a> -->
      </div>

      <form class="email-login" @submit.prevent="login">
        <div class="u-form-group">
          <input type="email" placeholder="Email or Phone No" v-model="email" />
        </div>
        <div class="u-form-group">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <div class="u-form-group">
          <button type="submit">Log in</button>
        </div>
        <div class="u-form-group">
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const rootURL = "http://localhost/pos/api/";
      let loginUrl = rootURL + "user/login";
      let headerConfig = {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "123456"
        }
      };
      let user = {
        user: this.email,
        password: this.password
      };
      await axios
        .post(loginUrl, user, headerConfig)
        .then(res => {
         // console.log("user data", res.data.data);
          let proUrl = "http://localhost/pos/api/product";
          let userData = res.data.data;
         // console.log(userData.token);
          this.$store.dispatch("loadUserData", userData);
          let headerConfigProduct = {
            headers: {
              "x-api-key": "123456",
              Authorization: userData.token
            }
          };
          axios
            .get(proUrl, headerConfigProduct)
            .then(res => {
             // console.log("product Data", res.data.data);
              let productData = res.data.data;
              this.$store.dispatch("loadProduct", productData);
              this.$router.go({ path: "/home" });
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
<style scoped>
.body {
  background-color: #fff;
}
.login-box {
  position: relative;
  margin: 10px auto;
  width: 500px;
  height: 380px;
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.33);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.33);
}
.lb-header {
  position: relative;
  color: #00415d;
  margin: 5px 5px 10px 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
  height: 28px;
}
.lb-header a {
  margin: 0 25px;
  padding: 0 20px;
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 15px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.lb-header .active {
  color: #029f5b;
  font-size: 18px;
}
.social-login {
  position: relative;
  float: left;
  width: 100%;
  height: auto;
  padding: 10px 0 15px 0;
  border-bottom: 1px solid #eee;
}
.social-login a {
  position: relative;
  float: left;
  width: calc(40% - 8px);
  text-decoration: none;
  color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 12px;
  border-radius: 2px;
  font-size: 12px;
  text-transform: uppercase;
  margin: 0 3%;
  text-align: center;
}
.social-login a i {
  position: relative;
  float: left;
  width: 20px;
  top: 2px;
}
.social-login a:first-child {
  background-color: #49639f;
}
.social-login a:last-child {
  background-color: #df4a32;
}
.email-login,
.email-signup {
  position: relative;
  float: left;
  width: 100%;
  height: auto;
  margin-top: 20px;
  text-align: center;
}
.u-form-group {
  width: 100%;
  margin-bottom: 10px;
}
.u-form-group input[type="email"],
.u-form-group input[type="password"] {
  width: calc(50% - 22px);
  height: 45px;
  outline: none;
  border: 1px solid #ddd;
  padding: 0 10px;
  border-radius: 2px;
  color: #333;
  font-size: 0.8rem;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}
.u-form-group input:focus {
  border-color: #358efb;
}
.u-form-group button {
  width: 50%;
  background-color: #1cb94e;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  padding: 14px 0;
  border-radius: 2px;
  text-transform: uppercase;
}
.forgot-password {
  width: 50%;
  text-align: left;
  text-decoration: underline;
  color: #888;
  font-size: 0.75rem;
}
</style>