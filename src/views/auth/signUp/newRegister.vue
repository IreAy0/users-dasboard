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
        class="d-flex align-items-center position-relative mx-auto auth-bg px-2 p-lg-5"
      >
        <b-col
          lg="12"
          class="px-xl-large mx-auto login-card bg-white zindex-3 rounded h-100 py-3"
        >
          <b-link class="d-flex justify-content-center">
            <img
              src="/app-assets/images/logo/betaLogo.png"
              class="img-fluid"
              width="150"
            />
          </b-link>
          <b-card-title
            class="mb-2large mt-4 card-title text-gray-900 font-weight-bold"
            tag="h2"
          >
            Get started with us
          </b-card-title>
          <!-- <GoogleLogin :callback="callback">
            
          </GoogleLogin> -->
          <b-button
            variant="outline-button"
            block
            class="w-100 text-gray-700 outline-button"
            @click="callback"
          >
            <Icon icon="flat-color-icons:google" class="me-50" width="24" />
            <span class="align-middle">Sign up with Google</span>
          </b-button>
          <!-- divider -->
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
                <b-col class="mb-2 pl-0 pr-1" cols="12" lg="6">
                  <label for="register-firstName">First Name*</label>
                  <Field
                    name="first_name"
                    :class="{ 'border-danger': errors.first_name }"
                    class="form-control form-control-lg"
                    type="text"
                  />
                  <small class="text-danger">{{ errors.first_name }}</small>
                </b-col>

                <b-col class="mb-2 pr-0 pl-1" cols="12" lg="6">
                  <label for="register-lastName">Last Name*</label>
                  <Field
                    name="last_name"
                    :class="{ 'border-danger': errors.last_name }"
                    class="form-control form-control-lg"
                    type="text"
                  />
                  <small class="text-danger">{{ errors.last_name }}</small>
                </b-col>
              </div>

              <b-col class="mb-2 pl-0 pr-0" cols="12">
                <label for="register-email">Email*</label>
                <Field
                  name="email"
                  :class="{ 'border-danger': errors.email }"
                  class="form-control form-control-lg"
                  type="email"
                />
                <small class="text-danger">{{ errors.email }}</small>
              </b-col>
              <div class="d-flex flex-wrap">
                <b-col class="pl-0 pr-1" cols="12" lg="6">
                  <label for="register-password">Password*</label>
                  <Field
                    name="password"
                    v-model="user.password"
                    :class="{ 'border-danger': errors.password }"
                    class="form-control form-control-lg"
                    :type="passwordFieldType"
                  />
                  <!-- <small class="text-danger">{{ errors.password }}</small> -->
                </b-col>

                <b-col class="pl-1 pr-0" cols="12" lg="6">
                  <label for="register-password">Confirm Password*</label>
                  <Field
                    name="confirm"
                    v-model="confirm_password"
                    class="form-control form-control-lg"
                    :type="passwordFieldType"
                  />
                  <!-- <small class="text-danger">{{ errors.password }}</small> -->
                </b-col>
              </div>

              <div v-show="user.password.length > 0" class="mt-50">
                <b-form-checkbox
                  @change="togglePasswordVisibility"
                  class="fs-small text-dark"
                >
                  Show password
                </b-form-checkbox>
              </div>
            </div>

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
                  At least 8 characters
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
                  At least 1 capital letter
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
                  At least 1 small letter
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
                  At least 1 number
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
                  At least 1 special character
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
                  Passwords match
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
          <div class="d-flex justify-content-center">
            <b-img
              fluid
              width="324"
              src="/app-assets/images/banner/auth-image.png"
              alt="Login V2"
            />
          </div>
         
        <SwiperComponent :items="slideItems" />
     
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
import { decodeCredential, googleAuthCodeLogin, googleTokenLogin } from "vue3-google-login";
import { Form, Field, ErrorMessage } from "vee-validate";
import { togglePasswordVisibility } from "../../../@core/mixins/ui/forms";
import SwiperComponent from '../../../components/SwiperComponent.vue';

export default {
  name: "RegisterPage",
  components: {
    Icon,
    Form,
    Field,
    SwiperComponent
  },
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "User",
      },
      submitted: false,
      termsState: "",
      validated: false,
      passwordError: true,
      showPass: false,
      confirm_password: "",
      passwordFieldType: "password",
      // passwordFieldType: 'password',
      slideItems: [
       'We aim to streamline the process of reaching agreements and cultivate trust',
        'Say goodbye to the traditional hassles of finding a Notary.' ,
        'We promote a sense of confidence and security in all your dealings.',
        'We save valuable time and ensures the highest level of accuracy in legal documentation.',

      ]
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
    password: {
      handler(newConfirm_password, oldConfirm_password) {
        this.checkPasswords(newConfirm_password);
      },
    },
  },

  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2));
      this.submitted = true;
      const registerDetails = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email.toLocaleLowerCase(),
        password: values.password,
        role: "User",
        entry_point: "User",
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
      if (this.user.password === this.confirm_password) {
        this.passwordError = false;
      } else {
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
      console.log("first", values);
      const registerDetails = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email.toLocaleLowerCase(),
        password: this.user.password,
        role: this.user.role,
        entry_point: "User",
      };
    },
    callback() {
      // This callback will be triggered when the user selects or login to
      // his Google account from the popup
      googleAuthCodeLogin().then((response) => {
        //  const userData = decodeCredential(response.credential)
        console.log("Handle the response", response);
      });
      // const userData = decodeCredential(response.credential)
      // console.log("Handle the userData", userData)
      // console.log("Handle the response", response)
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


</style>
