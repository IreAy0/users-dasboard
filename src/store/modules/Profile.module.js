import profile from "@/api/profile";
import router from "@/router";
// import router from "@/router";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const state = () => ({
  userProfile: null,
  gettingProfile: false,
  signatures: null,
  image: null,
  updated: false,
  signature: [],
  signLinkDocuments: [],
  updating: false,
  dashboardData: null,
  changeValue: "",
  loadingSignature: false,
  transactions: null,
  dashboard: {}
});

const getters = {
  user: (state) => state?.userProfile,
  dashboard: (state) => state?.dashboard
};

const actions = {
  async getUser({ commit }) {
    await profile.Profile().then(
      (user) => {
        if (user?.data?.data?.system_verification == false) {
          router.push("/verify-email");
          sessionStorage.removeItem('token')
        }
        else {
          commit("getUserSuccess", user?.data?.data);
        }
      },
      error => {
        commit('getUserFailed', error)
      }
    )
  },

  async getDashboardData({ commit }) {
    await profile.getDashboardData().then(
      (data) => {
        commit("getDashboardDataSuccess", data?.data)
         profile.getSignLinkDocuments()
        .then((res) => {
          commit("getSignLinkDocument", res?.data?.data)
        })
      },
      error => {
       
      }
    )
  },
  async getTransactions({ commit }) {
    await profile.getTransactions().then(
      (data) => {

        commit("getTransactionsSuccess", data?.data?.data)
      },
      error => {
        
      }
    )
  },
  async getPrints({ commit }) {
    commit("getPrintsRequests")
    await profile.getPrints().then(
      (prints) => {
        // state.userProfile = user?.data?.data
        commit("getPrintsSuccess", prints?.data?.data);


      }
    )
  },
 async userUpdate({ commit }, user = "") {
  return profile.updateProfile(user)
      .then(res => {
          commit('updateUserProfileSuccess', res);
          commit('getUserSuccess', res?.data?.data)

          if (res) {
            $toast.success('Updated successfully', {
              duration: 3000,
              queue: false,
              position: "top-right",
              dismissible: true,
              pauseOnHover: true,
            })
          }
        })
      .catch(error => {
        if (error) {
          $toast.error('Error updating profile', {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          })
        }

        commit('getUserFailed', error);
      })
  },
  async getDashboard({commit}) {
    await profile.getDashboard().then(
      (user) => {
        commit("getDashboard", user?.data?.data?.message);
      },
      error => {
        commit('getUserFailed', error)
      }
    )
  },
  userSignature({ commit, dispatch }, user) {
    commit('createSignature', user);
    profile.createSignature(user)
      .then(
        res => {
          commit('createSignatureSuccess', res);
          if (res) {
            dispatch('getPrints');
            $toast.success('Signature created successfully', {
              duration: 3000,
              queue: false,
              position: "top-right",
              dismissible: true,
              pauseOnHover: true,
            })
          }

        },
        error => {
          commit('createSignatureFailed', error);
          if (error) {
            if (error.response.status === 422) {
              $toast.error('Please generate signature', {
                duration: 3000,
                queue: false,
                position: "top-right",
                dismissible: true,
                pauseOnHover: true,
              })
            }
            // toast.error('Error occured while creating signature', {
            //       duration: 3000,
            //     queue: false,
            //     position: "top-right",
            //     dismissible: true,
            //     pauseOnHover: true,
            // })
          }
        }
      );
  },

  setImage({ commit }, image) {
    commit('setImage', image);
  }
}

const mutations = {
  setImage(state, payload) {
    state.signature = payload;
  },

  setValues(state, values) {
    // Object.assign({}, state.values, values)
    state.userProfile = { ...state.userProfile, ...values };
  },
  getUserSuccess(state, user) {
    state.userProfile = user
    state.gettingProfile = true;
    state.updated = true
  },
  getDashboard(state, data){
    state.dashboard = data
  },
  getPrintsRequests(state) {
    state.loadingSignature = true
  },
  getPrintsSuccess(state, user) {
    state.signatures = user
    state.loadingSignature = false
  },

  getUserFailed(state) {
    state.gettingProfile = false;
    state.updating = false;

  },
  getDashboardDataSuccess(state, user) {
    state.dashboardData = user
  },

  getSignLinkDocument(state, payload){
    state.signLinkDocuments= payload
  },
  updateUserProfileSuccess(state) {
    state.updated = true;
  },
  createSignature(state) {
    state.updating = true;
  },
  createSignatureSuccess(state, user) {
    state.updated = true;
    state.updating = false;
    state.signature = [];
    state.changeValue = user
  },
  createSignatureFailed(state) {
    state.updated = true;
    state.updating = false;
  },
  getTransactionsSuccess(state, user) {
    state.transactions = user
  }
};

export const ProfileModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
