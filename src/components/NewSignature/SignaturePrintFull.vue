<template>
  <div v-show="!prints.Signature">
    <p class="text-center"><i>Kindly create your signature(s)</i></p>
    <button type="button" @click="updateModal" class="btn btn-sm btn-primary d-block ms-auto mt-2">
      <span>Create</span>
    </button>
  </div>

  <div v-show="prints.Signature">
    <div class="row">
      <div class="col-md-4 ms-auto">
        <button @click="updateModal" class="float-end btn btn-outline-secondary btn-sm waves-effect" id="updateSignature">
          <EditIcon />
          Edit
        </button>
      </div>
    </div>
    <p class="text-center fw-normal">Pick a signature to append</p>
    <div class="grid grid__2">
      <label v-for="(print, index) in prints.Signature" :key="index" class="form-check-label border" :for="print.id">
        <PuSkeleton width="110px" height="60px" v-show="loader" />
        <div v-show="!loader" @click="
          getImgUrl({
            category: print.category,
            type: print.type,
            print_id: print.id,
            file: print.file,
          })
          " style="width: 110px; height: 60px">
          <template v-if="print.user_id">
            <input type="radio" :name="print.id" v-model="selected" class="form-check-input tool_name" :id="print.id"
              :value="print.id" />
            <img :src="print.file" class="w-100 h-100" style="object-fit: scale-down" :alt="print.id" />
          </template>
        </div>
      </label>
    </div>

    <button type="button" class="btn btn-sm btn-primary d-block ms-auto mt-2" :disabled="!isDisabled"
      @click="uploadSignature">
      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
      <span>Append</span>
    </button>
  </div>

  <ModalComp :show="signatureModal" :footer="false" @close="signatureModal = false">
    <template #header>
      <h4 class="modal-title">
        <template v-if="!prints.Signature">Create your signature</template>
        <template v-else>Update your signature</template>
      </h4>
    </template>

    <template #body>
      <LeftTabWrapper>
        <LeftTabList title="Draw">
          <SignaturePad @close="signatureModal = false" />
        </LeftTabList>

        <LeftTabList title="Select">
          <SignatureSelectFull @close="signatureModal = false" />
        </LeftTabList>

        <LeftTabList title="Upload">
          <div class="row">
            <div class="col-md-12 mx-auto position-relative">
              <SignatureUpload @close="signatureModal = false" />
            </div>
          </div>
        </LeftTabList>
      </LeftTabWrapper>
      <div class="row">
        <div class="col-md-10 ms-auto mt-2">
          <p class="fw-normal">
            By clicking create, I agree that all signatures, marks or initials created
            here are as valid as my hand written signature to the extent allowed by law.
          </p>
        </div>
      </div>
    </template>
  </ModalComp>
</template>

<script setup>
import ModalComp from "@/components/ModalComp.vue";
import LeftTabWrapper from "@/components/Tab/TabLeftNav/LeftTabWrapper.vue";
import LeftTabList from "@/components/Tab/TabLeftNav/LeftTabList.vue";
import SignaturePad from "@/components/NewSignature/SignaturePad.vue";
import SignatureSelectFull from "@/components/NewSignature/SignatureSelectFull.vue";
import SignatureUpload from "@/components/NewSignature/SignatureUpload.vue";
// import EditIcon from "@/icons/EditIcon.vue";

import { ref, defineEmits, watch } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
const { useGetters } = createNamespacedHelpers("print");

const { prints } = useGetters(["prints"]);

const signatureModal = ref(false);
const loading = ref(false);
const isDisabled = ref(false);
const selected = ref("");
const printId = ref("");

const loader = ref(true);
setTimeout(() => (loader.value = false), 1500);

watch(
  () => prints.value,
  (newValue) => {
    prints.value = newValue;
  }
);

const toolClass = ref("");
const category = ref("");
const type = ref("");
const signImg = ref("");
const getImgUrl = (params) => {
  category.value = params.category;
  type.value = params.type;
  printId.value = params.print_id;
  signImg.value = params.file;
  toolClass.value = "tool-box main-element";
  isDisabled.value = true;
};

const emit = defineEmits(["selectedSignature"]);

const initWidth = ref("");
const initHeight = ref("");
const uploadSignature = () => {
  const img = new Image();
  img.onload = function () {
    let { width, height } = img;
    initWidth.value =
      category.value == "Type"
        ? width / 10
        : category.value == "Draw" || category.value == "Upload"
          ? width / 4
          : width / 2;

    initHeight.value =
      category.value == "Type"
        ? height / 10
        : category.value == "Draw" || category.value == "Upload"
          ? height / 4
          : height / 2;

    const uploadFile = {
      append_print_id: printId.value,
      tool_class: toolClass.value,
      category: category.value,
      type: type.value,
      tool_name: "Signature",
      tool_width: initWidth.value.toString(),
      tool_height: initHeight.value.toString(),
    };

    emit("selectedSignature", uploadFile);
    emit("closeModal", true);
  };
  img.src = signImg.value;

  loading.value = true;
  isDisabled.value = false;
  setTimeout(() => (loading.value = false), 500);
};

const updateModal = () => {
  signatureModal.value = true;
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 20px;
}

[type="radio"] {
  position: absolute;
  opacity: 0;
}

[type="radio"]+img {
  cursor: pointer;
  margin-right: 0.5rem;
}

[type="radio"]+img:hover {
  outline: 0.5px solid #003bb3;
}

[type="radio"]:checked+img {
  outline: 2px solid #003bb3;
}

@media screen and (max-width: 991.5px) {
  .grid__2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
