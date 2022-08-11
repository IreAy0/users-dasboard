
import auth from "@/api/auth";
import router from "@/router";
import { saveToken } from "@/Services/helpers";

// initial state

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
        commit("registerSuccess", user);

        setTimeout(() => {
          router.push("/verify");
        });
      },
      (error) => {
        commit("registerFailure", error);
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
      },
      (error) => {
        commit("verifyFailure", error);
      }
    );
  },

  login({ commit }, user) {
   
    commit("loginRequest", user);
    auth.Login(user).then(
      (user) => {
        saveToken(user?.data?.token);
        commit("loginSuccess", user);
        router.push("/admin/dashboard");
       
        // setTimeout(() => {
        //   window.location.reload();
          
        // }, 2000);
       
      },
      (error) => {
        commit("loginFailure", error);
       
      }
    );
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
};

export const AuthModule = {
  namespaced: true,
  state,
  actions,
  mutations,
};
