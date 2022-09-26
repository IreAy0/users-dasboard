<template>
  <div
    class="w-auto bg-white h-auto main-menu-content z-index-sticky  collapse navbar-collapse max-height-vh-100 pt-2 h-100"
    id="sidenav-collapse-main"
  >
  
    <ul class="navbar-nav navigation navigation-main ">
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          class="menu-title fs-18"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/admin/dashboard"
          navText="Dashboard"
        >
          <template v-slot:icon>
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
              class="feather feather-home fs-6"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </template>
        </sidenav-collapse>
      </li>
  
  <li class="nav-item">
        <sidenav-collapse-item url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="forms" text="My Documents" >
          <template v-slot:miniIcon>
            <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>

          </template>
          <template v-slot:nav-child-item>
            <li class="nav-item">
              <a  class="nav-link" :href="`${getEnv}?status=completed&qt=${getToken}`">
 <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-1'"
    >
    <svg style="{{
    height: 20px;
    font-size: 16px;
    margin-right: 0.5rem;
    height: 16px;
    width: 16px;
}}
" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle" data-v-64c7739b=""><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-v-64c7739b=""></path><polyline points="22 4 12 14.01 9 11.01" data-v-64c7739b=""></polyline></svg>    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">            
    <span class="menu-title text-truncate fs-6 d-flex " > <span>Completed</span>  </span>
   
</span>
<span class="badge rounded-pill badge-light-warning ms-auto "> {{counter?.Completed ? counter?.Completed : 0}}</span>
  </a>
     

      </li>
            <li class="nav-item">
              <a  class="nav-link" :href="`${getEnv}?status=received&qt=${getToken}`">
 <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-1'"
    >
    <svg style="{{
    height: 20px;
    font-size: 16px;
    margin-right: 0.5rem;
    height: 16px;
    width: 16px;
}}
" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail" data-v-af43c274="" data-v-b8d005c4=""><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-v-b8d005c4=""></path><polyline points="22,6 12,13 2,6" data-v-b8d005c4=""></polyline></svg>    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">            
    <span class="menu-title text-truncate fs-6 d-flex " > <span>Received</span>  </span>
   
</span>
<span class="badge rounded-pill badge-light-warning ms-auto "> {{counter?.Received ? counter?.Received : 0}}</span>
  </a>
     

      </li>
      <li class="nav-item nav-sm ">
              <a  class="nav-link" :href="`${getEnv}?status=sent&qt=${getToken}`">
 <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-1'"
    >
    <svg style="{{
    height: 20px;
    font-size: 16px;
    margin-right: 0.5rem;
    height: 16px;
    width: 16px;
}}
" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send" data-v-af43c274="" data-v-b8d005c4=""><line x1="22" y1="2" x2="11" y2="13" data-v-b8d005c4=""></line><polygon points="22 2 15 22 11 13 2 9 22 2" data-v-b8d005c4=""></polygon></svg>    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">            
    <span class="menu-title text-truncate fs-6 d-flex gap-3" >Sent </span>
   
</span>
<span class="badge rounded-pill badge-light-warning ms-auto"> {{counter?.Sent ? counter.Sent : 0}}</span>
  </a>
     

      </li>
      <li class="nav-item">
              <a  class="nav-link" :href="`${getEnv}?status=new&qt=${getToken}`">
 <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-1'"
    >
    <svg style="{{
    height: 20px;
    font-size: 16px;
    margin-right: 0.5rem;
    height: 16px;
    width: 16px;
}}
" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder-plus" data-v-af43c274="" data-v-b8d005c4=""><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" data-v-b8d005c4=""></path><line x1="12" y1="11" x2="12" y2="17" data-v-b8d005c4=""></line><line x1="9" y1="14" x2="15" y2="14" data-v-b8d005c4=""></line></svg>    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">            
    <span class="menu-title text-truncate fs-6 d-flex gap-3" >Draft </span>
