<template>

  <router-view />
</template>
<script>
import { beforeMount, store } from 'vue3-paystack';
import { mapActions, mapMutations } from "vuex";

export default {
  components: {

  },
  methods: {
    ...mapMutations("MenuModule", ["toggleConfigurator", "navbarMinimize"]),
    ...mapActions('TeamsModule', ['getTeams', 'getTeamUsers', 'getSubcriptions']),
    ...mapActions('ProfileModule', ['getUser', 'getPrints', 'getDashboardData', 'getTransactions']),
    ...mapActions('TeamsModule', ['logout']),
    ...mapActions('CompanyModule', ['getCompany']),
    ...mapActions('DocumentModule', ['RequestsList']),
    debug (event) {
    console.log(event)
  }

  },
  mounted() {
    // await store.dispatch('getUser');
    this.getUser();
    this.getCompany();
    this.getTeams();
    this.getSubcriptions();


    this.getPrints();
    this.getDashboardData();
    this.getTransactions();
    this.RequestsList();
  },

}
</script>
<style>
</style>
