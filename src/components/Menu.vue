<template>
  <div
    class="main-menu vertical-layout menu-expanded vertical-menu-modern main-menu  menu-fixed menu-light menu-accordion menu-shadow"
    
  >
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item me-auto">
          <a class="navbar-brand" href="#">
            
              <img width="150" src="/app-assets/images/logo/main.svg" />
           
           
          </a>
        </li>
        <li class="nav-item nav-toggle">
          <a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse"
            ><i
              class="d-block d-xl-none text-primary toggle-icon font-medium-4"
              data-feather="x"
            ></i
            ><i
              class="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary"
              data-feather="disc"
              data-ticon="disc"
            ></i
          ></a>
        </li>
      </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content pt-2">
      <ul
        class="navigation navigation-main"
        id="main-menu-navigation"
        data-menu="menu-navigation"
      >
        <li class="nav-item">
          <router-link
            class="d-flex align-items-center"
            to="/admin/dashboard"
            exact
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <span class="menu-title text-truncate" data-i18n="Email">
              Dashboard
            </span>
          </router-link>
        </li>

        <li class="nav-item">

          <a :href="`https://tonote-doc.netlify.app/?qt=${getToken}`" class="d-flex align-items-center">

            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            <span class="menu-title text-truncate" data-i18n="Email">My Documents</span></a>

        </li>

        <!-- <li class="nav-item">
          <a href="#!" class="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
            <span class="menu-title text-truncate" data-i18n="Email">My Templates</span>
          </a>
        </li> -->

        <li class="nav-item">
          <router-link to="/admin/requests" class="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-file-text"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              ></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span class="menu-title text-truncate" data-i18n="Email"
              >My Request</span
            >
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/admin/settings"
            exact
            class="d-flex align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
              ></path>
            </svg>
            <span class="menu-title text-truncate" data-i18n="Settings"
              >Settings</span
            >
          </router-link>
          <!-- <a href="/admin/settings"  exact class="d-flex align-items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span class="menu-title text-truncate" data-i18n="Settings">Settings</span>
          </a> -->
        </li>
      </ul>

      <hr />

      <div class="help-box help-box-light text-center">
        <a href="javascript: void(0);" class="float-end close-btn text-body">
          <i class="mdi mdi-close"></i>
        </a>
        <div class="text-center">
          <img
            src="/app-assets/images/pages/help-icon.svg"
            height="90"
            alt="Helper Icon Image"
          />
        </div>
        <h5 class="mt-3">
          Your current plan is
          <span class="text-primary font-weight-bold">{{
            getActive?.subscription?.plan?.name
          }}</span>
        </h5>
        <hr />
        <div>Sends remaining: {{remainingEnvelops}} </div>
        <hr />
        
        <div v-show="getActive?.subscription?.plan?.name == 'Basic' || getActive?.subscription?.plan?.name == 'Pro' " >
            <p  class="mb-2" >
          Upgrade to <span class="text-primary font-weight-bold">{{getActive?.subscription?.plan?.next_suggested_plan}}</span> to
          share more documents.
        </p>
        <div class="text-center">
          <a href="/admin/settings/?tab=billing" class="btn btn-primary btn-sm">Upgrade</a>
        </div>
        </div>
      
      </div>
    </div>
  </div>
  
</template>

<script>
import { getToken } from "@/Services/helpers";
import { mapActions, mapState } from "vuex";

export default {
  name: "AdminMenu",
  computed: {
    ...mapState("TeamsModule", ["Teams"]),
     ...mapState("MenuModule", ["openMenu"]),
    getToken() {
      const token = getToken();
      return token;
    },
    getUrl() {
      const url = process.env.VUE_APP_DOCUMENT_PAGE;
      return url;
    },
    getActive() {
      const active = this?.Teams?.find((element) => element.active == true);
      return active;
    },
    remainingEnvelops(){
      const number = this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.limit_number - this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.executed  ;
     
     return number
    }
  },
  methods: {
    ...mapActions("TeamsModule", ["getTeams"]),
    ...mapActions("TeamsModule", ["logout"]),

    openNav() {
      this.navOpen = !this.navOpen;
    },
  },
  mounted: function () {
    this.getTeams();
  },
};
</script>

<style scoped>
/* .main-menu.menu-light .navigation>li.active> */
a.router-link-exact-active {
  background: #003bb3;
  box-shadow: 0 0 10px 1px rgba(110, 138, 244, 0.7);
  color: #fff !important;
  font-weight: 400;
  border-radius: 4px;
}
</style>
