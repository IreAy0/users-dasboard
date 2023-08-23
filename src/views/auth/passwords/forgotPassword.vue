<template lang="">
    <div class="auth-wrapper auth-v2">
      <div class="vector-1">

      </div>
    <div class="vector-2 ">
    </div>
    <div class="vector-3"></div>
    <div class="auth-inner row m-0">
<!-- <div class="d-flex col-lg-12 align-items-center auth-bg px-2 p-lg-5"> -->
  
     
        <div style="display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 0 35px;
        " class="">
          <!-- <router-link class="brand-logo" to="/">
            <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
          </router-link> -->
        <div class=" m-0  bg-white shadow zindex-2 rounded-2 px-xl-3 new-auth-inner">
          <div class="  align-items-center  ">
            <div class="col-12 col-sm-8 col-md-6  col-lg-12 mx-auto py-3 px-2 p-xl-5 text-center">
             
              <h2 class="card-title text-gray-900 font-weight-bold mb-1">Forgot password</h2>
              <p class="card-text mb-2">
                Enter your email and a reset link will be sent to you  
              </p>

         
    <form @submit.prevent="resetPassword" >
           
      <div class="mb-2">
        <input 
        class="form-control form-control-lg" 
        type="text" 
        name="email" 
        tabindex="1" 
        placeholder="john@example.com"
        v-model="user.email"
        />
        <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
      </div>

      <div class="form-group">
        <button class="btn py-1 btn-primary btn-block w-100" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Reset Password</span>
        </button>
      </div>

    </form>
    <p class="text-center mt-2">
      <span>Return to</span>
      <b-link to="/">
        <span class="font-weight-bold">&nbsp;Sign in</span>
      </b-link>
      </p>
    
    
              
    
              
    
    
             <!-- <p class="text-center mt-2">
                <span>Already have an account?</span>
                <router-link to="/"><span>&nbsp;Sign in instead</span></router-link>
              </p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
// eslint-disable no-unused-vars

import ToNote from "@/Services/Tonote";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";
// import { mapMutations } from "vuex";
import { Icon } from "@iconify/vue";
import { mapMutations, mapActions } from "vuex";
// const loading = ref(false);
let passwordFieldType = ref("password");
const $toast = useToast();
export default {
  name: "ForgotPassword",

  data() {
    return {
      user: {
        email: "",
      },
      loading: false,
      passwordFieldType: "password",
      successful: false,
    };
  },

  computed: {
    // ...mapState('AuthModule',['loggingIn', 'loginError']),
  },
  methods: {
    ...mapActions("AuthModule", ["login", "forgotPasswordEmail"]),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    resetPassword() {
      this.loading = true;
      ToNote.post("/user/password/email", {
        email: this.user.email?.toLocaleLowerCase(),
      })
        .then(
          (res) => {
            this.loading = false;
            this.forgotPasswordEmail(this.user.email?.toLocaleLowerCase());
            this.$router.push({ path: "/email-sent" });
            $toast.success("A reset link has been sent to your email address", {
              duration: 5000,
              queue: false,
              position: "top-right",
              dismissible: true,
              pauseOnHover: true,
            });
            this.user.email = " ";
          }
          // eslint-disable-next-line no-unused-vars
        )
        .catch((error) => {
          this.loading = false;
          $toast.error(error.response.data.message, {
            duration: 5000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    },
    isVisible() {
      return (passwordFieldType.value =
        passwordFieldType.value === "password" ? "text" : "password");
    },
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
};
</script>
<style lang="">
</style>