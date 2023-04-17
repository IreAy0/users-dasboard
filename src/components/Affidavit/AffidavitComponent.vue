<template>
  <div class="modal-body">
    <nav
      class="d-flex  justify-content-center align-items-center gap-2 nav flex-nowrap text-center d-inline-flex d-sm-flex nav-tabs bg-white shadow pt-1 pe-2 ps-2">
      <button @click="activeForm = 'Template'" :class="activeForm === 'Template' ? 'nav-link active' : 'not__active'"
        type="button" aria-selected="true">
        <span>Select a template </span>
      </button>
      <button @click="activeForm = 'Custom'" :class="activeForm === 'Custom' ? 'nav-link active' : 'not__active'"
        type="button" aria-selected="true">
        Custom Affidavit
      </button>
    </nav>

    <div v-if="activeForm === 'Template'">
      <div class="select__template my-2">
        <div class="my-2">
          <label class="form-label" for="template">Select a template</label>
          <select id="template" class="form-select" aria-label="select affidavit template" v-model="template"
            @change="error_message.title = null" :style="error_message.title && 'border: 1px solid red'">
            <option value="">Please select a template</option>
            <option v-for="template in templates" :key="template.id" :value="`${template.id}&&&&${template.title}`">
              {{ template.title }}
            </option>
          </select>
          <label v-if="error_message.title" class="text-danger small" for="error">{{ error_message.title }}</label>
        </div>
        <div class="my-2">
      <label class="form-label" for="customer_phone">Phone Number *</label>
      <input type="tel" class="form-control" id="customer_phone" placeholder="Enter your phone number"
        :style="error_message.phone && 'border: 1px solid red'" v-model="data.phone"
        @change="error_message.phone = null" />
        <label v-if="error_message.phone" class="text-danger small" for="error">{{ error_message.phone }}</label>

      </div>
        <div class="my-2">
          <label class="form-label" for="delivery_channel">How do you want your document delivered?</label>
          <select id="delivery_channel" class="form-select" :style="error_message.delivery && 'border: 1px solid red'"
            v-model="data.delivery_channel" @change="error_message.delivery = null">
            <option value="">Please select one</option>
            <option value="Email">Electronic Document Only(Via Email)</option>
            <option value="Address">
              Electronic and Physical Document(To your address)
            </option>
            <option value="Collection">Collection</option>
          </select>
          <label v-if="error_message.delivery" class="text-danger small" for="error">{{ error_message.delivery
          }}</label>
        </div>

        <div v-if="data.delivery_channel === 'Address'" class="my-2">
          <label class="form-label" for="template">Enter your address</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Address"
            v-model="data.delivery_address" />
        </div>
      </div>
    </div>

    <div v-if="activeForm === 'Custom'">
      <div class="select__template my-2">
        <div class="my-2">
          <label class="form-label" for="document_type">Document Type *</label>
          <input type="text" class="form-control" id="document_type" placeholder="" v-model="data.title"
            @change="error_message2.title = null" :style="error_message2.title && 'border: 1px solid red'" />
          <label v-if="error_message2.title" class="text-danger small" for="error">{{ error_message2.title }}</label>
        </div>

        <div class="my-2">
          <label for="document_description" class="form-label">Describe your document *</label>
          <textarea v-model="data.description" class="form-control" id="document_description" required rows="3"
            @change="error_message2.description = null"
            :style="error_message2.description && 'border: 1px solid red'"></textarea>
          <label v-if="error_message2.description" class="text-danger small" for="error">{{ error_message2.description
          }}</label>
        </div>
        <div class="my-2">
      <label class="form-label" for="customer_phone">Phone Number *</label>
      <input type="tel" class="form-control" id="customer_phone" placeholder="Enter your phone number"
        :style="error_message.phone && 'border: 1px solid red'" v-model="data.phone"
        @change="error_message.phone = null" />
        <label v-if="error_message.phone" class="text-danger small" for="error">{{ error_message.phone }}</label>

      </div>
        <div class="my-2">
          <label class="form-label" for="template">How do you want your document delivered?</label>
          <select id="template" class="form-select" aria-label="select affidavit template"
            v-model="data.delivery_channel" @change="error_message2.delivery = null"
            :style="error_message2.delivery && 'border: 1px solid red'">
            <option value="">Please select one</option>
            <option value="Email">Electronic Document Only(Via Email)</option>
            <option value="Address">
              Electronic and Physical Document(To your address)
            </option>
            <option value="Collection">Collection</option>
          </select>
          <label v-if="error_message2.delivery" class="text-danger small" for="error">{{ error_message2.delivery
          }}</label>
        </div>

        <div v-if="data.delivery_channel === 'Address'" class="my-2">
          <label class="form-label" for="template">Enter your address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Address"
            v-model="data.delivery_address" />
        </div>
      </div>
    </div>
  </div>
 
  <div class="modal-footer">
    <button @click="handleSubmit" type="button" class="btn btn-primary">
      Proceed
    </button>
  </div>
</template>

