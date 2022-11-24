<template>
  <div class="modal-dialog modal-md modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header" v-if="this.activeStep !== this.stepsList.length - 1">
        <h4 class="fw-bold">Get an affidavit</h4>
        <button @click="reset"  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <component :is="stepsList[activeStep]" @nextStep="forward" @prevStep="backward" @resetStep="reset" />
    </div>
  </div>
</template>

<script>
import AffidavitComponent from "./AffidavitComponent.vue";
import PaymentComponent from "./PaymentComponent.vue";
import PaymentConfirmation from "./PaymentConfirmation.vue";

export default {
  data() {
    return {
      stepsList: [
        "AffidavitComponent",
        "PaymentComponent",
        "PaymentConfirmation",
      ],
      activeStep: 0,
    };
  },
  components: { AffidavitComponent, PaymentComponent, PaymentConfirmation },
  methods: {
    backward() {
      this.activeStep--;
    },
    forward() {
      this.activeStep++;
    },
    reset() {
      this.activeStep = 0;
    },
  },
};
</script>
