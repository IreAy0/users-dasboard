<template>
  <div class="modal-body p-3">
    <div data-aos="zoom-in" class="d-flex flex-column align-items-center text-center">
      <img src="../../assets/logo.png" alt="ToNote Logo" class="my-1 confimation__logo" />
      <h4 class="fw-bolder my-1">Payment Successful!</h4>
      <p class="mb-1">
        Your request has been received and a member of the team will reach out
        to connect you with your notary shortly. Please keep an eye on your
        email.
      </p>
      <button class="btn my-1" data-bs-dismiss="modal" aria-label="Close" @click="resetStep"
        style="background: #e5e7e9">
        Got it
      </button>
    </div>
  </div>
</template>
<script setup>
import AOS from "aos";
import "aos/dist/aos.css";
import { onMounted, defineEmits } from "vue";

const emits = defineEmits(["nextStep", "prevStep", "resetStep"]);
const resetStep = () => {
  setTimeout(() => {
    emits("resetStep");
  }, 1000);
  window.location.reload();
};
// const store = useStore();
onMounted(() => {
  AOS.init({ duration: 500 });
});
</script>

<style lang="css" scoped>
.confimation__logo {
  height: 120px;
  width: 120px;
}
</style>
