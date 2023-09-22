<template>
  <div class="auth-wrapper auth-v2">
    <div class="vector-1"></div>
    <div class="vector-2"></div>
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
          class="mx-auto login-card bg-white zindex-3 rounded h-100 py-3"
        >
          <b-link class="d-flex justify-content-center">
            <img
              src="/app-assets/images/logo/betaLogo.png"
              class="img-fluid"
              width="150"
            />
          </b-link>
          <b-card-title
            class="mb-2large text-center mt-4 card-title no-whitespace text-gray-900 font-weight-bold"
            tag="h2"
          >
            Welcome to ToNote! 👋
          </b-card-title>
          <GoogleLogin> Sign in with google </GoogleLogin>

          <!-- divider -->
          <div class="divider m-0">
            <div class="divider-text">or</div>
          </div>
          <form @submit.prevent="handleLogin">
            <div :class="{ 'is-invalid': loginError }" class="mt-1">
              <div
                v-if="loginError"
                class="alert p-1 alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong v-if="loginError?.root">{{
                  loginError?.root.toString()
                }}</strong>
                <strong v-if="loginError?.email">{{
                  loginError?.email?.toString()
                }}</strong>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div class="form-floating mb-2">
              <input
                v-model="user.email"
                ref="usernameField"
                @input="setUsername"
                type="email"
                id="login-email"
                class="form-control"
                placeholder="name@example.com"
                
              />
              <label for="login-email">Email </label>
            </div>

            <div class="mb-2">
              <div class="form-floating">
                <!-- <b-form-input
                  id="login-password"
                  size="lg"
                  :type="passwordFieldType"
                  placeholder="******"
                  v-model="user.password"
                  autocomplete="chrome-off"
                 
                /> -->
                <input
                  v-model="user.password"
                  :type="passwordFieldType"
                  class="form-control"
                  id="floatingLoginPassword"
                  placeholder="*********"
                />
                <label for="login-password">Password </label>
              </div>
              <!-- <label for="login-password">Password *</label>
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="login-password"
                  size="lg"
                  :type="passwordFieldType"
                  placeholder="******"
                  v-model="user.password"
                />
              </b-input-group> -->

              <div class="mt-50 d-flex justify-content-between">
                <b-form-checkbox
                  @change="togglePasswordVisibility"
                  class="fs-small text-dark"
                >
                  Show password
                </b-form-checkbox>
                <router-link to="/forgot-password"
                  ><small>Forgot Password?</small></router-link
                >
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
              <button
                type="submit"
                class="btn btn-primary btn-block w-100"
                :disabled="
                  loggingIn ||
                  (user.email.length == 0 && user.password.length == 0)
                "
              >
                <span
                  v-show="loggingIn"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Sign in</span>
              </button>
            </div>
          </form>

          <!-- form -->

          <b-card-text class="text-center">
            <span>New on our platform? </span>
            <router-link class="font-weight-bold" to="/register">
              &nbsp;Create an account
            </router-link>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->

      <!-- Left Text-->
      <b-col lg="6" class="d-none d-lg-flex align-items-center p-5 auth-bg">
        <div class="w-100 align-items-center justify-content-center px-5">
          <div
            ref="loginSwiper"
            class="loginSwiper swiper-container mySwiper myswiper-container"
          >
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in items"
                :key="index"
              >
                <!-- <img :src="item" alt="Slide Image" /> -->
                <div class="d-flex justify-content-center">
                  <b-img fluid width="324" :src="item?.img" alt="Login V2" />
                </div>
                <p>
                  {{ item?.text }}
                </p>
              </div>
            </div>
            <a class="text-primary" href="http://">
              Learn More <Icon icon="ph:arrow-right-light" />
            </a>
          </div>

          <div
            class="m-auto d-flex align-items-center justify-content-center mt-2 gap-3"
          >
            <div>
              <svg
                class="swiper-button-prev"
                :class="customClassName + '__prev'"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M12.5 15.24L7.5 10.24L12.5 5.23999"
                  stroke="currentColor"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="swiper-pagination swiper-login-pagination"></div>
            <div>
              <svg
                class="swiper-button-next"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M7.5 15.24L12.5 10.24L7.5 5.23999"
                  stroke="currentColor"
                  stroke-width="1.67"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { mapState, mapActions } from "vuex";
