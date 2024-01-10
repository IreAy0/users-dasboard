<template>
  <div class="row px-3">
    <div class="col-12">
      <p class="my-1 text-dark fw-normal">
        Enter your full name in the box below
      </p>
    </div>
    <div class="col-12">
      <div class="mb-1">
        <label class="col-form-label" for="fullName">Full Name</label>
        <input
          type="text"
          class="form-control py-2"
          name="fullName"
          v-model="fullName"
          placeholder="Full name"
        />
      </div>
    </div>

    
    <div class="col-12">
      <div class="d-flex flex-wrap  justify-content-between">
        <div
          class="col-md-6 hover mb-1"
          v-for="(font, index) in fonts"
          :key="index"
        >
          <div class="p-1">
            <input
            @change="onCapture($event)"
              type="radio"
              :name="font"
              v-model="selected"
              :checked="selected == font"
              :value="font"
              class="border-0 hidden-radio"
              style="margin-top: 4px"
              :id="'radio-' + font"
            />

            <label
              :for="'radio-' + font"
              class="form-check-label d-flex align-items-center gap-2"
              
            >
              <div class="custom-checkbox">
                <span class="checkbox-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 19C8.7 19 8.5 18.9 8.3 18.7L3.3 13.7C2.9 13.3 2.9 12.7 3.3 12.3C3.7 11.9 4.3 11.9 4.7 12.3L9 16.6L19.3 6.3C19.7 5.9 20.3 5.9 20.7 6.3C21.1 6.7 21.1 7.3 20.7 7.7L9.7 18.7C9.5 18.9 9.3 19 9 19Z" fill="currentColor"/>
                    </svg>
                </span>
              </div>

              <span
                class="fullName text-lowercase"
                :class="font"
                :style="{
                  fontFamily: font,
                  fontSize: '1.5rem',
                  marginTop: '4px',
                  
                }"
              >
                {{ fullName }}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ typeSignature }} -->
    <div class="col-12">
      <div class="row" v-show="selectedFont || typeSignature">
        <div class="col-md-7">
          <p class="mb-50 text-dark fw-normal">Selected Signature</p>
          <h1
          ctr
            class="d-block fw-normal p-0 my-50"
           
          >
            <template v-if="selectedFont">
              <span
                ref="capture"
                class=" capture custom-fs-sm "
                data-type="Signature"
                :style="styleObject"
              >
                {{ fullName }}
              </span>
            </template>
            <template v-else>
              <img
                style="max-width: 50% !important"
                :src="typeSignature.file"
                class="img-fluid"
                alt="typed_signature"
              />
            </template>
          </h1>
        </div>
        <div class="col-md-5">
          <p class="mb-50 text-dark fw-normal">Initial</p>
          <h1
          ctr
            class=" d-inline-block fw-normal"
            
          >
            <template v-if="selectedFont">
              <span
                id="capture_initials"
                ref="capture_initials"
                class="capture py-1 custom-fs-sm"
                data-type="Initial"
                :style="styleObject"
              >
                {{ getFirstLetters(fullName) }}
              </span>
            </template>
            <template v-else>
              <img :src="typeInitial"  style="max-width: 30% !important"  class="img-fluid" alt="initials" />
            </template>
          </h1>
        </div>
      </div>
    </div>
  </div>

  <div class="row px-3">
    <!-- <img :src="imgUrl" class="p-0 border border-danger" alt="type" /> -->
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
        @change="makeDefaultSignature(typeSignature.id)"
        ref="make_default"
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        :disabled="dashboard.default_signature === typeSignature.id || !typeSignature"
        :checked="dashboard.default_signature === typeSignature.id"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault"
        >Save as default</label
      >
    </div>
    <button
      type="button"
      class="btn btn-primary d-block ms-auto my-auto"
      :disabled="capturing === true"
      @click="createTypedSignature"
    >
      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
      <span>Save</span>
    </button>
  </div>
</template>

<script setup>
import domToImage from "dom-to-image";
// import html2canvas from 'html2canvas';
import { ref, watch, defineEmits } from "vue";
import html2canvas from "html2canvas";
import { useNamespacedState } from "vuex-composition-helpers";
import { toPng } from "html-to-image";
import { getFirstLetters }from '@/Services/helpers.js'

import {
  useGetters,
  useActions,
  useState,
} from "vuex-composition-helpers/dist";

