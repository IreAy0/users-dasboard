<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-7">
            <div class="d-flex gap-2 mb-2 align-item-center">
              <a @click="goBack()" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg></a>
              <h4>Title: {{ userDocument.title }} </h4>
              <!-- <div class="">
                <button class="btn btn-sm btn-warning" @click="replaceModal">
                  <Icon icon="akar-icons:edit" /> Replace Document
                </button>
              </div> -->
            </div>
            
            <div v-if="userDocument?.documentUploads?.find((item ) => item?.status == 'Completed' || item?.status == 'Processing' )">
              <div class="position-relative border">
                <VuePdfEmbed
                :key="files?.id"
                :source="files?.file_url"
                @loaded="handleDocumentRender"
              />              
            </div>
             
            </div>
            <div v-else >
              <PreLoader />
            </div>
            <!-- <div v-for="(doc, index) in userDocument?.documentUploads?.find((item ) => item?.status == 'Completed')" :key="index" class="position-relative border">
              <RenderPage :file="doc?.file_url" @click="$emit('docId', doc?.id)" @documentHeight="getHeight" />
            </div> -->
          </div>
          <div class="col-lg-5">
            <div class="card">
              <div class="card-body">
                <div class="d-flex gap-1 mb-2 ">
                  <div >
                    <button class="btn btn-sm py-1 btn-primary"  @click="exportHTMLToPDF"
                    :disabled="isDownload ">
                    <template v-if="isDownload">
                      <span class="spinner-border spinner-border-sm"></span>
                      Downloading
                    </template>
                    <template v-else>
                      <Icon icon="uil:file-download-alt" />
                      Download Document
                    </template>
                    </button>
                  </div>
                  <div>
                    <button  class="btn btn-sm btn-primary py-1 " @click="$event => shareDocumentModal()">
                      <Icon icon="carbon:share" /> Share Document
                    </button>
                  </div>
                 
                </div>
                
              </div>
            </div>
          </div>

          <ModalComp :show="openModal" :size="'modal-lg'" :footer="true" @close="openModal = false">
            <template #header>
              <h5 class="modal-title">Replace Document</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <DropZone />
            </template>

            <template #footer>
              <button type="button" class="btn btn-primary" @click="questionModal = false">
                Repalce
              </button>
            </template>
          </ModalComp>
          <ModalComp :show="openPaymentModal" :size="'modal-md'" :footer="true" @close="openPaymentModal = false">
            <template #header>
              <h5 class="modal-title">Make Outstanding payment</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <div data-aos="zoom-in">
                <div data-aos="zoom-in" class="d-flex justify-content-end">
                  <div class="shadow-lg text-center p-2 price__display">
                    <span>Transaction cost</span>
                    <p class="h3 text-primary fw-bolder my-0 py-0">
                      &#8358; {{ userDocument?.outstanding_amount }}
                    </p>
                    <!-- <span class="small">per document</span> -->
                  </div>
                </div>
                <p class="h5 fw-bold my-2">Select payment option</p>
        
                <div class="payment__options gap-2">
                  <label
                    v-for="payment_gateway in paymentGateways"
                    :key="payment_gateway.id"
                    class="payment__option"
                    :for="payment_gateway.gateway.name"
                  >
                    <input
                      name="payment_gateway"
                      v-model="selectedPayment_gateway"
                      :value="payment_gateway.gateway"
                      type="radio"
                      :id="payment_gateway.gateway.name"
                    />
                    <div class="payment__option-content">
                      <img
                        loading="lazy"
                        :src="payment_gateway.gateway.file"
                        :alt="payment_gateway.gateway.name"
                      />
                      <div class="payment__option-details">
                        <span> {{ payment_gateway.gateway.name }}</span>
                      </div>
                    </div>
                  </label>
                </div>
        
                <div class="modal-footer d-flex justify-content-end mt-3">
                  <button
                    @click="Payment_flutterwave"
                    v-if="selectedPayment_gateway.name === 'Flutterwave'"
                    class="btn btn-primary"
                  >
                    Pay Now
                  </button>
                  <!-- <flutterwave-pay-button
                  v-if="selectedPayment_gateway === 'Flutterwave'"
                  :tx_ref="reference"
                  :amount="8000"
                  currency="NGN"
                  payment_options="card,ussd"
                  redirect_url=""
                  class="btn btn-primary"
                  :meta="{ customer_id: userProfile.id, customer_mac: userProfile.id }"
                  :customer="{
                    name: userProfile.first_name + ' ' + userProfile.last_name,
                    email: userProfile.email,
                    phone_number: userProfile.phone,
                  }"
                  :callback="SuccessfulPaymentCallback"
                  :onclose="close"
                >
                
                </flutterwave-pay-button> -->
        <!-- {{ userDocument?.outstanding_amount * 100 }} -->
        <!-- {{ selectedPayment_gateway }} -->
                  <paystack
                    buttonClass="btn btn-primary"
                    buttonText="Pay Now"
                    :publicKey="payStackKey"
                    :email="userProfile.email"
                    :amount="userDocument?.outstanding_amount * 100"
                    :reference="reference"
                    :onSuccess="SuccessfulPaymentCallback"
                    :onCanel="close"
                    v-if="selectedPayment_gateway.name === 'Paystack'"
                    @click="$emit('close')"
                  >
                  </paystack>
                </div>
              </div>
            </template>

            <!-- <template #footer>
              <button type="button" class="btn btn-primary" @click="questionModal = false">
                Repalce
              </button>
            </template> -->
          </ModalComp>
          <ModalComp style="zindex-4" class="zindex-4 " :show="openAddParticipantModal" :size="'modal-lg'" :footer="false"
            @close="openAddParticipantModal = false">
            <template #header>
              <h5 class="modal-title">Add Participants</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <AddSigner />
            </template>
          </ModalComp>

          <ModalComp :show="removeParticipantModal" :size="'modal-sm'" @close="removeParticipantModal = false">
            <template #header>
              <h4 class="text-danger mb-0">
                <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" />
                Alert
              </h4>
            </template>
            <template #body>
              <h5 class="modal-title text-center">
                Are you sure you want to remove this Participant?
              </h5>
            </template>
            <template #footer>
              <div class="d-flex justify-content-end align-items-center">
                <button class="btn btn-sm btn-outline-danger" @click="deleteParticipant">
                  Yes Remove
                </button>
              </div>
            </template>
          </ModalComp>

          <ModalComp :show="shareModal.open" :footer="false" :size="'modal-sm'" @close="shareModal.open = false">
            <template #header>
              <h4 class="text-primary mb-0">
                <!-- <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" /> -->
                Share with others
              </h4>
            </template>
      
            <template #body>
              <p class="text-center">
                This document will be shared with the following people.
              </p>
              <!-- <p class="text-center my-2">Are you sure you want to cancel this Document?</p> -->
              <MailToParticipant @close="shareModal.open = false" :id="userDocument.id" :isLoading="loading" />
              <!-- <input type="email" class="form-control" id="email" placeholder="Please Enter email"
              :style="error_message.email && 'border: 1px solid red'"  v-model="email"
              @change="error_message.email = null" /> -->
            </template>
      
            <template #footer>
              <button class="btn btn-sm btn-secondary" @click="deleteLockerDocument(false)">
                cancel
              </button>
              <button :disabled="loading" class="btn btn-sm btn-primary" @click="shareLockerDocument(true)">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                Share
              </button>
            </template>
          </ModalComp>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted , computed} from "vue";
