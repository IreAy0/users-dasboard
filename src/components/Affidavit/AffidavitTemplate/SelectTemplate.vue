<template>
  <div class="select__template my-2">
    <div class="my-2">
      <label class="form-label" for="template">Select a template</label>
      <select
        id="template"
        class="form-select"
        aria-label="select affidavit template"
        v-model="selected_template"
      >
        <option
          v-for="template in templates"
          :key="template.id"
          :value="{ id: template.id }"
        >
          {{ template.title }}
        </option>
      </select>
    </div>

    <div class="my-2">
      <label class="form-label" for="template"
        >How do you want your document delivered?</label
      >
      <select
        id="template"
        class="form-select"
        aria-label="select affidavit template"
        v-model="delivery__channel"
      >
        <option value="via-email">Electronic Document Only(Via Email)</option>
        <option value="via-address">
          Electronic and Physical Document(To your address)
        </option>
        <option value="via-office">Collection</option>
      </select>
    </div>

    <div
      data-aos="zoom-in"
      v-if="delivery__channel === 'via-address'"
      class="my-2"
    >
      <label class="form-label" for="template">Enter your address</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Address"
        v-model="address"
      />
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, ref } from "vue";
import { array } from "yup/lib/locale";

const props = defineProps({
  templates: array,
});
const { templates } = toRefs(props);
const selected_template = ref("");
const delivery__channel = ref("");
const address = ref("");
</script>
