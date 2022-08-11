<template>
  <TopTabWrapper>
    <TopTabList title="Upload">
      <template v-if="!isUpload">
        <DropZone @drop.prevent="drop" @change="selectedFile">
          <template #format>
            PNG, JPEG OR JPG
          </template>
          <template #input>
            <input type="file" id="dropzoneFile" class="dropzoneFile" accept="image/png, image/jpg, image/jpeg" />
          </template>
        </DropZone>
      </template>

      <template v-else>
        <div class="d-flex justify-content-center align-items-center my-2">

          <div class="grid grid__1 w-100 position-relative border" style="height:200px">
            <img :src="preview" class="img-fluid" width="120" alt="preview" />
            <div class="position-absolute top-0 start-100 translate-middle">
              <button class="btn-close bg-danger rounded-circle" v-show="isUpload" @click="isUpload = !isUpload"
                style="padding:10px"></button>
            </div>
          </div>
        </div>
      </template>

      <button type="button" class="btn btn-primary d-block ms-auto mt-2" :class="{ disabled: !isSelected }"
        @click="uploadPhotograph">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Append</span>
      </button>
    </TopTabList>

    <TopTabList title="Snap">
      <PassportPhotographSnap />
    </TopTabList>

    <TopTabList title="Select">
      <div class="grid grid__3">
        <label v-for="(photo, index) in prints.Photograph" :key="index" class="form-check-label border" :for="photo.id">

          <div @click="getPrintId({ category: 'Upload', print_id: photo.id })">

            <template v-if="photo.user_id">
              <div class="position-relative">
                <input type="radio" name="photo" v-model="selected" class="form-check-input tool_name" :id="photo.id"
                  :value="photo.id">
                <img :src="photo.file" class="img-fluid" :alt="photo.id">
                <a role="button" @click="deletePassport(photo.id)"
                  class="text-danger btn-close d-block text-end delete"></a>
              </div>
            </template>

            <template v-else>
              <p class="mt-3" v-if="index == (prints.Photograph.length - 1)">
                <i>Kindly create a signature!</i>
              </p>
            </template>

          </div>
        </label>
      </div>

      <button type="button" class="btn btn-primary d-block ms-auto mt-2" :class="{ disabled: !isSelected }"
        @click="affixPassport">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Append</span>
      </button>
    </TopTabList>
  </TopTabWrapper>

  <ModalComp :show="isDelete" :size="'modal-sm'" @close="isDelete = false">
    <template #header>
      <h4 class="modal-title text-danger">Alert</h4>
    </template>

    <template #body>
      <h3 class="text-center">Are you sure?</h3>
      <p class="text-center"><i>You won't be able to revert this!</i></p>
    </template>

    <template #footer>
      <button type="button" class="btn btn-primary d-block ms-auto mt-2" :class="{ disabled: loading }"
        @click="proceedToDelete">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        <span>Proceed</span>
      </button>
    </template>
  </ModalComp>
</template>

<script setup>
import DropZone from "@/modules/components/DropZone.vue";

import { ref, defineEmits } from "vue";

import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
import PassportPhotographSnap from "@/modules/components/Passport/PassportPhotographSnap.vue";
import TopTabList from "@/modules/components/Tab/TabTopNav/TopTabList.vue";
import TopTabWrapper from "@/modules/components/Tab/TabTopNav/TopTabWrapper.vue";
import ModalComp from "@/modules/export/components/ModalComp.vue";

const { useActions, useGetters } = createNamespacedHelpers("print");

const { prints } = useGetters(["prints"]);
const { savePrint } = useActions(["savePrint"]);
const { removePrint } = useActions(["removePrint"]);

const dropzoneFile = ref("");
const preview = ref(null)
const isSelected = ref(false);
const isUpload = ref(false);
const loading = ref(false);
const isDelete = ref(false);
const printId = ref('')

const preparedFile = (file) => {
  let reader = new FileReader();

  reader.onloadend = () => {
    preview.value = reader.result
  };

  reader.readAsDataURL(file);
  isSelected.value = true;
}

const drop = (e) => {
  isUpload.value = true
  let dropFiles = (dropzoneFile.value = e.dataTransfer.files[0]);
  preparedFile(dropFiles);
};

const selectedFile = () => {
  isUpload.value = true
  let dropFiles = (dropzoneFile.value =
    document.querySelector(".dropzoneFile").files[0]);
  preparedFile(dropFiles);
};

const emit = defineEmits(['close'])
const uploadPhotograph = () => {
  isUpload.value = false
  const uploadPassport = {
    file: preview.value,
    type: "Photograph",
    category: 'Upload',
  };

  savePrint(uploadPassport)

  loading.value = true
  isSelected.value = false;

  setTimeout(() => {
    loading.value = false;
    emit('close', true)
  }, 1000);
};


const getPrintId = (params) => {
  isSelected.value = true;
  printId.value = params.print_id
};

const affixPassport = () => {
  const uploadPassport = {
    append_print_id: printId.value,
  };

  emit('selectedPassport', uploadPassport)

  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000);
};

const deletePassport = (params) => {
  isDelete.value = true
  printId.value = params
}

const proceedToDelete = () => {
  loading.value = true
  removePrint(printId.value)

  setTimeout(() => {
    isDelete.value = false
    loading.value = false
  }, 1000);
}

</script>

<style scoped>
.grid {
  display: grid;
  place-items: center;
  gap: 25px;
}

.grid__3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid__1 {
  grid-template-columns: 1fr;
}

[type=radio] {
  position: absolute;
  opacity: 0;
}

[type=radio]+img {
  cursor: pointer;
  margin-right: 0.5rem;
}

[type=radio]+img:hover {
  outline: 0.5px solid #003bb3;
}

[type=radio]:checked+img {
  outline: 3px solid #003bb3;
}

.delete {
  position: absolute;
  top: -14px;
  right: -14px;
  border-radius: 50%;
  border: 1px solid red;
  padding: 8px;
}
</style>