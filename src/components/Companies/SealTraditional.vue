<template>
  <div>
    <div class="row mb-3 my-2">
      <div class="form-group col-12 col-lg-4 mb-1">
        <label for="text_cnv">Company Name:</label>
        <input type="text" class="input form-control" placeholder="Company Name" v-model="text_cnv" size="40"
          maxlength="" />
      </div>
      <div class="form-group col-12 col-lg-4 mb-1">
        <label for="text_cnv">Address:</label>
        <input type="text" class="input form-control" placeholder="Your place, State" v-model="text_cnv2" size="40"
          maxlength="" />
      </div>
      <div class="col-12 col-lg-4 mb-1">
        <label style="padding-right: 32px">RC Number:</label>
        <input type="text" v-model="text_horizontal" class="input form-control" placeholder="RC:12345" />
      </div>
    </div>

    <div class="row">
      <!-- @/assets/images/company-seal-${sealColor}.png -->
      <div class="col-12 d-flex ">
        <div class="position-relative flex-grow-1" style="width: auto" ref="capture">
          <div id="coy_number" :class="sealColor"></div>
          <img class="" width="380" height="380" :src="`/assets/images/company-seal-${sealColor}.png`"
            alt="company seal" />
          <canvas id="canvas" width="300" height="300" 
          style="transform: translate(-48%, -50%);
              position: absolute;
              top: 50%;
              left: 203px;
            "></canvas>
        </div>
        <div class="">
          <button type="button" class="btn btn-primary" @click="captureSeal" :disabled="!isAdopt ">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Adopt</span>
          </button>
        </div>
       
      </div>
      <div class="col-12 ">
        <div class="payment__options d-flex">
          
          <label class="payment__option" for="color-grey">
            <input name="sealColor" v-model="sealColor" value="grey" type="radio" id="color-grey" checked />

            <div class="payment__option-content">
              <div class="parent" :style="`border-color: rgb(152, 152, 152)`">
                <div class="child1" :style="`border-color: rgb(152, 152, 152)`"></div>
              </div>
              <!-- <img
              loading="lazy"
              src="@/assets/company-seal-grey.png"
              alt="seal color"
            /> -->
            </div>
          </label>
          <label class="payment__option" for="color-blue">
            <input name="sealColor" v-model="sealColor" value="blue" type="radio" id="color-blue" />
            <div class="payment__option-content">
              <!-- <img
              loading="lazy"
              src="@/assets/company-seal-blue.png"
              alt="seal color"
            /> -->
              <div class="parent" :style="`border-color: #406dc6`">
                <div class="child1" :style="`border-color: #406dc6`"></div>
              </div>
            </div>
          </label>
          <label class="payment__option" for="color-red">
            <input name="sealColor" v-model="sealColor" value="red" type="radio" id="color-red" />
            <div class="payment__option-content">
              <!-- <img
              loading="lazy"
              src="@/assets/company-seal-red.png"
              alt="seal color"
            /> -->
              <div class="parent" :style="`border-color: rgb(227, 125, 125)`">
                <div class="child1" :style="`border-color: rgb(227, 125, 125)`"></div>
              </div>
            </div>
          </label>

          
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between py-2">
      <small class="text-muted fst-italic">By clicking save, I confirm that all the information
        given is true and I have the authority to create and use
        this seal and it is as valid as all alternate company
        seals to the extent allowed by law.</small>
     
    </div>
    <div class="d-flex justify-content-md-start align-items-center">
      
    </div>
    <div class="d-flex justify-content-end align-items-center">
      
      <div class="preview">
        <img v-if="data?.file" :src="data?.file" class="img-fluid" alt="Seal" />
      </div>
      <!-- <img v-for="seal in companySeals" :key="seal?.id" :src="seal?.file" class="img-fluid m-2" alt="Seal" width="120" -->
      <!-- height="auto" /> -->
      <button type="button" class="btn btn-primary d-block  mt-2" @click="onSaveSignature" :disabled="!data?.file">

        <span v-show="updating == true" class="spinner-border spinner-border-sm"></span>
        <span>save</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import domToImage from "dom-to-image-more";
