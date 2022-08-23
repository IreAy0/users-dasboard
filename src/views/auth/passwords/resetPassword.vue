<template lang="">
    <div class="auth-wrapper auth-cover">
    <div class="auth-inner row m-0">
      <router-link class="brand-logo" to="/">
        <img src="/app-assets/images/logo/main.svg" class="img-fluid mt-2" width="150" />
      </router-link>

      <div class="d-none d-lg-block col-lg-6 align-items-center p-0">
        <div class=" align-items-center justify-content-center ">
          <img class="w-100" src="/app-assets/images/pages/login_noLogo.jpg" alt="Login V2" />
        </div>
      </div>

      <div class="d-flex col-lg-6 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-10 px-xl-2 mx-auto">
          <h2 class="card-title fw-bold mb-1">Welcome to ToNote! 👋</h2>
          <p class="card-text mb-2">
            Please enter the email registered, a reset password link will be sent to you.
          </p>

          <form @submit.prevent="resetPassword" >
           
            <div class="mb-2">
              <label class="form-label" for="login-email">Email</label>
              <input 
              class="form-control" 
              type="text" 
              name="email" 
              tabindex="1" 
              placeholder="john@example.com"
              v-model="resetForm.email"
              disabled
              />
              <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
            </div>
 <div class="mb-2 position-relative ">
              <label class="form-label" for="login-email">Password</label>
              <input 
              class="form-control" 
              :type="passwordFieldType" 
              name="password" 
              tabindex="1" 
              placeholder="*******"
              v-model="resetForm.password"
              
              />
              <a type="button" class="position-absolute top-50 end-0  px-1" @click="isVisible">
                
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
              <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
            </div>
             <div class="mb-2 position-relative">
              <label class="form-label" for="login-email">Confirm Password</label>
              <input 
              class="form-control" 
              :type="passwordFieldType" 
              name="password" 
              tabindex="1" 
              placeholder="*******"
              v-model="resetForm.password_confirmation"
              />
                  <a type="button" class="position-absolute top-50 end-0  px-1" @click="isVisible">
                
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
              <!-- <div class="invalid-feedback">{{ errors.email }}</div> -->
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block w-100" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Submit</span>
              </button>
            </div>

          </form>

          <p class="text-center mt-2">
            <span>New on our platform?</span>
            <router-link to="/register"><span>&nbsp;Create an account</span></router-link>
          </p>
         
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

const toast = useToast()
export default {
  name: "ResetPassword",


  data() {
    return {
      passwordFieldType: 'password',
      loading: false
    }
  },
  computed: {
    // ...mapState('AuthModule',['loggingIn', 'loginError']),
    resetForm() {
      const resetForm = {
        email: this.$route.query?.email?.toLocaleLowerCase(),
        token: this.$route.query.hash,
        password: "",
        password_confirmation: ""
      }
      return resetForm
    }
  },
  methods: {
    // ...mapActions('AuthModule',['login']),
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    resetPassword() {
      this.loading = true
      // eslint-disable-next-line no-unused-vars
      ToNote.post('/user/password/reset', this.resetForm).then(res => {

        this.loading = false
        toast.success('Successfully updated password', {
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
          toast.error('Link Expired', {
            duration: 5000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          })
        } else {
          toast.error(error.response.data.message, {
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
      this.passwordFieldType = this.passwordFieldType === 'text' ? 'password' : 'text';

    }
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
<style lang="">
  
</style>