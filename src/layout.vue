<template>
  <sidenav
    :custom_class="color"
    :class="[isRTL ? 'fixed-end' : 'fixed-start']"
    v-if="showSidenav"
    class="zindex-4"
  />

  <main
    class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden"
  >
  
    <div v-show="isPinned == false" class="position-absolute max-height-vh-100 h-100 w-100 sidenav-overlay show zindex-3" @click="toggleSidebar">
     
             </div>
    <!-- nav -->
    <navbar

      :class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
      :color="isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="showNavbar"
    />
 <div v-show="loading == true">
     <div id="loading-bg">
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
  </div>
    <router-view />
   
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
// import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
// import AppFooter from "@/examples/Footer.vue";
import { mapMutations, mapState } from "vuex";
import { mapActions } from "vuex";
import router from "./router";

export default {
  name: "App",
  data(){
    return{

    } 
  },
  components: {
    Sidenav,
    // Configurator,
    Navbar,
    // AppFooter
  },
  methods: {
    ...mapMutations("MenuModule",["toggleConfigurator", "navbarMinimize"]),
    ...mapActions('TeamsModule', ['getTeams', 'getTeamUsers', 'getSubcriptions']),
    ...mapActions('ProfileModule', ['getUser', 'getPrints', 'getDashboardData', 'getTransactions']),
    ...mapActions('TeamsModule', ['logout']),
     ...mapActions('CompanyModule', ['getCompany']),
     ...mapActions('DocumentModule', [ 'RequestsList']),
    
     toggleSidebar() {
      this.navbarMinimize();
    },
  },
  computed: {
    ...mapState('TeamsModule', ['Teams']),
    ...mapState("MenuModule",[
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
      "isPinned",
    ])
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";

    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");

      this.getTeams();
     this.getSubcriptions();
    this.getUser();
    this.getCompany();
    this.getPrints();
    this.getDashboardData();
    this.getTransactions();
    this.RequestsList();


    }
  },
   beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter');
    // router.push('/redirecting')
    next();

  },

  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate', to, from)
    next();
  },
  // mounted() {
  //   this.getTeams();
  //   this.getSubcriptions();
  //   this.getUser();
  //   this.getCompany();
  //   this.getPrints();
  //   this.getDashboardData();
  //   this.getTransactions();
  //   this.RequestsList();
  // },

};
</script>
