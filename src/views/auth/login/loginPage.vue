<template>
  <div class="auth-wrapper auth-cover ">
    <div class="auth-inner row m-0 ">
      <div class="brand-logo">
      <router-link  to="/">
        <img src="/app-assets/images/logo/main.svg" class="img-fluid mt-2" width="150" />
        <h2 class="brand-text text-primary ms-1"></h2>
      </router-link>
      </div>
      

      <div class="d-none d-lg-block col-lg-6 align-items-center p-0 ">
        <div class=" align-items-center justify-content-center ">
          <img class="w-100" src="/app-assets/images/banner/onboard_2.jpg" alt="Login V2" />
        </div>
      </div>

      <div class="d-flex col-lg-6 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-10 px-xl-2 mx-auto">
          <h2 class="card-title fw-bold mb-1">Welcome to ToNote! 👋</h2>
          <!-- <p class="card-text mb-2">
            Please sign-in to your account and start the adventure
          </p> -->

          <form @submit.prevent="handleLogin" >
            <div  :class="{ 'is-invalid': loginError }"  class="">
            <div v-if="loginError" class="alert p-1 alert-danger alert-dismissible fade show" role="alert">
              <strong>{{ loginError?.root.toString() }}</strong> 
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            </div>
            <div class="mb-2">
              <label class="form-label" for="login-email">Email</label>
              <input 
              class="form-control" 
              type="text" 
              name="email" 
              tabindex="1" 
              placeholder="john@example.com"
              v-model="user.email"
              />
              <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
            </div>

            <div class="mb-2">
              <div class="d-flex justify-content-between">
                <label class="form-label" for="login-password">Password</label><router-link to="/forgot-password"><small>Forgot
                    Password?</small></router-link>
              </div>
              <div class="input-group input-group-merge form-password-toggle">
                <input 
                name="password" 
                type="password" 
                class="form-control form-control-merge" 
                tabindex="2" 
                v-model="user.password"

                />
                <!-- <span type="password" class=" input-group-text cursor-pointer" @click="isVisible"><i
                    data-feather="eye"></i></span> -->
                <!-- <div class="invalid-feedback">{{ errors.password }}</div> -->
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
              <button class="btn btn-primary btn-block w-100" :disabled="loading">
                <span v-show="loggingIn" class="spinner-border spinner-border-sm"></span>
                <span>Sign in</span>
              </button>
            </div>

          </form>

          <p class="text-center mt-2">
            <span>New on our platform?</span>
            <router-link to="/register"><span>&nbsp;Create an account</span></router-link>
          </p>
          <div class="divider my-2">
            <div class="divider-text">or</div>
          </div>
          <div class="auth-footer-btn d-flex justify-content-center">
            <a class="btn btn-dark" href="#"> Login as a Notary Public</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapState, mapActions } from 'vuex'
import { mapMutations } from "vuex";

const loading = ref(false);
let passwordFieldType = ref("password");
export default {
 name: 'LoginPage',
 
  data() {
    return {
      user:{
        email: '',
        password: ''
      },
    passwordFieldType: 'password'
    }
  },
  computed:{
    ...mapState('AuthModule',['loggingIn', 'loginError']),
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
    ...mapActions('AuthModule',['login']),
        ...mapMutations("MenuModule",["toggleEveryDisplay", "toggleHideConfig"]),
    handleLogin() {
      loading.value = true;
     
      this.login(this.user)
      },
    isVisible() {
    return   passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";

  }
},
}

</script>

<style scoped>
</style>
