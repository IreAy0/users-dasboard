<template>
  <div class="auth-wrapper auth-cover">
    <div class="auth-inner row m-0">
      <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/main.svg" class="img-fluid mt-2" width="150" />
        <!-- <h2 class="brand-text text-primary ms-1"></h2> -->
      </router-link>

     <div class="d-none d-lg-block col-lg-6 align-items-center p-0 ">
        <div class=" align-items-center justify-content-center ">
          <img class="w-100" src="/app-assets/images/pages/login_noLogo.jpg" alt="Login V2" />
        </div>
      </div>

      <div class="d-flex col-lg-6 align-items-center auth-bg px-2 p-lg-5">

        <div class="col-12 col-sm-8 col-md-6 col-lg-10 px-xl-2 mx-auto">
          
                  <h2 class="card-title fw-bolder mb-1">Two Step Verification &#x1F4AC;</h2>
                  <p class="card-text mb-75">We sent a verification code to your email. Enter the code in the field below.</p>
                  <div class="form-group">
                    
                  <form  class="mt-2" @submit.prevent="handleSubmit">
                    <h6>Type your 6 digit security code</h6>
                    <div class="d-flex auth-input-wrapper mt-2 d-flex align-items-center justify-content-between ">
    <VOtpInput
      ref="otpInput"
      input-classes="otp-input form-control auth-input height-50 text-center numeral-mask mx-25 mb-1"
      separator=""
      :num-inputs="6"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-change="handleOnChange"
      @on-complete="submitOtp"
    />
  </div>

                    <button class="btn btn-primary w-100" type="submit" tabindex="4">
                      <span v-show="verifying" class="spinner-border spinner-border-sm"></span>
                      Verify my account
                      
                      </button>
                  </form>
                  <p class="text-center mt-2"><span>Didn&rsquo;t get the code?</span><a href="Javascript:void(0)" @click="resendVerify"><span>&nbsp;Resend</span></a><span>&nbsp;or</span><a href="Javascript:void(0)"><span>&nbsp;Call Us</span></a></p>
                </div>
              </div>
      </div>
    </div>
  </div>
</template>

<script >
import { ref } from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import VOtpInput from 'vue3-otp-input';
import ToNote from '@/Services/Tonote';
import { useToast } from 'vue-toast-notification';

const otpInput = ref(null)
const loading = ref(false);
const toast = useToast()
export default {
 name: 'VerifyPage',
 components: {
    VOtpInput,
  },
  data(){
      return{
        resendSuccesful: "false"
      }
  },
  setup(){
     const clearInput = () => {
      otpInput.value.clearInput()
    }
 
    return {  clearInput, otpInput };
   },
  computed:{
    ...mapState('AuthModule',['verifying', 'verifyError']),
  },
    methods: {
        ...mapMutations("MenuModule",["toggleEveryDisplay", "toggleHideConfig"]),
        ...mapActions('AuthModule', ['verify']),
        handleSubmit() {
            let  email = localStorage.getItem('user')
    const data =  {email: email, otp: otpInput.value.otp.join('') }
      
    loading.value = true;
    this.verify(data)
            
            
        },

    resendVerify(){
      ToNote.post('/user/email/resend', {
        email: localStorage.getItem('user')
        }).then(res => {
          if(res){
           toast.success('OTP Sent successfully', {
                      duration: 3000,
                    queue: false,
                    position: "top-right",
                    dismissible: true,
                    pauseOnHover: true,
                })
          }
        
      })
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

<style scoped>
</style>