import { mapMutations } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { Icon } from "@iconify/vue";
// import { required, email } from '../../../@core/validations'
// import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { togglePasswordVisibility } from "../../../@core/mixins/ui/forms";
import ModalComp from "@/components/ModalComp.vue";
import ForgotPassword from "../passwords/forgotPassword.vue";
import {
  initSwiper,
  destroySwiper,
} from "../../../components/SwiperInstance.js";
import GoogleLogin from "../../../components/GoogleLogin";

const loading = ref(false);

let passwordFieldType = ref("password");
export default {
  name: "LoginPage",
  components: {
    Icon,
    GoogleLogin,
    // SwiperComponent,
    // ModalComp,
    // ForgotPassword,
  },

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      openModal: false,
      close: false,
      passwordFieldType: "password",
      items: [
        {
          img: "/app-assets/images/banner/auth-image.png",
          text: "We aim to streamline the process of reaching agreements and cultivate trust",
        },
        {
          img: "/app-assets/images/banner/auth-image.png",
          text: "Say goodbye to the traditional hassles of finding a Notary.",
        },
        {
          img: "/app-assets/images/banner/auth-image.png",
          text: "We promote a sense of confidence and security in all your dealings.",
        },
        {
          img: "/app-assets/images/banner/auth-image.png",
          text: "We save valuable time and ensures the highest level of accuracy in legal documentation.",
        },

        //  'We aim to streamline the process of reaching agreements and cultivate trust',
        //   'Say goodbye to the traditional hassles of finding a Notary.' ,
        //   'We promote a sense of confidence and security in all your dealings.',
        //   'We save valuable time and ensures the highest level of accuracy in legal documentation.',
      ],
    };
  },
  setup() {
    const usernameField = ref();

    const setUsername = () => {
      console.log("we are here", usernameField.value);
      // this.user.email = '';
    };

    return {
      usernameField,
      setUsername,
    };
  },
  mixins: [togglePasswordVisibility],
  computed: {
    ...mapState("AuthModule", ["loggingIn", "loginError"]),
    passwordToggleIcon() {
      return this.passwordFieldType === "password"
        ? "ph:eye-thin"
        : "formkit:eyeclosed";
    },
  },

  mounted() {
    initSwiper(this.$refs.loginSwiper, {
      spaceBetween: 50,
      loop: true,
      // speed:500,
      effect: "fade",
      pagination: {
        el: ".swiper-login-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
    this.setUsername()
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    destroySwiper();
  },
  created() {
   
  },
  methods: {
    ...mapActions("AuthModule", ["login"]),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    handleLogin() {
      loading.value = true;
      const loginDetails = {
        email: this.user.email.toLocaleLowerCase(),
        password: this.user.password,
        entry_point: "User",
      };
      this.login(loginDetails);
    },
    isVisible() {
      this.passwordFieldType =
        this.passwordFieldType === "text" ? "password" : "text";
    },
    openForgotPasswordModal() {
      this.openModal = true;
    },
    //set alert timeout
    setAlertTimeout() {
      setTimeout(() => {
        // clear loginError
        this.$store.commit("AuthModule/emptyLoginError");
      }, 5000);
    },
    handleInput() {
      // This method is called whenever the input field value changes
      // This can happen due to user input or autofill by the browser
      // You can add additional logic here if needed
      console.log('this.user.email', this.user.email)
    },
  },

  watch: {
    loginError() {
      if (this.loginError) {
        this.setAlertTimeout();
      }
    },
  },
  deep: true,
};
</script>

<style lang="scss">
.myswiper-container {
  padding: 30px 40px;
  border-radius: 8px;
  margin: 10px 0;
  width: 100%;
  color: #000;
  font-size: 18px;
  // display: flex;
  // flex-direction: column;
  text-align: initial;
}

.myswiper-container p {
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
  color: #000;
}

.myswiper-container a {
  font-size: 15px;
}

.swiper-slide {
  opacity: 0 !important;
}
.swiper-slide-active {
  opacity: 1 !important;
}
.swiper-pagination {
  position: relative;
}

.swiper-pagination .swiper-pagination-bullet {
  margin: 0 6px;
}
.swiper-pagination-bullets.swiper-pagination-horizontal {
  top: 0;
  width: auto;
}
.swiper-button-prev {
  // display: none;
  display: block;
  margin-top: 0;
  position: relative;
  // top: 83.5%;
  left: auto;
  z-index: 2;

  &:focus {
    outline: none;
  }
}

.swiper-button-next {
  //display: none;
  position: relative;
  display: block;
  margin-top: 0;
  // top: 83.5%;
  right: auto;
  z-index: 2;

  &:focus {
    outline: none;
  }
}
</style>
