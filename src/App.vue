<template>

  <router-view v-slot="{ Component }">
    <transition-page>
      <component :is="Component" />
    </transition-page>
  </router-view>
</template>
<script setup>
// import { beforeMount, store } from 'vue3-paystack';
import { mapActions, mapMutations, useStore } from "vuex";
import { onMounted } from 'vue';
// import { useActions } from "vuex-composition-helpers/dist";
import { getToken } from "@/Services/helpers";

const store = useStore()
// const { token } = useGetters({
//   token: "auth/token",
// });

const token = getToken();

// const { logout } = useActions({
//   logout: "AuthModule/logout",
// });

const timeoutInMS = 300000; //? 5 minutes -> 5 * 60 * 1000
let timeoutId;
function handleInactive() {
  console.log('timeoutId: ' + timeoutId)
  if (token) {
    store.dispatch("AuthModule/logout");
    // logout({ token: token.value });
  }
 
}

function startTimer() {
  timeoutId = setTimeout(handleInactive, timeoutInMS);
}
function resetTimer() {
  clearTimeout(timeoutId);
  startTimer();
}
function setupTimers() {
  document.addEventListener("keypress", resetTimer, false);
  document.addEventListener("mousemove", resetTimer, false);
  document.addEventListener("mousedown", resetTimer, false);
  document.addEventListener("touchmove", resetTimer, false);
  startTimer();
}

onMounted(() => {
  setupTimers();
  (function () {
    const propertyId = process.env.VUE_APP_TAWK_PROPERTY_ID;
    const widgetId = process.env.VUE_APP_TAWK_WIDGET_ID;
    const s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/" + propertyId + "/" + widgetId;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
})
// export default {
//   components: {

//   },
//   methods: {
    

//   },
//   mounted() {
//     // await store.dispatch('getUser');
    
//     (function () {
//       const s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//       s1.async = true;
//       s1.src = 'https://embed.tawk.to/6257cf987b967b11798ab0e5/1g0jg5rf5';
//       s1.charset = 'UTF-8';
//       s1.setAttribute('crossorigin', '*');
//       s0.parentNode.insertBefore(s1, s0);
//     })();
    
//   },

// }
</script>
<style>
</style>
