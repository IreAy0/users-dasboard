import company from "@/api/company";
import profile from "@/api/profile";
// import router from "@/router";
import { useToast } from "vue-toast-notification";
import store from '@/store/index'

const $toast = useToast();

const state = () => ({
  companyProfile: null,
  gettingCompany: false,
  image: null,
  updated: false,
  signature: {},
  updating: false,
  Errors: [],
  company_profile_steps: [],
  companySeal: [],
  companyStamp: [],
  getCompanySeal: [],
  getCompanyStamp: [],
  changeValue: "",
});

const getters = {
  getProfile: (state) => state.companyProfile,
};

const actions = {
  async getCompany({ commit }) {
    await company.Company().then(
      (user) => {
        // state.companyProfile = user?.data?.data
        commit("getCompanySuccess", user?.data?.data);
        //  router("/admin")
      },
      (error) => {
        commit("getUserFailed", error);
      }
    );
  },

  async companyUpdate({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      company.updateCompany(user).then(
        (response) => {
          dispatch("getCompany")
          commit("updateUserCompanySuccess", response);
          commit("getCompanySuccess", response?.data?.data);
          resolve(response);
        },
        (error) => {
          commit("getUserFailed", error);
          reject(error);
        }
      );
    });
  },
  userSignature({ commit }, user) {
    commit("createSignature", user);
    profile.createSignature(user).then(
      (res) => {
        commit("createSignatureSuccess", res);
        if (res) {
          $toast.success("Signature created successfully", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      },
      (error) => {
        commit("getUserFailed", error);
        if (error) {
          $toast.error("Error occured while creating signature", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      }
    );
  },
  async setCompanySeal({ commit }, payload) {
    company.createCompanySeal(payload).then(
      (res) => {
        if (res) {
          $toast.success("Seal has been created successfully", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
        commit("setCompanySeal", res?.data?.data?.CompanySeal);
      },
      (error) => {
        commit("getUserFailed", error);
        if (error) {
          $toast.error("Error occured while creating seal", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      }
    );
  },
  async postCompanyStamp({ commit }, payload) {
    company.createCompanyStamp(payload).then(
      (res) => {
        if (res) {
          store.dispatch('print/getUserPrints')
          $toast.success("Stamp has been created successfully", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
        commit("setCompanyStamp", res?.data?.data?.CompanyStamp);
      },
      (error) => {
        commit("getUserFailed", error);
        if (error) {
          $toast.error("Error occured while creating your stamp", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      }
    );
  },
  listCompanySeals({ commit }) {
    company.getCompanySeals().then(
      (res) => {
        commit("getCompanySeal", res?.data?.data?.CompanySeal);
      },
      (error) => {
        commit("getUserFailed", error);
        if (error) {
          $toast.error("Error occured while creating signature", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      }
    );
  },
  listCompanyStamps({ commit }) {
    company.getCompanyStamps().then(
      (res) => {
        commit("getCompanyStamp", res.data.data.CompanyStamp);
      },
      (error) => {
        commit("getUserFailed", error);
        if (error) {
          $toast.error("Error occured while creating stamp", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        }
      }
    );
  },
  getCompanyStatusSteps({ commit }){
    company.getCompanyStatus().then(res => {
              commit("setCompanySetupSteps", res.data.data)
            }).catch(err => {
              console.log('err', err)
            })
  }
};

const mutations = {
  setCompanySeal: (state, payload) => {
    state.companySeal = payload;
    state.changeValue = payload
    state.updating = true
  },

  setCompanySetupSteps: (state, payload) => {
    state.company_profile_steps = payload
  },
  setCompanyStamp: (state, payload) => {
    state.companyStamp = payload;
    state.changeValue = payload
    state.updating = true
  },
  getCompanySeal(state, user) {
    state.getCompanySeal = user;
    // state.loadingSignature = true
    state.updating = false
  },
  getCompanyStamp(state, user) {
    state.getCompanyStamp = user;
    state.updating = false
  },
  setImage: (state, payload) => {
    state.signature = payload;
    // (state.image = payload)
  },
  setValues(state, values) {
    // Object.assign({}, state.values, values)
    state.companyProfile = { ...state.companyProfile, ...values };
  },
  getCompanySuccess(state, user) {
    state.companyProfile = user;
    state.gettingProfile = true;
  },
  getUserFailed(state, error) {
    state.gettingProfile = false;
    state.updating = false;
    state.Errors = error;
  },

  updateUserCompanySuccess(state) {
    state.updated = true;
  },

  createSignature(state) {
    state.updating = true;
  },

  createSignatureSuccess(state) {
    state.updated = true;
    state.updating = false;
    state.signature = null;
  },
};

export const CompanyModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
