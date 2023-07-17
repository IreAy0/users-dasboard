<template>
  <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="">Next Scheduled Meeting Today</h3>
            <template v-if="filterDocByNextMeeting?.length > 0">
              <template v-for="(result, index) in filterDocByNextMeeting" :key="index">
                <div class="border-bottom py-1 d-flex justify-content-between">
                  <div>
                    <div class="h5">Title: {{ result?.title }}</div>
                    <div class="text-mute">
                      {{ dateTime(result?.date + " " + result?.start_time) }}
                    </div>
                  </div>
                  <div>
                    <a :href="`${virtualNotary}/session-prep/${result.id}?token=${getToken()}`"
                      class="btn btn-primary btn-sm">Join now</a>
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              You have no pending scheduled meeting today
            </template>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <h4 class="card-title">Notary Requests</h4>
          <div class="wrap">
            <a :href="`${virtualNotary}/schedule?session=notary&token=${token}`" class="btn btn-primary waves-effect">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-plus">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Request a Notary</span>
            </a>
          </div>
        </div>
        <div class="card-body pt-2 pb-4">
          <div class="table-responsive">
            <table class="table table-hover" id="all_notary_requests">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Connect</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in filterDocByNotaryRequests" :key="index">
                  <td>{{ ++index }}</td>
                  <td>
                    <template v-if="data?.status == 'Completed'">
                      <router-link :to="`/admin/download/${data?.document?.id}/preview`" @click="getDocument({
                        id: data?.document?.id
                      })">
                      {{ data.title }}
                      </router-link>
                    </template>
                    <template v-else>
                      <router-link :to="`/admin/preview/${data?.document?.id}/document`" @click="getDocument({
                        id: data?.document?.id
                      })">
                      {{ data.title }}
                      </router-link>
                    </template>
                    </td>
                  <td>
                    <span class="badge rounded-pill me-1" :class="[
                                            data.status == 'Pending' ? 'bg-warning' : data.status == 'Accepted' ? 'bg-success' : data.status == 'Awaiting' ? 'bg-warning' : 'bg-primary',
                                                ]">
                      {{ data.status }}
                    </span>
                  </td>
                  <td>{{ dateTime(data.created_at) }}</td>
                  <td>
                    <template v-if="
                                                data.immediate === 1 &&
                                                data.date === today &&
                                                data.status === 'Accepted'
                                              ">
                      <a :href="`${virtualNotary}/session-prep/${data.id}?token=${token}`"
                        class="btn btn-primary btn-sm">Join</a>
                    </template>
                    <template v-else-if="data.date !== today && data.status === 'Accepted'"> Missed Session </template>

                  </td>
                  <td class="d-flex align-items-center">
                    <template v-if="data.anyOutstandingPayments !== 0 ">
                      <div>
                        <!-- v-show="userDocument?.outstanding_amount !== 0" -->
                        <button  class="btn btn-sm mb-0 btn-primary py-1 " @click="getPaymentGateways(data)">
                          <Icon icon="material-symbols:lock-outline" width="18"/> Pay Now
                        </button>
                      </div>
                    </template>
                    <template  v-else >
                      <button disabled class="btn mb-0 btn-sm btn-secondary py-1 " @click="getPaymentGateways(data)">
                        <Icon icon="mdi:unlocked" width="18" /> Paid
                      </button>
                      <div class="ms-50">
                        <Icon icon="mdi:tick-circle" width="24" class="text-success" />
                      </div>
                    </template>
                  </td>
                  <td>
                    <template v-if="data.status == 'Completed'">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" style="">
                          <router-link :to="`/admin/download/${data?.document?.id}/preview`" class="dropdown-item">
                            <Icon icon="carbon:download" /> Download
                          </router-link>
                        </div>
                      </div>
                    </template>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </div>
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
              &#8358; {{ requestDetails.anyOutstandingPayments }}
            </p>
            <!-- <span class="small">per document</span> -->
          </div>
        </div>
        
        <div v-if="fetching == true">
          <div class="fulfilling-bouncing-circle-spinner">
            <div class="circle"></div>
            <div class="orbit"></div>
          </div>
        </div>
        <div v-if="fetching == false">
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
  <!-- {{ requestDetails }} -->
            <paystack
              buttonClass="btn btn-primary"
              buttonText="Pay Now"
              :publicKey="payStackKey"
              :email="userProfile.email"
              :amount="requestDetails.anyOutstandingPayments * 100"
              :reference="reference"
              :onSuccess="SuccessfulPaymentCallback"
              :onCancel="close"
              v-if="selectedPayment_gateway.name === 'Paystack'"
              @click="$emit('close')"
              :channels="['card', 'bank', 'bank_transfer']"
            >
            </paystack>
          </div>
        </div>
        
      </div>
    </template>

   
  </ModalComp>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted,  computed, defineProps, onUpdated, ref } from "vue";
