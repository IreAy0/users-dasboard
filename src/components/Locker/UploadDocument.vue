<template>
     
  <div class="modal-body">
    <div class="my-2">
      <label class="form-label" for="document_type">Title *</label>
      <input type="text" class="form-control" id="document_type" placeholder="Enter document title"
        :style="error_message.title && 'border: 1px solid red'"  v-model="form_data.title"
        @change="error_message.title = null" />
    </div>
    <div v-if="form_data?.files.length > 0" @change="selectedFile" >  
      <div @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
      @drop.prevent="toggleActive" :class="{ 'active-dropzone': active }" class="dropzone h-auto border border-0 d-block">
      <label for="dropzoneFile"  role="button">
        <div class="text-center">
         
          <h4 class="btn btn-primary">Select More</h4>
          
          <slot name="input">
            <input type="file" id="dropzoneFile" multiple class="dropzoneFile" />
          </slot>
        </div>
      </label>
    </div>
    </div>

    <DropZone v-else  @drop.prevent="drop" @change="selectedFile">
              <template #format>
               Upload PDF only
              
              </template>
              
              <template #input>
                <input type="file" id="dropzoneFile" multiple class="dropzoneFile" accept=".pdf" />
              </template>
    </DropZone>
    
    <div class="card mb-1 mt-50 shadow-none border d-flex" v-for="(prev, index) in previewFile" :key="index">
          <div class="p-50">
            <div class="d-flex align-items-center">
              <!-- <div class="col-auto">
                <img data-dz-thumbnail src="@/assets/default.png" class="avatar-sm rounded bg-light" :alt="prev" />
              </div> -->

              <div class="col ps-0">
                <!-- <a href="javascript:void(0)" class="text-muted fw-bold" data-dz-name></a> -->
                <p class="mb-0" data-dz-size>{{ prev }}</p>
              </div>

              <div class="col-auto">
                <a role="button" class="btn mb-0 btn-sm btn-outline-danger ds-remove filed" data-id="#document_id"
                  data-name="fileName" @click="removeItem(index)">
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
    
    <label v-if="error_message.file" class="text-danger small" for="error">{{
        error_message.file
    }}</label>
    <p v-if="preview" class="text-primary">{{ preview }}</p>
   
  <div class="modal-footer">
    <button @click="SubmitHandler" type="button" class="btn btn-primary">
      Proceed
    </button>
  </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useStore } from "vuex";
import { useActions, useGetters } from "vuex-composition-helpers/dist";

import DropZone from "@/components/DropZone.vue";

const emits = defineEmits(["close"]);
const active = ref(false);
const dropzoneFile = ref("");
const previewFile = ref([]);
const dataFile = ref([]);
dataFile.value = [];
previewFile.value = [];

const preview = ref(null);
const isSelected = ref(false);
const isUpload = ref(false);
const store = useStore();
let selectedFiles= ref("");

const error = ref(true);
const error_message = ref({
  file: null,
 
});
const form_data = ref({
  title: "",
  files: [],
 
});

const close = () => {
  console.log('close')
}


const preparedFile = (file) => {
  for (let i = 0; i < file.length; i++) {
    if(file[i].size > 2097152){
      //  alert("File is too big!");
       error_message.value.file = "File is too big!";
       form_data.value.title= ""
       error.value = true;

        return false;
    } else {
      let reader = new FileReader();
    const params = file[i];
    reader.onloadend = () => {
      form_data.value.files.push(reader.result);

      if (!form_data.value.title || !form_data.value.title.trim()) {
    form_data.value.title = params.name.split('.').slice(0, -1).join('.');
  }
      // form_data.value.title = params.name;
      previewFile.value.push(params.name);
    };
    reader.readAsDataURL(params);
    }

   
  }

  isSelected.value = true;
  // let reader = new FileReader();

  // reader.onloadend = () => {
  //   form_data.value.files = [reader.result];
  // };
  // reader.readAsDataURL(file);
  // isSelected.value = true;
};

const drop = (e) => {
  isUpload.value = true;

  let dropFiles = (dropzoneFile.value = e.dataTransfer.files);
  // form_data.value.title = dropzoneFile.value[0].name.split('.').slice(0, -1).join('.');
  preparedFile(dropFiles);
  // preview.value = dropFiles.name;
  !form_data.value.title || !form_data.value.title.trim()
    ? (form_data.value.title = dropzoneFile.value[0].name.split('.').slice(0, -1).join('.'))
    : null;
};

const selectedFile = (e) => {
  let dropFiles = (dropzoneFile.value = e.target.files);
  preparedFile(dropFiles);
  isSelected.value = true;

  isUpload.value = true;
  selectedFiles = e.target.files;

  // let dropFiles = (dropzoneFile.value = document.querySelector(".dropzoneFile").files[0]);
    // console.log( document.querySelector(".dropzoneFile").files)
  // preparedFile(dropFiles);
  // form_data.value.title = dropFiles[0].name.split('.').slice(0, -1).join('.')
  // preview.value = dropFiles.name;
 
};

const removeItem = (index) => {
  previewFile.value.splice(index, 1);
  form_data.value.files.splice(index, 1)
  // console.log(form_data.value.files, 'files')
  dataFile.value.splice(index, 1);
  if (previewFile.value.length == 0) {
    form_data.value.files= []
    dataFile.value = [];
    previewFile.value = [];
    form_data.value.title = "";
    isSelected.value = false;
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
    !error_message.value.title && 
    !error_message.value.file
  ) {
    store.dispatch("locker/uploadDocument", {
      ...form_data.value,
    }).then((res) => {
      emits('close')
      // store.dispatch("locker/getLockerDocuments")
    }) ;
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
