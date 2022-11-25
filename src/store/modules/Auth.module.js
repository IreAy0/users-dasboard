
import auth from "@/api/auth";
import router from "@/router";
import { saveToken } from "@/Services/helpers";
import { useToast } from "vue-toast-notification";
import store from "../index";

// initial state
const toast = useToast();

const state = () => ({
  accessToken: null,
  loggingIn: false,
  loginError: null,
  verifying: false,
  verifyError: null,
  user: null,
  loggedIn: false,
});
const actions = {
  logout() {
    auth.Logout();
    router.push("/");
    window.location.reload(false);
  },

  register({ commit }, user) {
    localStorage.setItem("user", user.email);
    commit("registerRequest", user);
    auth.Register(user).then(
      (user) => {
        if(user){
          const email = localStorage.getItem("user");
        
          commit("registerSuccess", user);
  
          setTimeout(() => {
            router.push("/verify?email=" + email);
          });
        }
        
      },
      (error) => {
       
        commit("registerFailure", error);
        if (error) {
          toast.error('Registration failed, Please try again', {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          })
        }

      }
    );
  },
  verify({ commit }, user) {
    commit("verifyRequest", user);
    auth.VerifyEmail(user).then(
      (user) => {
        commit("verifySuccess", user);
        //   saveToken(user?.data?.token);
        setTimeout(() => {
          router.push('/admin/dashboard');
        });
        toast.success('Email Succesfully verified', {
          duration: 3000,
          queue: false,
          position: "top-right",
          dismissible: true,
          pauseOnHover: true,
        })
      },
      (error) => {
        commit("verifyFailure", error);
        toast.error('Please try again', {
          duration: 3000,
          queue: false,
          position: "top-right",
          dismissible: true,
          pauseOnHover: true,
        })
      }
    );
  },

  login({ commit }, user) {
    commit("loginRequest", user);
    auth.Login(user).then(
      (user) => {
        if(user){
          saveToken(user?.data?.token);
          commit("loginSuccess", user);
          router.push("/admin/dashboard");
        }
      }
    ).catch((error) => {
        commit("loginFailure", error);
        console.log(error, 'error')
     
    })
     
  },
};

const mutations = {
  registerRequest(state) {
    state.loggingIn = true;
  },
  registerSuccess(state) {
    state.loggedIn = false;
  },
  registerFailure(state, error) {
    state.loginError = error?.response?.data?.errors;
    state.loggingIn = false;
  },
  verifyRequest(state) {
    state.verifying = true;
  },
  verifySuccess(state) {
    state.loggedIn = false;
    state.verifying = false;
    state.loggingIn = false;
  },
  verifyFailure(state, error) {
    state.loginError = error?.response?.data?.errors;
    state.verifying = false;
  },
  loginRequest(state) {
    state.loggingIn = true;

  },
  loginSuccess(state) {
    state.loggedIn = true;
    state.loggingIn = false;
  },
  loginFailure(state, error) {
    state.loggingIn = false;
    state.loginError = error?.response?.data?.errors;

  },
  emptyLoginError(state) {
    state.loginError = null;
  }
  
};

export const AuthModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};
