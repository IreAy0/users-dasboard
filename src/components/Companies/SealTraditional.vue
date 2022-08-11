<template>
  <div>
    <div class="row mb-3 my-2">
      <div class="form-group col-12 col-lg-4 mb-1">
        <label for="text_cnv">Company Name:</label>
        <input
          type="text"
          class="input form-control"
          placeholder="Company Name"
          v-model="text_cnv"
          size="40"
          maxlength=""
        />
      </div>
      <div class="form-group col-12 col-lg-4 mb-1">
        <label for="text_cnv">Address:</label>
        <input
          type="text"
          class="input form-control"
          placeholder="Your place, State"
          v-model="text_cnv2"
          size="40"
          maxlength=""
        />
      </div>
      <div class="col-12 col-lg-4 mb-1">
        <label style="padding-right: 32px">RC Number:</label>
        <input
          type="text"
          v-model="text_horizontal"
          class="input form-control"
          placeholder="RC:12345"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-9">
        <div class="position-relative" style="width: auto" ref="capture">
          <div id="coy_number" :class="sealColor"></div>
          <img
          class=""
            width="380"
            height="380"
            :src="`../assets/images/company-seal-${sealColor}.png`"
            alt="company seal"
          />
          <canvas
            id="canvas"
            width="300"
            height="300"
            style="
              transform: translate(-48%, -50%);
              position: absolute;
              top: 50%;
              left: 203px;
            "
          ></canvas>
        </div>
      </div>
      <div class="col-12 col-lg-3">
        <div class="payment__options">
          <button
            type="button"
            class="btn btn-primary"
            @click="captureSeal"
            :disabled="!isAdopt"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Adopt</span>
          </button>
          <label class="payment__option" for="color-grey">
            <input
              name="sealColor"
              v-model="sealColor"
              value="grey"
              type="radio"
              id="color-grey"
              checked
            />

            <div class="payment__option-content">
              <div class="parent" :style="`border-color: rgb(152, 152, 152)`">
                <div
                  class="child1"
                  :style="`border-color: rgb(152, 152, 152)`"
                ></div>
              </div>
              <!-- <img
              loading="lazy"
              src="@/assets/company-seal-grey.png"
              alt="seal color"
            /> -->
            </div>
          </label>
          <label class="payment__option" for="color-blue">
            <input
              name="sealColor"
              v-model="sealColor"
              value="blue"
              type="radio"
              id="color-blue"
            />
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
            <input
              name="sealColor"
              v-model="sealColor"
              value="red"
              type="radio"
              id="color-red"
            />
            <div class="payment__option-content">
              <!-- <img
              loading="lazy"
              src="@/assets/company-seal-red.png"
              alt="seal color"
            /> -->
              <div class="parent" :style="`border-color: rgb(227, 125, 125)`">
                <div
                  class="child1"
                  :style="`border-color: rgb(227, 125, 125)`"
                ></div>
              </div>
            </div>
          </label>

          <div class="preview">
            <img
              v-if="data.file"
              :src="data.file"
              class="img-fluid"
              alt="Seal"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-md-start align-items-center">
      <img
        v-for="seal in companySeals"
        :key="seal.id"
        :src="seal.file"
        class="img-fluid m-2"
        alt="Seal"
        width="120"
        height="auto"
      />
    </div>
    <div class="d-flex justify-content-end align-items-center">
       <button
                   @click="$emit('goToStep', goToStep)"
                  id="prev"
                  class="mt-1 me-3 rounded-circle p-1 btn btn-outline-secondary"
                >
                  <span class="align-middle d-inline-block">
                    <svg
                      width="17"
                      height="15"
                      viewBox="0 0 17 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
                        fill="#A1A0A0"
                      />
                    </svg>
                  </span>
                </button>
      <button
        type="button"
        class="btn btn-primary d-block  mt-2"
        @click="onSaveSignature"
        :disabled="!isAdopt"
      >
        <span
          v-show="loading_save"
          class="spinner-border spinner-border-sm"
        ></span>
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
// import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
// const { useActions } = createNamespacedHelpers(["print"]);
// const { savePrint } = useActions(["savePrint"]);
const store = useStore();
const companySeals = computed(() => store.state.CompanyModule.companySeal);
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
  const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

  draw3dText(ctx, "", canvas.width / 2, 120, 5);
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
  const numRadsPerLetter = (Math.PI - space * 2) / text.length;
  ctx.save();
  ctx.translate(x, y);

  const k = top ? 1 : -1;
  ctx.rotate(-k * ((Math.PI - numRadsPerLetter) / 2 - space));

  for (let i = 0; i < text.length; i++) {
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
};

const onSaveSignature = () => {
  loading_save.value = true;
  store.dispatch("CompanyModule/setCompanySeal", data.value);
  loading_save.value = false;
};

const draw3dText = (context, text, x, y, textDepth) => {
  let n;
  for (n = 0; n < textDepth; n++) {
    context.fillText(text, x - n, y - n);
  }
  // context.shadowColor = "#000";
  context.shadowBlur = 2;
  context.shadowOffsetX = textDepth + 2;
  context.shadowOffsetY = textDepth + 2;
  context.fillText(text, x - n, y - n);
};

const captureSeal = () => {
  loading.value = true;
  domToImage
    .toPng(capture.value)
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
      const coy_number = document.getElementById("coy_number");
      coy_number.innerText = newCoy;
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

onBeforeMount(() => {
  ToNote.get("/company")
    .then((res) => {
      text_cnv.value = res.data.data.company_name;
      text_cnv2.value = res.data.data.address;
      text_horizontal.value = `RC: ${res.data.data.registration_company_number}`;
    })
    .catch((err) => {
      console.log(err);
    });
});

onMounted(() => {
  updateCanvas(text_cnv.value, 130.5, 144, r, space, 1, "20px");
  updateCanvas(text_cnv2.value, 130.5, 155, r, space, 0, "1.125em");
  const coy_number = document.getElementById("coy_number");
  coy_number.innerText = text_horizontal.value;
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

.payment__options
  .payment__option
  input[type="radio"]:checked
  + .payment__option-content:after {
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

.payment__options
  .payment__option
  input[type="radio"]:checked
  + .payment__option-content {
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
