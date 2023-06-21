<template lang="">
  <div>
    <b-navbar type="dark" variant="light">
      <div class="container px-3 py-1">
        <b-navbar-brand href="/"><img src="/app-assets/images/logo/betaLogo.png" class="img-fluid " width="150" />      </b-navbar-brand>
  
        <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item exact to="/register" link-classes="text-primary">Sign up</b-nav-item>
        </b-navbar-nav>
      </div>
     
    
    </b-navbar>
   
  </div>
    <div style="display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 35px;
    " class="">
      <!-- <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
      </router-link> -->
    <div class=" m-0">
      <div class="  align-items-center auth-bg ">
        <div class="col-12 col-sm-8 col-md-6 shadow-lg  col-lg-12 mx-auto p-xl-5 text-center">
          <div style="background-color: rgba(0,59,179,0.2);width: 40px; height:40px;margin: auto" class="p-50 text-primary mb-1 rounded-circle d-flex align-items-center">

            <span  class="iconify " data-icon="carbon:email" data-width="24"></span>
          </div>
          <h2 class="card-title fw-bold mb-1">Password Reset</h2>
          <p class="card-text mb-2">
Please kindly  check your recovery email for further instructions on how <br /> to reset your password  </p>
<p class="text-center mt-2">
  <span>Didn't receive the email?</span>
  <button :disabled="loading == true" type="button" @click="resetPassword" class="btn mb-0 p-0 text-primary"><span>&nbsp;Click to resend</span></button>
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
  name: "ForgotPassword",


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
    isVisible() {
      return passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";

    }
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    if (!this.email) {
      this.$router.push({path: '/forgot-password'})
    }
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
}


</script>
<style lang="">
  
</style>