<script setup>
import { onMounted, computed, ref, defineEmits } from "vue";
import AOS from "aos";
import { useStore } from "vuex";

const activeForm = ref("Template");

let store = useStore();
const emits = defineEmits(["nextStep", "prevStep", "resetStep"]);
const templates = computed(() => store.state.AffidavitModule.templates);
const template = ref("");
const data = ref({
  type: activeForm,
  title: null,
  schedule_id: null,
  schedule_type: "DocumentTemplate",
  description: "",
  delivery_channel: "",
  delivery_address: "",
  platform_initiated: "Web",
  phone: "",
  entry_point: "Affidavit"
});
const error = ref(true);
const error_message = ref({
  title: null,
  delivery: null,
  address: null,
  phone: null
});
const error2 = ref(true);
const error_message2 = ref({
  title: null,
  delivery: null,
  address: null,
  description: null,
  phone: null
});

const handleSubmit = () => {
  if (activeForm.value === "Template") {
    activeForm.value === "Template"
      ? (data.value.title = template.value.split("&&&&")[1])
      : data.value.title;

    if (!data.value.title || !data.value.title.trim()) {
      error_message.value.title = "Please select a template";
      error.value = true;
    } else {
      error_message.value.title = null;
      error.value = false;
    }
    if (!data.value.delivery_channel || !data.value.delivery_channel.trim()) {
      error_message.value.delivery = "Please select this field";
      error.value = true;
    } else {
      error_message.value.delivery = null;
      error.value = false;
    }
    if (
    !data.value.phone ||
    !data.value.phone.trim()
  ) {
    error_message.value.phone = "Phone number is required";
    error.value = true;
  } else if(
    // check if value is not a number
    isNaN(data.value.phone) ||
    data.value.phone.length < 11 
  ) {
    error_message.value.phone = "Invalid phone number";
    error.value =true;
  } else {
    error_message.value.phone = null;
    error.value = false;
  }




    if (!error_message.value.title && !error_message.value.delivery && !error_message.value.phone) {
      emits("nextStep");
      store.dispatch("AffidavitModule/post_AffidavitRequestForm", {
        ...data.value,
        title:
          activeForm.value === "Template"
            ? template.value.split("&&&&")[1]
            : data.value.title,
        schedule_id:
          activeForm.value === "Template"
            ? template.value.split("&&&&")[0]
            : "",
        delivery_address:
          data.value.delivery_address === "" ||
            data.value.delivery_address.trim() === null
            ? (data.value.delivery_address = "Address")
            : data.value.delivery_address,
        phone: data.value.phone === "" ||
        data.value.phone.trim() === null
        ? (error_message.value.phone = "Phone number is required")
        : data.value.phone,
      });
    }
  } else if (activeForm.value === "Custom") {
    if (!data.value.title || !data.value.title.trim()) {
      error_message2.value.title = "This field is required";
      error2.value = true;
    } else {
      error_message2.value.title = null;
      error2.value = false;
    }
    if (!data.value.delivery_channel || !data.value.delivery_channel.trim()) {
      error_message2.value.delivery = "Please select this field";
      error2.value = true;
    } else {
      error_message2.value.delivery = null;
      error2.value = false;
    }
    if (!data.value.description || !data.value.description.trim()) {
      error_message2.value.description = "This field is required";
      error2.value = true;
    } else {
      error_message2.value.description = null;
      error2.value = false;
    }
    if (
      !data.value.phone ||
      !data.value.phone.trim()
    ) {
      error_message2.value.phone = "Phone number is required";
      error2.value = true;
    } else if(
      // check if value is not a number
      isNaN(data.value.phone) ||
      data.value.phone.length < 11 
    ) {
      error_message2.value.phone = "Invalid phone number";
      error2.value = true;
    } else {
      error_message2.value.phone = null;
      error2.value = false;
    }



    if (
      !error_message2.value.title &&
      !error_message2.value.delivery &&
      !error_message2.value.description &&
      !error_message2.value.phone
    ) {
      emits("nextStep");
      store.dispatch("AffidavitModule/post_AffidavitRequestForm", {
        ...data.value,
        title:
          activeForm.value === "Template"
            ? template.value.split("&&&&")[1]
            : data.value.title,
        schedule_id:
          activeForm.value === "Template"
            ? template.value.split("&&&&")[0]
            : "",
        delivery_address:
          data.value.delivery_address === "" ||
            data.value.delivery_address.trim() === null
            ? (data.value.delivery_address = "Address")
            : data.value.delivery_address,
        phone: data.value.phone === "" ||
        data.value.phone.trim() === null
        ? (error_message2.value.phone = "Phone number is required")
        : data.value.phone,
      });
    }
  }
};
onMounted(() => {
  AOS.init({ duration: 500 });
  store.dispatch("AffidavitModule/ALL_AFFIDAVIT");
});
</script>

<style scoped>
.not__active {
  color: #1e1e1e;
  border: none;
  outline: none;
  background: transparent;
  /* border: 1.5px solid #003bb3;
  border-radius: 5px; */
}
</style>
