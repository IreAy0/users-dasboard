
<template>
  
    <div class="loader" >
      <Preloader />
    </div>

</template>

<script>

import { saveToken, removeToken, getToken } from '@/Services/helpers'
import Preloader from '@/components/PreLoader.vue'
import { mapMutations, mapActions } from 'vuex'
import { get } from 'lodash'
export default {
  name: "RedirectPage",
  methods: {
    ...mapMutations("MenuModule", ["toggleEveryDisplay", "toggleHideConfig"]),
    ...mapActions('AuthModule', ['logout']),
  },
  components: {
    Preloader
  },
  computed(){
   const token = (() => getToken()) 
  },
  mounted() {
    if (this.$route.query.qt) {
      saveToken(this.$route.query.qt)
      setTimeout(() => {
        this.$router.push('/admin/dashboard')
      }, 1000)
    } else if (this.$route.query.action == 'logout')
      removeToken()
      window.location.href = "/"      
  },

  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
}
</script>

<style scoped>
.loader {
  display: grid;
  place-items: center;
  position: relative;
  height: 80vh;
  width: 100%;
}

@media screen and (max-width: 640px) {
  .loader {
    width: 100vw;
  }
}

@media screen and (max-width: 991.5px) {
  .loader {
    height: 60vh;
  }
}
</style>