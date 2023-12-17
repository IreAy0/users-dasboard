<template>
  <div class="seal-container">
    <canvas ref="sealCanvas" class="seal-canvas" :width="width" :height="height" />
    <div class="seal-editor" v-if="showEditor">
      <label for="companyName">Company Name:</label>
      <input type="text" id="companyName" v-model="companyName" />
      <label for="establishedYear">Established Year:</label>
      <input type="number" id="establishedYear" v-model="establishedYear" min="1000" />
      <label for="slogan">Slogan:</label>
      <input type="text" id="slogan" v-model="slogan" />
      <button @click="renderSeal">Generate Seal</button>
    </div>
    <button @click="toggleEditor">Edit Content</button>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const canvas = ref(null);
    const ctx = ref(null);
    const width = 300;
    const height = 300;
    const showEditor = ref(false);
    const companyName = ref('');
    const establishedYear = ref(2023);
    const slogan = ref('');

    function drawSeal() {
      // Draw seal outline, shield, text, etc. using canvas API based on companyName, establishedYear, and slogan
    }

    function renderSeal() {
      ctx.value.clearRect(0, 0, width, height);
      drawSeal();
    }

    function toggleEditor() {
      showEditor.value = !showEditor.value;
      renderSeal(); // Update seal when editor is opened/closed
    }

    if (canvas.value) {
      ctx.value = canvas.value.getContext('2d');
      drawSeal();
    }

    return {
      canvas,
      ctx,
      width,
      height,
      showEditor,
      companyName,
      establishedYear,
      slogan,
      renderSeal,
      toggleEditor,
    };
  },
};

</script>

<style scoped>
.seal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

svg {
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
}

.seal-input {
  margin-top: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
}
</style>
