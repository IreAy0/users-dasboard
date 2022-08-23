<template>
  <div class="select__template my-2">
    <div class="my-2">
      <label class="form-label" for="document_type">Document Type *</label>
      <input type="text" class="form-control" id="document_type" placeholder="" v-model="document_type" />
    </div>

    <div class="my-2">
      <label for="document_description" class="form-label">Describe your document *</label>
      <textarea v-model="document_description" class="form-control" id="document_description" rows="3"></textarea>
    </div>

    <div class="my-2">
      <label class="form-label" for="template">How do you want your document delivered?</label>
      <select id="template" class="form-select" aria-label="select affidavit template" v-model="delivery__channel">
        <option value="via-email">Electronic Document Only(Via Email)</option>
        <option value="via-address">
          Electronic and Physical Document(To your address)
        </option>
        <option value="via-office">Collection</option>
      </select>
    </div>
    <p @click="count++">{{ count }}</p>
    <div data-aos="zoom-in" v-if="delivery__channel === 'via-address'" class="my-2">
      <label class="form-label" for="template">Enter your address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Address" v-model="address" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const count = ref(0);

const document_type = ref("");
const delivery__channel = ref("");
const document_description = ref("");

onMounted(() => { });
</script>
