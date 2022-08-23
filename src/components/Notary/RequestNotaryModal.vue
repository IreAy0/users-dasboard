<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div v-if="this.activeComponent !== this.stepsList.length - 1" class="modal-header">
        <h4 class="fw-bold">Request a Notary Session</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <component :is="stepsList[activeComponent]" @nextStep="forward" @prevStep="backward" @resetStep="reset" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import RequestForm from "@/components/Notary/RequestForm.vue";
import PaymentComponent from "@/components/Notary/PaymentComponent.vue";
import PaymentConfirmation from "@/components/Notary/PaymentConfirmation.vue";

export default {
  data() {
    return {
      stepsList: ["RequestForm", "PaymentComponent", "PaymentConfirmation"],
      activeComponent: 0,
    };
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { RequestForm, PaymentComponent, PaymentConfirmation },
  methods: {
    backward() {
      this.activeComponent--;
    },
    forward() {
      this.activeComponent++;
    },
    reset() {
      this.activeComponent = 0;
    },
  },
};
</script>

<style lang="css">
</style>
