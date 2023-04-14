<template>
  <div>
    <p style="cursor: pointer" @click=" getSingleSubscription({})" class="text-primary">
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L3 7L8 2L7 0L0 7L7 14L8 12Z" fill="#003BB3"/>
        </svg>        
      Back </p>
    <!-- {{ active_team.users }} -->
    <!-- {{ current_plan }} -->
    <div class="d-flex pb-1 justify-content-between align-items-center">
      <h4 class="">
        Invite team members to your plan
      </h4>
      <p :disabled="number_of_users <= 1" @click="openAddUserModal()" class="d-inline-flex text-primary align-items-center"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z" fill="#003BB3"/>
        </svg>
       <span class="font-weight-bold ml-1">Add team member</span> </p>
    </div>
   
    <p class="pb-1 font-weight-bold">You are about to upgrade to the pro plan, invite the team members and proceed to payment</p>
    <div class="px-1">
      <div class="row">
        <div class="col ">
          <div>
            <div :key="user" v-for="user in active_team?.users?.filter(user => user.isOwner == true)" class="d-flex text-primary justify-content-between pb-1 " >
              <p class="font-weight-bold mb-0">{{user.email}}</p>
              <p class="font-weight-bold mb-0"> ₦{{ current_plan.amount }} </p>
              <p class="font-weight-bold mb-0">{{user.isOwner == true ? 'Owner' : user.permission}}</p>
            </div>
            <b-table show-empty :items="active_team?.users?.filter(user => user.isOwner == false)" :fields="fields" responsive="sm" >
              <template #empty>
                <h4 class="text-center p-2">No Team Member</h4>
              </template>
            </b-table>
          </div>
        </div>
        <div class="col-md-4  p-2">
          <div class="border text-center p-2 rounded-3">
            <div class="d-flex flex-column w-100">
              <p class="mb-0">Team Members</p>
              <div class="w-100 pt-50">
                <div class="border-3 d-flex rounded-3 border border-secondary-subtle">
                  <input type="number" v-model="number_of_users" name="num" min="1" style='width:100%'  class=" h2 border-0 mb-0 text-center" aria-label="number of users">
                  <div class="d-flex flex-column py-50">
                    <span style="cursor: pointer" @click="handleIncrease" class="px-2 h4 border-0 mb-0 fs-3 p-0">+</span>
                    <span style="cursor: pointer" @click="handleDecrease" class="px-2 h4 border-0 mb-0 fs-3 p-0">-</span>
                  </div>
                  
                </div>
                <!-- <input v-model="number_of_users" @blur="totalAmount = totalAmount * number_of_users" :size="number_of_users" style='width:100%;margin:-3px,border:2px inset #eee'  type="number" min="1" name="num" class="font-weight-bold text-black h2  " /> -->
              </div>
            </div>
            <hr />
            <div>
              <p class="mb-0">Total due</p>
              <h2 class="font-weight-bold text-black">{{totalAmount}}</h2>
            </div>

          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center ">
       
          <div class="ml-auto">
            <button :disabled="number_of_users <= 1" @click="handleRegisterSubcription" class="rounded btn btn-primary">
              <span class="align-middle d-inline-block">Proceed to Pay</span>
            </button>
          </div>
        
      </div>
    </div>
  </div>
  
  <!-- @click="openAddUserModal()" -->
  <b-modal id="modal-center" centered title="Invite your teammate" hide-footer v-model="addTeamModal">
    <form @submit.prevent="inviteTeamMember" class="auth-register-form mt-2 row" novalidate>
      <div class="mb-2 col-6">
        <label class="form-label" for="first-name">First Name</label>
        <input class="form-control" id="first-name" type="text" name="first_name" placeholder="Thomas"
          aria-describedby="first-name" autofocus="" tabindex="1" v-model="first_name" />
      </div>

      <div class="mb-2 col-6">
        <label class="form-label" for="last-name">Last name</label>
        <input class="form-control" id="last-name" type="text" name="last_name" placeholder="Edison"
          aria-describedby="last-name" autofocus="" tabindex="1" v-model="last_name" />
      </div>

      <div class="mb-2 col-12">
        <label class="form-label" for="register-email">Email</label>
        <input class="form-control" id="register-email" type="text" name="email" v-model="email"
          placeholder="john@example.com" aria-describedby="register-email" tabindex="2" />
      </div>
      <div>
        <b-form-group class="permissions" label="Add Permissions">
          <b-form-radio-group v-model="permission" :options="options" name="radios-stacked" stacked />
        </b-form-group>
      </div>
      <div class="col-12">
        <button class="btn btn-primary w-100" tabindex="5">
          Invite
        </button>
        <img v-if="loggingIn"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </b-modal>
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
              <p>Team Members</p>
              <h2 class="w-100 h2 text-black font-weight-bold ">
                {{  number_of_users }}
              </h2>
            </div>
            <div class=" col-1">
              <div style="width:2px; height:100%" class="border"/>
              </div>

            <!-- <hr /> -->
            <div class="col-5 p-2">
              <p>Total due</p>
              <h2 class="font-weight-bold text-black"> ₦{{ transactionDetails.total }}</h2>
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
import { ref, onMounted, onUpdated, computed, defineProps } from "vue";
import ToNote from "@/Services/Tonote";
import ModalComp from "@/components/ModalComp.vue";
import paystack from "vue3-paystack";
import { useFlutterwave,  } from "flutterwave-vue3";
import { useToast } from "vue-toast-notification";
import { useState, useActions, useGetters } from 'vuex-composition-helpers';
import { useStore } from 'vuex'
import SpinLoader from '@/components/Loader/SpinLoader.vue'


