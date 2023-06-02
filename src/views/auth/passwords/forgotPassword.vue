<template lang="">
    <div class="auth-wrapper auth-cover">
    <div class="auth-inner row m-0">
      <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
      </router-link>

      <div class="d-none d-lg-block col-lg-6 align-items-center p-0">
        <div class=" align-items-center justify-content-center ">
          <img class="w-100" src="/app-assets/images/pages/login_noLogo.jpg" alt="Login V2" />
        </div>
      </div>

      <div class="d-flex col-lg-6 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-10 px-xl-2 mx-auto">
          <h2 class="card-title fw-bold mb-1">Welcome to ToNote! 👋</h2>
          <p class="card-text mb-2">
            Please enter the email registered, a reset password link will be sent to you.
          </p>

          <form @submit.prevent="resetPassword" >
           
            <div class="mb-2">
              <label class="form-label" for="login-email">Email</label>
              <input 
              class="form-control" 
              type="text" 
              name="email" 
              tabindex="1" 
              placeholder="john@example.com"
              v-model="user.email"
              />
              <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block w-100" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Confirm</span>
              </button>
            </div>

          </form>

          <p class="text-center mt-2">
            <span>New on our platform?</span>
            <router-link to="/register"><span>&nbsp;Create an account</span></router-link>
          </p>
         <p class="text-center mt-2">
            <span>Already have an account?</span>
            <router-link to="/"><span>&nbsp;Sign in instead</span></router-link>
          </p>
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
import { mapMutations, mapActions } from 'vuex';
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
    // ...mapState('AuthModule',['loggingIn', 'loginError']),
  },
  methods: {
    ...mapActions('AuthModule',['login', 'forgotPasswordEmail']),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    resetPassword() {
      this.loading = true;
      ToNote.post('/user/password/email', {
        email: this.user.email?.toLocaleLowerCase()
      }).then(res => {
        this.loading = false;
        this.forgotPasswordEmail(this.user.email?.toLocaleLowerCase())
        this.$router.push({ path: '/email-sent' })
        $toast.success('A reset link has been sent to your email address', {
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
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
}


</script>
<style lang="">
  
</style>