import { ref, onMounted, watch, computed, onBeforeMount } from "vue";
import ToNote from "@/Services/Tonote";
import NewSeal from './newSeal.vue'
const store = useStore();
const companySeals = computed(() => store?.state?.print?.prints?.CompanySeal[0]);
// const companySeals = computed(() => store?.state?.CompanyModule?.getCompanySeal);
const updating = computed(() => store?.state?.CompanyModule?.updating);
const company = computed(() => store?.state?.CompanyModule?.companyProfile || {});
// const companyProfile = ref("");
// const text_cnv = ref(companyProfile?.value?.company_name);
const text_cnv = ref("");
// const text_cnv2 = ref(companyProfile?.value?.address);
// `RC: ${companyProfile?.value?.registration_company_number}`
const text_cnv2 = ref("");
const text_horizontal = ref("");
const base64Url = ref("");
const capture = ref("");
const data = ref("");
const isAdopt = ref(false);
const loading = ref(false);
const loading_save = ref(false);
const sealColor = ref("grey");

const r = 111;
const space = Math.PI / 12;

const updateCanvas = function (text, x, y, radius, space, top, fontSize) {
  const canvas = document?.getElementById("canvas"),
    ctx = canvas?.getContext("2d");
    if (!text || !text.length) {
      ctx.clearRect(0, top ? 0 : y, 600, y);
  return; // Don't draw anything if text is empty
}
  draw3dText(ctx, "", canvas?.width / 2, 120, 5);
  if(ctx){
    ctx.font = "normal " + fontSize + " arial ";
    ctx.beginPath();
  ctx.arc(160, 150, r, 0, Math.pow(r, 2), false);
  ctx.fillStyle =
    sealColor.value === "grey"
      ? "rgb(152, 152, 152)"
      : sealColor.value === "blue"
        ? "#406dc6"
        : sealColor.value === "red"
          ? "rgb(227, 125, 125)"
          : "";
  // ctx.fillStyle = "#C1353F";
  ctx.closePath();

  ctx.clearRect(0, top ? 0 : y, 600, y);
  space = space || 0;
  const numRadsPerLetter = (Math.PI - space * 2) / text?.length;
  ctx.save();
  ctx.translate(x, y);

  const k = top ? 1 : -1;
  ctx.rotate(-k * ((Math.PI - numRadsPerLetter) / 2 - space));
  for (let i = 0; i < text?.length; i++) {
    ctx.save();
    ctx.rotate(k * i * numRadsPerLetter);
    ctx.textAlign = "left";
    ctx.textBaseline = !top ? "top" : "bottom";
    ctx.backgroundColor = "rgba(255,255,255,0.1)";
    const cText = text[i].split(" ").join(String.fromCharCode(8201));
    ctx.fillText(cText.toUpperCase(), 0, -k * radius);
    ctx.restore();
  }
  base64Url.value = canvas.toDataURL("image/png");
  ctx.restore();
  }
  
  
};

const onSaveSignature = () => {

  loading_save.value = true;

  store.dispatch("CompanyModule/setCompanySeal", data?.value);

  loading_save.value = false;
};

const draw3dText = (context, text, x, y, textDepth) => {
  let n;
  for (n = 0; n < textDepth; n++) {
    context?.fillText(text, x - n, y - n);
  }
  // context.shadowColor = "#000";
  if(context){
    context.shadowBlur = 2;
  context.shadowOffsetX = textDepth + 2;
  context.shadowOffsetY = textDepth + 2;
  context.fillText(text, x - n, y - n);
  }
  
};

const captureSeal = () => {
  loading.value = true;
  domToImage
    .toPng(capture?.value)
    .then((dataUrl) => {
      data.value = {
        file: dataUrl,
        type: "CompanySeal",
        category: "Upload",
        value: "",
      };
      loading.value = false;
    })
    .catch((error) => {
      console.error("oops, something went wrong!", error);
    });
};
watch(company, (newValue, oldValue) => {
  if (newValue) {
    text_cnv.value = newValue.company_name;
    text_cnv2.value = newValue.address;
    text_horizontal.value = `RC: ${newValue.registration_company_number}`

  }
}),
  watch(
    () => [
      text_cnv.value,
      text_cnv2.value,
      text_horizontal.value,
      sealColor.value,

    ],
    ([newCnv, newCnv2, newCoy, newcol], [oldCnv, oldCnv2, oldCoy, oldcol]) => {
      if (
        text_cnv.value != "" &&
        text_cnv2.value != "" &&
        text_horizontal.value != ""
      ) {
        isAdopt.value = true;
      }
      if (newcol != oldcol) {
        updateCanvas(newCnv, 130.5, 144, r, space, 1, "20px");
      }
      if (newcol != oldcol) {
        const coy_number = document?.getElementById("coy_number");
        if(coy_number){
          coy_number.innerText = newCoy;
        }
        
      }
      if (newcol != oldcol) {
        updateCanvas(newCnv2, 130.5, 155, r, space, 0, "1.125em");
      }

      if (newCnv != oldCnv) updateCanvas(newCnv, 130.5, 144, r, space, 1, "20px");

      if (newCnv2 != oldCnv2)
        updateCanvas(newCnv2, 130.5, 155, r, space, 0, "1.125em");

      if (newCoy != oldCoy) {
        const coy_number = document.getElementById("coy_number");
        coy_number.innerText = newCoy;
      }
    }
  );

  onBeforeMount(async () => {
  try {
    const response = await ToNote.get("/company");
    text_cnv.value = response.data.data.company_name;
    text_cnv2.value = response.data.data.address;
    text_horizontal.value = `RC: ${response.data.data.registration_company_number || ''}`;
  } catch (error) {
    // handle error
  }
});