</span>
<span class="badge rounded-pill badge-light-warning ms-auto"> {{counter?.New ? counter.New : 0}}</span>

  </a>
     

      </li>
      <li class="nav-item">
              <a  class="nav-link" :href="`${getEnv}?status=deleted&qt=${getToken}`">
 <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-1'"
    >
    <svg style="{{
    height: 20px;
    font-size: 16px;
    margin-right: 0.5rem;
    height: 16px;
    width: 16px;
}}
" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash" data-v-af43c274="" data-v-b8d005c4=""><polyline points="3 6 5 6 21 6" data-v-b8d005c4=""></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-b8d005c4=""></path></svg>    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">            
    <span class="menu-title text-truncate fs-6 d-flex gap-3" >Deleted Files   </span>
   
</span>
<span class="badge rounded-pill badge-light-warning ms-auto"> {{counter?.Trash ? counter?.Trash : 0}}</span>

  </a>
     

      </li>
          </template>
        </sidenav-collapse-item>
      </li>

      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/admin/requests"
          navText="Requests"
        >
          <template v-slot:icon>
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
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="/admin/settings"
          navText="Settings"
        >
          <template v-slot:icon>
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
          </template>
        </sidenav-collapse>
      </li>
 
     
    </ul>
     <hr />
    <div class="sidenav-footer ">
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
          <span class="text-primary font-weight-bold d-flex justify-content-center mt-1">{{
            getActive?.subscription?.plan?.name 
          }}
         <span v-if="getActive?.subscription?.plan?.trial == true" title="Free trial" class="coming-soon  border border-warning text-warning" data-v-735b3461=""> Free Trial </span>
        </span>
        </h5>
        <hr />
       
        <div>Sends remaining: {{remainingEnvelops}} </div>
        <hr />
        <!-- {{getActive?.subscription?.plan?.expired_at?.toLocaleString() > new Date().toLocaleString() ? 'Your plan will expire on ' + getActive?.subscription?.plan?.expired_at : 'Your plan has expired'}} -->
       <p v-show="getActive?.subscription?.plan?.trial == true" class="text-primary font-weight-bold">You have {{ getActive?.subscription?.plan?.days_remaining }} free trial remaining</p>
       
        <div v-show="getActive?.subscription?.plan?.name == 'Basic' || getActive?.subscription?.plan?.name == 'Pro' || getActive?.subscription?.plan?.trial == true" >
            <p  class="mb-2" v-show="getActive?.subscription?.plan?.trial == false">
          Upgrade to <span class="text-primary font-weight-bold">{{getActive?.subscription?.plan?.next_suggested_plan}}</span> to
          share more documents.
        </p>
        <div class="text-center">
          <a href="/admin/settings/?tab=billing" class="btn btn-primary btn-sm">  {{getActive?.subscription?.plan?.trial == true ? 'Pay now' :  'Upgrade' }}</a>
        </div>
        </div>
      
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/Services/helpers";
import { mapActions, mapState } from "vuex";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import { timeFormat } from "@/Services/helpers";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavCollapse,
    SidenavCollapseItem
   

  },
computed: {
    ...mapState("TeamsModule", ["Teams"]),
     ...mapState("MenuModule", ["openMenu"]),
     ...mapState("DocumentModule", ["counter"]),
    getToken() {
      const token = getToken();
      return token;
    },
    formateDate(data){
      console.log(data, 'date');
      return timeFormat(data)
    },
    
     getEnv(){
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_DOCUMENT_PAGE_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_DOCUMENT_PAGE_STAGING : process.env.VUE_APP_DOCUMENT_PAGE_LIVE

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
};
</script>
<style>
 
  .coming-soon{
      display: inline-block;
      padding: 2px 5px;
      text-align: center;
      border-radius: 5px;
      font-size: 10px;
      font-weight: 700;
      margin: 0 10px;
  }
  </style>