<template>
 
  <router-view v-slot="{ Component }">
    <transition :name="'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script setup>
// import { beforeMount, store } from 'vue3-paystack';
import { mapActions, mapMutations, useStore, computed } from "vuex";
import { onMounted, onBeforeUnmount, onUpdated, ref } from 'vue';
import { useActions, useState } from "vuex-composition-helpers";
import { getToken } from "@/Services/helpers";
import socket from '@/socket';

const store = useStore()
// const { token } = useGetters({
//   token: "auth/token",
// });
// const { userProfile } = useState({
//   userProfile: "ProfileModule/userProfile",
// });


const userProfile = ref("")

const token = getToken();

const timeoutInMS = 420000; //? 5 minutes -> 7 * 60 * 1000

let timeoutId;

function handleInactive() {
  if (token) {
    store.dispatch("AuthModule/logout");
  }
 
}

setTimeout(() => {
  userProfile.value = store.state.ProfileModule.userProfile

}, 10000);

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

})


</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
