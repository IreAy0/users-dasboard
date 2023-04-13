<template>
  <section class="">
    <b-modal id="modal-center" centered hide-footer ref="my-modal" v-model="paymentConfirmation">
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

    <b-modal id="modal-center-sum" centered title="Upgrade Plan" hide-footer ref="my-modal" v-model="modalShow">
      <b-col cols="12" class="p-0 mt-xl-1 mt-2 d-flex">
        <div>

          <h6 v-if="transactionSummary?.title?.includes('Pro')" class="mb-2">You are about to unlock more collaborative
            features by signing up for the pro plan</h6>
          <h6 v-if="transactionSummary?.title?.includes('Business')" class="mb-2">You are about to unlock more
            collaborative features by signing up for the business plan</h6>

          <div class="shadow-lg text-center p-2 price__display">
            <span>Total Due:</span>
            <p class="h3 text-primary fw-bolder my-0 py-0">&#8358;{{ (Math.round(transactionSummary?.total * 100) /
                          100).toLocaleString()}}
            </p>
          </div>

        </div>

      </b-col>
      <b-col cols="12" class="p-0 mt-xl-1 mt-2 ">

        <p class="h5 fw-bold my-2">Select payment option</p>
        <div class="payment__options gap-2">
          <label v-for="paymentGateway in transactionSummary?.payment_methods" :key="paymentGateway.id"
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

      <div class="d-flex justify-content-center my-2">
        <button v-if="payment_gateway?.name === 'Flutterwave'" type="button" class="btn btn-primary"
          @click="openFlutterwave">
          Pay Now with Flutterwave
        </button>
        <paystack v-if=" payment_gateway?.name === 'Paystack'" buttonClass="' rounded btn btn-primary bg-primary'"
          buttonText="Pay Now With Paystack" :publicKey="getPublicKey" :email="getEmail" :amount="payment_gateway?.total * 100"
          :reference="transactionSummary?.id" :onSuccess="onSuccessfulPayment" :onCancel="onCancelledPayment"></paystack>

        <button v-if="payment_gateway?.name === 'Credo'" type="button" class="btn btn-primary" @click="openCredo">
          Pay Now with Credo
        </button>
      </div>
    </b-modal>

    <b-tabs v-model="tabIndexAdv1"
      class="modern-horizontal-wizard bs-stepper wizard-modern modern-wizard-example d-flex flex-column flex-lg-row"
      content-class=" tab-content col-12 col-md-9 bs-stepper-content"
      nav-class=" step align-items-baseline flex-row flex-nowrap overflow-auto flex-lg-column"
      active-nav-item-class="nav-link step"
      nav-wrapper-class="py-1 px-0 col-12 col-md-3 bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline">

      <b-tab>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Plans </span>
            </span>
          </button>
        </template>

        <div class="tab-pane fade show active" id="nav-teammates" role="tabpanel" aria-labelledby="nav-teammates-tab">
          <b-form @submit.prevent="onSubmit">
            <div class="content-header mb-1">
              <h5 class="mb-0">Plan details</h5>
              <small class="text-muted">Select a plan</small>
            </div>

            <div class="bg-white shadow-none mt-1 mb-1">
              <b-card-group v-for="plan in subcriptions" :key="plan" class="flex-column gap-3">
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
                  <div class="modern border-bottom-dark pb-1 border-3 border-bottom-dark">
                    <b-form-radio v-model="individualSelected" name="some-radios " :value="plan?.id">
                      <div class="d-flex justify-content-between w-100">
                        <h3 class="mb-0 ms-1">{{ plan?.name }}</h3>

                        <h2 class="">₦{{ plan?.amount?.toLocaleString() }}</h2>
                      </div>
                    </b-form-radio>
                  </div>

                  <b-card-text class="py-2">
                    <h4 class="mb-0 ms-1">Plans includes:</h4>
                    <ul v-for="feature in plan?.features" :key="feature?.id" class="list-group">
                      <li class="list-group-item border-0">
                        <span>{{ feature?.name }}:
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
            <div class=""
              v-show="getActive?.subscription?.plan?.name == 'Basic' || getActive?.subscription?.plan?.name == 'Pro' || getActive?.subscription?.plan?.trial == true">
              <button :disabled="!individualSelected" @click="modalShow" class="rounded btn btn-primary">
                <span class="align-middle d-inline-block">Upgrade</span>
              </button>
            </div>
          </b-form>
        </div>
      </b-tab>


      <b-tab>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 2 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">History</span>
            </span>
          </button>
        </template>
        <div class="tab-pane" id="nav-teammates" role="tabpanel" aria-labelledby="nav-teammates-tab">
          <div class="content-header mb-1">
            <h5 class="mb-0">History</h5>
          </div>
          <div class="payment-card justify-content-between mb-1 mt-2">
            <b-table striped hover per-page="10" :current-page="currentPage" :items="transactions|| []" :fields="fields">
              <template #cell(created_at)="data">
                <div>
                  <p class="mb-0">{{ formatDate(data?.item?.created_at) }}</p>
                </div>
              </template>
              <template #cell(total)="data">
                <div>
                  <p class="mb-0">₦{{data?.item?.total?.toLocaleString("en-US")}}</p>
                </div>
              </template>
            </b-table>

            <b-pagination class="my-2" v-model="currentPage" :total-rows="transactions?.length" :per-page="perPage"
              aria-controls="myTable"></b-pagination>
          </div>
        </div>
      </b-tab>

      <b-tab active>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 3 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">New Billings </span>
            </span>
          </button>
        </template>

        <div class="tab-pane fade show " id="nav-teammates" role="tabpanel" aria-labelledby="nav-teammates-tab">
        
            <BillingNew :active_team="getActive" />

         

         
         
        </div>
      </b-tab>
    </b-tabs>
    <!-- {{ getActive}} -->
  </section>