onMounted(() => {
  updateCanvas(text_cnv?.value, 130.5, 144, r, space, 1, "20px");
  updateCanvas(text_cnv2?.value, 130.5, 155, r, space, 0, "1.125em");
  const coy_number = document.getElementById("coy_number");
  if(coy_number) {
    coy_number.innerText = text_horizontal?.value;
  }
  store.dispatch("CompanyModule/listCompanySeals");
});
</script>

<style scoped>
.parent {
  background-color: transparent;
  margin: 5px;
  width: 55px;
  height: 55px;
  position: relative;
  border: 2px solid black;
  border-radius: 50%;
}

.child1 {
  background-color: transparent;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  position: absolute;
  border: 2px solid black;
  border-radius: 50%;
}

#canvas {
  border-radius: 50%;
  letter-spacing: 20px;
}

#coy_number {
  position: absolute;
  top: 168px;
  left: -45px;
  font-weight: normal;
  font-size: 25px;
  font-family: "arial";
  width: 480px;
  text-align: center;
  text-transform: uppercase;
  /* color: blue; */
  /* color: #c1353f; */
  /* text-shadow: 3px 1px 0px #000; */
}

.input {
  text-transform: uppercase;
}

.payment__options {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  /* flex-direction: column; */
  gap: 1rem;
  /* align-items: flex-start; */
  /* 
  justify-content: space-between; */
  justify-content: center;
  align-items: center;
}

.payment__options .payment__option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.payment__options .payment__option {
  cursor: pointer;
  margin-right: 5px;
}

.payment__options .payment__option .payment__option-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 2px solid transparent;
  border-radius: 5px;
  -webkit-transition: -webkit-box-shadow 0.4s;
  transition: -webkit-box-shadow 0.4s;
  -o-transition: box-shadow 0.4s;
  transition: box-shadow 0.4s;
  transition: box-shadow 0.4s, -webkit-box-shadow 0.4s;
  position: relative;
}

.payment__options .payment__option .payment__option-content img {
  /* margin-right: 25px; */
  height: 50px;
  width: 50px;
}

.payment__options .payment__option .payment__option-content:hover {
  -webkit-box-shadow: 0px 3px 5px 0px #e8e8e8;
  box-shadow: 0px 3px 5px 0px #e8e8e8;
}

.payment__options .payment__option input[type="radio"]:checked+.payment__option-content:after {
  content: "";
  position: absolute;
  height: 8px;
  width: 8px;
  background: #003bb3;
  right: 5px;
  top: 5px;
  display: none;
  border-radius: 100%;
  border: 2px solid transparent;
  /* -webkit-box-shadow: 0px 0px 0px 2px #003bb3;
  box-shadow: 0px 0px 0px 2px #003bb3; */
}

.payment__options .payment__option input[type="radio"]:checked+.payment__option-content {
  border: 2px solid #e4e4e4;
  /* background: #eaf1fe; */
  -webkit-transition: ease-in 0.3s;
  -o-transition: ease-in 0.3s;
  transition: ease-in 0.3s;
}

.grey {
  color: rgb(152, 152, 152) !important;
}

.blue {
  color: #406dc6 !important;
}

.red {
  color: rgb(227, 125, 125) !important;
}

.preview {
  /* position: ; */
  top: 180px;
  right: 40px;
  width: 100px;
}
</style>
