
<template>
  <div>
     <div id="loading-bg">
    <div class="loading">
      <div class="effect-1 effects"></div>
      <div class="effect-2 effects"></div>
      <div class="effect-3 effects"></div>
    </div>
  </div>
  </div>
</template>
<script>
import { saveToken } from '@/Services/helpers'
import { mapMutations } from 'vuex'
export default {
  name:"RedirectPage",
  methods:{
        ...mapMutations("MenuModule",["toggleEveryDisplay", "toggleHideConfig"]),

  },
  mounted(){
    if (this.$route.query.qt) {
      saveToken(this.$route.query.qt)
      setTimeout(()=> {
        this.$router.push('/admin/dashboard')
      }, 1000)
      
    }

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
<style lang="">
  
</style>