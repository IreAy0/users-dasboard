<template>
  <div>
      <div>
        <div class="content-header mb-1">
          <h4 class="mb-0 text-primary font-weight-bold">Saved Cards</h4>
          <!-- <small class="text-muted">Select a plan</small> -->
        </div>
       
        <div class="bg-white shadow-none mt-3 ">
          <b-card  no-body class="overflow-hidden shadow-none mb-1" style="max-width: 450px;" :key="index + 1" v-for="(card, index) in cards">
          
            <div class="d-flex justify-content-between ">
              <a class="text-primary mb-50 font-weight-bold">Set as default card</a>
              <a @click="deleteCard(card.id)" class="text-danger mb-50 font-weight-bold">Remove card</a>
            </div>
            
            <b-row no-gutters class="p-50 align-content-stretch align-items-center shadow rounded border border-primary">
              <b-col md="1">
                <b-card-img style="height:45px; width:45px" src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-3"></b-card-img>
              </b-col>
              <b-col md="5">
                <b-card-body class="p-50 ms-1">
                  <b-card-text>
                    <h5 class="text-uppercase">{{card.card_type}} CARD</h5>
                    Expires {{card.exp_month}}/{{card.exp_year}}
                  </b-card-text>
                </b-card-body>
              </b-col>
              <b-col md="">
                <b-card-body class="p-50">
                  <b-card-text>
                    <h4>**** **** **** {{card.last4}}</h4>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
            <hr class="mt-1 mb-1" />
          </b-card>
        </div>
        <!-- <hr class="mt-1 mb-1" /> -->
        <div>
          <a href="" class="d-inline-flex align-items-center gap-50"> <Icon icon="material-symbols:add" class="" width="20" :inline="true" />Add another card</a>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted, computed }  from 'vue'
import { Icon } from "@iconify/vue";
import { useState, useActions, useGetters, createNamespacedHelpers } from 'vuex-composition-helpers';
import { useStore } from 'vuex'
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";

const {
  GetCard,
} = useActions({
  GetCard: "PaymentModule/GetCard",
});

const store = useStore()
const $toast = useToast();

// const { cards } = useState( "PaymentModule", "cards")
const cards = computed(() => (store.state.PaymentModule.cards))

// const { subscriptions } = useState('TeamsModule', ['subcriptions']);
const deleteCard = (id) => {
  return ToNote.delete(`/cards/${id}`)
              .then(res =>{
                GetCard()
                $toast.success(res.data.data.message, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
              })
              .catch(err => {
                $toast.error("An error occurred", {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         return err
              })
}
onMounted(() => {
  GetCard()
})


</script>

<style scoped>

</style>