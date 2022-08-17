<template>
  <div class="modal-body">
    <div data-aos="zoom-in" class="d-flex justify-content-between">
       <div class="col-md-6">
        <p class="fw-bold mb-0"> Once we receive payment, your document will be securely passed on to the next available notary. We will connect you via email.</p>
      </div>
      <div class="shadow-lg text-center p-2 price__display">
        <span>Transaction cost</span>
        <p class="h3 text-primary fw-bolder my-0 py-0">&#8358; 4000</p>
        <span class="small">per document</span>
      </div>
    </div>

    <p class="h5 fw-bold my-2">Select payment option</p>

    <div class="payment__options gap-2">
      <label
        v-for="paymentGateway in paymentGateways"
        :key="paymentGateway.id"
        class="payment__option"
        :for="paymentGateway.gateway.name"
      >
        <input
          name="payment_gateway"
          v-model="payment_gateway"
          :value="paymentGateway.gateway.name"
          type="radio"
          :id="paymentGateway.gateway.name"
        />
        <div class="payment__option-content">
          <img
            loading="lazy"
            :src="paymentGateway.gateway.file"
            :alt="paymentGateway.gateway.name"
          />
          <div class="payment__option-details">
            <span> {{ paymentGateway.gateway.name }}</span>
          </div>
        </div>
      </label>
    </div>

    <!-- <div class="payment__button mt-2">
     
    </div> -->
  </div>

  <div class="modal-footer d-flex justify-content-between mt-3">
    <button @click="emits('prevStep')" type="button" class="btn-secondary btn">
      Back
    </button>
    <paystack
      v-if="payment_gateway === 'Paystack'"
      buttonText="Pay now"
      :publicKey="publicKey"
      :email="email"
      :amount="amount"
      :reference="transactionable_id"
      :onSuccess="onSuccessfulPayment"
      :onCanel="onCancelledPayment"
      class="btn btn-primary"
    >
    </paystack>

    <button
      v-if="payment_gateway === 'Flutterwave'"
      type="button"
      class="btn btn-primary"
      @click="openFlutterwave"
    >
      Pay now
    </button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, defineEmits } from "vue";
import paystack from "vue3-paystack";
import { useFlutterwave } from "flutterwave-vue3";
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";

const toast = useToast();
let store = useStore();
const emits = defineEmits(["nextStep", "prevStep", "resetStep"]);

const paymentGateways = computed(
  () => store.state.AffidavitModule.paymentGateways
);
const transactionable_id = computed(
  () => store.state.AffidavitModule.transactionable_id
);

const payment_gateway = ref("");
const userProfile = computed(() => store.state.ProfileModule.userProfile);
const publicKey = process.env.VUE_APP_PAYSTACK_PUBLIC_KEY;
const amount = 400000;
const email = userProfile.value.email;
const firstName = userProfile.value.first_name;
const lastName = userProfile.value.last_name;
const phone = userProfile.value.phone;

const onSuccessfulPayment = (response) => {
  const data = {
    id:
      payment_gateway.value === "Paystack"
        ? response.reference
        : payment_gateway.value === "Flutterwave"
        ? response.tx_ref
        : null,

    payment_gateway: payment_gateway.value,
  };
  
  store.dispatch("AffidavitModule/put_notaryrequesttransaction", data);
  emits("nextStep");
};

const onCancelledPayment = () => {
  toast.error("Payment Cancelled", {
    duration: 3000,
    queue: false,
    position: "top-right",
    dismissible: true,
    pauseOnHover: true,
  });
};

function openFlutterwave() {
  useFlutterwave({
    amount: 4000,
    callback(data) {
      onSuccessfulPayment(data);
    },
    country: "NG",
    currency: "NGN",
    customer: {
      email: email,
      name: `${firstName} ${lastName}`,
      phone_number: phone,
    },
    onclose() {
      toast.error("Payment Cancelled", {
        duration: 3000,
        queue: false,
        position: "top-right",
        dismissible: true,
        pauseOnHover: true,
      });
    },
    payment_options: "card,ussd",
    public_key: process.env.VUE_APP_FLUTTERWAVE_PUBLIC_KEY,
    redirect_url: process.env.VUE_APP_TONOTE_URL,
    tx_ref: transactionable_id.value,
  });
}

onMounted(() => {
  store.dispatch("AffidavitModule/ALL_PAYMENTGATEWAYS");
});
</script>

<style>
.price__display {
  border-radius: 5px;
  border: 1px solid #003bb3;
}

.payment__options {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
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
</style>
