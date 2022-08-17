<template>
  <section class="">
        <b-modal
      id="modal-center"
      centered
      hide-footer
      ref="my-modal"
      v-model="paymentConfirmation"
    >
      <div
     
      class="d-flex flex-column align-items-center text-center"
    >
      <img
        src="@/assets/logo.png"
        alt="ToNote Logo"
        class="my-1 confimation__logo"
      />
      
      <h4 class="fw-bolder my-1">Payment Successful!</h4>
      <p class="mb-1">
        Your plan has been successfully upgraded 
      </p>
      <button
        class="btn my-1"
        data-bs-dismiss="modal"
        aria-label="Close"
        @click="!paymentConfirmation"
        style="background: #e5e7e9"
      >
        Got it
      </button>
    </div>
    </b-modal>


    <b-modal
      id="modal-center"
      centered
      title="Upgrade Plan"
      hide-footer
      ref="my-modal"
      v-model="modalShow"
    >
      <b-col cols="12" class="p-0 mt-xl-1 mt-2 d-flex">
        <div>
          
          <h6 v-if="transactionSummary?.title?.includes('Pro')" class="mb-2">You are about to unlock more collaborative features by signing up for the pro plan</h6>
          <h6 v-if="transactionSummary?.title?.includes('Business')" class="mb-2">You are about to unlock more collaborative features by signing up for the business plan</h6>

      <div class="shadow-lg text-center p-2 price__display">
        <span>Total Due:</span>
        <p class="h3 text-primary fw-bolder my-0 py-0">&#8358;{{( Math.round(transactionSummary?.total * 100 ) / 100).toLocaleString() }}</p>
      </div>
               
        </div>
      </b-col>

      <div class="d-flex justify-content-center my-2">
        <paystack
          buttonClass="' rounded btn btn-primary bg-primary'"
          buttonText="Pay Now"
          :publicKey="getPublicKey"
          :email="getEmail"
          :amount="transactionSummary?.total * 100"
          :reference="transactionSummary?.id"
          :onSuccess="onSuccessfulPayment"
          :onCancel="onCancelledPayment"
        ></paystack>
      </div>
    </b-modal>
    <b-tabs
      v-model="tabIndexAdv1"
      class="modern-horizontal-wizard bs-stepper wizard-modern modern-wizard-example d-flex flex-column flex-lg-row"
      content-class=" tab-content col-12 col-md-7 bs-stepper-content"
      nav-class=" step align-items-baseline flex-row flex-nowrap overflow-auto flex-lg-column"
      active-nav-item-class="nav-link step"
      nav-wrapper-class="py-1 px-0 col-12 col-md-3 bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline"
    >

      <b-tab active>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Plans </span>
            </span>
          </button>
        </template>

        <div
          class="tab-pane fade show active"
          id="nav-teammates"
          role="tabpanel"
          aria-labelledby="nav-teammates-tab"
        >
          <b-form @submit.prevent="onSubmit">
            <div class="content-header mb-1">
              <h5 class="mb-0">Plan details</h5>
              <small class="text-muted">Select a plan</small>
            </div>

            <div class="bg-white shadow-none mt-1 mb-1">
              <b-card-group
                v-for="plan in subcriptions"
                :key="plan"
                class="flex-column gap-3"
              >
                <b-card class="shadow rounded" v-if="plan?.name === 'Custom'">
                  <!-- <div class="d-flex justify-content-between w-100">
            <h3 class="mb-0 ms-1">{{plan.name}}</h3>
        </div> -->
                  <b-card-text>
                    <p class="py-2 ps-1 fs-5 fw-bold">
                      For custom requests please send an email to
                      <a target="_blanket" href="mailto:ask@gettonote.com">ask@gettonote.com</a>
                    </p>
                  </b-card-text>
                </b-card>
                <b-card class="shadow rounded" v-else>
                  <div
                    class="modern border-bottom-dark pb-1 border-3 border-bottom-dark"
                  >
                    <b-form-radio
                      v-model="individualSelected"
                      name="some-radios "
                      :value="plan?.id"
                    >
                      <div class="d-flex justify-content-between w-100">
                        <h3 class="mb-0 ms-1">{{ plan?.name }}</h3>

                        <h2 class="">₦{{ plan?.amount?.toLocaleString() }}</h2>
                      </div>
                    </b-form-radio>
                  </div>

                  <b-card-text class="py-2">
                    <h4 class="mb-0 ms-1">Plans includes:</h4>
                    <ul
                      v-for="feature in plan?.features"
                      :key="feature?.id"
                      class="list-group"
                    >
                      <li class="list-group-item border-0">
                        <span
                          >{{ feature?.name }}:
                          <span class="fw-bold">{{
                            feature?.limit_number
                          }}</span>
                        </span>
                      </li>
                    </ul>
                  </b-card-text>
                </b-card>
              </b-card-group>
            </div>
            <hr class="mt-1 mb-1" />
            <div class="" v-show="getActive?.subscription?.plan?.name == 'Basic' || getActive?.subscription?.plan?.name == 'Pro' ">
              <button :disabled="!individualSelected" @click="modalShow" class="rounded btn btn-primary">
                <span class="align-middle d-inline-block">Upgrade</span>
              </button>
            </div>
          </b-form>
        </div>
      </b-tab>

      <!-- <b-tab>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 2 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Payments method</span>
            </span>
          </button>
        </template>
        <div
          class="tab-pane"
          id="nav-teammates"
          role="tabpanel"
          aria-labelledby="nav-teammates-tab"
        >
          <div class="content-header mb-1">
            <h5 class="mb-0">Add a New Card</h5>
            <small class="text-muted"
              >Select your preferred payment partner to proceed</small
            >
          </div>
          <div class="payment-card justify-content-between mb-1 mt-2">
            <b-form-group v-slot="{ ariaDescribedby }">
              <div class="card-body rounded-3">
                <b-form-radio
                  class=""
                  v-model="selected"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="A"
                  >Pay with Paystack</b-form-radio
                >
              </div>
              <div class="card-body rounded-3">
                <b-form-radio
                  class=""
                  v-model="selected"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="B"
                  >Pay with Flutterwave</b-form-radio
                >
              </div>
            </b-form-group>
          </div>

          <div class="">
            <button class="rounded btn btn-primary">
              <span class="align-middle d-inline-block">Proceed</span>
            </button>
          </div>
        </div>
      </b-tab> -->
      <b-tab>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 2 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">History</span>
            </span>
          </button>
        </template>
        <div
          class="tab-pane"
          id="nav-teammates"
          role="tabpanel"
          aria-labelledby="nav-teammates-tab"
        >
          <div class="content-header mb-1">
            <h5 class="mb-0">History</h5>
          </div>
          <div class="payment-card justify-content-between mb-1 mt-2">
            
             <b-table striped hover :items="transactions ? transactions : []" :fields="fields">
             <template #cell(created_at)="data">
                <div>
                <p class="mb-0">{{formatDate(data?.item?.created_at)}}</p>
                </div>
              </template>
             <template #cell(total)="data">
      <div >
        <p class="mb-0">₦{{ data?.item?.total?.toLocaleString("en-US") }}</p>
      </div>
    </template>
             </b-table>

         
         </div>
        </div>
      </b-tab>
    </b-tabs>
  </section>
