<template>
  <div class="auth-wrapper auth-cover">
    <div class="auth-inner row m-0">
      <!-- Brand logo-->
     <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/main.svg" class="img-fluid mt-2" width="150" />
        <h2 class="brand-text text-primary ms-1"></h2>
      </router-link>

      <div class="d-none d-lg-block col-lg-6 align-items-center p-0 ">
        <div class=" align-items-center justify-content-center ">
          <img class="w-100" src="/app-assets/images/banner/onboard_1.jpg" alt="Login V2" />
        </div>
      </div>
      <!-- /Left Text-->
      <!-- Register-->
      <div class="d-flex col-lg-6 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-10 px-xl-2 mx-auto">
          <h2 class="card-title fw-bold mb-1">Productivity starts here 🚀</h2>
          <!-- <p class="card-text mb-2">Get more things done the easy way!</p> -->

          <form
            @submit.prevent="handleSubmit"
            class="auth-register-form mt-2 row"
            novalidate
          >
            <div class="mb-2 col-6">
              <label class="form-label" for="first-name">First Name</label>
              <input
                class="form-control"
                id="first-name"
                type="text"
                name="first-name"
                placeholder="Thomas"
                aria-describedby="first-name"
                autofocus=""
                tabindex="1"
                v-model="user.first_name"
                required
                :class="{ 'is-invalid': loginError?.first_name }"
              />
              <div v-if="loginError?.first_name" class="invalid-feedback">
                {{ loginError?.first_name?.toString() }}
              </div>
            </div>

            <div class="mb-2 col-6">
              <label class="form-label" for="last-name">Last name</label>
              <input
                class="form-control"
                id="last-name"
                type="text"
                name="last-name"
                placeholder="Edison"
                aria-describedby="last-name"
                autofocus=""
                tabindex="1"
                v-model="user.last_name"
                required
                :class="{ 'is-invalid': loginError?.last_name }"
              />
              <div v-if="loginError?.last_name" class="invalid-feedback">
                {{ loginError?.last_name?.toString() }}
              </div>
            </div>

            <div class="mb-2 col-12">
              <label class="form-label" for="register-email">Email</label>
              <input
                class="form-control"
                id="register-email"
                type="text"
                name="register-email"
                placeholder="john@example.com"
                aria-describedby="register-email"
                tabindex="2"
                v-model="user.email"
                :class="{ 'is-invalid': loginError?.email }"
              />
              <div v-if="loginError?.email" class="invalid-feedback">
                {{ loginError?.email?.toString() }}
              </div>
            </div>

            <div class="mb-2 col-6 position-relative">
              <label class="form-label" for="password">Password</label>
              <div
                class="input-group input-group-merge form-password-toggle"
                :class="{
                  'is-invalid': loginError?.password,
                  'is-invalid': passwordError === true,
                }"
              >
                <input
                  v-show="!showPass"
                  v-model="user.password"
                  :class="{
                    'border-danger': loginError?.password,
                    'border-danger': passwordError === true,
                  }"
                  class="form-control form-control-merge"
                  id="password"
                  :type="passwordFieldType"
                  name="password"
                  placeholder="············"
                  aria-describedby="register-password"
                  tabindex="3"
                />
                
              </div>
               <a type="button" class="position-absolute top-50 end-0  px-2" @click="isVisible">
                
                <svg v-show="passwordFieldType === 'password'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>

<svg v-show="passwordFieldType === 'text'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg>
              </a>

              <div v-if="loginError?.password" class="text-danger text-sm">
                {{ loginError?.password?.toString() }}
              </div>
              <div v-if="passwordError === true" class="text-danger text-sm">
                "Passwords do not Match"
              </div>
            </div>
            <div class="mb-2 col-6  position-relative">
             
              <label class="form-label" for="confirm">Confirm Password</label>
              <div
                class="input-group input-group-merge form-password-toggle"
                :class="{
                  'is-invalid': loginError?.password,
                  'is-invalid': passwordError === true,
                }"
              >
                <input
                  @change="checkPasswords()"
                  :class="{
                    'border-danger': loginError?.password,
                    'border-danger': passwordError === true,
                  }"
                  class="form-control form-control-merge "
                  id="confirm"
                  :type="passwordFieldType"
                  name="confirm"
                  placeholder="············"
                  aria-describedby="register-password"
                  tabindex="3"
                />
                  
              </div>
              <a type="button" class="position-absolute top-50 end-0  px-2" @click="isVisible">
                
                <svg v-show="passwordFieldType === 'password'"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
</svg>

<svg v-show="passwordFieldType === 'text'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg>
              </a>
              <div v-if="loginError?.password" class="text-danger text-sm">
                {{ loginError?.password?.toString() }}
              </div>
              <div v-if="passwordError === true" class="text-danger text-sm">
                "Passwords do not Match"
              </div>
            </div>
            <!-- <div class="mb-1 col-6">
              <label class="form-label" for="confirm-password"
                >Confirm Password</label
              >
              <div class="input-group input-group-merge form-password-toggle">
                <input
                  class="form-control form-control-merge"
                  id="confirm-password"
                  type="password"
                  name="confirm-password"
                  placeholder="············"
                  aria-describedby="confirm-password"
                  tabindex="3"
                /><span class="input-group-text cursor-pointer"
                  ><i data-feather="eye"></i
                ></span>
              </div>
            </div> -->
            <div class="mb-2 col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  id="register-privacy-policy"
                  type="checkbox"
                  tabindex="4"
                  name="checked"
                  required
                  :class="{ 'is-invalid': submitted && !termsState }"
                  v-model="termsState"
                  @change="handleTermsState"
                />

                <label class="form-check-label" for="register-privacy-policy"
                  >I agree to<a href="https://gettonote.com/privacy.php" target="_blank">&nbsp;privacy policy & terms</a>
                </label>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary w-100" tabindex="5">
                Sign up
              </button>
              <img
                v-if="loggingIn"
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
              />
            </div>
          </form>
          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <router-link to="/"><span>&nbsp;Sign in instead</span></router-link>
          </p>
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>
          <div class="auth-footer-btn d-flex justify-content-center">
            <a class="btn btn-outline-primary" href="#"> As a business </a>
            <a class="btn btn-primary" href="#"> As a Notary Public</a>
          </div>
        </div>
      </div>
      <!-- /Register-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "RegisterPage",
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
      passwordError: false,
      showPass: false,
      passwordFieldType: 'password',
    };
  },
  computed: {
    ...mapState("AuthModule", ["loggingIn", "loginError"]),
  },
  methods: {
     isVisible() {
      this.passwordFieldType = this.passwordFieldType === 'text' ? 'password' : 'text';   

  },
    checkPasswords() {
      const password = document.querySelector("input[name=password]");
      const confirm = document.querySelector("input[name=confirm]");
      if (confirm.value === password.value) {
        this.passwordError = false;
                console.log("Password error_message2", this.passwordError);

      } else {
        this.passwordError = true;
        console.log("Password error_message2", this.passwordError);

      }
    },
    ...mapActions("AuthModule", ["register"]),
    ...mapMutations("MenuModule",["toggleEveryDisplay", "toggleHideConfig"]),
    handleTermsState() {
      this.validated = true;
    },

    handleSubmit() {
      this.submitted = true;
      if (this.validated && !this.passwordError) {
        this.register(this.user);
      }
    },
    termsError() {
      return this.validated && !this.termsState;
    },
  },

  handleSubmit() {
    this.submitted = true;
    if (this.validated) {
      this.register(this.user);
    }
  },
  termsError() {
    return this.validated && !this.termsState;
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

<style lang="scss" scoped></style>
