<template>
  <div class="row">
    <div class="form-group col-12 col-lg-6 mb-1">
      <label for="text_canvas">Company Name:</label>
      <input :disabled="
        props.getActiveUser()?.permission !== 'Admin' ||
        getActiveUser()?.isOwner !== true
      " type="text" class="input form-control" placeholder="Company Name" v-model="name" size="40" maxlength="" />
    </div>
    <div class="form-group col-12 col-lg-6 mb-1">
      <label for="text_canvas2">Address:</label>
      <input :disabled="
        props.getActiveUser()?.permission !== 'Admin' ||
        getActiveUser()?.isOwner !== true
      " type="text" class="input form-control" placeholder="Your place, State" v-model="address" size="40"
        maxlength="" />
    </div>
    <div class="form-group col-12 col-lg-6 mb-1">
      <label for="text_canvas2">Email:</label>
      <input :disabled="
        props.getActiveUser()?.permission !== 'Admin' ||
        getActiveUser()?.isOwner !== true
      " type="text" class="input form-control" placeholder="Email" v-model="email" maxlength="" />
    </div>
    <div class="form-group col-12 col-lg-6 mb-1">
      <label for="text_canvas2">Phone Number:</label>
      <input :disabled="
        props.getActiveUser()?.permission !== 'Admin' ||
        getActiveUser()?.isOwner !== true
      " type="text" class="input form-control" placeholder="Phone Number" v-model="phone" size="11" maxlength="11" />
    </div>
    <div class="divider"></div>

    <div class="position-relative">
      <div class="px-2 pb-1" ref="capture">
        <div class="mx-auto my-2 bordered">
          <div>
            <h4 class="text-center text-dark mb-50" style="font-weight: 700">
              {{ name }}
            </h4>
            <h5 class="text-center text-dark mb-50" style="font-weight: 700">
              {{ address }}
            </h5>

            <h5 class="text-center text-dark mb-50" style="font-weight: 700">
              Tel : {{ phone }}
            </h5>
            <h5 class="text-center text-dark mb-50" style="font-weight: 700">
              Email : {{ email }}
            </h5>
          </div>
        </div>
      </div>
      <!-- <div class="preview"><img :src="data.file" class="img-fluid" alt="Seal" /></div> -->
    </div>

    <div class="my-1">
      <img class="w-100" v-for="stamp in companyStamps" :key="stamp.id" :src="stamp.file" alt="company stamp" />
    </div>
  </div>
  <div class="d-flex justify-content-end align-items-center">
    <button @click="$emit('goToStep', goToStep)" id="prev"
      class="mt-1 me-3 rounded-circle p-1 btn btn-outline-secondary">
      <span class="align-middle d-inline-block">
        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.9998 7.26542C16.9998 7.53064 16.8945 7.785 16.7069 7.97253C16.5194 8.16007 16.2651 8.26542 15.9998 8.26542H4.41383L8.70783 12.5574C8.80081 12.6504 8.87456 12.7608 8.92488 12.8823C8.9752 13.0037 9.0011 13.1339 9.0011 13.2654C9.0011 13.3969 8.9752 13.5271 8.92488 13.6486C8.87456 13.7701 8.80081 13.8804 8.70783 13.9734C8.61486 14.0664 8.50448 14.1402 8.383 14.1905C8.26152 14.2408 8.13132 14.2667 7.99983 14.2667C7.86835 14.2667 7.73815 14.2408 7.61667 14.1905C7.49519 14.1402 7.38481 14.0664 7.29183 13.9734L1.29183 7.97342C1.19871 7.88053 1.12482 7.77018 1.07441 7.64869C1.024 7.5272 0.998047 7.39696 0.998047 7.26542C0.998047 7.13389 1.024 7.00365 1.07441 6.88216C1.12482 6.76067 1.19871 6.65031 1.29183 6.55742L7.29183 0.557424C7.47961 0.36965 7.73428 0.26416 7.99983 0.26416C8.26539 0.26416 8.52006 0.36965 8.70783 0.557424C8.89561 0.745197 9.0011 0.999872 9.0011 1.26542C9.0011 1.53098 8.89561 1.78565 8.70783 1.97342L4.41383 6.26542H15.9998C16.2651 6.26542 16.5194 6.37078 16.7069 6.55832C16.8945 6.74585 16.9998 7.00021 16.9998 7.26542Z"
            fill="#A1A0A0" />
        </svg>
      </span>
    </button>
    <button type="button" class="btn  btn-primary d-block  mt-2" :disabled="
      loading ||
      props.getActiveUser()?.permission !== 'Admin' ||
      getActiveUser()?.isOwner !== true
    " @click="captureStamp">
      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
      <span>Create</span>
    </button>
  </div>

</template>

<script setup>
import ToNote from "@/Services/Tonote";
import domToImage from "dom-to-image-more";
import {
  ref,
  defineEmits,
  onMounted,
  computed,
  defineProps,
  onBeforeMount,
  watch,
} from "vue";
import { useStore } from "vuex";

// import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
// const { useActions } = createNamespacedHelpers(["print"]);
// const { savePrint } = useActions(["savePrint"]);

const store = useStore();
const loading = ref(false);
const capture = ref("");
const name = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const data = ref("");
const companyStamps = computed(() => store.state.CompanyModule.getCompanyStamp);
const company = computed(() => store?.state?.CompanyModule?.companyProfile || {});
const props = defineProps(["getActiveUser"]);
const emit = defineEmits(["close"]);
const captureStamp = () => {
  loading.value = true;

  domToImage
    .toPng(capture.value)
    .then((dataUrl) => {
      data.value = { file: dataUrl, type: "CompanyStamp", category: "Upload" };
      // savePrint(data.value)
      store.dispatch("CompanyModule/postCompanyStamp", data.value);
      setTimeout(() => {
        loading.value = false;
        emit("close", true);
      }, 500);
    })
    .catch((error) => {
      console.error("something went wrong!", error);
    });
};

onMounted(() => {
  store.dispatch("CompanyModule/listCompanyStamps");
});

watch(company, (newValue, oldValue) => {
  if (newValue) {
    // console.log(newValue, 'watch', oldValue);
    name.value = newValue.company_name;
    address.value = newValue.address;
    phone.value = newValue.phone;
    email.value = newValue.email;
    // text_horizontal.value = `RC: ${newValue.registration_company_number}` 

  }
}),

  onBeforeMount(() => {
    ToNote.get("/company")
      .then((res) => {
        name.value = res.data.data.company_name;
        address.value = res.data.data.address;
        phone.value = res.data.data.phone;
        email.value = res.data.data.email;
      })
      .catch((err) => {
        console.log(err);
      });
  });

// const emit = defineEmits(['selectedStamp'])
// const uploadSeal = () => {
//   const uploadFile = {
//     append_print_id: printId.value,
//     tool_class: toolClass.value,
//   };

//   emit('selectedStamp', uploadFile)

//   loading.value = true
//   setTimeout(() => {
//     loading.value = false
//   }, 500);
// };
</script>

<style scoped>
.bordered {
  display: grid;
  align-items: center;
  border: 2px dashed #000;
  border-radius: 10px;
  min-height: 180px;
}

.preview {
  position: absolute;
  top: 150px;
  right: 30px;
  width: 200px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
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
