<template>
  <div class="px-3 d-flex justify-content-between">
    <div class="">
      <div class="my-1 text-dark">Draw your signature in the tool box</div>
    </div>
    <div style="margin: 10px 0">
      <button
        class="btn btn-md btn-outline-secondary waves-effect"
        @click="clear"
      >
        Clear
      </button>
    </div>
  </div>

  <div class="row px-3">
    <div class="col-12 col-md-9 rounded-3">
      <VueSignaturePad
        id="signaturePad"
        width="100%"
        height="223px"
        ref="signaturePad"
        :options="options"
        class="canvas"
      ></VueSignaturePad>
    </div>
    <div class="col-12 col-md-3">
      <div class="text-center h-100">
        <div class="mx-auto h-100">
          
          <template v-if="imgBase64 != ''">
            <div class="h-100 border-1 border rounded-3">
              <img
                :src="imgBase64"
                class="d-block mx-auto h-100 img-fluid"
                :style="{ width: '100%', objectFit: 'contain' }"
                alt="preview"
              />
            </div>
          </template>
          
          <template v-else>
              <div v-if="drawnSignature && drawnSignature?.file != ''" class="h-100 border-1 border rounded-3">
                <img
                  :style="{ width: '100%', objectFit: 'contain' }"
                  :src="drawnSignature.file"
                  class="d-block mx-auto h-100"
                  alt="preview signature"
                />
              </div>
              <div v-else class="h-100 border-2 border rounded-3"></div>
            </template>
            <!-- <template v-else>
              <div class="h-100 border-2 border rounded-3"></div>
            </template> -->
         
        </div>
      </div>
    </div>
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
        @change="makeDefaultSignature(drawnSignature.id)"
        ref="make_default"
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        :disabled="dashboard.default_signature === drawnSignature.id"
        :checked="dashboard.default_signature === drawnSignature.id"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault"
        >Save as default</label
      >
    </div>
    <button
      class="btn btn-primary d-block ms-auto"
      ref="create"
      @click="createDrawSignature"
    >
      Create
    </button>
  </div>
</template>

<script setup>
import SignaturePad from "signature_pad";
import { v4 as uuidv4 } from "uuid";
import {
  defineProps,
  onMounted,
  reactive,
  watch,
  defineExpose,
  ref,
  defineEmits,
} from "vue";

import { createNamespacedHelpers, useGetters, useActions } from "vuex-composition-helpers/dist";
import { useBreakpointsComposable } from "@/composables/useBreakpoints";
const { type } = useBreakpointsComposable();

const {  useActions: printAction } = createNamespacedHelpers(["print"]);
// const { prints, dashboard } = useGetters({"prints", "print", "dashboard"});

const { profile, prints, user, dashboard } = useGetters({
  profile: "auth/profile",
  prints: "print/prints",
  user: "ProfileModule/user",
  dashboard: "ProfileModule/dashboard"
});


const {  getDashboard  } = useActions({
  getDashboard: "ProfileModule/getDashboard"
})


const { savePrint, getUserPrints, makeDefaultPrint } = printAction([
  "savePrint",
  "getUserPrints",
  "getUserPrint",
  "makeDefaultPrint",
]);

const emit = defineEmits(["close"]);

const drawnSignature = ref("");
if (prints.value.Signature != undefined) {
  prints.value.Signature.find(
    (cat) =>
      (drawnSignature.value =
        cat.category == "Draw" ? { file: cat.file, id: cat.id } : "")
  );
}

