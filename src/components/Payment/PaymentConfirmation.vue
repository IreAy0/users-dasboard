<template>
  <div>


    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper container-xxl p-0">
        <div class="content-body">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-6">
              <div data-aos="zoom-in" class="d-flex flex-column align-items-center text-center shadow p-2 rounded">
                <img src="../../assets/logo.png" alt="ToNote Logo" class="my-1 confimation__logo" />
                <h4 class="fw-bolder my-1">Payment Successful!</h4>
                <p class="mb-1">
                  Your Account has been upgraded successfully.
                </p>
                <button class="btn my-1" data-bs-dismiss="modal" aria-label="Close" @click="dashboardHandler"
                  style="background: #e5e7e9">
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import Footer from "@/components/Footer.vue";
import AOS from "aos";
import { onMounted } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();

const dashboardHandler = () => {
  // router.push({ name: "admin.dashboard" });
  window.location.href = '/admin/settings?tab=billing';
};
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
