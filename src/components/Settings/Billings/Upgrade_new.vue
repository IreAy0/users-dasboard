<template>
  <div>
    <p style="cursor: pointer" @click="goBack()" class="text-primary">
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L3 7L8 2L7 0L0 7L7 14L8 12Z" fill="#003BB3"/>
        </svg>        
      Back </p>
    <!-- {{ active_team.users }} -->
    <!-- {{ current_plan }} -->
    <div class="d-flex pt-2 justify-content-between align-items-center">
      <h4 class="font-weight-bold text-black">
          Indicate the number of team members you want on your plan     
      </h4>
      <!-- <p :disabled="number_of_users <= 1" @click="addParticipantModal" class="d-inline-flex text-primary align-items-center"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="#003BB3"/>
        </svg>
       <span class="font-weight-bold ml-1 ">Add team member</span> </p> -->
    </div>
   
    <!-- <p class="pb-1 font-weight-bold">You are about to upgrade to the {{current_plan?.name}} plan, invite the team members <br /> and proceed to payment</p> -->
    <div class="px-1">
      <div class="row">
        <!-- <div class="col-md-8">
          <div>
            <b-table  class="owner-table text-primary mb-0" :fields="owner_fields" borderless :items="owner" responsive="sm" >
              <template #cell(email)="data">
                <p class="font-weight-bold mb-0">{{data?.value}}</p>
              </template>
              <template #cell(amount)>
                <p class="font-weight-bold mb-0">₦{{ current_plan.amount?.toLocaleString() }}</p>
              </template>
              <template #cell(permission)="data">
                <p class="font-weight-bold mb-0">{{data?.item.isOwner == true ? 'Owner' : data?.item?.permission}}</p>
              </template>
            </b-table>
            <b-table class="members-table" show-empty :items="allMembers" :fields="fields" responsive="sm" >
              <template #empty>
                <h4 class="text-center p-2">No Team Member</h4>
              </template>
              <template #cell(cost) >
                <h5>₦{{ current_plan.amount?.toLocaleString() }}</h5>
              </template>

              <template #cell(action)="data">
                <div>
                  <b-button type="button" @click="removeItem(data.index)" variant="outline-danger btn-sm mb-0">Remove</b-button>
                </div>
              </template>
            </b-table>
          </div>
        </div> -->
        <div class="col-md-6  p-2">
          <div class="border d-lg-flex align-items-end gap-2 text-center p-2 rounded-3">
            <div class="d-lg-flex  flex-column ">
              <p class="mb-0">Team Members</p>
              <div class="w-100 pt-50">
                <div class="border-3 d-flex rounded-3 border border-secondary-subtle" style="width: 150px;margin: auto;">
                  <input type="number" v-model="number_of_users" name="num" min="1" max="" style='width:100%'  class=" h2 border-0 mb-0 text-center" aria-label="number of users">
                  <div class="d-flex flex-column py-50">
                    <button :disabled="current_plan.name == 'Pro' && number_of_users == 10" type="button" style="cursor: pointer" @click="handleIncrease" class="px-2 h4 border-0 mb-0 fs-3 p-0 bg-transparent text-primary"><Icon icon="material-symbols:add" width="24" /></button>
                    <button type="button" style="cursor: pointer" @click="handleDecrease" class="px-2 h4 border-0 mb-0 fs-3 p-0 bg-transparent text-primary"><Icon icon="ic:baseline-minus" width="24" /></button>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="mx-auto ">
              <p class="mb-0">Total due</p>
              <h2 class="font-weight-bold text-black">{{totalAmount?.toLocaleString()}}</h2>
            </div>

          </div>
        </div>
      </div>
      <div class="d-flex pe-3 justify-content-between align-items-center ">
          <div class="ml-auto">
            <!-- :disabled="allMembers.length > number_of_users || number_of_users <= 1 " -->
            <button  @click="handleRegisterSubcription" class="rounded btn btn-primary">
              <span class="align-middle d-inline-block">Proceed to Pay</span>
            </button>
          </div>
        
      </div>
    </div>
  </div>
  <!-- @click="openAddUserModal()" -->
  <ModalComp :show="openAddParticipantModal" :size="'modal-md'" :footer="false"
  @close="openAddParticipantModal = false">
  <template #header>
    <h5 class="modal-title">Add Team Members</h5>
  </template>

  <template #body>
    <AddTeamMembers @close="openAddParticipantModal = false"/>
  </template>
