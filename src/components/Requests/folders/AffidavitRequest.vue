<template>
  <div class="container">

    <div class="container">
      <div class="row p-0" id="basic-table ">
        <div class="col col-12">
          <div class="card">
            <div class="card-body">
              <h3 class="">Next Scheduled Meeting Today</h3>

              <template v-if="filterDocByNextMeeting?.length > 0">
                <template v-for="(result, index) in filterDocByNextMeeting" :key="index">
                  <div class="border-bottom py-1 d-flex justify-content-between">
                    <div>
                      <div class="h5">Title: {{ result.title }}</div>
                      <div class="text-mute">
                        {{ dateTime(result.date + " " + result.start_time) }}
                      </div>
                    </div>
                    <div>
                      <a :href="`${virtualNotary}/session-prep/${result.id
                        }?token=${getToken()}`" class="btn btn-primary btn-sm">Join now</a>
                    </div>
                  </div>
                </template>
              </template>
              <p v-else>You have no scheduled meeting for today</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Affidavit Requests</h4>
            <div class="wrap">
              <a :href="`${virtualNotary}/schedule?session=affidavit&token=${token}`"
                class="btn btn-primary waves-effect">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-plus">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Request Affidavit</span>
              </a>
            </div>
          </div>
          <div class="card-body pt-2 pb-4">
            <div class="table-responsive">
              <!-- <table class="table table-hover" id="allrequests">
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
                  <tr v-for="(data, index) in filterDocByAffidavitRequests?.filter(request => request.status !== 'Pending')" :key="index">
  
                    <td>{{ index + 1 }}</td>
                    <td :class="{ disabled: data.status == 'Completed' && data.any_outstanding_payments !== 0 && data?.transactions?.find(transaction => transaction.parent_id == data.id)?.status !== 'Paid' }">
                      <template  v-if="data?.status == 'Completed'">
                        <router-link  :to="`/admin/download/${data?.document?.id}/preview`" @click="getDocument({
                          id: data?.document?.id
                        })">
                        {{ data.title }}
                        </router-link>
                      </template>
                      <template v-else>
                        <router-link :to="`/admin/preview/${data?.document?.id}/preview`" @click="getDocument({
                          id: data?.document?.id
                        })">
                        {{ data.title }}
                        </router-link>
                      </template>
                      </td>
                    <td>
  
  
                      <span class="badge rounded-pill me-1" :class="[
                                              data.status == 'Pending' ? 'bg-warning' : data.status == 'Accepted' ? 'bg-success' : 'bg-primary',
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
                      <template v-if="data.status == 'Completed' && data.any_outstanding_payments !== 0 && data?.transactions?.find(transaction => transaction.parent_id == data.id)?.status !== 'Paid' ">
                        
                        <div>
                          
                          <button  class="btn btn-sm mb-0 btn-primary py-1 " @click="getPaymentGateways(data)">
                            <Icon icon="material-symbols:lock-outline" width="18"/> Pay Now
                          </button>
                        </div>
                      </template>
                      <template  v-else >
                        <button disabled class="btn mb-0 btn-sm btn-secondary py-1 " >
                          <Icon icon="mdi:unlocked" width="18" /> Paid
                        </button>
                        <div class="ms-50">
                          <Icon icon="mdi:tick-circle" width="24" class="text-success" />
                        </div>
                      </template>
                    </td>
                    <td>
                      
                      <template v-if="data.status == 'Completed' && data.any_outstanding_payments == 0 ">
                        <div class="dropdown">
                          <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                          </a>
                          <div class="dropdown-menu dropdown-menu-end" style="">
                            <router-link :to="`/admin/download/${data?.document?.id}/preview`" @click="getDocument({
                              id: data?.document?.id
                            })"  class="dropdown-item" >
                              <Icon icon="fontisto:preview" />
                              Preview
                          </router-link>
                          </div>
                        </div>
                      </template>
                      
                    </td>
  
                  </tr>
                </tbody>
              </table> -->

              <b-form @submit="submitSearch" @reset="resetSearch">
                <b-row align-h="end">
                  <b-col lg="4" align-self="end">
                    <b-form-group class="mb-1" label="Search" label-for="search-input">
                      <b-input-group size="md">
                        <b-form-input  @input="handleInput" id="search-input" v-model="search" type="search" placeholder="Type to Search"
                          ></b-form-input>
                        <!-- <b-button type="submit" class="btn btn-primary">Search</b-button>
                        <b-button type="button" @click="resetSearch" class="btn btn-primary">Reset</b-button> -->
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
              <!-- {{ allSessionRecord?.data }} -->
              <TableSkeleton v-if="sessionsLoading == true" />

              <b-table v-else striped hover per-page="10" :current-page="currentPage"
                :items="allSessionRecord?.data || []" :fields="fields">
                <template #cell(s_n)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(document_title)="data">
                  <div :class="{
                    disabled:
                      data.item.status == 'Completed' &&
                      data.item.any_outstanding_payments !== 0 &&
                      data?.item?.transactions?.find(
                        (transaction) => transaction.parent_id == data.item.id
                      )?.status !== 'Paid',
                  }">
                    <template v-if="data?.item?.status == 'Completed'">
                      <!-- :class="{ disabled: data.status == 'Completed' && data.any_outstanding_payments !== 0 }" -->
                      <router-link :to="`/admin/download/${data?.item?.document?.id}/preview`" @click="
                        getDocument({
                          id: data?.item?.document?.id,
                        })
                        ">
                        {{ data?.item.title }}
                      </router-link>
                    </template>
                    <template v-else>
                      <router-link :to="`/admin/preview/${data?.item?.document?.id}/preview`" @click="
                        getDocument({
                          id: data?.item?.document?.id,
                        })
                        ">
                        {{ data?.item.title }}
                      </router-link>
                    </template>
                  </div>
                  <div></div>
                </template>

                <template #cell(time)="data">
                  <div class="d-flex flex-column">
                    <h6 class="user-name text-truncate mb-0">
                      <!-- {{ data.item.immediate }} -->
                      <small v-if="data.item.immediate == true" class="badge rounded-pill me-1" :class="[
                        data.item.immediate == true
                          ? 'badge-light-danger'
                          : 'badge-light-primary',
                      ]">
                        {{
                          data.item.immediate == true
                          ? "Immediate Session"
                          : "Scheduled Session"
                        }}
                      </small>
                      <small v-else>
                        {{ time(data.item.date + " " + data.item.start_time) }}
                        <!-- {{ time(data.item.start_time) }} -->
                      </small>
                    </h6>
                  </div>
                </template>
                <template #cell(date)="data">
                  <div class="d-flex flex-column">
                    <h6 class="user-name text-truncate mb-0">
                      {{ date(data.item.date) }}
                    </h6>
                  </div>
                </template>
                <template #cell(status)="data">
                  <span class="badge rounded-pill me-1" :class="[
                    data.item.status == 'Pending'
                      ? 'bg-warning'
                      : data.item.status === 'Accepted'
                        ? 'bg-success'
                        : 'bg-success',
                  ]">
                    {{ data.item.status }}
                  </span>
                </template>
                <template #cell(connect)="data">
                  <template v-if="data.item.immediate === 1 &&
                    data.item.date === today &&
                    data.item.end_session === 0
                    ">
                    <!-- <a :href="`${virtualNotary}/session-prep/${data.id}?token=${token}`" -->
                    <a :href="`${virtualNotary}/session-prep/${data.item.id}?token=${token}`"
                      class="btn btn-primary btn-sm">Join</a>
                  </template>
                  <template v-else-if="data.item.status == 'Completed'">
                    Completed Session
                  </template>
                  <template v-else>Missed Session</template>
                </template>
                <template #cell(payment_status)="data">
                  <div class="d-flex align-items-center">
                    <template v-if="data.item.status == 'Completed' &&
                      data.item.any_outstanding_payments !== 0 &&
                      data?.item?.transactions?.find(
                        (transaction) =>
                          transaction.parent_id == data?.item.id
                      )?.status !== 'Paid'
                      ">
                      <!-- {{ data?.transactions?.find(transaction => transaction.parent_id == data.id)?.status }} -->

                      <div>
                        <!-- 
                              v-show="userDocument?.outstanding_amount !== 0" 
                            -->
                        <button class="btn btn-sm mb-0 btn-primary py-1" @click="getPaymentGateways(data.item)">
                          <Icon icon="material-symbols:lock-outline" width="18" />
                          Pay Now
                        </button>
                      </div>
                    </template>
                    <template v-else>
                      <button disabled class="btn mb-0 btn-sm btn-secondary py-1">
                        <Icon icon="mdi:unlocked" width="18" /> Paid
                      </button>
                      <div class="ms-50">
                        <Icon icon="mdi:tick-circle" width="24" class="text-success" />
                      </div>
                    </template>
                  </div>
                </template>
                <template #cell(actions)="data">
                  <td>
                    <template v-if="data.item.status == 'Completed' &&
                      data.item.any_outstanding_payments == 0
                      ">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" style="">
                          <router-link :to="`/admin/download/${data?.item?.document?.id}/preview`" @click="
                            getDocument({
                              id: data?.item?.document?.id,
                            })
                            " class="dropdown-item">
                            <Icon icon="fontisto:preview" />
                            Preview
                          </router-link>
                        </div>
                      </div>
                    </template>
                  </td>
                </template>
              </b-table>
              <b-col class="my-1">
                <div class="d-flex justify-content-between align-items-center">
                  <p class="fw-bold text-secondary disable">
                    Showing {{ allSessionRecord?.meta?.from }} to
                    {{ allSessionRecord?.meta?.to }} of
                    {{ allSessionRecord?.meta?.total }} entries
                  </p>
                  <ul class="pagination justify-content-start my-2" role="menubar" aria-disabled="false"
                    aria-label="Pagination">
                    <li :key="index + 1" v-for="(link, index) in allSessionRecord?.meta?.links" :class="{
                      active: link.active,
                      disabled: link.url == null,
                    }" class="page-item" :disabled="link.url == null" role="presentation">
                      <button v-html="link.label" @click="changePagination(link.url)" class="page-link no-whitespace"
                        aria-controls="myTable" role="menuitemradio" type="button" :disabled="link.url == null"
                        tabindex="0" />
                    </li>
                  </ul>

                  <!-- <b-col md="2" class="my-1">
              
                 <b-form-select
                   id="per-page-select"
                   v-model="perPage"
                   :options="pageOptions"
                   size="md"
                   class="mb-0"
                   @input="changePerPage"
                 ></b-form-select>
           
             </b-col> -->
                </div>
              </b-col>
            </div>
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
              &#8358; {{ transactionSummary.total }}
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
            <label v-for="payment_gateway in paymentGateways" :key="payment_gateway.id" class="payment__option"
              :for="payment_gateway.gateway.name">
              <input name="payment_gateway" v-model="selectedPayment_gateway" :value="payment_gateway.gateway"
                type="radio" :id="payment_gateway.gateway.name" />
              <div class="payment__option-content">
                <img loading="lazy" :src="payment_gateway.gateway.file" :alt="payment_gateway.gateway.name" />
                <div class="payment__option-details">
                  <span> {{ payment_gateway.gateway.name }}</span>
                </div>
              </div>
            </label>
          </div>

          <div class="modal-footer d-flex justify-content-end mt-3">
            <button @click="Payment_flutterwave" v-if="selectedPayment_gateway.name === 'Flutterwave'"
              class="btn btn-primary">
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
            <!-- {{ transactionSummary?.payment_methods?.filter(method => method.name == selectedPayment_gateway.name)[0]?.total * 100}} -->

            <paystack buttonClass="btn btn-primary" buttonText="Pay Now" :publicKey="payStackKey"
              :email="userProfile.email" :amount="transactionSummary?.payment_methods?.filter(
                (method) => method.name == selectedPayment_gateway.name
              )[0]?.total * 100
                " :reference="transactionSummary.id" :onSuccess="SuccessfulPaymentCallback" :onCancel="close"
              v-if="selectedPayment_gateway.name === 'Paystack'" @click="$emit('close')"
              :channels="['card', 'bank', 'bank_transfer']">
            </paystack>
          </div>
        </div>
      </div>
    </template>
  </ModalComp>
  <b-modal id="modal-center" hide-header-close centered hide-footer ref="loading-modal" v-model="loadingModal">
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
  <b-modal id="modal-scrollable" centered hide-footer ref="payment-modal" v-model="paymentConfirmation">
    <div class="d-flex flex-column align-items-center text-center">
      <img src="@/assets/logo.png" alt="ToNote Logo" class="my-1 confimation__logo" />

      <h4 class="fw-bolder my-1">Payment Successful!</h4>
      <p class="mb-1">Your plan has been successfully upgraded</p>
      <button class="btn my-1" data-bs-dismiss="modal" aria-label="Close" @click="!paymentConfirmation"
        style="background: #e5e7e9">
        Got it
      </button>
    </div>
  </b-modal>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, computed, defineProps, toRefs, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import paystack from "vue3-paystack";
import { useFlutterwave } from "flutterwave-vue3";
import moment from "moment";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import { useRoute } from "vue-router";
import SpinLoader from "@/components/Loader/SpinLoader.vue";
// import Api from "@/api/Api";
// import TableSkeleton from "@/components/Loader/TableSkeleton.vue"
import { getToken } from "@/Services/helpers";
import { useActions, useGetters } from "vuex-composition-helpers";
import ToNote from "@/Services/Tonote";
// import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import MailToParticipant from "@/components/Locker/MailToParticipant";
import ModalComp from "@/components/ModalComp.vue";
import { platformInitiated, randomId } from "@/Services/helpers";
import TableSkeleton from "@/components/Loader/TableSkeleton";
import { debounce } from 'lodash';

const store = useStore();

const today = moment().format("YYYY-MM-DD");

const dateTime = (value) => {
  return moment(value).format("Do MMM YYYY, hh:mm A");
};
const date = (value) => {
  return moment(value).format("Do MMM YYYY");
};

const time = (value) => {
  return moment(value).format("h:mm a");
};
defineProps({
  data: { type: Array, default: [] },
});

const route = useRoute();
const $toast = useToast();
const payStackKey =
  process.env.VUE_APP_ENVIRONMENT == "local"
    ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_DEV
    : process.env.VUE_APP_ENVIRONMENT == "staging"
      ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_STAGING
      : process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE;
const flutterwaveKey =
  process.env.VUE_APP_ENVIRONMENT == "local"
    ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_DEV
    : process.env.VUE_APP_ENVIRONMENT == "staging"
      ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_STAGING
      : process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE;
const redirect_url =
  process.env.VUE_APP_ENVIRONMENT == "local"
    ? process.env.VUE_APP_BASE_URL_LOCAL
    : process.env.VUE_APP_ENVIRONMENT == "staging"
      ? process.env.VUE_APP_BASE_URL_STAGING
      : process.env.VUE_APP_BASE_URL_LIVE;

const selectedPayment_gateway = ref("");
const transactionSummary = ref({});
const openModal = ref(false);
const requestDetails = ref({});
const openPaymentModal = ref(false);
const paymentConfirmation = ref(false);
const loadingModal = ref(false);
const { affidavits, allSessionRecordToday, allSessionRecord, sessionsLoading } =
  useGetters({
    affidavits: "schedule/affidavits",
    allSessionRecordToday: "schedule/allSessionRecordToday",
    allSessionRecord: "schedule/allSessionRecord",
    sessionsLoading: "schedule/sessionsLoading",
  });

const paymentGateways = computed(
  () => store.state.AffidavitModule.paymentGateways
);
const fetching = computed(() => store.state.AffidavitModule.fetching);

const {
  getAffidavitRequest,
  getSessionRecordToday,
  getUserDocument,
  getSessionRecords,
} = useActions({
  // getAffidavitRequest: "schedule/getAffidavitRequest",
  getAffidavitRequest: "schedule/getAffidavitRequest",
  getSessionRecordToday: "schedule/getSessionRecordToday",
  getUserDocument: "document/getUserDocument",
  getSessionRecords: "schedule/getSessionRecords",
});

// const amount_paystack = computed(() => {
//   return Number(userDocument?.outstanding_amount) * 100;
// });

const token = computed(() => {
  const token = getToken();
  return token;
});

const filterDocByAffidavitRequests = computed(() => {
  return affidavits.value?.filter(
    (respond) => respond.entry_point == "Affidavit"
  );
});

const getDocument = (params) => {
  getUserDocument(params.id);
};
const userProfile = computed(() => store.state.ProfileModule.userProfile);
const reference = computed(() => {
  return requestDetails.value.document.id + randomId(5);
});

const filterDocByNextMeeting = computed(() => {
  if (allSessionRecordToday?.value?.data?.length == 0) {
    return [];
  } else {
    return allSessionRecordToday.value?.data?.filter(
      (res) =>
        res?.entry_point == "Affidavit" &&
        res?.immediate == false &&
        res?.status == "Accepted"
    );
  }
});
const currentPage = ref();
const fields = ref([
  "s_n",
  "document_title",
  "status",
  "date",
  "time",
  "connect",
  "payment_status",
]);
const perPage = ref(10);
const pageOptions = ref([
  { value: null, text: "Per page" },
  { value: "5", text: "5" },
  { value: "10", text: "10" },
  { value: "20", text: "20" },
]);
const search = ref("");
let page = ref();

const changePagination = (page_number) => {
  page.value = page_number.split("&").pop().split("=").pop();
  getSessionRecords({
    entry_point: "Affidavit",
    page: page.value,
    name: search.value,
    per_page: perPage.value,
  });
};

const changePerPage = () => {
  getSessionRecords({
    entry_point: "Affidavit",
    page: page.value,
    name: search.value,
    per_page: perPage.value,
  });
};
const submitSearch = () => {
  console.log('Typing has stopped:', search.value);
  getSessionRecords({
    entry_point: "Affidavit",
    name: search.value,
    per_page: perPage.value,
  });
};

// Debounce the function with a specified delay (e.g., 300ms)
const debouncedFunction = debounce(submitSearch , 1000);

const handleInput = () => {
  // Cancel the previous debounce and start a new one
  debouncedFunction.cancel();
  debouncedFunction();
};

const resetSearch = (event) => {
  event.preventDefault();
  getSessionRecords({ entry_point: "Affidavit", per_page: perPage.value });
};

const SuccessfulPaymentCallback = (response) => {
  loadingModal.value = true;
  openPaymentModal.value = false;
  return (
    ToNote.put(
      `/transactions/${selectedPayment_gateway?.value?.name === "Paystack"
        ? response.reference
        : selectedPayment_gateway?.value?.name === "Flutterwave"
          ? response.tx_ref
          : null
      }`,
      {
        payment_gateway: selectedPayment_gateway?.value?.name,
      }
    )
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        if (res.status == 200) {
          loadingModal.value = false;
          paymentConfirmation.value = true;

          $toast.success("Payment Successful", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
          store.dispatch("TeamsModule/getSubcriptions");
          store.dispatch("TeamsModule/getTeams");
          store.dispatch("ProfileModule/getTransactions");
          store.dispatch("schedule/getAffidavitRequest");
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
        return err;
      })
  );
};

const getPaymentGateways = (data) => {
  // openPaymentModal.value = true
  requestDetails.value = data;
  const planData = {
    transactionable_type: "ExtraSeal",
    // transactionable_id: requestDetails.value.id,
    parent_id: requestDetails.value.id,
    platform_initiated: platformInitiated(),
    actor_type: !userProfile.value.is_business ? "User" : "Team",
  };

  ToNote.post("/transactions", planData)
    .then((res) => {
      requestDetails.value = data;
      store.dispatch("AffidavitModule/ALL_PAYMENTGATEWAYS");
      openPaymentModal.value = true;
      transactionSummary.value = res?.data?.data;
    })
    .catch((err) => {
      $toast.error(err.response.data.data.error, {
        duration: 3000,
        queue: false,
        position: "top-right",
        dismissible: true,
        pauseOnHover: true,
      });
      return err;
    });
};

const virtualNotary = computed(() => {
  return process.env.VUE_APP_ENVIRONMENT == "local"
    ? process.env.VUE_APP_VIRTUAL_NOTARY_DEV
    : process.env.VUE_APP_ENVIRONMENT == "staging"
      ? process.env.VUE_APP_VIRTUAL_NOTARY_STAGING
      : process.env.VUE_APP_VIRTUAL_NOTARY_LIVE;
});

// onMounted(() => {

//   // getAffidavitRequest();
// });
onMounted(() => {
  getSessionRecordToday({ token: token.value, entry_point: "Affidavit" });
  getSessionRecords({ token: token, entry_point: "Affidavit", page: 1 });

  // getAffidavitRequest();
});
onUpdated(() => {
  setTimeout(() => {
    currentPage.value = allSessionRecord?.value?.meta?.current_page;

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

.payment__options .payment__option input[type="radio"]:checked+.payment__option-content:after {
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

.payment__options .payment__option input[type="radio"]:checked+.payment__option-content {
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
  cursor: not-allowed;
}
</style>
