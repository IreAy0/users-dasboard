<template>
  <div class="tab-content" :class="[styles]" v-show="title == selectedTitle">
    <slot />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  props: ["title", "styles"],
  setup() {
    const selectedTitle = inject("selectedTitle");

    return {
      selectedTitle,
    };
  },
};
</script>

<style scoped>
.tab-content {
  min-height: 300px;
  padding: 20px;
  border-radius: 5px;
}
</style>
