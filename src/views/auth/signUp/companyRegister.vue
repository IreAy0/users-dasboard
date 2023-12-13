<template>
  <div class="auth-wrapper auth-v2">
    <div class="vector-1"></div>
    <div class="vector-2"></div>
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
        md="7"
        class="d-flex align-items-center position-relative mx-auto auth-bg px-2 p-lg-5"
      >
        <b-col
        sm="8"
        md="6"
        lg="10"
          class=" mx-auto login-card bg-white zindex-3 rounded h-100 py-3 "
        >
          <b-link class="d-flex justify-content-center">
            <img
              src="/app-assets/images/logo/betaLogo.png"
              class="img-fluid"
              width="150"
            />
          </b-link>
          <b-card-title
            class="mb-2large mt-4 text-center no-whitespace card-title text-gray-900 font-weight-bold"
            tag="h2"
          >
            Get started with us
          </b-card-title>
          <!-- <GoogleLogin  :callback="loginCallback" /> -->
          <GoogleLogin >
            Sign up with google
          </GoogleLogin>
           
          <div class="divider m-0">
            <div class="divider-text">or</div>
          </div>
          <Form
            @submit="onSubmit"
            v-slot="{ errors }"
            :validation-schema="schema"
          >
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
            <div class="">
              <!-- :rules="validateEmail" -->
              <!-- username -->
              
              <div class="d-flex flex-wrap">
                <b-col class="mb-2 pl-0 pr-1 form-floating" cols="12" lg="6">
                  <Field
                    name="first_name"
                    :class="{ 'border-danger': errors.first_name }"
                    class="form-control "
                    type="text"
                    id="register-firstName"
                    placeholder="First Name"
                  />
                  <label for="register-firstName">First Name*</label>
                  <small class="text-danger">{{ errors.first_name }}</small>
                </b-col>

                <b-col class="mb-2 pr-0 pl-1 form-floating" cols="12" lg="6">
                  <Field
                    name="last_name"
                    :class="{ 'border-danger': errors.last_name }"
                    class="form-control form-control-lg"
                    type="text"
                    id="register-lastName"
                    placeholder="Last Name"
                  />
                  <label for="register-lastName">Last Name*</label>

                  <small class="text-danger">{{ errors.last_name }}</small>
                </b-col>
              </div>
              <b-col class="mb-2 pl-0 pr-0 form-floating" cols="12">
                <Field
                  name="company_name"
                  :class="{ 'border-danger': errors.company_name }"
                  class="form-control form-control-lg"
                  type="text"
                  id="company-name"
                  placeholder="Company Name *"
                />
                <label for="register-email">Company Name*</label>

                <small class="text-danger">{{ errors.company_name }}</small>
              </b-col>
              <b-col class="mb-2 pl-0 pr-0 form-floating" cols="12">
                <Field
                  name="email"
                  :class="{ 'border-danger': errors.email }"
                  class="form-control form-control-lg"
                  type="email"
                  id="register-email"
                  placeholder="Email *"
                />
                <label for="register-email">Email*</label>

                <small class="text-danger">{{ errors.email }}</small>
              </b-col>
              <div class="d-flex flex-wrap">
                <b-col class="pl-0 pr-1 form-floating mb-2" cols="12" lg="6">
                  <Field
                    name="password"
                    v-model="user.password"
                    :class="{ 'border-danger': errors.password }"
                    class="form-control "
                    :type="passwordFieldType"
                    placeholder="Password *"
                    id="register-password"
                  />
                  <label for="register-password">Password*</label>

                  <!-- <small class="text-danger">{{ errors.password }}</small> -->
                </b-col>

                <b-col class="pl-lg-1 pl-0 mt-2 mt-lg-0 pr-0 mb-2 form-floating" cols="12" lg="6">
                  <Field
                    name="confirm"
                    v-model="confirm_password"
                    class="form-control "
                    :type="passwordFieldType"
                    placeholder="Confirm Password *"
                    id="register-confirm-password"
                  />

                  <label for="register-confirm-password">Confirm Password*</label>
                  <!-- <small class="text-danger">{{ errors.password }}</small> -->
                </b-col>
              </div>

              <div v-show="user.password.length > 0" class="mb-2">
                <b-form-checkbox
                  @change="togglePasswordVisibility"
                  class="fs-small text-dark"
                >
                  Show password
                </b-form-checkbox>
              </div>
            </div>
            <!-- <b-col class="mb-2 pl-0 pr-0 form-floating" cols="12">
              <Field
                name="referral_code"
                v-model="user.referral_code"
                class="form-control form-control-lg"
                type="text"
                id="register-referral_code"
                placeholder="Referral Code"
              />
              <label for="register-referral_code">Referral Code(optional)</label>

            </b-col> -->
            <div class="progress" v-show="user.password.length > 0">
              <div
                class="progress-bar"
                :style="{
                  width: `${
                    pws().value == 'Too weak'
                      ? '20%'
                      : pws().value == 'Weak'
                      ? '40%'
                      : pws().value == 'Medium'
                      ? '60%'
                      : pws().value == 'Strong'
                      ? '100%'
                      : '0%'
                  }`,
                  backgroundColor: `${
                    pws().value == 'Strong'
                      ? '#5BCC7A'
                      : pws().value == 'Medium'
                      ? '#25CCD7'
                      : pws().value == 'Weak'
                      ? '#FBDC00'
                      : pws().value == 'Too weak'
                      ? '#FB0066'
                      : ''
                  }`,
                }"
              ></div>
            </div>
            <p class="text--black mb-50" v-show="user.password.length > 0">
              Password Strength:
              <span
                class="mb-0 d-inline-flex"
                :class="{
                  'text--red': pws().value == 'Too weak',
                  'text--yellow': pws().value == 'Weak',
                  'text--teal': pws().value == 'Medium',
                  'text--green': pws().value == 'Strong',
                }"
              >
                {{
                  pws().value == "Too weak"
                    ? "Weak 😖"
                    : pws().value == "Weak"
                    ? "Fair 😟"
                    : pws().value == "Medium"
                    ? "Almost there 😉"
                    : pws().value == "Strong"
                    ? "Strong 😎💪"
                    : ""
                }}
              </span>
            </p>

            <div v-show="user.password.length > 0">
              <ul class="hint">
                <li
                  :class="{
                    'text--red': !pws().length < 8,
                    'text--green': pws().length > 8,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.5015 7L8.0365 3.4645L7.3295 2.7575L4.5015 5.586L3.087 4.1715L2.38 4.8785L4.5015 7Z"
                      fill="currentColor"
                    />
                  </svg>
                  8 character minimum
                </li>
                <li
                  :class="{
                    'text--red': !pws().contains.includes('uppercase'),
                    'text--green': pws().contains.includes('uppercase'),
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.5015 7L8.0365 3.4645L7.3295 2.7575L4.5015 5.586L3.087 4.1715L2.38 4.8785L4.5015 7Z"
                      fill="currentColor"
                    />
                  </svg>
                  one uppercase character
                </li>
                <li
                  :class="{
                    'text--red': !pws().contains.includes('lowercase'),
                    'text--green': pws().contains.includes('lowercase'),
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.5015 7L8.0365 3.4645L7.3295 2.7575L4.5015 5.586L3.087 4.1715L2.38 4.8785L4.5015 7Z"
                      fill="currentColor"
                    />
                  </svg>
                  one lowercase character
                </li>
                <li
                  :class="{
                    'text--red': !pws().contains.includes('number'),
                    'text--green': pws().contains.includes('number'),
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.5015 7L8.0365 3.4645L7.3295 2.7575L4.5015 5.586L3.087 4.1715L2.38 4.8785L4.5015 7Z"
                      fill="currentColor"
                    />
                  </svg>
                  one number
                  
                </li>
                <li
                  :class="{
                    'text--red': !pws().contains.includes('symbol'),
                    'text--green': pws().contains.includes('symbol'),
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.5015 7L8.0365 3.4645L7.3295 2.7575L4.5015 5.586L3.087 4.1715L2.38 4.8785L4.5015 7Z"
                      fill="currentColor"
                    />
                  </svg>
                  one special character
                </li>

                <!-- <li class="text--red" :class="{
                  'text--red': pws().value !== 'Too weak',
                  'text--red': pws().value == 'Weak',
                  'text-warning': pws().value == 'Medium',
                  'text--green': pws().value == 'Strong',
                }">
                  {{ pws().value }}
                </li> -->

                <li
                  :class="{
                    'text--red': passwordError === true,
                    'text--green': passwordError === false,
                  }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.5015 7L8.0365 3.4645L7.3295 2.7575L4.5015 5.586L3.087 4.1715L2.38 4.8785L4.5015 7Z"
                      fill="currentColor"
                    />
                  </svg>
                  must match 
                </li>
              </ul>
            </div>

            <div class="form-group mt-2">
              <!-- :disabled="loggingIn || user.email.length == 0 || user.password.length == 0" -->
              <button type="submit" class="btn btn-primary btn-block w-100">
                <span
                  v-show="processing"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Get Started</span>
              </button>
            </div>
          </Form>

          <!-- form -->

          <b-card-text class="text-center">
            <span>Already have an account? </span>
            <b-link to="/">
              <span class="font-weight-bold">&nbsp;Sign in</span>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->

      <!-- Left Text-->
      <b-col lg="6" class="d-none d-lg-flex align-items-center p-5 auth-bg">
        <div class="w-100 align-items-center justify-content-center px-5">
          <!-- <div class="d-flex justify-content-center">
            <b-img
              fluid
              width="324"
              src="/app-assets/images/banner/auth-image.png"
              alt="Login V2"
            />
          </div> -->
         
          <div ref="signSwiper" class="swiper-container mySwiper myswiper-container">
            <div class="swiper-wrapper ">
              <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                <!-- <img :src="item" alt="Slide Image" /> -->
                <div class="d-flex justify-content-center">
                  <b-img
                  fluid
                  width="324"
                  :src="item?.img"
                  alt="Login V2"
                />
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
      
        <div class="m-auto d-flex align-items-center justify-content-center mt-2 gap-3 ">
          <div  >
             <svg
          class="swiper-button-prev swiper-sign-prev"
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
           <div class="swiper-pagination swiper-sign-pagination"></div>
          <div >
            <svg
          class="swiper-button-next swiper-sign-next"
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
     
          <!-- :autoplay="2000" -->
        
        </div>
      </b-col>
      <!-- /Left Text-->
    </b-row>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { mapState, mapActions, mapMutations } from "vuex";
