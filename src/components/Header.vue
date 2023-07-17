<template>
  <div>
    <NavBar />

  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import NavBar from "@/components/Nav.vue";
import { useStore } from 'vuex'
import socket from '@/socket';
import { getToken } from "@/Services/helpers";

const token = getToken();

const store = useStore()

const userProfile = computed(() => store.state.ProfileModule.userProfile)

// const fetching = computed(() => store.state.AffidavitModule.fetching)

console.log('userProfile', userProfile)


onMounted(() => {
  

  socket.on('VIDEO_SIGN_REQUEST_SENT', () => {
      console.log('data')
      // const request = JSON.parse(data);
      // this.getAffidavitRequest()
        // $toast.success('You have a new request',  {
        //   duration: 5000,
        //   queue: false,
        //   position: "top-right",
        //   dismissible: true,
        //   pauseOnHover: true,
        // })
      // if (request.id === this.userProfile.id) {
       
      //   $toast.success('You have a new request',  {
      //     duration: 5000,
      //     queue: false,
      //     position: "top-right",
      //     dismissible: true,
      //     pauseOnHover: true,
      //   });
      // }
    });
})


</script>

<style>
/* @import "../../../assets/login/css/bootstrap.min.css"; */
</style>