const create = ref(false);
const make_default = ref(false);
const props = defineProps({
  sigOption: {
    type: Object,
    default: () => {
      return {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        penColor: "rgb(0, 0, 0)",
      };
    },
  },
  w: {
    type: String,
    default: "100%",
  },
  h: {
    type: String,
    default: "100%",
  },
  clearOnResize: {
    type: Boolean,
    default: false,
  },
  waterMark: {
    type: Object,
    default: () => {
      return {};
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  defaultUrl: {
    type: String,
    default: "",
  },
});

let state = reactive({
  sig: () => {},
  option: {
    minWidth: 1.5,
    maxWidth: 1.5,
    backgroundColor: "rgb(255, 255, 255)",
    penColor: "rgb(0, 0, 0)",
  },
  uid: "",
});
const signaturePad = ref(null);
let options = reactive({
  penColor: "#000",
  onBegin: () => {
    signaturePad.value.resizeCanvas();
  },
  onEnd: () => {
    // eslint-disable-next-line no-unused-vars
    const { isEmpty, data } = signaturePad.value.saveSignature();
    imgBase64.value = data;
    create.value.disabled = false;
    create.value.disabled = false;
  },
});

let sigOptions = Object.keys(props.sigOption);
for (let item of sigOptions) {
  // eslint-disable-next-line vue/no-setup-props-destructure
  state.option[item] = props.sigOption[item];
}

watch(
  () => props?.disabled,
  (val) => {
    if (val) {
      state.sig.off();
    } else {
      state.sig.on();
    }
  }
);

watch(
  () => prints.value,
  (val) =>{
    val.Signature.find(
    (cat) =>
      (drawnSignature.value =
        cat.category == "Draw" ? { file: cat.file, id: cat.id } : "")
  );
   
  }
)
// const draw = () => {
//   let canvas = document.getElementById(state?.uid);
//   state.sig = new SignaturePad(canvas, state.option);

//   state.sig.addEventListener("endStroke", () => save());

//   SignaturePad.prototype.removeBlanks = function () {
//     let tempCanvas = document.createElement("canvas").getContext("2d");
//     const imgWidth = this._ctx.canvas.width;
//     const imgHeight = this._ctx.canvas.height;
//     const imageData = this._ctx.getImageData(0, 0, imgWidth, imgHeight);
//     const data = imageData.data,
//       getAlpha = function (x, y) {
//         return {
//           red: data[(imgWidth * y + x) * 4],
//           green: data[(imgWidth * y + x) * 4 + 1],
//           blue: data[(imgWidth * y + x) * 4 + 2],
//         };
//       },
//       isWhite = function (rgb) {
//         return rgb.red == 255 && rgb.green == 255 && rgb.blue == 255;
//       },
//       scanY = function (fromTop) {
//         const offset = fromTop ? 1 : -1;

//         for (
//           let y = fromTop ? 0 : imgHeight - 1;
//           fromTop ? y < imgHeight : y > -1;
//           y += offset
//         ) {
//           for (let x = 0; x < imgWidth; x++) {
//             if (!isWhite(getAlpha(x, y))) return y;
//           }
//         }
//         return null;
//       },
//       scanX = function (fromLeft) {
//         const offset = fromLeft ? 1 : -1;

//         for (
//           let x = fromLeft ? 0 : imgWidth - 1;
//           fromLeft ? x < imgWidth : x > -1;
//           x += offset
//         ) {
//           for (let y = 0; y < imgHeight; y++) {
//             if (!isWhite(getAlpha(x, y))) return x;
//           }
//         }
//         return null;
//       };

//     const cropTop = scanY(true),
//       cropBottom = scanY(false),
//       cropLeft = scanX(true),
//       cropRight = scanX(false);

//     const relevantData = this._ctx.getImageData(
//       cropLeft,
//       cropTop,
//       cropRight - cropLeft,
//       cropBottom - cropTop
//     );

//     tempCanvas.canvas.width = cropRight - cropLeft;
//     tempCanvas.canvas.height = cropBottom - cropTop;
//     tempCanvas.putImageData(relevantData, 0, 0);

//     const dataURL = tempCanvas.canvas.toDataURL();
//     imgBase64.value = dataURL;
//   };

//   function resizeCanvas(c) {
//     let url;
//     if (!isEmpty()) url = save();

//     c.width = 400;
//     c.height = 300;
//     if (type.value == "xs") {
//       c.width = 290;
//       c.height = 190;
//     }

//     c.getContext("2d").scale(1, 1);
//     clear();

//     !props.clearOnResize && url !== undefined && fromDataURL(url);
//   }

//   window.addEventListener("resize", resizeCanvas(canvas));
//   resizeCanvas(canvas);

//   if (props.defaultUrl !== "") fromDataURL(props.defaultUrl);

//   props.disabled ? state.sig.off() : state.sig.on();
// };

const save = () => {
  state.sig.removeBlanks();
  create.value.disabled = false;
  create.value.disabled = false;
};

const imgBase64 = ref("");
const clear = () => {
  // state.sig.clear();
  signaturePad.value.clearSignature();
  create.value.disabled = true;
  create.value.disabled = true;
  imgBase64.value = "";
};

const fromDataURL = (url) => {
  state.sig.fromDataURL(url);
};

const isEmpty = () => {
  return state.sig.isEmpty();
};

const undo = () => {
  let data = state.sig.toData();
  if (data) {
    data.pop();
    state.sig.fromData(data);
  }
};

onMounted(() => {
  create.value.disabled = true;
  // make_default.value.disabled = true;
  state.uid = uuidv4();
  // if (state.uid != "") {
  //   setTimeout(() => {
  //     draw();
  //   }, 1000)
  // }
});

defineExpose({
  save,
  clear,
  isEmpty,
  undo,
  fromDataURL,
});

const createDrawSignature = async () => {
  const signatureObj = {
    file: imgBase64.value,
    type: "Signature",
    category: "Draw",
  };

const print = await savePrint(signatureObj);
if (print) {
  clear()
  getUserPrints()
}
    
  // imgBase64.value = "";
  // emit("close", true);
};

const makeDefaultSignature = async (printID) => {
 const defaultPrint = await makeDefaultPrint(printID);
 if (defaultPrint) {
    getDashboard()
 }
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 300px;
}
.canvas {
  background-color: #f9fafb;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

@media screen and (max-width: 991.5px) {
  canvas {
    width: 290px;
    height: 190px;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
