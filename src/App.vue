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
    ...mapActions('DocumentModule', ['RequestsList', 'DocumentsList']),
    debug (event) {
   
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
    this.DocumentsList();
    (function () {
      const s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6257cf987b967b11798ab0e5/1g0jg5rf5';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
    
  },

}
</script>
<style>
</style>