import { passwordStrength } from "../passwordChecker";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { Icon } from "@iconify/vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { togglePasswordVisibility } from "../../../@core/mixins/ui/forms";
import { initSwiper, destroySwiper } from '../../../components/SwiperInstance.js';
import GoogleLogin from '../../../components/GoogleLogin';

export default {
  name: "RegisterPage",
  components: {
    Icon,
    Form,
    Field,
    GoogleLogin
    // SwiperComponent
  },
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        company_name: "",
        password: "",
        role: "Company",
        referral_code: ""
      },
      submitted: false,
      termsState: "",
      validated: false,
      passwordError: true,
      showPass: false,
      confirm_password: "",
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

  mixins: [togglePasswordVisibility],
  
  computed: {
    ...mapState("AuthModule", ["processing", "loginError"]),
    passwordToggleIcon() {
      return this.passwordFieldType === "password"
        ? "ph:eye-thin"
        : "formkit:eyeclosed";
    },
    schema() {
      return yup.object({
        email: yup
          .string()
          .required("Please enter your email address.")
          .email("Please enter a valid email address."),
        password: yup.string().required().min(8),
        first_name: yup.string().required("Please enter your first name."),
        last_name: yup.string().required("Please enter your last name."),
        // password: yup.string().min(this.min),
      });
    },
  },
  watch: {
    confirm_password: {
      handler(newConfirm_password, oldConfirm_password) {
        this.checkPasswords(newConfirm_password);
      },
    },
    user: {
      immediate: true, // Fire the handler immediately when component mounts
      deep: true, // Watch for nested property changes
      handler(newValue, oldValue) {
        this.checkPasswords(newValue.password)
      },
    },
    deep: true,
  },
  
  mounted() {

    this.user.referral_code = this.$route.query.referral_code
    initSwiper(this.$refs.signSwiper, {
        spaceBetween: 50,
        loop: true,
        // speed:500,
        effect: 'fade',
        pagination: {
          el: '.swiper-sign-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      
    });
  },
  methods: {
    onSubmit(values) {
      this.submitted = true;
      const registerDetails = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email.toLocaleLowerCase(),
        password: values.password,
        role: "Company",
        referral_code: this.user.referral_code
      };
      if (
        this.passwordError == false &&
        (this.pws().value == "Strong" || this.pws().value == "Medium")
      ) {
        this.register(registerDetails);
      }
    },
    pws() {
      return passwordStrength(this.user.password);
    },
   
    checkPasswords(e) {
      if(this.user.password === this.confirm_password) {
        this.passwordError = false;
      } else{
          this.passwordError = true;
      }

    },
    ...mapActions("AuthModule", ["register"]),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    handleTermsState() {
      this.validated = true;
    },

    handleSubmit(values) {
      this.submitted = true;
     
      const registerDetails = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email.toLocaleLowerCase(),
        password: this.user.password,
        role: this.user.role,
        entry_point: "User",
      };
    },
   
    termsError() {
      return this.validated && !this.termsState;
    },
  },

  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    destroySwiper()
  },
 
  // },
};
</script>

<style lang="scss" >
ul.hint {
  font-size: 12px;
  line-height: 21px;
  list-style-type: none;
  color: #434343;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

ul.hint li {
  margin-bottom: 2px;
  width: 50%;
}

.text--red {
  color: #fb0066;
}

.text--yellow {
  color: #fbdc00;
}

.text--teal {
  color: #25ccd7;
}
.text--green {
  color: #5bcc7a;
}


.text--black {
  color: #000;
  font-weight: 400;
}
.progress {
  overflow: hidden;
  height: 6px;
  margin: 10px 0px;
  background-color: #f5f6f7;
  border-radius: 20px;
}

.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  font-size: 12px;
  line-height: 20px;
  color: #ffffff;
  text-align: center;
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}


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

.swiper-slide{
  opacity:0 !important;
}
.swiper-slide-active{
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
