<template>
  <b-col
  sm="12"
  
  class="mx-auto  zindex-3 rounded h-100 "
>
 
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
      <label for="login-email"> Company Email </label>
    </div>

    <div class="mb-2">
      <div class="form-floating">
        
        <input
          v-model="user.password"
          :type="passwordFieldType"
          class="form-control"
          id="floatingLoginPassword"
          placeholder="*********"
        />
        <label for="login-password">Password </label>
      </div>
      

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
    <router-link class="font-weight-bold" to="/create-account">
      &nbsp;Create an account
    </router-link>
  </b-card-text>
</b-col>
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
          img: "/app-assets/images/banner/auth-image-1.png",
          text: "We aim to streamline the process of reaching agreements and cultivate trust",
        },
        {
          img: "/app-assets/images/banner/auth-image-2.png",
          text: "Say goodbye to the traditional hassles of finding a Notary.",
        },
        {
          img: "/app-assets/images/banner/auth-image-3.png",
          text: "We promote a sense of confidence and security in all your dealings.",
        },
        {
          img: "/app-assets/images/banner/auth-image-4.png",
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
        entry_point: "Company",
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
