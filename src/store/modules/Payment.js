import payment from '@/api/payment'

const state = {
  type: null,
  message: null,
  cards: []
};

const actions = {
  async GetCard({ commit }){
   await payment.getAllCards().then((res) => {
        console.log('res', res.data.data)
        commit('Cards', res.data.data)
      })
      .catch(err => 
        {console.log('err', err) }
        )
    // commit('success', message);
  },
  error({ commit }, message) {
    commit('error', message);
  },
  clear({ commit }) {
    commit('clear');
  }
};

const mutations = {
  Cards(state, response) {
    // state.type = 'alert-success';
    // state.message = message;
    state.cards = response
  },
  error(state, message) {
    state.type = 'alert-danger';
    state.message = message;
  },
  clear(state) {
    state.type = null;
    state.message = null;
  }
};

export const PaymentModule = {
  namespaced: true,
  state,
  actions,
  mutations
};