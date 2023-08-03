<template>
 
  <router-view v-slot="{ Component }">
    <transition-page>
      <component :is="Component" />
    </transition-page>
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
  // console.log('first', store.state?.ProfileModule.userProfile)
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

  // socket.on("connect_message", (data) => {
  //   console.log(data, 'data');
  // });

  // socket.on('VIDEO_SIGN_REQUEST_SENT', (res) => {
  //     console.log('data video request send', res)
  //     // const request = JSON.parse(data);
  //     // this.getAffidavitRequest()
  //       // $toast.success('You have a new request',  {
  //       //   duration: 5000,
  //       //   queue: false,
  //       //   position: "top-right",
  //       //   dismissible: true,
  //       //   pauseOnHover: true,
  //       // })
  //     // if (request.id === this.userProfile.id) {
       
  //     //   $toast.success('You have a new request',  {
  //     //     duration: 5000,
  //     //     queue: false,
  //     //     position: "top-right",
  //     //     dismissible: true,
  //     //     pauseOnHover: true,
  //     //   });
  //     // }
  //   });
})


</script>
<style>
</style>
