import {
  getAffidavitTemplates,
  getPaymentGatways,
  postNotaryRequestForm,
  putNotaryRequestTransaction,
  postAffidavitRequestForm,
} from "../../api/affidavit";
// import { useToast } from "vue-toast-notification";
// import router from "@/router";
// const toast = useToast();

const state = () => ({
  loading: false,
  templates: [],
  paymentGateways: {},
  transactionable_id: null,
  fetching: false
});

const mutations = {
  setAffidavitTemplates: (state, payload) => {
    state.templates = payload;
  },
  setPaymentGateways: (state, payload) => {
    state.paymentGateways = payload;
  },
  fetchtransactionable_id: (state, payload) => {
   state.fetching = true
    },

  SET_TRANSACTIONABLE_ID: (state, payload) => {
    state.transactionable_id = payload;
    state.fetching = false
  },
  LOADING(state) {
    state.loading = true;
  },
};

const getters = {
  // getProfile: (state) => state.userProfile,
};

const actions = {
  ALL_AFFIDAVIT({ commit }) {
    getAffidavitTemplates()
      .then((res) => {

        commit("setAffidavitTemplates", res.data.data);
      })
      .catch(function () {

      });
  },

  ALL_PAYMENTGATEWAYS({ commit }) {
    getPaymentGatways()
      .then((res) => {

        commit("setPaymentGateways", res.data.data);
      })
      .catch(function () {

      });
  },

  post_notaryrequestform({ commit }, payload) {
    commit("fetchtransactionable_id");
    postNotaryRequestForm(payload)
      .then((res) => {
        console.log(res, 'post_notaryrequestform');
        commit("SET_TRANSACTIONABLE_ID", res.data.data.id);
      })
      .catch(function () {
        // console.log(error);
      });
  },

  post_AffidavitRequestForm({ commit }, payload) {
    commit("fetchtransactionable_id");
    postAffidavitRequestForm(payload)
      .then((res) => {
        console.log(res);
        commit("SET_TRANSACTIONABLE_ID", res.data.data.id);
      })
      .catch(function () {
        // console.log(error);
      });
  },

  put_notaryrequesttransaction({ commit }, data) {
    putNotaryRequestTransaction(data)
      .then((res) => {
        console.log(res);
        commit("LOADING");
      })
      .catch(function () {
        // console.log(error);
      });
  },
};

export const AffidavitModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
