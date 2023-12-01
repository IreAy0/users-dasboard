<template>
  <div class="auth-wrapper auth-v2">
    <!-- <div class="vector-1"></div>
    <div class="vector-2"></div>
    <div class="vector-3"></div> -->
    <div class="auth-inner row m-0">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 35px;
        "
        class=""
      >
      
        <div
          class="m-0 bg-white shadow zindex-2 rounded-2 px-xl-3 new-auth-inner"
        >
          <div class="align-items-center">
            <div
              class="col-12 col-sm-8 col-md-6 col-lg-12 mx-auto py-3 px-2 p-xl-5"
            >
            <div class="brand-logo">
              <router-link to="/">
                <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mb-2" width="150" />
                <h2 class="brand-text text-primary ms-1"></h2>
              </router-link>
            </div>

            <div style="background-color: rgba(0,59,179,0.2);width: 50px; height:50px;margin: auto" class="p-50 text-primary mb-1 rounded-circle d-flex align-items-center justify-content-center">

              <span  class="iconify " data-icon="ic:twotone-check" data-width="24"></span>
            </div>

            <h2 class="card-title text-gray-900 fw-bolder mb-1 text-center">Email Verified Successfully</h2>

            
              <p class="card-text fs-5 fw-bold mb-2 text-center">
                 Please click the button below to go back to Sign In.
              </p>
              <div class="form-group">
                <div class="mt-2">
                 

                  <router-link to="/"
                  
                    class="btn btn-primary w-100 py-1"
                    type="button"
                    tabindex="4"
                  >
                    <span
                      v-show="sending == true"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Back to Sign in
                  </router-link>
                </div>
              

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { ref } from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import VOtpInput from "vue3-otp-input";
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";
import Preloader from '@/components/PreLoader.vue'

let otpInput = ref(null);
const loading = ref(false);
const $toast = useToast();
export default {
  name: "VerifyPage",
  
  data() {
    return {
      resendSuccesful: "false",
      sending: false
    };
  },
  

  computed: {
    ...mapState("AuthModule", ["verifying", "verifyError"]),
  },
  methods: {
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions("AuthModule", ["verify"]),
   

    // resendVerify() {
    //   this.sending = true
    //   ToNote.post("/user/email/resend", {
    //     email: this.$route.query.email,
    //   }).then((res) => {
    //     if (res) {
    //       this.sending=false
    //       $toast.success("OTP Sent successfully", {
    //         duration: 3000,
    //         queue: false,
    //         position: "top-right",
    //         dismissible: true,
    //         pauseOnHover: true,
    //       });
    //     }
    //   });
    // },
  },
  mounted(){
    if (!this.$route.query.email) {
      this.$router.push({path: '/'})
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
};
</script>

<style scoped>
</style>
