<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
  <nav>
    <div class="nav nav-tabs ms-1" id="nav-tab" role="tablist">
      <button
        class="nav-link"
        @click.prevent="setActive('draw')"
        :class="{ ' active': isActive('draw') }"
        href="#draw"
      >
        Draw
      </button>
      <button
        class="nav-link"
        @click.prevent="setActive('select')"
        :class="{ ' active': isActive('select') }"
        href="#select"
      >
        Select
      </button>
       <button
        class="nav-link"
        @click.prevent="setActive('initials')"
        :class="{ ' active': isActive('initials') }"
        href="#initials"
      >
        Initials
      </button>
      <button
        class="nav-link"
        @click.prevent="setActive('upload')"
        :class="{ ' active': isActive('upload') }"
        href="#upload"
      >
        Upload
      </button>
    </div>
  </nav>
  <div class="tab-content px-2" id="nav-tabContent">
    <div
      class="tab-pane fade"
      :class="{ 'active show': isActive('select') }"
      id="select"
    >
      <div class="row align-items-baseline pt-1">
        <div class="col-12 col-md-7 rounded-3 overflow-auto">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th >Signature</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="font in fonts" :key="font + 1">
                <td >
                  <div v-bind:style="{ fontFamily: font, fontSize: '20px', color: '#000', fontWeight: 'bolder' }"
                      :class="font"
                     
                      class="form-check-label flex-grow-1  form-check d-flex align-items-center"
                      :for="font"
                      @click="onCapture(font, 'Signature', 'Type')">
                   
                   <input
                      class="form-check-input flex-shrink-0"
                      type="radio"
                      name="sign"
                      :id="font"
                    />
                    <label
                      v-bind:style="{ fontFamily: font, fontSize: '20px', color: '#000' }"
                      :class="font"
                      :ref="font"
                      class="form-check-label flex-grow-1 flex-grow-1 py-1 px-50"
                      :for="font"
                     
                    >
                     
                      {{ generalData?.first_name }} {{ generalData?.last_name }}
                    </label>
                  </div>
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-12 col-md-5 mt-2 mt-md-0">
          <!-- <button class="btn  bg-primary text-primary  bg-opacity-10 rounded-3 border border-primary">Preview Signature</button> -->
          <div>
            <div class="mt-1">
              
              <img
               class="sign-preview"
                
                  :style="{ width: '100%' }"
                :src="imgSrc?.file || getTyped"
               
              />
               <SkeletonLoader :loading="loadingSignature"/>
              <!-- <img :src="" class="sign-preview "  :style="{width: '100%'}"/> -->
            </div>
          </div>
        </div>
      </div>
    </div>