const store = useStore()


const $toast = useToast();

const props = defineProps({
  active_team: { type: Array, default: [] },
  current_plan: {type: Object, default: {} }
});
const fields  = ref([{
  key: 'email',
  label: 'Team Members',

}, "cost", "action"])

const payStackKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_STAGING : process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE
const flutterwaveKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_STAGING : process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE
const redirect_url = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_BASE_URL_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_BASE_URL_STAGING : process.env.VUE_APP_BASE_URL_LIVE

const userProfile = computed(() => (store.state.ProfileModule.userProfile))
const singleData = computed(() => (store.state.TeamsModule.upgradePlan))
const number_of_users = ref(0)
const addTeamModal = ref(false)
const paymentModal = ref(false)
const paymentConfirmation = ref(false)
const payment_gateway = ref({})
const loading = ref(false)
const loadingModal = ref(false)
const planData = ref({
  "number_of_users": number_of_users.value,
  "plan_id": props.current_plan.id
})
const transactionDetails = ref({})
const totalAmount = ref()


const increaseValue = ref()
 number_of_users.value = props.active_team.users.length

 const {
  getTeams,
  getSingleSubscription
} = useActions({
  getTeams: "TeamsModule/getTeams",
  getSingleSubscription: "TeamsModule/getSingleSubscription"
});
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
  ToNote.post("/subscription-plans", {
  "number_of_users": number_of_users.value,
  "plan_id": props.current_plan.id
})
    .then(res => {
      paymentModal.value=true
      transactionDetails.value=res.data.data
    })
    .catch(err => console.log(err))
}
const onSuccessfulPayment = (response) => {
  // this.modalShow = false;
      paymentModal.value = false
      if (payment_gateway?.value?.name === "Paystack") {
        loadingModal.value = true
      }
      
      ToNote.put(`/transactions/${payment_gateway?.value?.name === "Paystack"
        ? response.reference
        : payment_gateway?.value?.name === "Flutterwave"
        ? response.tx_ref
        : null}`,
        {
        payment_gateway: payment_gateway?.value?.name,
      })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          console.log('res.status', res.status)
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
          if (payment_gateway?.value?.name === "Paystack") {
              loadingModal.value = false

          }
          }
         

        })
        .catch((err) => {
          $toast.error("An error occurred", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         
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
      console.log('data here', data)
        onSuccessfulPayment(data)
        setTimeout(function() {
        console.log('here redirect')
        // window.location.reload()
         window.location.href = redirect_url+ '/admin/payment-confirmation'
        }, 3000);
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

onMounted(()=> {
 totalAmount.value = props.current_plan.amount * number_of_users.value
})
</script>
<style >
  
</style>