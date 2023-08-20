<template>
  <div class="auth-wrapper auth-v2">
    <div class="vector-1">

    </div>
  <div class="vector-2 ">
  </div>
  <div class="vector-3"></div>
    <b-row class="auth-inner m-0">
      <!-- <div class="bg-primary"></div>
      <div class="bg-info"></div> -->
      <!-- Brand logo-->
      <!-- <b-link class="brand-logo">
        <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="100" />
      </b-link> -->
      <!-- /Brand logo-->


      <!-- Login-->
      
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

              <div class="mt-50">
                <b-form-checkbox
                @change="togglePasswordVisibility"
                class="fs-small text-dark">
                Show password
              </b-form-checkbox>
              </div>
            </div>
            
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
         
          <!-- :autoplay="2000" -->
          <Carousel  :wrap-around="true"  :transition="700">
            <Slide v-for="slide in slides"  :key="slide">
              <div class="carousel__item">
                <p>
                  {{ slide }}
                </p>
                <a class="text-primary" href="http://"> Learn More <Icon icon="ph:arrow-right-light" />                </a>

              </div>

            </Slide>
        
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </b-col>
      <!-- /Left Text-->

    </b-row>
  </div>
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
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


const loading = ref(false);
let passwordFieldType = ref("password");
export default {
  name: 'LoginPage',
  components: {
		Icon,
    Carousel,
    Slide,
    Pagination,
    // Navigation,
	},
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      close: false,
      passwordFieldType: 'password',
      slides: [
        "1 We aim to streamline the process of reaching agreements and cultivate trust",
        "2 We aim to streamline the process of reaching agreements and cultivate trust",
        "3 We aim to streamline the process of reaching agreements and cultivate trust"
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

<style>

.carousel__viewport{
  background-color: #fff;
  border-radius: 8px;
  margin : 10px 0;
}
.carousel__item {
  padding: 30px 40px;
  
  width: 100%;
  color: #000;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  text-align: initial;
}

.carousel__item p {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  color: #000
}

.carousel__item a {
  font-size: 15px
}
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.carousel__pagination-button::after {
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #CCD8F0;
    
}
.carousel__pagination-button--active::after {
  background: #003BB3;

}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: #003BB3;
}

.carousel-slide {
  flex: 0 0 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}
</style>
