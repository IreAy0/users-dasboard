<template>
  <div class="auth-wrapper auth-cover">
    <div class="auth-inner row m-0">
      <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
        <!-- <h2 class="brand-text text-primary ms-1"></h2> -->
      </router-link>

      <div class="d-none d-lg-block col-lg-6 align-items-center p-0 ">
        <div class=" align-items-center justify-content-center ">
          <img class="w-100" src="/app-assets/images/banner/onboard_1.jpg" alt="Login V2" />
        </div>
      </div>

      <div class="d-flex col-lg-6 align-items-center auth-bg px-2 p-lg-5">

        <div class="col-12 col-sm-8 col-md-6 col-lg-10 px-xl-2 mx-auto">

          <h2 class="card-title fw-bolder mb-1">You are almost done👋</h2>
          <p class="card-text mb-75">Enter your registered email, and a link will be sent to you shortly.</p>
          <div class="form-group">

            <form @submit.prevent="verifyEmail">

              <div class="mb-2">
                <label class="form-label" for="login-email">Email</label>
                <input class="form-control" type="text" name="email" tabindex="1" placeholder="john@example.com"
                  v-model="user.email" />
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
              <span>Already have an account?</span>
              <router-link to="/"><span>&nbsp;Sign in instead</span></router-link>
            </p>
            <!-- <p class="text-center mt-2"><span>Didn&rsquo;t get the code?</span><a href="Javascript:void(0)" @click="resendVerify"><span>&nbsp;Resend</span></a><span>&nbsp;or</span><a href="mailto:ask@gettonote.com" target="_blank"><span>&nbsp;Email Us</span></a></p> -->
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
const $toast = useToast()
export default {
  name: 'Re-Verify',
  components: {

  },
  data() {
    return {
      resendSuccesful: "false",
      user: {
        email: '',

      },
    }
  },

  computed: {
    ...mapState('AuthModule', ['verifying', 'verifyError']),
  },
  methods: {
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions('AuthModule', ['verify']),
    verifyEmail() {
      this.loading = true;
      ToNote.post('/user/email/resend-verify-Otp-with-link', {
        email: this.user.email?.toLocaleLowerCase()


      }).then(res => {
        this.loading = false;
        $toast.success('A verify link has been sent to your email address', {
          duration: 10000,
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
    //     handleSubmit() {
    //         let  email = localStorage.getItem('user')
    // const data =  { email: email.toLocaleLowerCase() , otp: otpInput.value.otp.join('') }

    // loading.value = true;
    // this.verify(data)


    //     },

    // resendVerify(){
    //   ToNote.post('/user/email/resend-verify-Otp-with-link', {
    //     email: localStorage.getItem('user')
    //     }).then(res => {
    //       if(res){
    //        toast.success('OTP Sent successfully', {
    //                   duration: 3000,
    //                 queue: false,
    //                 position: "top-right",
    //                 dismissible: true,
    //                 pauseOnHover: true,
    //             })
    //       }

    //   })
    // }
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