</ModalComp>

  <ModalComp :closeBtn="true" :show="paymentModal" :size="'modal-md'" @close="paymentModal = false">
    <template #header>
      <h4 class=" mb-0">
        <!-- <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" /> -->
        Upgrade Plan
      </h4>
    </template>

    <template #body>
      <div class="p-2">
        <p class="font-weight-bold">You are about to unlock more collaborative features by upgrading your plan to the {{current_plan.name}} Plan</p>

        <b-col cols="12" class="border border-secondary rounded-3 p-2 mt-2">
          <div class="row">
            <div class="col-5 p-2">
              <div>
                <p>Team Members</p>
              <h2 class="w-100 h2 text-black font-weight-bold ">
                {{  number_of_users }}
              </h2>
              </div>
             
            </div>
            <div class=" col-1">
              <div style="width:2px; height:100%" class="border"/>
              </div>

            <!-- <hr /> -->
            <div class="col-5 p-2">
              
              <div>
                <p>Total due</p>
                <h2 class="font-weight-bold text-black"> ₦{{ transactionDetails.total?.toLocaleString() }}</h2>
              </div>
             
            </div>

          </div>
           
        </b-col>
        <b-col cols="12" class="p-0 mt-xl-1 mt-2 ">
          <p class=" my-2 text-lg ">Select payment option</p>
          <div class="payment__options gap-2">
            <label v-for="paymentGateway in transactionDetails?.payment_methods" :key="paymentGateway.id"
              class="payment__option" :for="paymentGateway?.name">
              <input name="payment_gateway" v-model="payment_gateway" :value="paymentGateway" type="radio"
                :id="paymentGateway?.name" />
              <div class="payment__option-content">
                <img loading="lazy" :src="paymentGateway?.file" :alt="paymentGateway?.name" />
                <div class="payment__option-details">
                  <span> {{ paymentGateway?.name }}</span>
                </div>
              </div>
            </label>
          </div>
        </b-col>
      </div>
        
        <b-col class=" my-2">
          <button v-if="payment_gateway?.name === 'Flutterwave'" type="button" class="btn btn-primary w-100"
            @click="openFlutterwave">
            Pay Now With Flutterwave
          </button>

          <paystack v-if=" payment_gateway?.name === 'Paystack'" buttonClass="w-100 rounded btn btn-primary bg-primary"
            buttonText="Pay Now With Paystack" :publicKey="payStackKey" :email="userProfile.email" :amount="payment_gateway?.total * 100"
            :reference="transactionDetails?.id" :onSuccess="onSuccessfulPayment" :onCancel="onCancelledPayment"></paystack>
  
          <button v-if="payment_gateway?.name === 'Credo'" type="button" class="btn btn-primary w-100" @click="openCredo">
            Pay Now With Credo
          </button>
        </b-col>
       
      <!-- <input type="number" class="form-control" id="otp" placeholder="Please Enter Otp"
        :style="error_message.otp && 'border: 1px solid red'" v-model="otp" @change="error_message.otp = null" /> -->
    </template>

  </ModalComp>
  <b-modal id="modal-scrollable"  centered hide-footer ref="payment-modal" v-model="paymentConfirmation">
    <div class="d-flex flex-column align-items-center text-center">
      <img src="@/assets/logo.png" alt="ToNote Logo" class="my-1 confimation__logo" />

      <h4 class="fw-bolder my-1">Payment Successful!</h4>
      <p class="mb-1">
        Your plan has been successfully upgraded
      </p>
      <button class="btn my-1" data-bs-dismiss="modal" aria-label="Close" @click="!paymentConfirmation"
        style="background: #e5e7e9">
        Got it
      </button>
    </div>
  </b-modal>
  <b-modal id="modal-center" centered hide-footer ref="loading-modal" v-model="loadingModal">
    <div class="d-flex flex-column align-items-center text-center">
      <img src="@/assets/logo.png" alt="ToNote Logo" class="my-1 confimation__logo" />

      <h4 class="fw-bolder my-1">Payment Processing</h4>
      <div class="mb-1">
        <SpinLoader />
      </div>
      <!-- <button class="btn my-1" data-bs-dismiss="modal" aria-label="Close" @click="!paymentConfirmation"
        style="background: #e5e7e9">
        Got it
      </button> -->
    </div>
  </b-modal>
