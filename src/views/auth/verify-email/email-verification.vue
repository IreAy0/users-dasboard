<template lang="">
  <div class="auth-wrapper auth-v2">
    <div class="vector-1">

    </div>
  <div class="vector-2 ">
  </div>
  <div class="vector-3"></div>
  <div class="auth-inner row m-0">
    
    <div style="display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 35px;
    " class="">
      <!-- <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
      </router-link> -->
    <div class="m-0 bg-white shadow zindex-2 rounded-2 px-xl-3 new-auth-inner">
      <div class="  align-items-center ">
        <div class="col-12 col-sm-8 col-md-6  col-lg-12 mx-auto py-3 px-2 p-xl-3 text-center">
          <div class="brand-logo">
            <router-link to="/">
              <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mb-2" width="150" />
              <h2 class="brand-text text-primary ms-1"></h2>
            </router-link>
          </div>
          <div style="background-color: rgba(0,59,179,0.2);width: 40px; height:40px;margin: auto" class="p-50 text-primary mb-1 rounded-circle d-flex align-items-center">

            <span  class="iconify " data-icon="carbon:email" data-width="24"></span>
          </div>
          <h2 class="card-title text-gray-900 fw-bold mb-1">Please Verify Your Email</h2>
          <p class="card-text mb-2">
We just sent an email to <span class="fw-bolder">{{user.email}}</span>. Click the <span class="fw-bolder">verify</span> link in the email to verify account </p>
<p class="text-center mt-2">
  <span>Didn't receive the email?</span>
  <button :disabled="loading == true" type="button" @click="resendVerify" class="btn mb-0 p-0 text-primary"><span>&nbsp;Click to resend</span></button>
</p>

<router-link to="/" class="btn btn-outline-primary btn-block w-40" >
  <span> <span class="iconify" data-icon="ep:back" data-width="24"></span>
    Back to Sign in</span>
</router-link>
          

          


         <!-- <p class="text-center mt-2">
            <span>Already have an account?</span>
            <router-link to="/"><span>&nbsp;Sign in instead</span></router-link>
          </p> -->
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
// eslint-disable no-unused-vars 

import ToNote from '@/Services/Tonote';
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { mapMutations, mapState } from 'vuex';
// const loading = ref(false);
let passwordFieldType = ref("password");
const $toast = useToast()
export default {
  name: "Email Verification",


  data() {
    return {
      user: {
        email: '',

      },
      loading: false,
      passwordFieldType: 'password'
    }
  },
  computed: {
    ...mapState('AuthModule',['loggingIn', 'loginError', 'email']),
  },
  methods: {
    // ...mapActions('AuthModule',['login']),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    resetPassword() {
      this.loading = true;
      ToNote.post('/user/password/email', {
        email: this.email?.toLocaleLowerCase()
      }).then(res => {
        this.loading = false;
        $toast.success('A reset link has been sent to your email address again', {
          duration: 5000,
          queue: false,
          position: "top-right",
          dismissible: true,
          pauseOnHover: true,
        })
        this.user.email = " "
      }
        // eslint-disable-next-line no-unused-vars
      ).catch(error => {
        this.loading = false;
        $toast.error(error.response.data.message, {
          duration: 5000,
          queue: false,
          position: "top-right",
          dismissible: true,
          pauseOnHover: true,
        })
      })


    },
    
    resendVerify() {
      this.loading = true;
      ToNote.post("/user/email/resend", {
        email: this.$route.query.email,
      }).then((res) => {
        if (res) {
          this.loading = false;
          $toast.success("Email Sent successfully", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      });
    },
    isVisible() {
      return passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";

    }
  },
  mounted(){
    if (!this.$route.query.email) {
      this.$router.push({path: '/'})
    }
    this.user.email = this.$route.query.email
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    // if (!this.email) {
    //   this.$router.push({path: '/forgot-password'})
    // }
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
}


</script>
<style lang="">
  
</style>