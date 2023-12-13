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

    <div class="position-relative d-flex">
      <div class="pe-2 pb-1 col-8 ps-0" ref="capture">
        <div class="mx-auto d-flex align-items-center justify-content-center  my-2 border-black border-5 p-2">
          <div class=" border-black p-2 ">
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
      <div class=" border-1 border p-2 rounded-3 d-flex align-items-center  my-1" >
        <img class="w-100"  :src="companyStamps.file" alt="company stamp" />
      </div>
    </div>

   
  </div>
  <div class="d-flex justify-content-between py-2">
    <small class="text-muted fst-italic">By clicking save, I confirm that all the information
      given is true and I have the authority to create and use
      this seal and it is as valid as all alternate company
      seals to the extent allowed by law.</small>
   
  </div>
  <div class="d-flex justify-content-end align-items-center">
    
    <button type="button" class="btn  btn-primary d-block  mt-2" :disabled="
      loading ||
      props.getActiveUser()?.permission !== 'Admin' ||
      getActiveUser()?.isOwner !== true"
      @click="captureStamp">
      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
      <span>Save</span>
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
// ...mapState('print', ['prints']),
const companyStamps = computed(() => store?.state?.print?.prints?.CompanyStamp[0]);
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
        name.value = res?.data?.data?.company_name;
        address.value = res?.data?.data?.address;
        phone.value = res?.data?.data?.phone;
        email.value = res?.data?.data?.email;
      })
      .catch((err) => {
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
