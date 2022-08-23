import { getDocuments, getRequests } from "../../api/document";
// import { useToast } from "vue-toast-notification";
// import router from "@/router";
// const toast = useToast();

const state = () => ({
  loading: false,
  documents: [],
  requests: [],
});

const mutations = {
  SET_DOCUMENTS: (state, payload) => {
    state.documents = payload;
  },
  SET_REQUESTS: (state, payload) => {
    state.requests = payload;
  }
};

const getters = {
  // getDocuments: (state) => state.documents,
};

const actions = {
  DocumentsList({ commit }) {
    getDocuments()
      .then((res) => {
        commit("SET_DOCUMENTS", res.data.data);
      })
      .catch(function () {
        // console.log(error);
      });
  },
  RequestsList({ commit }) {
    getRequests()
      .then((res) => {
        commit("SET_REQUESTS", res.data.data);
      }).catch(function () {
        // console.log(error);
      });
  }
};

export const DocumentModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
