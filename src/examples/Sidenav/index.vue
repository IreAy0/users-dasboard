<template>
  <aside
    id="sidenav-main"
    class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 shadow-lg "
    :class="`${
      'fixed-start '
    } ${sidebarType}`"
  >
    <div class="sidenav-header bg-white">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item me-auto">
          <a class="navbar-brand" href="#">
            
              <img width="150" src="/app-assets/images/logo/main.svg" />
           
           
          </a>
        </li>
        
      </ul>
    </div>
    </div>
    
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";
import logoDark from "@/assets/img/logo-ct-dark.png";
import { mapState } from "vuex";

export default {
  name: "indexVue",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      logoDark,
    };
  },
  computed: {
    ...mapState("MenuModule",["isRTL", "sidebarType", "isDarkMode"]),
  },
};
</script>