import { useRoute } from 'vue-router'
import paystack from "vue3-paystack";
import { useFlutterwave } from "flutterwave-vue3";
import { useGetters, useActions } from "vuex-composition-helpers/dist";
import RenderPage from "@/components/Documents/Edit/Main/RenderPage";
import DropZone from "@/components/DropZone";
import AddSigner from "@/components/Documents/Edit/Left/AddSigner";
import { saveAs } from "file-saver";
import PreLoader from "@/components/PreLoader.vue";
import VuePdfEmbed from "vue-pdf-embed";
import ToNote from "@/Services/Tonote";
import { useStore } from "vuex";

import { useToast } from "vue-toast-notification";
import MailToParticipant from '@/components/Locker/MailToParticipant'

import { Icon } from "@iconify/vue";
import ModalComp from "@/components/ModalComp.vue";
import { platformInitiated, randomId } from "@/Services/helpers";

const { userDocument } = useGetters({
  userDocument: "document/userDocument",
});
const store = useStore()
const toast = useToast();

const { removeParticipant, getUserDocument } = useActions({
  removeParticipant: "document/removeParticipant",
  getUserDocument: "document/getUserDocument",

  //   editParticipant: "document/editParticipant",
});

const route = useRoute()
const $toast = useToast();
const payStackKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_STAGING : process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE
const flutterwaveKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_STAGING : process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE
const redirect_url = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_BASE_URL_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_BASE_URL_STAGING : process.env.VUE_APP_BASE_URL_LIVE

const selectedPayment_gateway = ref("");
const openModal = ref(false);
const openPaymentModal = ref(false)
const shareModal = ref({open: false, id: ''});
const document_id= ref("")
const isDownload = ref(false);
const openAddParticipantModal = ref(false);
const removeParticipantModal = ref(false);
const participantId = ref("");
const loading = ref(false)
const sessionId = ref("");
const email = ref("");

const replaceModal = () => {
  openModal.value = true;
};
const paymentGateways = computed(
  () => store.state.AffidavitModule.paymentGateways
);
const userProfile = computed(() => store.state.ProfileModule.userProfile)

const amount_paystack = computed(() => {
  return Number(userDocument?.outstanding_amount) * 100;
});

