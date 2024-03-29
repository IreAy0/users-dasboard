<template>
  <div v-show="!prints.Initial">
    <p class="text-center"><i>Kindly create your initial signature</i></p>
    <button type="button" @click="initialModal = true" class="btn btn-sm btn-primary d-block ms-auto mt-2">
      <span>Create</span>
    </button>
  </div>

  <div v-show="prints.Initial">
    <div class="row">
      <div class="col-md-4 ms-auto">
        <button @click="initialModal = true" class="float-end btn btn-outline-secondary btn-sm waves-effect">
          <EditIcon />
          Edit
        </button>
      </div>
    </div>

    <p class="text-center fw-normal">Pick an initial signature to append</p>
    <div class="grid">
      <label v-for="(print, index) in prints.Initial" :key="index" class="form-check-label border" :for="print.id">
        <PuSkeleton width="110px" height="60px" v-show="loader" />
        <div v-show="!loader" @click="
          getImgUrl({
            category: print.category,
            type: print.type,
            print_id: print.id,
            file: print.file,
          })
          ">
          <template v-if="print.user_id">
            <input type="radio" :name="print.id" v-model="selected" class="form-check-input tool_name" :id="print.id"
              :value="print.id" />
            <img :src="print.file" class="img-fluid" width="200" :alt="print.id" height="30" />
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

  <ModalComp :show="initialModal" :footer="false" :size="'modal-md'" @close="initialModal = false">
    <template #header>
      <h4 class="modal-title">
        <template v-if="!prints.Initial">Create your initial signature</template>
        <template v-else>Update your initial signature</template>
      </h4>
    </template>

    <template #body>
      <div class="row">
        <div class="col-md-12">
          <SignatureSelectInitial @close="initialModal = false" />
          <p>
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
import SignatureSelectInitial from "@/components/NewSignature/SignatureSelectInitial.vue";
import EditIcon from "@/icons/EditIcon.vue";

import { ref, defineEmits, watch } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
const { useGetters } = createNamespacedHelpers("print");

const { prints } = useGetters(["prints"]);

const initialModal = ref(false);
const loading = ref(false);
const isDisabled = ref(false);
const selected = ref("");
const printId = ref("");

const loader = ref(true);
setTimeout(() => (loader.value = false), 1000);

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
    initWidth.value = category.value == "Type" ? width / 10 : width / 2;

    initHeight.value = category.value == "Type" ? height / 10 : height / 2;

    const uploadFile = {
      append_print_id: printId.value,
      tool_class: toolClass.value,
      category: category.value,
      type: type.value,
      tool_name: "Initial",
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
</style>