</template>
<script setup>
import { ref, onMounted, onUpdated, computed, defineProps, watch } from "vue";
import ToNote from "@/Services/Tonote";
import ModalComp from "@/components/ModalComp.vue";
import paystack from "vue3-paystack";
import { useFlutterwave,  } from "flutterwave-vue3";
import { useToast } from "vue-toast-notification";
import AddTeamMembers from "@/components/Documents/Edit/Left/AddTeamMembers";
import AddSigner from "@/components/Documents/Edit/Left/AddSigner";
import { Icon } from "@iconify/vue";
import moment from "moment";

import { useState, useActions, useGetters, createNamespacedHelpers } from 'vuex-composition-helpers';
import { useStore } from 'vuex'
import SpinLoader from '@/components/Loader/SpinLoader.vue'


const store = useStore()
// const { useState } = createNamespacedHelpers(["document"]);


const $toast = useToast();

const props = defineProps({
  active_team: { type: Array, default: [] },
  current_plan: {type: Object, default: {} }
});
const fields  = ref([{
  key: 'email',
  label: 'Team Members',

}, "cost", "action"])

// { email:user?.email, amount: '₦'+current_plan?.amount, owner: user?.isOwner == true ? 'Owner' : user?.permission }

const owner_fields  = ref(["email", "amount", "permission"])

const payStackKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_STAGING : process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE
const flutterwaveKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_STAGING : process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE
const redirect_url = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_BASE_URL_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_BASE_URL_STAGING : process.env.VUE_APP_BASE_URL_LIVE

const userProfile = computed(() => (store.state.ProfileModule.userProfile))
const singleData= computed(() => (store.state.TeamsModule.upgradePlan))
const teamData = computed(() => (store.state.document.teamMembers))
const teamMembers = ref([])
const owner = props.active_team?.users?.filter(user => user.isOwner == true)
const allMembers = ref([])
const number_of_users = ref(0)
const paymentModal = ref(false)
const paymentConfirmation = ref(false)
const payment_gateway = ref({})
const loading = ref(false)
const loadingModal = ref(false)
const openAddParticipantModal = ref(false);

const planData = ref({
  "number_of_users": number_of_users.value,
  "plan_id": props.current_plan.id
})
const transactionDetails = ref({})
const totalAmount = ref()

const addParticipantModal = () => {
  openAddParticipantModal.value = true;
};

const increaseValue = ref()
number_of_users.value = props.active_team.users.length

 const {
  getTeams,
  getSingleSubscription
} = useActions({
  getTeams: "TeamsModule/getTeams",
  getSingleSubscription: "TeamsModule/getSingleSubscription"
});
const { addParticipant, addTeamMembers } = useActions({addTeamMembers: "document/addTeamMembers"});

watch(teamData, (count, prevCount) => {
  allMembers.value = [...allMembers.value, ...count]
})

const  removeItem = (index) => {
  // isRemove.value = true;
  let newArray = allMembers.value
  // const newIndex = newArray.indexOf(index)
  allMembers.value.splice(index, 1);

};

// allMembers.value = [...allMembers, ...teamData.value]

const handleIncrease = () => {
  number_of_users.value++
  totalAmount.value = props.current_plan.amount * number_of_users.value
}

