<template lang="">
    <div class="auth-wrapper auth-v2">
      <div class="vector-1">

      </div>
    <div class="vector-2 ">
    </div>
    <div class="vector-3"></div>
    <div class="auth-inner row m-0">
      
      <div style="display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 35px;
      " class="">
        <!-- <router-link class="brand-logo" to="/">
          <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mt-2" width="150" />
        </router-link> -->
      <div class=" m-0  bg-white shadow zindex-2 rounded-2 px-xl-3 new-auth-inner">
        <div class="  align-items-center  ">
          <div class="col-12 col-sm-8 col-md-6  col-lg-12 mx-auto py-3 px-2 p-xl-5 ">
            <div class="brand-logo">
              <router-link to="/">
                <img src="/app-assets/images/logo/betaLogo.png" class="img-fluid mb-2" width="150" />
                <h2 class="brand-text text-primary ms-1"></h2>
              </router-link>
            </div>
            <h2 class="card-title text-gray-900 text-center font-weight-bold mb-1 text-center">Forgot password</h2>
            <p class="card-text mb-2 text-center">
              Set up a new password
            </p>

       
            <form @submit.prevent="resetPassword" >
            
              <div class="mb-2 ">
                <input 
                class="form-control py-2" 
                type="text" 
                name="email" 
                tabindex="1" 
                placeholder="john@example.com"
                v-model="resetForm.email"
                disabled
                />
                
                <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
              </div>
                <div class="mb-2 position-relative form-floating ">
                <input 
                class="form-control py-2" 
                :type="passwordFieldType" 
                name="password" 
                tabindex="1" 
                placeholder="Create New Password"
                v-model="password"
                id="reset-password"
                />
                <label for="reset-password">New Password</label>
                <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
              </div>
               <div class="position-relative form-floating">
                <input 
                class="form-control py-2" 
                :type="passwordFieldType" 
                name="confirm"
                tabindex="1" 
                placeholder="Confirm New Password"
                v-model="confirm_password"
                id="reset-confirm-password"
                />
                <label for="reset-confirm-password">Confirm New Password</label>
              </div>
              <!-- v-show="user.password.length > 0" -->
              <div v-show="password.length > 0" class="mt-50">
                <b-form-checkbox
                  @change="togglePasswordVisibility"
                  class="fs-small text-dark"
                >
                  Show password
                </b-form-checkbox>
              </div>
              <!-- v-show="user.password.length > 0" -->
              <div v-show="password.length > 0" class="progress" >
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
              <p class="text--black mb-50" v-show="password.length > 0">
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
              
              <div v-show="password.length > 0">
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
                    8 characters minimum
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
  
                  <li
                    :class="{
                      'text--red': passwordError == true || password !== confirm_password,
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
              <div class="form-group mt-2 ">
                <button class="btn btn-primary btn-block w-100" :disabled="loading || passwordError === true || (password.length == 0 &&  confirm_password.length==0) || ( password !== confirm_password)  || pws().value == 'Too weak' || pws().value == 'Weak ' ">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Reset Password</span>
                </button>
              </div>
  
            </form>
  <p class="text-center mt-2">
    <span>Return to</span>
    <b-link to="/">
      <span class="font-weight-bold">&nbsp;Sign in</span>
    </b-link>
    </p>
  
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
// eslint-disable no-unused-vars 

import ToNote from '@/Services/Tonote';
import { useToast } from 'vue-toast-notification';
import { mapMutations } from 'vuex';
import { passwordStrength } from '../passwordChecker';
import { togglePasswordVisibility } from "../../../@core/mixins/ui/forms";

const $toast = useToast()
export default {
  name: "ResetPassword",


  data() {
    return {
      passwordFieldType: 'password',
      loading: false,
      passwordError: true,
      showPass: false,
      confirm_password: "",
      password: "",
    }
  },
  computed: {
    // ...mapState('AuthModule',['loggingIn', 'loginError']),
    resetForm() {
      const resetForm = {
        email: this.$route.query?.email?.toLocaleLowerCase(),
        token: this.$route.query.hash,
       
        password_confirmation: "",
        
      }
      return resetForm
    }
  },
  mixins: [togglePasswordVisibility],
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
    // ...mapActions('AuthModule',['login']),
    resetPassword() {
      this.loading = true
      const formData = {
        email: this.$route.query?.email?.toLocaleLowerCase(),
        token: this.$route.query.hash,
        password: this.password,
        password_confirmation: this.confirm_password,
      }
      // console.log(formData),
      // eslint-disable-next-line no-unused-vars
      ToNote.post('/user/password/reset', formData).then(res => {
        this.loading = false
        $toast.success('Successfully updated password', {
          duration: 5000,
          queue: false,
          position: "top-right",
          dismissible: true,
          pauseOnHover: true,
        })
        this.$router.push('/')
      }
        // eslint-disable-next-line no-unused-vars
      ).catch(error => {

        this.loading = false
        if (error.response.data.data) {
          $toast.error('Link Expired', {
            duration: 5000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          })
        } else {
          $toast.error(error.response.data.message, {
            duration: 5000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          })
        }



      })
    },

    isVisible() {
      this.passwordFieldType =
        this.passwordFieldType === "text" ? "password" : "text";
    },


    pws() {
      // console.log(this.password, this.resetForm.password)
      
      return passwordStrength(this.password);
    },

    checkPasswords(e) {
      if (this.password === this.confirm_password) {
        this.passwordError = false;
      } else {
        this.passwordError = true;
      }
    },
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
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
<style lang="scss" scoped>
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