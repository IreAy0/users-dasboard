<template>
  <div v-show="getActiveTeam?.subscription?.plan?.name === 'Business'" >
    <CompanyDetail/>
  </div>
   <UpgradeRequest  v-show="getActiveTeam?.subscription?.plan?.name === 'Basic'" />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import UpgradeRequest from "../UpgradeRequest.vue";
import CompanyDetail from "./CompanyDetail.vue";

export default defineComponent({
  name: "CompanyPage",
  components: {  UpgradeRequest, CompanyDetail},
props: {
    generalData: {
      type: Object,
      default: () => {},
    },
    getActiveTeam: {
      type: Object,
      default: () => {},
    },
  },

});
</script>

<style scoped></style>
