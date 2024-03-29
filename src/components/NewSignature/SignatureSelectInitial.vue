<template>
  <div class="row">
    <div class="col-12">
      <div class="mb-1">
        <label class="col-form-label" for="initials">Initials</label>
        <input type="text" class="form-control text-uppercase" name="initials" v-model="nameInitials"
          placeholder="Initial" />
      </div>
    </div>

    <div class="d-flex flex-column justify-content-between" style="height: 360px">
      <div class="row px-1">
        <div class="col-md-6 hover mb-1" v-for="(font, index) in fonts" :key="index">
          <div class="form-check p-1">
            <label :for="font + index" class="form-check-label" @click="onCapture(font)">
              <div class="me-3">
                <input type="radio" @change="onCapture(font)" :name="font" v-model="selected" :value="font"
                  class="form-check-input border-0" style="margin-top: 4px" :id="font + index" />
              </div>

              <div class="text-uppercase initials" :class="font"
                :style="{ fontFamily: font, fontSize: '30px', marginTop: '4px' }">
                {{ nameInitials }}
              </div>
            </label>
          </div>
        </div>

        <h1 class="fw-normal p-0 my-2" style="line-height: 0.8 !important">
          <template v-if="selectedFont">
            <span ref="capture" class="m-0 d-inline-block text-uppercase custom-fs-sm" data-type="Initial"
              style="line-height: 0.8 !important" :style="styleObject">
              {{ nameInitials }}
            </span>
          </template>
          <template v-else>
            <template v-for="print in prints.Initial" :key="print.id">
              <template v-if="print.category == 'Type'">
                <img :src="print.file" style="width: 8rem" :alt="print.type" />
              </template>
            </template>
          </template>
        </h1>
        <!-- <img :src="imgUrl" class="border border-danger p-0" alt="type" /> -->
      </div>

      <div class="col-md-12 mb-2">
        <button type="button" class="btn btn-primary d-block ms-auto" :disabled="capturing === false"
          @click="createTypedSignature">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          <span>Create</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import domToImage from "dom-to-image";
import { ref, defineEmits, watch } from "vue";

import { useGetters, useActions } from "vuex-composition-helpers/dist";

const { profile, prints } = useGetters({
  profile: "auth/profile",
  prints: "print/prints",
});

const { savePrint } = useActions({ savePrint: "print/savePrint" });

const selected = ref("");
const imgUrl = ref("");
const loading = ref(false);
const capture = ref("");
const capturing = ref(false);
const data = ref(null);
const selectedFont = ref("");

const fonts = ["Great Vibes", "Arizonia"];
const fullName = ref("");
const nameInitials = ref("");

const styleObject = ref({});

const getFirstLetters = (str) => {
  const firstLetters = str
    .split(" ")
    .map((word) => word[0])
    .join("");

  return firstLetters;
};

fullName.value = profile.value.first_name + " " + profile.value.last_name;
nameInitials.value = getFirstLetters(fullName.value);

watch(
  () => nameInitials.value,
  (newValue) => {
    nameInitials.value = newValue;
    capturing.value = false;
  }
);

const onCapture = async (font) => {
  loading.value = true;
  capturing.value = false;
  selectedFont.value = font;
  let init = nameInitials.value.toLowerCase();

  styleObject.value = {
    fontFamily: font,
    color: "#000",
    padding:
      (font == "Great Vibes" &&
        (init.includes("f") ||
          init.includes("g") ||
          init.includes("h") ||
          init.includes("j") ||
          init.includes("k") ||
          init.includes("l") ||
          init.includes("y")))
        ? "0.9rem 1.8rem 0.7rem 0.3rem"
        : font == "Great Vibes" && init.includes("q")
          ? "0.9rem 1.8rem 0.9rem 0.3rem"
          : font == "Great Vibes" &&
            (init.includes("a") ||
              init.includes("b") ||
              init.includes("i") ||
              init.includes("o") ||
              init.includes("s") ||
              init.includes("t"))
            ? "0.9rem 1.8rem 0 0.1rem"
            : font == "Arizonia" &&
              (init.includes("g") || init.includes("j") || init.includes("m") || init.includes("q") || init.includes("y"))
              ? "0.2rem 1rem 0.8rem 0.8rem"
              : "0.2rem 1.3rem 0.2rem 0.1rem",
  };

  if (selectedFont.value != "") {
    let type = await capture.value.dataset?.type;
    const scale = 5;

    domToImage
      .toPng(capture.value, {
        quality: 1,
        width: capture.value.clientWidth * scale,
        height: capture.value.clientHeight * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
        },
      })
      .then((dataUrl) => {
        imgUrl.value = dataUrl;
        data.value = { file: dataUrl, type: type, category: "Type" };
        loading.value = false;
        capturing.value = true;
      })
      .catch((error) => {
        capturing.value = false;
        console.error("oops, something went wrong!", error);
      });
  }
};

const emit = defineEmits(["close"]);
const createTypedSignature = () => {
  loading.value = true;

  const formData = {
    category: data.value.category,
    type: data.value.type,
    file: data.value.file,
    value: nameInitials.value,
  };

  savePrint(formData);
  emit("close", true);

  setTimeout(() => {
    loading.value = false;
    capturing.value = false;
  }, 1000);
};
</script>

<style scoped>
@import "../../../public/app-assets/fonts/signature-font-face.css";

.hover {
  width: 46% !important;
  margin: 0 5px;
  outline: 1px solid #ccc !important;
  border-radius: 20px;
}

.hover:hover {
  outline: 2px solid #7367f0 !important;
}

.custom-fs-sm {
  color: #000;
  font-size: 36px;
  /* font-size: clamp(1rem, 2vw, 2.875rem); */
  font-size: clamp(1rem, -0.875rem + 8.333vw, 3.5rem);
}

@media screen and (max-width: 991.5px) {
  .hover {
    width: 100% !important;
    margin: 0;
  }
}
</style>
