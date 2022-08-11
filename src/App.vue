<template>
<ProgressBarVue />
  <router-view />
</template>
<script>
import ProgressBarVue from "./components/ProgressBar.vue";

export default {
  components: {
    ProgressBarVue
  },
}
</script>
<style></style>
