import team from "@/api/team";
// import router from "@/router";
// import { useToast } from "vue-toast-notification";

// const toast = useToast()

const state = () => ({
  Teams: null,
  teamsUsers: null,
  gettingTeams: false,
  image: null,
  updated: false,
  signature: {},
  updating: false,
  subcriptions: null,
  errors: [],
})

const getters = {
  getProfile: (state) => state.companyProfile
}

const actions = {

  async getTeams({ commit }) {
    await team.Teams()
      .then(
        user => {
          // state.companyProfile = user?.data?.data
          commit('getTeamsSuccess', user?.data?.data)

          //  router("/admin")
        },
        error => {
          commit('getUserFailed', error)
          console.log('error', error);
        }
      )
  },

  //  async getTeamUsers({ commit }) {
  //       await team.getTeamUsers().then(user =>{
  //         commit('getTeamsUsersSuccess', user?.data?.data)
  //       },
  //       error => {
  //         commit('getTeamssFailed', error)
  //         console.log('error', error);
  //       }

  //       )
  //  },

  async getSubcriptions({ commit }) {
    await team.getSubcriptions().then(user => {
      commit('getSubcriptionsSuccess', user?.data?.data)
    },
      error => {
        commit('getSubcriptionsFailed', error)
        console.log('error', error);
      }

    )
  }
  //  async companyUpdate({ commit }, user) {
  //   return new Promise((resolve, reject) => {
  //     company.updateCompany(user).then(response => {
  //             console.log(response, 'response' );

  //       commit('updateUserCompanySuccess', response);
  //       commit('getCompanySuccess', response?.data?.data)
  //       resolve(response)
  //     }, error => {
  //       commit('getUserFailed', error);
  //         reject(error)
  //     })
  // })},

}


const mutations = {
  getTeamsSuccess(state, user) {
    state.Teams = user
    state.gettingTeams = true
  },
  getTeamsUsersSuccess(state, user) {
    state.teamsUsers = user
    state.gettingTeams = true
  },
  getTeamsFailed(state) {
    state.gettingTeams = false
  },
  getSubcriptionsSuccess(state, user) {
    state.subcriptions = user
    // state.gettingTeams = true
  }
}

export const TeamsModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}