const { profile, prints, user, dashboard } = useGetters({
  profile: "auth/profile",
  prints: "print/prints",
  user: "ProfileModule/user",
  dashboard: "ProfileModule/dashboard"
});




const { savePrint, makeDefaultPrint, getDashboard } = useActions({
  savePrint: "print/savePrint",
  makeDefaultPrint: "print/makeDefaultPrint",
  getDashboard: "ProfileModule/getDashboard"
});

const imgUrl = ref("");
const selected = ref("");
const loading = ref(false);
const capturing = ref(false);
const capture = ref("");
const capture_initials = ref("");
const data = ref({});
const initial_data = ref({});
const selectedFont = ref("");

const fonts = ["Great Vibes", "Arizonia"];
const fullName = ref("");
const initials = ref("");
const styleObject = ref({});

fullName.value = user.value.first_name + " " + user.value.last_name;
initials.value = getFirstLetters(fullName.value);

const typeSignature = ref("");
const typeInitial = ref("");

if (prints.value.Signature != undefined) {
  prints.value.Signature.find(
    (cat) => (typeSignature.value = cat.category == "Type" ? {file:cat.file, id: cat.id} : "")
  );
}

if (prints.value.Initial != undefined) {
  prints.value.Initial.find(
    (cat) => (typeInitial.value = cat.category == "Type" ? cat.file : "")
  );
}

watch(
  () => fullName.value,
  (newValue) => {
    fullName.value = newValue;
    capturing.value = false;
  },
  () => initials.value,
  (newValue) => {
    initials.value = newValue;
    capturing.value = false;
  }
);

const captureAndSave = async (element) => {
	try {
		let type = element.dataset.type;
		const canvas = await html2canvas(element, {
			backgroundColor: 'transparent',
			scale: 3,
		});
		const imageData = canvas.toDataURL('image/png');
		let fullNameOrInitial = type == 'Signature' ? fullName.value : getFirstLetters(fullName.value);
    imgUrl.value.push({
			file: imageData,
			type: type,
			// value: capitalizeEachWord(fullNameOrInitial),
			category: 'Type',
		});
    // data.value = { file: imageData, type: "Signature", category: "Type" };
		capturing.value  = false;
	} catch (error) {
		capturing.value = false;
		console.error('Error capturing and saving the image:', error);
	}
};

const onCapture = async (e) => {
  loading.value = true;
  capturing.value = true;
	selectedFont.value = e.target.value;

  styleObject.value = {
    fontFamily: e.target.value,
    color: "#000",
  };
  if (selectedFont.value != "") {
    let type = await capture.value.dataset?.type;
    let initial_type = await capture_initials.value;
    imgUrl.value = [];
    let capturedArr = Array.from(document.querySelectorAll('.capture'));
		setTimeout(() => {
			capturedArr.forEach((element) => captureAndSave(element));
		}, 100);

  }
};

const emit = defineEmits(["close"]);
const createTypedSignature = () => {
  loading.value = true;
  capturing.value = true;
	imgUrl.value.forEach((formData) => savePrint(formData));
  setTimeout(() => {
    loading.value = false;
    capturing.value = false;
  }, 1000);
};

const makeDefaultSignature = async (printID)=> {
  const defaultPrint = await makeDefaultPrint(printID);
 if (defaultPrint) {
    getDashboard()
 }
}
</script>

<style scoped>
@import "../../../public/app-assets/fonts/signature-font-face.css";

.hover {
  width: 48%;
  background: #f9fafb;
  border-radius: 8px;
}

.hover:hover {
  outline: 2px solid #003bb3 !important;
}

.custom-fs-sm {
  color: #000;
  font-size: 36px;
  font-size: clamp(1rem, 4vw, 2rem);
	padding: 4px 8px;
}

.hidden-radio {
  position: absolute;
  left: -9999px;
}

.custom-checkbox {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkbox-icon {
  color: #003bb3;
  font-size: 14px;
  line-height: 1;
  display: none;
}

/* Style the custom checkbox when checked */
.hidden-radio:checked + .form-check-label .custom-checkbox .checkbox-icon {
  display: block;
}

.hidden-radio:checked + .hover {
  outline: 2px solid #003bb3 !important;
}
@media screen and (max-width: 991.5px) {
  .hover {
    width: 100% !important;
    margin: 0;
  }
}
</style>
