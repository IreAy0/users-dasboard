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



</script>

<style>
/* @import "../../../assets/login/css/bootstrap.min.css"; */
</style>
