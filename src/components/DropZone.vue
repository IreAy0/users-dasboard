<template>
  <div class="flex-grow-1">
    <div @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
      @drop.prevent="toggleActive" :class="{ 'active-dropzone': active }" class="dropzone">
      <label for="dropzoneFile" class="custom-upload" role="button">
        <div class="text-center">
          <span class="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"/></svg>
          </span>
          <h6>Drag and drop or</h6>
          <!-- <h6>OR</h6> -->
          <h6 class="btn btn-primary">Browse</h6>
          <div class="text-muted mt-50" style="font-size: 12px">
            <slot name="format">PDF only</slot>
            <br />
            <slot name="limit">
               <span class="">Maximum size 2mb per file</span>
            </slot>
          </div>
          <slot name="input">
            <input type="file" id="dropzoneFile" multiple class="dropzoneFile d-none " />
          </slot>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref(false);

const toggleActive = () => { active.value = !active.value };
</script>

<style scoped>
.dropzone {
  width: 100%;
  height: 223px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #999;
  background-color: #fff;
  transition: 0.3s ease all;
  border-radius: 3px;
  padding: 40px 30px;
}

label {
  transition: 0.3s ease all;
}

.upload-icon{
  display: flex;
width: 40px;
height: 40px;
padding: 5px;
justify-content: center;
align-items: center;
border-radius: 28px;
border: 6px solid #EAECF0;
background: #EAECF0;
margin: auto;
margin-bottom: .5rem
}
.dropzone input {
  display: none;
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #00cfe8;
}

.custom-upload {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.dropzone:hover {
  border-color: #4169e1;
}
</style>
