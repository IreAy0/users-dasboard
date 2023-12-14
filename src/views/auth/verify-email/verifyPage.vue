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
        <!-- <router-link class="brand-logo" to="/">
          <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
        </router-link> -->
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

            
             
              <div class="form-group d-flex justify-content-center">
                <Preloader />
                   
               
                
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
  components: {
    // VOtpInput,
    Preloader
  },
  data() {
    return {
      resendSuccesful: "false",
    };
  },
  setup() {
    const clearInput = () => {
      otpInput.value.clearInput();
    };
    const fillInput = (value) => {
      otpInput.value?.fillInput(value);
};
    return { clearInput, fillInput, otpInput };
  },

  computed: {
    ...mapState("AuthModule", ["verifying", "verifyError"]),
  },
  methods: {
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions("AuthModule", ["verify"]),
    handleSubmit() {
      let email = this.$route.query.email;
      let otp = this.$route.query.access_code
      const data = {
        email: email.toLocaleLowerCase(),
        otp: otp,
      };

      loading.value = true;
      this.verify(data);
    },

    resendVerify() {
      ToNote.post("/user/email/resend", {
        email: this.$route.query.email,
      }).then((res) => {
        if (res) {
          $toast.success("OTP Sent successfully", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      });
    },
  },
  mounted(){
    if (!this.$route.query.access_code && !this.$route.query.email) {
      this.$router.push({path: '/'})
    }else {
      // otpInput.value.otp = [...this.$route.query.access_code];
      this.loading = true
      this.handleSubmit()
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