</template>
<script>
import ToNote from "@/Services/Tonote";
import paystack from "vue3-paystack";
import { useFlutterwave,  } from "flutterwave-vue3";
import { useToast } from "vue-toast-notification";
import { dateFormat } from "@/Services/helpers";
import { mapActions, mapState } from "vuex";
import store from "@/store";
import BillingNew from "./Billing_new"
// import UpgradeNew from'./Upgrade'
// const individualSelected = ref();

const payStackKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_STAGING : process.env.VUE_APP_PAYSTACK_PUBLIC_KEY_LIVE
const flutterwaveKey = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_STAGING : process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY_LIVE
const redirect_url = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_BASE_URL_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_BASE_URL_STAGING : process.env.VUE_APP_BASE_URL_LIVE


const $toast = useToast();
export default {
  name: "BillingsPage",
  components: {
    paystack,
    BillingNew,
  },
  data() {
    return {
      payment_gateway: "",
      modalShow: false,
      paymentConfirmation: false,
      pageLength: 3,
      individualSelected: '',
      transactionSummary: {},
      perPage: 10,
      currentPage: 1,
      plans: {},
      fields: [
        { label: "Date", key: "created_at" },
        { label: "Amount", key: "total", sortable: true },
        { label: "Status", key: "status",},
        // { label: "Status", key: "status" },
        // {label: "Type", key: "payment_gateway" },
      ],
      items: [
          { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
          { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
          { id: 3, first_name: 'Barney', last_name: 'Rubble' },
          { id: 4, first_name: 'Betty', last_name: 'Rubble' },
          { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
          { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
          { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
          { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
          { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
      ],


    };
  },
  computed: {
    ...mapState("TeamsModule", ["Teams", "subcriptions", "upgradePlan"]),
    ...mapState('ProfileModule', ['userProfile', 'transactions']),
    ...mapState('AffidavitModule', ['paymentGateways']),
    rows() {
        return this.items.length
      },

    getEmail() {
      return this?.userProfile?.email

    },

    getPublicKey() {
      return  payStackKey
    },

    getActive() {
      const active = this?.Teams?.find((element) => element?.active == true);
      return active;
    },

    remainingEnvelops() {
      const number = this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.limit_number - this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.executed;
      return number
    }
  },

  methods: {
        ...mapActions("AffidavitModule", ["ALL_PAYMENTGATEWAYS"]),
        // ...mapActions('ProfileModule', ['getUser', 'getPrints', 'getDashboardData', 'getTransactions']),

    formatDate: dateFormat,

    showModal() {
      this.modalShow = true;
      // this.ALL_PAYMENTGATEWAYS();
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
          // console.log(err);
        });
    },

    onSuccessfulPayment: function(response) {
      this.modalShow = false;
      ToNote.put(`/transactions/${this.payment_gateway?.name === "Paystack"
        ? response.reference
        : this.payment_gateway?.name === "Flutterwave"
        ? response.tx_ref
        : null}`,
        
        {
        payment_gateway: this.payment_gateway?.name,
      })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {

          this.$store.dispatch("ProfileModule/getUser");

          this.paymentConfirmation = true;
          this.individualSelected = " "
          $toast.success("Payment Successful", {
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
          $toast.error("An error occurred", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         
        });
   },
    onCancelledPayment: function () {
      this.payment_gateway=""
      $toast.error("Payment Cancelled", {
        duration: 3000,
        queue: false,
        position: "top-right",
        dismissible: true,
        pauseOnHover: true,
      });
    },

    openCredo(){
       const transRef = this.transactionSummary?.id
      window.CredoCheckout({
              transRef, //Please generate your own transRef (20 characters max) that is unique for each transaction
              amount: this.transactionSummary?.total,
              // redirectUrl: "https://merchant-test-line.netlify.app/successful",
              paymentOptions: ["CARDS", "BANK"],
              currency: "NGN",
              customerName:  `${this?.userProfile?.first_name} ${this?.userProfile?.last_name}`,
              customerEmail: this?.userProfile?.email ,
              customerPhoneNo: this?.userProfile?.phone,
              onClose: function(){
                  console.log("Modal closed")
              },
              callback: function(){
                  console.log("Payment Successful");
              },
              publicKey: "pk_demo-Ghz9Wo4cGeebxzDwfNZdooKLFtX7op.cXgwh6MyBs-d" // You should store your API key as an environment variable
            })
    },
openFlutterwave() {
   const hold = this.onSuccessfulPayment
  useFlutterwave(
    {
    amount: this.payment_gateway?.total,
    // callback(data) {
    //   // console.log(data);
    //   this.onSuccessfulPayment(data)
    // },
    country: "NG",
    currency: "NGN",
    customer: {
      email: this?.userProfile?.email,
      name: `${this?.userProfile?.first_name} ${this?.userProfile?.last_name}`,
      phone_number: this?.userProfile?.phone,
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
    payment_options: "card,ussd",
    public_key: flutterwaveKey,
    // redirect_url: redirect_url+'/admin/payment-confirmation',
    tx_ref: this.transactionSummary?.id,
    callback: function(data){
        hold(data)
      setTimeout(function() {
         window.location.href = redirect_url+ '/admin/payment-confirmation'
}, 2000);
    },
  });
},
  },


  mounted() {
    this.ALL_PAYMENTGATEWAYS();
    // this.getTransactions();
    this.$store.dispatch("AffidavitModule/ALL_PAYMENTGATEWAYS")
   this.$store.dispatch("ProfileModule/getTransactions");
   this.$store.dispatch("TeamsModule/getTeams")
    this.to
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://www.credocentral.com/inline.js')
      document.head.appendChild(recaptchaScript)
    
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
</style>