const handleDecrease = () => {
  number_of_users.value--
  if(number_of_users.value < 1){
    number_of_users.value = 1
  }
  totalAmount.value = props.current_plan.amount * number_of_users.value
  // increaseValue.value = props.current_plan.amount * number_of_users.value;
}

const handleRegisterSubcription = () => {
 const newMember = [...allMembers.value, ...owner]
  let formObj = []
  newMember.forEach((obj) => {
      formObj.push({
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        permission: obj.permission
      });
    });

  ToNote.post("/subscription-plans", {
    "team": formObj,
    "number_of_users": number_of_users.value,
    "plan_id": props.current_plan.id
})
    .then(res => {
      paymentModal.value=true
      transactionDetails.value=res.data.data
    })
    .catch(err => {
      $toast.error(err.response.data.data.error, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
    })
}
const onSuccessfulPayment = (response) => {
  // this.modalShow = false;
      paymentModal.value = false
      if (payment_gateway?.value?.name === "Paystack") {
        loadingModal.value = true
      }

     return ToNote.put(`/transactions/${payment_gateway?.value?.name === "Paystack"
        ? response.reference
        : payment_gateway?.value?.name === "Flutterwave"
        ? response.tx_ref
        : null}`,
        {
        payment_gateway: payment_gateway?.value?.name,
      })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          if (res.status == 200) {
          store.dispatch("ProfileModule/getUser");
          paymentConfirmation.value = true;
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
          getSingleSubscription({})
          addTeamMembers([])
          allMembers.value = []
          if (payment_gateway?.value?.name === "Paystack") {
              loadingModal.value = false
          }
          if(payment_gateway?.value?.name === 'Flutterwave'){
            window.location.href = redirect_url+ '/admin/payment-confirmation'
          }
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

const onCancelledPayment =()=> {
  payment_gateway.value = " "
  $toast.error("Payment Cancelled", {
        duration: 3000,
        queue: false,
        position: "top-right",
        dismissible: true,
        pauseOnHover: true,
      });
}
const openFlutterwave = () => {
  paymentModal.value=false
  useFlutterwave(
    {
    amount: payment_gateway?.value?.total,
    country: "NG",
    currency: "NGN",
    customer: {
      email: userProfile?.value?.email,
      name: `${userProfile?.value?.first_name} ${userProfile?.value?.last_name}`,
      phone_number: userProfile?.value?.phone,
    },
   
    payment_options: "card, account, ussd, banktransfer",
    public_key: flutterwaveKey,
    // redirect_url: redirect_url+'admin/settings?tab=billing',
    tx_ref: transactionDetails?.value?.id,
    callback: function(data){
        onSuccessfulPayment(data)
        .then((res) => {
          if(res.status == 200){
            console.log('res', res)
            window.location.href = redirect_url+ '/admin/payment-confirmation'
          }
          
        })
        // setTimeout(function() {
        // // window.location.reload()
        //  window.location.href = redirect_url+ '/admin/payment-confirmation'
        // }, 3000);
    },
    onclose() {
      $toast.error("Payment Cancelled", {
        duration: 3000,
        queue: false,
        position: "top-right",
        dismissible: true,
        pauseOnHover: true,
      });
    },
    // redirect_url: redirect_url+'admin/settings?tab=billing'
  });
}

const goBack = () => {
  getSingleSubscription({})
  addTeamMembers([])
  allMembers.value = []
}

onMounted(()=> {
 totalAmount.value = props.current_plan.amount * number_of_users.value
 teamMembers.value = props.active_team?.users?.filter(user => user.isOwner == false)
  allMembers.value = [...teamMembers.value, ...teamData.value]

 
})


</script>
<style >
  .owner-table .table tbody{
    color: #003bb3;
  }
  .owner-table .table thead {
    display: none;
  }
 .owner-table .table > :not(:first-child) {
    border-top: 0px solid currentColor;
}
.members-table .table thead th {
  padding: 0.72rem 2rem;
}



</style>