<div
      class="tab-pane fade"
      :class="{ 'active show': isActive('initials') }"
      id="initials"
    >
      <div class="row align-items-baseline pt-1">
        <div class="col-12 col-md-8 rounded-3">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                
                <th scope="col">Initial</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fontNew in fonts" :key="fontNew + 1" >
                <td >
                  <div v-bind:style="{ fontFamily: fontNew, fontSize: '20px', color: '#000' }"
                      :class="fontNew"
                      class="form-check-label  flex-grow-1 form-check d-flex align-items-center"
                     @click="onCapture(fontNew+'_initials', 'Initial', 'Type')"
                     :for="fontNew+'_initials'"
                      >
                    <input
                      class="form-check-input flex-shrink-0"
                      type="radio"
                      name="initials"
                      :id="fontNew+'_initials'"
                    />
                    <label
                      v-bind:style="{ fontFamily: fontNew, fontSize: '20px', color: '#000' }"
                      :class="fontNew+'initials'"
                      :ref="fontNew+'_initials'"
                      class="form-check-label flex-grow-1 flex-grow-1 py-1 p-50"
                      :for="fontNew+'_initials'"
                      data-type="Initial"
                    >
                    
                      {{ generalData?.initials }}
                    </label>
                  </div>
                </td>
            
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-12 col-md-4 mt-2 mt-md-0">
          <!-- <button class="btn  bg-primary text-primary  bg-opacity-10 rounded-3 border border-primary">Preview Signature</button> -->
          <div>
            <div class="mt-1">
              
              <img
               class="sign-preview"
                :src="imgSrc?.file || getInitials"
                 :style="{ width: '100%' }"
              />
               <SkeletonLoader :loading="loadingSignature"/>
              <!-- <img :src="" class="sign-preview "  :style="{width: '100%'}"/> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      :class="{ 'active show': isActive('draw') }"
      id="draw"
    >
      <div class="w-100">
        <div class="w-100 signature-container container-fluid px-0 pt-1">
          <div class="row align-items-baseline">
            <div class="col-12 col-md-8 rounded-3">
              <div class="d-flex justify-content-between">
                <small class="text-muted fst-italic"
                  >Draw your signature in the toolbox</small
                >
                <a class="label text-danger" @click="clear">Clear Signature</a>
              </div>

              <VueSignaturePad
                id="signature"
                width="100%"
                height="250px"
                ref="signaturePad"
                :options="options"
                class="border-2 border rounded-3"
              ></VueSignaturePad>
            </div>

            <div class="col-12 col-md-4 mt-2 mt-md-0">
              <button
                @click="save"
                class="
                  btn
                  bg-primary
                  text-white
                  bg-opacity-10
                  rounded-3
                  border border-primary
                  px-1
                "
              >
                Generate Signature
              </button>
              <div class="mt-1">
                  <SkeletonLoader :loading="loadingSignature"/>
                <img
                  :src="imgSrc?.file || getDraw"
                  class="sign-preview"
                  :style="{ width: '100%' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="tab-pane fade"
      :class="{ 'active show': isActive('upload') }"
      id="upload"
    >
      <div class="row align-items-baseline pt-1">
        <div class="col-12 col-md-8 rounded-3">
          <div class="file-upload">
            <!-- <button class="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button> -->

            <div class="image-upload-wrap">
              <input
                class="file-upload-input"
                type="file"
                @change="onFileChange"
                accept="image/*"
              />
              <div class="drag-text">
                <h3>Click to add your signature</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-4 mt-2 mt-md-0">
          <!-- <button class="btn  bg-primary text-primary  bg-opacity-10 rounded-3 border border-primary">Preview Signature</button> -->
          <div>
            <div class="mt-1">
               <SkeletonLoader :loading="loadingSignature" />
              <img
                :src="imgSrc?.file || getUpload"
                class="sign-preview"
                :style="{ width: '100%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between py-2">
      <small class="text-muted fst-italic"
        >By clicking create, I agree that all signatures, marks or initials
        created here are as valid as my hand written signature to the extent
        allowed by law.
      </small>
    </div>
    <div class="d-flex justify-content-end py-2">
             <button
                @click="$emit('goPrev', goPrev)"
                id="nextbtn"
                class=" me-3 rounded-circle p-1 btn btn-outline-secondary"
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
      <button  @click="onSaveSignature(imgSrc)" class="btn btn-primary btn-next" :disabled="updating || imgSrc?.length == 0">
        <span v-show="updating"  > Processing...</span>
        <span v-show="!updating" > Save and Continue</span>
       
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import domtoimage from "dom-to-image-more";
import { useToast } from "vue-toast-notification";
import SkeletonLoader from "../SkeletonLoader.vue";
// import VueSignaturePad from 'vue-signature-pad';
const toast = useToast();
export default {
  name: "SignatureLayout",
  components: {
    SkeletonLoader
},
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      activeItem: "draw",
      picked: "One",
      output: null,
      image: "",
      fonts: ["Great Vibes", "Arizonia"],
      options: {
        penColor: "#000",
        onBegin: () => {
          this.$refs.signaturePad.resizeCanvas();
        },
      },
      disabled: false,
      optionsLocal: this.generalData,
      loading: false,
    };
  },
  computed: {
    ...mapState("ProfileModule", [
      "userProfile",
      "signature",
      "updating",
      "loadingSignature",
      "signatures",
      "changeValue",
    ]),
    imgSrc: {
      get() {
        return this.$store?.state?.ProfileModule?.signature;
      },
    },
    getDraw() {
      const print = this.signatures?.Signature?.find(
        (signature) => signature?.category === "Draw"
      )?.file;
      return print;
    },
    getTyped() {
      const print = this.signatures?.Signature?.find(
        (signature) => signature?.category === "Type"
      )?.file;
      return print;
    },
    getUpload() {
      const print = this.signatures?.Signature?.find(
        (signature) => signature?.category === "Upload"
      )?.file;
      return print;
    },
    getInitials(){
      const print = this.signatures?.Initial?.find(
        (signature) => signature?.type === "Initial"
      )?.file;
      return print;
    }
  },
  watch: {
    changeValue: {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        
        if (
          newVal?.data?.data?.Signature?.length > 0 &&
          this.activeItem == "draw"
        ) {
          this.setActive("select");
        } else if (
          newVal?.data?.data?.Signature?.length > 0 &&
          this.activeItem == "select"
        ) {
          this.setActive("initials");
        } else if (
          newVal?.data?.data?.Signature?.length > 0 &&
          this.activeItem == "initials"
        ) {
          console.log(this.activeItem, this.changeValue, "item");
          this.setActive("upload");
        }
         else if (
          newVal?.data?.data?.Signature?.length > 0 &&
          this.activeItem == "upload"
        ) {
          toast.success("Profile setup Completed", {
            position: "top-right",
            duration: 5000,
            closeButton: false,
            progressBar: false,
          });
           this.$router.push("/admin/dashboard");
          setInterval(() => {
            window.location.reload();
          }, 2000);
        }
      },

      deep: true,
    },
  },
  methods: {
    changeValues() {},

    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    getMenu(value) {
      this.setActive(value);
    },
    ...mapMutations("ProfileModule", ["setImage"]),
    ...mapActions("ProfileModule", ["createSign", "userSignature"]),
    onCapture(ref, type, category) {
      const finalRef = ref;
      this.capturing = true;
      const capture = this.$refs[finalRef];
      // capture.style.fontSize="50px";
        domtoimage.toPng(capture)
        .then((dataUrl) => {
         
          this.setImage({ file: dataUrl, type, category });
          this.capturing = false;
        })
        .catch((error) => {
          this.capturing = false;
          console.error("oops, something went wrong!", error);
        });
            // .toBlob(capture[0], {
            //   width: capture[0].clientWidth * scale,
            //    height: capture[0].clientHeight * scale,
            //   style: {
            //     transform: "scale(" + scale + ")",
            //     transformOrigin: "top left",
                
            //   },
            // })
            // .then((blob) => {
            //   var reader = new FileReader();
            //   reader.readAsDataURL(blob);
            //   reader.onloadend = () => {
            //     var base64data = reader.result;
            //     // data.value.push({ file: base64data, type: type, category: 'Type' })                
            //       this.setImage({ file: base64data, type, category });
            //      this.capturing = false;
            //   };
            // })
            // .catch(function (error) {
            //   console.error("oops, something went wrong!", error);
            // });
    },

    onSaveSignature(data) {
      this.loading = "true";
      let signData = {
        file: data.file,
        type: data?.type,
        category: data?.category,
      };
      if (signData) {
        this.userSignature(signData);
      }
    },

    clear() {
      this.$refs.signaturePad.clearSignature();
    },
    save() {
      // eslint-disable-next-line no-unused-vars
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.setImage({ file: data, type: "Signature", category: "Draw" });
    },
    onFileChange(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = (e) => {
        let image = e.target.result;
        this.setImage({ file: image, type: "Signature", category: "Upload" });
      };
    },
    removeUpload() {
      this.setImage("");
    },
  },

  mounted() {
    this.changeValues();
  },
};
</script>

<style scoped>
@import "../../../public/app-assets/fonts/signature-font-face.css";
.signature-container {
  border-radius: 5px;
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 8px;
  padding: 10px;
  font-size: 16px;
  color: black;
}

.buttons a:hover {
  cursor: pointer;
  text-decoration: underline;
}

.file-upload {
  background-color: #ffffff;
  width: 100%;
  margin: 0 auto;
}

.file-upload-input {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  cursor: pointer;
}

.image-upload-wrap {
  /* margin-top: 20px; */
  border: 2px dashed #cacaca;
  position: relative;
}

.drag-text {
  text-align: center;
}

.drag-text h3 {
  font-weight: 400;
  text-transform: uppercase;
  color: #cacaca;
  padding: 60px 0;
}

.sign-preview {
  
  min-width:200px;
  margin: auto;
}
</style>
