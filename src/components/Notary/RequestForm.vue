<template>
  <div class="modal-body">
    <div class="my-2">
      <label class="form-label" for="document_type">Title *</label>
      <input type="text" class="form-control" id="document_type" placeholder="Enter document title"
        :style="error_message.title && 'border: 1px solid red'" v-model="form_data.title"
        @change="error_message.title = null" />
    </div>

    <div @change="selectedFile" @drop.prevent="drop" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive"
      @dragover.prevent :class="{ 'active-dropzone': active }" class="dropzone">
      <label for="dropzoneFile" class="custom-file-upload">
        <div class="text-center">
          <h5>Drag and drop to upload</h5>
          <h5>OR</h5>
          <h5 class="btn btn-primary">Select File</h5>
          <div class="text-muted mt-1" style="font-size: 12px">
            <slot name="format">PDF, DOC, DOCX only</slot>
          </div>
          <slot name="input">
            <input type="file" id="dropzoneFile" class="dropzoneFile" @change="error_message.file = null"
              accept=".png, .jpg, .jpeg, .pdf, .docx, .doc" />
          </slot>
        </div>
      </label>
    </div>
    <label v-if="error_message.file" class="text-primary small" for="error">{{
        error_message.file
    }}</label>
    <p v-if="preview" class="text-primary">{{ preview }}</p>

    <div class="my-2">
      <label class="form-label" for="template">How do you want your document delivered?</label>
      <select id="template" class="form-select" aria-label="select affidavit template"
        v-model="form_data.delivery_channel" @change="error_message.delivery_channel = null">
        <option value=" ">Select an option</option>
        <option value="Email">Electronic Document Only(Via Email)</option>
        <option value="Address">
          Electronic and Physical Document(To your address)
        </option>
        <option value="Collection">Collection</option>
      </select>
      <label v-if="error_message.delivery" class="text-danger small" for="error">{{ error_message.delivery }}</label>
    </div>

    <div data-aos="fade-down" v-if="form_data.delivery_channel === 'Address'" class="my-2">
      <label class="form-label" for="template">Enter your address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Address"
        v-model="form_data.delivery_address" @change="error_message.address = null"
        :style="error_message.address && 'border: 1px solid red'" />
      <label v-if="error_message.address" class="text-danger small" for="error">{{ error_message.address }}</label>
    </div>
  </div>
  <div class="modal-footer">
    <button @click="SubmitHandler" type="button" class="btn btn-primary">
      Proceed
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useStore } from "vuex";

const emits = defineEmits(["nextStep", "prevStep", "resetStep"]);
const active = ref(false);
const dropzoneFile = ref("");
const preview = ref(null);
const isSelected = ref(false);
const isUpload = ref(false);
const store = useStore();

const error = ref(true);
const error_message = ref({
  file: null,
  delivery: null,
  address: null,
});
const form_data = ref({
  title: "",
  files: [],
  delivery_channel: "",
  delivery_address: "",
  platform_initiated: "Web",
});

const preparedFile = (file) => {
  let reader = new FileReader();

  reader.onloadend = () => {
    form_data.value.files = [reader.result];
  };
  reader.readAsDataURL(file);
  isSelected.value = true;
};

const drop = (e) => {
  isUpload.value = true;
  let dropFiles = (dropzoneFile.value = e.dataTransfer.files[0]);
  preparedFile(dropFiles);
  preview.value = dropFiles.name;
  !form_data.value.title || !form_data.value.title.trim()
    ? (form_data.value.title = dropFiles.name)
    : null;
};

const selectedFile = () => {
  isUpload.value = true;
  let dropFiles = (dropzoneFile.value =
    document.querySelector(".dropzoneFile").files[0]);
  preparedFile(dropFiles);
  preview.value = dropFiles.name;
  if (!form_data.value.title || !form_data.value.title.trim()) {
    form_data.value.title = dropFiles.name;
  }
};

const SubmitHandler = () => {
  if (!form_data.value.files || form_data.value.files.length === 0) {
    error_message.value.file = "Please upload your document";
    error.value = true;
  } else {
    error_message.value.file = null;
    error.value = false;
  }

  if (
    !form_data.value.delivery_channel ||
    !form_data.value.delivery_channel.trim()
  ) {
    error_message.value.delivery = "This field is required";
    error.value = true;
  } else {
    error_message.value.delivery = null;
    error.value = false;
  }

  if (form_data.value.delivery_channel === "Address") {
    if (
      !form_data.value.delivery_address ||
      !form_data.value.delivery_address.trim()
    ) {
      error_message.value.address = "Please enter your address";
      error.value = true;
    } else {
      error_message.value.address = null;
      error.value = false;
    }
  } else {
    form_data.value.delivery_address = "Address";
    error_message.value.address = null;
    error.value = false;
  }

  if (
    !error_message.value.title &&
    !error_message.value.file &&
    !error_message.value.delivery &&
    !error_message.value.address
  ) {
    emits("nextStep");
    store.dispatch("AffidavitModule/post_notaryrequestform", {
      ...form_data.value,
    });
  }
};
</script>

<style lang="css" scoped>
.dropzone {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #999;
  background-color: #fff;
  transition: 0.3s ease all;
  border-radius: 3px;
}

label {
  transition: 0.3s ease all;
}

.dropzone input {
  display: none;
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #00cfe8;
}

.custom-file-upload {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
