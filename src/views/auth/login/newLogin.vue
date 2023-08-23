<template>
  <div class="auth-wrapper auth-v2">
    <div class="vector-1">

    </div>
  <div class="vector-2 ">
  </div>
  <div class="vector-3"></div>
    <b-row class="auth-inner m-0">
     
      
      <b-col
        lg="6"
        class="d-flex align-items-center position-relative mx-auto auth-bg px-2 p-lg-5"
      >
      
        <b-col
          sm="8"
          md="6"
          lg="10"
          class="px-xl-large mx-auto login-card bg-white zindex-3 rounded h-100  py-3"
        >
        <b-link class="d-flex justify-content-center">
        <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid " width="150" />
      </b-link>
          <b-card-title
            class="mb-2large mt-4 card-title text-gray-900 font-weight-bold"
            tag="h2"
          >
            Welcome to ToNote! 👋
          </b-card-title>
          <b-button
          variant="outline-button"
          block
          class="w-100 text-gray-700 outline-button"
        >
        <Icon icon="flat-color-icons:google" class="me-50" width="24" />
          <span class="align-middle">Sign up with Google</span>
        </b-button>
          <!-- divider -->
          <div class="divider m-0">
            <div class="divider-text">
              or
            </div>
          </div>
          <form @submit.prevent="handleLogin">
            <div :class="{ 'is-invalid': loginError}" class="mt-1">
              <div v-if="loginError" class="alert p-1 alert-danger alert-dismissible fade show" role="alert">
                <strong v-if="loginError?.root">{{ loginError?.root.toString() }}</strong>
                <strong v-if="loginError?.email">{{  loginError?.email?.toString() }}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
            <div class="mb-2">
              <label for="login-email">Email</label>
                <b-form-input
                  id="login-email"
                  placeholder="Enter Email"
                  size="lg"
                  type="email"
                  v-model="user.email"
                />
          </div>
            <!-- <div class="mb-2">
              <label class="form-label fs-small" for="login-email">Email *</label>
              <input class="form-control" type="text" name="email" tabindex="1" placeholder="john@example.com"
                v-model="user.email" />
            </div> -->
            <div class="mb-2">
              <label for="login-password">Password *</label>
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="login-password"
                  size="lg"
                  :type="passwordFieldType"
                  placeholder="******"
                  v-model="user.password"
                />
              </b-input-group>

              <div class="mt-50 d-flex justify-content-between">
                <b-form-checkbox
                @change="togglePasswordVisibility"
                class="fs-small text-dark">
                Show password
              </b-form-checkbox>
              <router-link to="/forgot-password"><small>Forgot
                Password?</small></router-link>
              </div>
            </div>
            <!-- <router-link to="/forgot-password"><small>Forgot
              Password?</small></router-link> -->
            <!-- <div class="mb-2">
              <div class="form-check">
                <input class="form-check-input" id="remember-me" type="checkbox" tabindex="3" />
                <label class="form-check-label" for="remember-me">
                  Remember Me</label>
              </div>
            </div> -->

            <div class="form-group">
              <button  type="submit" class="btn btn-primary btn-block w-100" :disabled="loggingIn || user.email.length == 0 || user.password.length == 0">
                <span v-show="loggingIn" class="spinner-border spinner-border-sm"></span>
                <span>Sign in</span>
              </button>
            </div>

          </form>
         

          <!-- form -->
          

          <b-card-text class="text-center">
            <span>New on our platform? </span>
            <b-link  to="/register">
              <span class="font-weight-bold">&nbsp;Create an account</span>
            </b-link>
          </b-card-text>

         
        </b-col>
      </b-col>
    <!-- /Login-->

      <!-- Left Text-->
      <b-col
        lg="6"
        class="d-none d-lg-flex align-items-center p-5 auth-bg"
      >
        <div class="w-100  align-items-center justify-content-center px-5">
          <div class="d-flex justify-content-center">
            <b-img
            fluid
            width="324"
            src="/app-assets/images/banner/auth-image.png"
            alt="Login V2"
          />
          </div>
         
          <SwiperComponent :items="slideItems" />

        </div>
      </b-col>
      <!-- /Left Text-->

    </b-row>
  </div>

  <ModalComp :header="false" style=" zindex " class="zindex-4 changeModalBackground" :show="openModal" :size="'modal-sm'" :footer="false"
            @close="openModal = false">
            <template #body>
              <ForgotPassword />
            </template>
          </ModalComp>
</template>

<script>
import { ref } from 'vue'
import { mapState, mapActions } from 'vuex'
import { mapMutations } from "vuex";
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { Icon } from '@iconify/vue';
// import { required, email } from '../../../@core/validations'
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { togglePasswordVisibility } from '../../../@core/mixins/ui/forms'
import 'vue3-carousel/dist/carousel.css'
import SwiperComponent from '../../../components/SwiperComponent.vue';
import ModalComp from "@/components/ModalComp.vue";
import ForgotPassword from '../passwords/forgotPassword.vue';

const loading = ref(false);

let passwordFieldType = ref("password");
export default {
  name: 'LoginPage',
  components: {
		Icon,
    SwiperComponent,
    ModalComp,
    ForgotPassword,
    
	},
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      openModal: false,
      close: false,
      passwordFieldType: 'password',
      slideItems: [
       'We aim to streamline the process of reaching agreements and cultivate trust',
        'Say goodbye to the traditional hassles of finding a Notary.' ,
        'We promote a sense of confidence and security in all your dealings.',
        'We save valuable time and ensures the highest level of accuracy in legal documentation.',

      ]
    }
  },
  mixins: [togglePasswordVisibility],
  computed: {
    ...mapState('AuthModule', ['loggingIn', 'loginError']),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'ph:eye-thin' : 'formkit:eyeclosed'
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
  methods: {
    ...mapActions('AuthModule', ['login']),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    handleLogin() {
      loading.value = true;
      const loginDetails = {
        email: this.user.email.toLocaleLowerCase(),
        password: this.user.password,
        entry_point: 'User'
      }
      this.login(loginDetails)
    },

    isVisible() {
      this.passwordFieldType = this.passwordFieldType === 'text' ? 'password' : 'text';

    },
    openForgotPasswordModal(){
      this.openModal = true;
    },
    //set alert timeout
    setAlertTimeout() {
      setTimeout(() => {
        // clear loginError
        this.$store.commit('AuthModule/emptyLoginError');
      }, 5000);
    },
  },

  watch: {
    loginError() {
      
      if (this.loginError) {
        this.setAlertTimeout();
      }
    }
  
  },
  deep: true

}

</script>

<style lang="scss">
.changeModalBackground{
  background: red !important;
}
</style>