const handleDocumentRender = (e) => {
  console.log("ob", e);
};

const addParticipantModal = () => {
  openAddParticipantModal.value = true;
};
const goBack = () =>{
 return window.history.back()
}
const getDocument = (params) => {
  getUserDocument(params.id);
};

const reference = computed(() => {
  return userDocument.value.id + randomId(5);
});

const shareDocumentModal = (id) => {
  // document_id.value = id;
  shareModal.value.open = true;
  shareModal.value.id = userDocument.id
};


const SuccessfulPaymentCallback = (response) => {
  return ToNote.post(`/transactions`,
        {
          transactionable_type: "ScheduleSession",
          transactionable_id: userDocument.value.id,
          parent_id: userDocument.value.id,
          platform_initiated: platformInitiated(),
          actor_type: !userProfile.value.is_business ? "User" : "Team",
        }
      
      )
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          if (res.status == 200) {
            window.location.href = '/admin/settings?tab=team'
          store.dispatch("ProfileModule/getUser");
          // paymentConfirmation.value = true;
          $toast.success("Payment Successful", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
          store.dispatch("TeamsModule/getSubcriptions")
          store.dispatch("TeamsModule/getTeams")
          store.dispatch("ProfileModule/getTransactions")
          // getSingleSubscription({})
          // addTeamMembers([])
          // allMembers.value = []
          
          // if (payment_gateway?.value?.name === "Paystack") {
          //     loadingModal.value = false
          // }
          // if(payment_gateway?.value?.name === 'Flutterwave'){
          //   window.location.href = redirect_url+ '/admin/payment-confirmation'
          // }
          }
        })
        .catch((err) => {
          console.log('err', err)
          $toast.error("An error occurred", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         return err
        });
      
}

const getPaymentGateways = () => {
  openPaymentModal.value = true
  store.dispatch("AffidavitModule/ALL_PAYMENTGATEWAYS");
  store.dispatch()
}

const remove = (params) => {
  removeParticipantModal.value = true;
  participantId.value = params;
};

const shareLockerDocument = (params) => {
  if (params) {
    
    let formData = { id: sessionId.value};
    let documents = [
      {
      "document_id": userDocument.id,
      "email": email.value
      }
    ]
    loading.value = true;
    ToNote.put(`/document-share/${userDocument.id}`, {documents} )
      .then(res => {
        shareModal.value = false;
        loading.value = false;
        $toast.success("shared successfully", {
        timeout: 5000,
        position: "top-right",
      });
      }).catch(err => {
        shareModal.value = false;
        loading.value = false;
        $toast.error(err.message, {
        timeout: 5000,
        position: "top-right",
      });
      })

    
  } else {
    shareModal.value = false;
  }
};

const files = computed(() => {
  return userDocument?.value?.documentUploads?.find((item) => {
    return (item.status == "Completed" || item.status == 'Sent') ;
  });
});

const exportHTMLToPDF = async () => {
  let url = files?.value?.file_url;
  let fileName = userDocument.value.title;
  const res = await fetch(url);
  const blob = await res.blob();
  saveAs(blob, fileName);
};

const deleteParticipant = () => {
  removeParticipant(participantId.value);
  removeParticipantModal.value = false;
};
const close = () => {
  toast.error("You have cancelled your payment");
};
onMounted(() => {
  getDocument({
  id: route?.params?.doc_id,
})
});
</script>
<style scoped>
.price__display {
  border-radius: 5px;
  border: 1px solid #003bb3;
}

.payment__options {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.payment__options .payment__option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.payment__options .payment__option {
  cursor: pointer;
  /* width: 48.5%; */
}

.payment__options .payment__option .payment__option-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 2px solid #f3f3f3;
  border-radius: 6px;
  -webkit-transition: -webkit-box-shadow 0.4s;
  transition: -webkit-box-shadow 0.4s;
  -o-transition: box-shadow 0.4s;
  transition: box-shadow 0.4s;
  transition: box-shadow 0.4s, -webkit-box-shadow 0.4s;
  position: relative;
}

.payment__options .payment__option .payment__option-content img {
  margin-right: 25px;
  height: 35px;
  width: 35px;
}

.payment__options .payment__option .payment__option-details span {
  display: block;
  font-size: 1rem;
  line-height: 24px;
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
  border-radius: 100%;
  border: 3px solid #fff;
  -webkit-box-shadow: 0px 0px 0px 2px #003bb3;
  box-shadow: 0px 0px 0px 2px #003bb3;
}

.payment__options
  .payment__option
  input[type="radio"]:checked
  + .payment__option-content {
  border: 2px solid #003bb3;
  background: #eaf1fe;
  -webkit-transition: ease-in 0.3s;
  -o-transition: ease-in 0.3s;
  transition: ease-in 0.3s;
}

.confimation__logo {
  height: 120px;
  width: 120px;
}
</style>