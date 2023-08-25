<template>
  <div>
    <b-button
    variant="outline-button"
    block
    class="w-100 text-gray-700 outline-button"
    @click="loginWithGoogle"
  >
    <Icon icon="flat-color-icons:google" class="me-50" width="24" />
    <span class="align-middle">
      <slot />
    </span>
  </b-button>
    <!-- <button @click="loginWithGoogle">Login with Google</button> -->
  </div>
</template>

<script>
import { auth, provider, signInWithPopup } from '../Services/firebaseConfig';
import { Icon } from "@iconify/vue";
import ToNote from '@/Services/Tonote';
import { saveToken } from '@/Services/helpers';
import router from '@/router';
import { defineProps } from "vue";

export default {
  components:{
    Icon
  },
  props: ['buttonText'],
  methods: {
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
          ToNote.post('/user/google-login', {
            token: result.user.uid
          }).then((user) =>{
          if(user){
              saveToken(user?.data?.token);
              router.push("/admin/dashboard");

              // commit("loginSuccess", user);
              // setTimeout(() => {
              //   router.push("/admin/dashboard");
              // }, 2000);
              
            }
          })
        
      } catch (error) {
        console.error('Google login error:', error);
      }
    },
  },
};
</script>