import moment from "moment";
import $ from "jquery";
import paystack from "vue3-paystack";
import { useFlutterwave } from "flutterwave-vue3";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import { useRoute } from 'vue-router'
import ToNote from "@/Services/Tonote";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
// import Api from "@/api/Api";
import ModalComp from "@/components/ModalComp.vue";
import { getToken } from "@/Services/helpers";
import { useActions, useGetters } from "vuex-composition-helpers";
import { platformInitiated, randomId } from "@/Services/helpers";

const dateTime = (value) => {
  return moment(value).format("Do MMM YYYY, hh:mm A");
};
const route = useRoute()
const $toast = useToast();
const store = useStore()

const payStackKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_STAGING : process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE
const flutterwaveKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_STAGING : process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE
const redirect_url = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_BASE_URL_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_BASE_URL_STAGING : process.env.VUE_APP_BASE_URL_LIVE

const selectedPayment_gateway = ref("");
const openModal = ref(false);
const requestDetails = ref({})
const openPaymentModal = ref(false)

const paymentGateways = computed(
  () => store.state.AffidavitModule.paymentGateways
);
const fetching = computed(() => store.state.AffidavitModule.fetching)

const { affidavits, allSessionRecordToday } = useGetters({
  affidavits: "schedule/affidavits",
  allSessionRecordToday: "schedule/allSessionRecordToday",

});

const { getAffidavitRequest, getSessionRecordToday, } = useActions({
  getAffidavitRequest: "schedule/getAffidavitRequest",
  getSessionRecordToday: "schedule/getSessionRecordToday",

});

const filterDocByNotaryRequests = computed(() => {
  return affidavits?.value?.filter(
    (data) => data?.entry_point == "Notary",
  );
});

const filterDocByNextMeeting = computed(() => {
  if (allSessionRecordToday?.value?.data?.length == 0) {
    return []
  } else {
  return allSessionRecordToday?.value?.data?.filter(
    (res) =>
      res?.entry_point == "Notary" &&
      res?.immediate == false &&
      res?.status == "Accepted",
  );
  };
});

const token = computed(()  => {
      const token = getToken();
      return token;
});

const today = moment().format("YYYY-MM-DD");
const userProfile = computed(() => store.state.ProfileModule.userProfile)
const reference = computed(() => {
  return requestDetails.value.document.id + randomId(5);
});
const virtualNotary = computed(() => {
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIRTUAL_NOTARY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIRTUAL_NOTARY_STAGING : process.env.VUE_APP_VIRTUAL_NOTARY_LIVE
    });

const  getEnv =() =>{
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIDEO_SIGN_PAGE_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIDEO_SIGN_PAGE_STAGING : process.env.VUE_APP_VIDEO_SIGN_PAGE_LIVE

    }

const SuccessfulPaymentCallback = (response) => {
  return ToNote.post(`/transactions`,
        {
          transactionable_type: "ExtraSeal",
          // transactionable_id: requestDetails.value.id,
          parent_id: requestDetails.value.id,
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

const getPaymentGateways = (data) => {
  openPaymentModal.value = true
  store.dispatch("AffidavitModule/ALL_PAYMENTGATEWAYS");
  requestDetails.value = data
  // store.dispatch()
}

onMounted(() => {
  getAffidavitRequest();
  getSessionRecordToday({token: token.value,  entry_point: 'Notary'});
});

onUpdated(() => {
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#all_notary_requests")) {
      $("#all_notary_requests").DataTable();
    } else {
      if (filterDocByNotaryRequests.value.length > 0) {
        $("#all_notary_requests").DataTable({
          columnDefs: [{ orderable: false, targets: [0, 6] }],
          // order: [[3, "desc"]],
          aaSorting: [],
          lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"],
          ],
          pageLength: 10,
        });
      }
    }
  }, 100);
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
.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed
}
</style>
