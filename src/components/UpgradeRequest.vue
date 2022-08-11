<template>
  <div class="card tab-content col-md-7 bs-stepper-content p-2">
    <div class="d-inline-block">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-info-circle text-danger"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
        />
        <path
          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
        />
      </svg>
    </div>
    <p>
     
      It’s time for your upgrade! Invite your team members, digitise your
      signature, share up to 50 documents per month and achieve more with ToNote
      {{getActive?.subscription?.plan?.next_suggested_plan}}.
    </p>
    <div class="d-flex justify-content-between">
      <button
        @click.prevent="setActive('billing')"
        href="#billing"
        type="button"
        class="btn btn-primary btn-next"
      >
        <span class="align-middle d-sm-inline-block">Upgrade To {{getActive?.subscription?.plan?.next_suggested_plan}}</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: "UpgradeRequest",
  data() {
    return {
      profile: {},
      activeItem: "billing",
    };
  },
  computed: {
    ...mapState("TeamsModule", ["Teams"]),
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
   
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this?.$emit("activeName", `${menuItem}`);
    },
  },
};
</script>
<style lang=""></style>
