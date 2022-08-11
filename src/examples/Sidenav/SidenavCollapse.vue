<template>
  <router-link
    :data-bs-toggle="collapse ? 'collapse' : ''"
    :to="collapse ? `#${collapseRef}` : collapseRef"
    :aria-controls="collapseRef"
    :aria-expanded="isExpanded"
    class="nav-link"
    :class="getRoute() === collapseRef ? `active bg-${color}` : ''"
    v-bind="$attrs"
    @click="isExpanded = !isExpanded"
  >
    <div
      class="text-center d-flex align-items-center justify-content-center"
      :class="isRTL ? ' ms-2' : 'me-1'"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{
      navText
    }}</span>
  </router-link>
  <div :class="isExpanded ? 'collapse show' : 'collapse'">
    <slot name="list"></slot>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import { getToken } from "@/Services/helpers";
import { mapActions, mapState } from "vuex";

export default {
  name: "SidenavCollapse",
  props: {
    collapseRef: {
      type: String,
      required: true
    },
    navText: {
      type: String,
      required: true
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
     ...mapActions("TeamsModule", ["getTeams"]),
    ...mapActions("TeamsModule", ["logout"]),
    getRoute() {
      const routeArr = this.$route.path;
      return routeArr;
    }
  },
  computed: {
    ...mapState("MenuModule",["isRTL", "color"]),
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
   mounted: function () {
    this.getTeams();
  },
};
</script>