</template>
<script>
import ToNote from "@/Services/Tonote";
import { ref } from "vue";
import paystack from "vue3-paystack";
import { useToast } from "vue-toast-notification";
import { dateFormat } from "@/Services/helpers";
import { mapState } from "vuex";
// const individualSelected = ref();
const toast = useToast();
export default {
  name: "BillingsPage",
  
  
  components: {
    paystack,
   
  },
  data() {
    return {
           modalShow: false,
      paymentConfirmation: false,
      pageLength: 3,
      individualSelected : '',
      transactionSummary: {},
      perPage: [10, 20, 30, 40, 50],
      plans: {},
      fields: [
        { label: "Date", key: "created_at" },
        { label: "Amount", key: "total" },
        { label: "Status", key: "status" },
        // {label: "Type", key: "payment_gateway" },
      ],
     items: [],

      
    };
  },
    computed: {
        ...mapState("TeamsModule", ["Teams", "subcriptions"]),
        ...mapState('ProfileModule', ['userProfile', 'transactions']),

    getEmail(){
      return this.userProfile.email
    
    },
    
    getPublicKey(){
      return process?.env?.VUE_APP_PAYSTACK_PUBLIC_KEY
    },

    getActive() {
      const active = this?.Teams?.find((element) => element?.active == true);
      return active;
    },

    remainingEnvelops(){
      const number = this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.limit_number - this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.executed  ;
     console.log(number, 'number')
     return number
    }
  },
  
  methods: {
     formatDate: dateFormat,

    showModal() {
      this.modalShow = true;
    },
    onSubmit() {
      const planData = {
        transactionable_type: "Plan",
        transactionable_id: this.individualSelected,
        platform_initiated: "Web",
      };

      ToNote.post("/transactions", planData)
        .then((res) => {
          this.transactionSummary = res?.data?.data;
          this.modalShow = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSuccessfulPayment: function (response) {
      this.modalShow = false;
      ToNote.put(`/transactions/${response.reference}`, {
        payment_gateway: "Paystack",
      })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {

          this.$store.dispatch("ProfileModule/getUser");
          
          this.paymentConfirmation = true;
          this.individualSelected = " "
          toast.success("Payment Successful", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
          this.$store.dispatch("TeamsModule/getSubcriptions")
          this.$store.dispatch("TeamsModule/getTeams")
          this.$store.dispatch("ProfileModule/getTransactions")
        })
        .catch((err) => {
          toast.error("An error occurred", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
          console.log(err);
        });
    },
    onCancelledPayment: function () {
      console.log("Payment cancelled by user");
    },



  },
};
</script>

<style>
.card .form-check-label {
  width: 100% !important;
}

.payment-card .card-body {
  background-color: #f9f9f9;
  margin-bottom: 1rem;
  width: 100%;
}
.confimation__logo {
  height: 120px;
  width: 120px;
}
</style>
