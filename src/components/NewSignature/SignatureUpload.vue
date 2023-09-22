<template>
  <div class="px-3" >
    <template v-if="!isUpload">
      <div class="">
        <p class="my-1 text-dark fw-normal">Upload Signature from your device</p>
      </div>
      <p class="text-danger">{{ fileValidated }}</p>
      <div class="mt-2">
        <DropZone @drop.prevent="drop" @change="selectedFile">
          <template #format> PNG, JPEG OR JPG </template>
          <template #input>
            <input
              type="file"
              id="dropzoneFile"
              class="dropzoneFile hidden"
              accept="image/png, image/jpg, image/jpeg"
            />
          </template>
        </DropZone>
        
      </div>
      <div v-show="uploadedSignature.file != ''">
        <div class="my-2" style="max-width:200px;">
          <img :src="uploadedSignature.file" class="img-fluid" alt="uploaded-signature" />
        </div>
        
      </div>
    </template>
    <template v-else>
      <div class="my-2">
        <div class="d-flex flex-column justify-content-between position-relative">
          <CropperComp
            :data="imgUrl"
            :size="580"
            btnText="Create"
            @uploaded="uploadSignature"
          />

          <div
            class="position-absolute top-0 start-100"
            style="transform: translate(-150%, -60%) !important"
          >
            <button
              class="btn-close bg-danger rounded-circle"
              v-show="isUpload"
              @click="isUpload = !isUpload"
              style="padding: 10px"
            ></button>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div class="row px-3 ">
    
  </div>
  
  <div class="row px-3">
    <div class="col-md-12 mt-2">
      <p class="fw-normal">
        By clicking create, I agree that all signatures, marks or initials
        created here are as valid as my hand written signature to the extent
        allowed by law.
      </p>
    </div>
  </div>
  <hr />

  <div class="d-flex px-3 justify-content-between align-items-center">
    <div class="form-check form-switch">
      <input
        @change="makeDefaultSignature(uploadedSignature.id)"
        ref="make_default"
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault"
        >Save as default</label
      >
    </div>
    <!-- <button
      class="btn btn-primary d-block ms-auto"
      ref="create"
      @click="createDrawSignature"
    >
      Create
    </button> -->
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import DropZone from "@/components/DropZone.vue";
import CropperComp from "@/components/CropperComp.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
const { useGetters, useActions } = createNamespacedHelpers(["print"]);
const { prints } = useGetters(["prints"]);
const { savePrint, makeDefaultPrint } = useActions(["savePrint", "makeDefaultPrint"]);

const isSelected = ref(false);
const isUpload = ref(false);
const dropzoneFile = ref("");
const fileValidated = ref("");
const imgUrl = ref("");

const uploadedSignature = ref("");
if (prints.value.Signature != undefined) {
  prints.value.Signature.find(
    (cat) =>
      (uploadedSignature.value =
        cat.category == "Upload" ? { file: cat.file, id: cat.id } : "")
  );
}

function preparedFile(file) {
  let reader = new FileReader();
  reader.onloadend = () => {
    imgUrl.value = reader.result;
  };

  reader.readAsDataURL(file);
  isSelected.value = true;
}

const drop = (e) => {
  isUpload.value = true;
  let dropFiles = (dropzoneFile.value = e.dataTransfer.files[0]);
  const fileSize = dropFiles.size;
  const fileMb = fileSize / 1024 ** 2;
  if (fileMb >= 2) {
    isUpload.value = false;
    fileValidated.value = "Please upload a signature less than 2MB.";
    setTimeout(() => {
      isSelected.value = false;
    }, 100);
  }
  preparedFile(dropFiles);
};

const selectedFile = () => {
  isUpload.value = true;
  let dropFiles = (dropzoneFile.value = document.querySelector(".dropzoneFile").files[0]);
  const fileSize = dropFiles.size;
  const fileMb = fileSize / 1024 ** 2;
  if (fileMb >= 2) {
    isUpload.value = false;
    fileValidated.value = "Please upload a signature less than 2MB.";
    setTimeout(() => {
      isSelected.value = false;
    }, 100);
  }
  preparedFile(dropFiles);
};

const emit = defineEmits(["close"]);

const uploadSignature = (params) => {
  isUpload.value = false;
  const signatureObj = {
    file: params,
    type: "Signature",
    category: "Upload",
  };
  savePrint(signatureObj);
  // emit("close", true);
};

const makeDefaultSignature = (printID) => {
  makeDefaultPrint(printID);
};
</script>

<style scoped>
.grid {
  display: grid;
  place-items: center;
  gap: 10px;
}

.grid__2 {
  grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 991.5px) {
  .grid__2 {
    grid-template-columns: 1fr;
  }
}
</style>
