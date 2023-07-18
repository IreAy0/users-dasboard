<template>
  <div>
      <div>
        <div class="content-header mb-1">
          <h4 class="mb-0 text-primary font-weight-bold">Saved Cards</h4>
          <!-- <small class="text-muted">Select a plan</small> -->
        </div>
       
        <div v-if="cards.length !== 0" class="bg-white shadow-none mt-3 ">
          <b-card   no-body class="overflow-hidden shadow-none mb-1" style="max-width: 450px;" :key="index + 1" v-for="(card, index) in cards">
          
            <div class="d-flex justify-content-between ">
              <a  @click="setDefaultCard(card.id)" class="text-primary mb-50 font-weight-bold">Set as default card</a>
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
        <div v-else>
          <div class="text-center w-50 m-auto">
            <svg viewBox="0 0 181 138"><path d="m.799 62.681 30.618 66.871a6.336 6.336 0 0 0 8.375 3.113l4.86-2.221 112.56-51.533a6.331 6.331 0 0 0 3.119-8.37L133.275 11.48l-3.544-7.803a6.35 6.35 0 0 0-8.375-3.112L3.936 54.31a6.344 6.344 0 0 0-3.13 8.369z" fill="#B3B9C6"/><path d="m.799 62.681 30.618 66.871a6.336 6.336 0 0 0 8.375 3.113l4.86-2.221 112.56-51.533a6.331 6.331 0 0 0 3.119-8.37L133.275 11.48l-3.544-7.803a6.35 6.35 0 0 0-8.375-3.112L3.936 54.31a6.344 6.344 0 0 0-3.13 8.369z" fill="#fff" opacity=".1"/><path d="M142.14 30.8 13.23 89.818l15.086 32.952 128.91-59.018L142.14 30.8z" fill="#B3B9C6"/><path d="M142.14 30.8 13.23 89.818l15.086 32.952 128.91-59.018L142.14 30.8z" fill="#fff" opacity=".3"/><path d="M136.8 46.045 55.339 83.341l5.4 11.793 81.46-37.296-5.399-11.793z" fill="#B3B9C6"/><path d="M136.8 46.045 55.339 83.341l5.4 11.793 81.46-37.296-5.399-11.793z" fill="#fff" opacity=".8"/><path d="M137.72 18.792 8.71 78.349l8.122 17.594 129.01-59.557-8.122-17.594z" fill="#B3B9C6"/><path d="M137.72 18.792 8.71 78.349l8.122 17.594 129.01-59.557-8.122-17.594z" opacity=".3"/><path d="m18.305 63.52 26.348 66.901 112.56-51.533a6.33 6.33 0 0 0 3.118-8.37l-27.057-59.062-111.4 43.872a6.344 6.344 0 0 0-3.567 8.192z" fill="#B3B9C6"/><path d="m26.142 55.557 121.85-42.791a6.33 6.33 0 0 1 8.05 3.869l24.37 69.393a6.339 6.339 0 0 1-3.863 8.056l-121.85 42.79a6.347 6.347 0 0 1-8.056-3.867l-24.37-69.394a6.338 6.338 0 0 1 3.87-8.056z" fill="#B3B9C6"/><path d="m26.142 55.557 121.85-42.791a6.33 6.33 0 0 1 8.05 3.869l24.37 69.393a6.339 6.339 0 0 1-3.863 8.056l-121.85 42.79a6.347 6.347 0 0 1-8.056-3.867l-24.37-69.394a6.338 6.338 0 0 1 3.87-8.056z" fill="#fff" opacity=".1"/><path d="M165.37 43.19 31.6 90.166l10.601 30.187 133.77-46.975-10.601-30.187z" fill="#B3B9C6"/><path d="M165.37 43.19 31.6 90.166l10.601 30.187 133.77-46.975-10.601-30.187z" fill="#fff" opacity=".3"/><path d="m149.36 28.499-27.652 9.71 1.513 4.308 27.651-9.71-1.512-4.308z" fill="#B3B9C6"/><path d="m149.36 28.499-27.652 9.71 1.513 4.308 27.651-9.71-1.512-4.308z" fill="#fff" opacity=".8"/><path d="m167.88 81.252-22.185 7.79.791 2.252 22.185-7.79-.791-2.252z" fill="#B3B9C6"/><path d="m167.88 81.252-22.185 7.79.791 2.252 22.185-7.79-.791-2.252z" fill="#fff" opacity=".8"/><path d="m169.39 85.559-28.588 10.039.79 2.251L170.18 87.81l-.79-2.251z" fill="#B3B9C6"/><path d="m169.39 85.559-28.588 10.039.79 2.251L170.18 87.81l-.79-2.251z" fill="#fff" opacity=".8"/><path d="m67.458 118.45-14.294 5.02 1.7 4.842 14.295-5.019-1.701-4.843z" fill="#B3B9C6"/><path d="m67.458 118.45-14.294 5.02 1.7 4.842 14.295-5.019-1.701-4.843z" fill="#fff" opacity=".8"/><path d="m143.88 76.967 16.691-5.86a3.545 3.545 0 0 0 2.162-4.494 3.543 3.543 0 0 0-4.495-2.161l-16.697 5.865a3.546 3.546 0 0 0-2.162 4.495 3.547 3.547 0 0 0 4.501 2.155zm-28.59 10.042 16.697-5.865a3.545 3.545 0 0 0 2.156-4.471 3.544 3.544 0 0 0-4.495-2.156l-16.691 5.865a3.546 3.546 0 0 0-2.162 4.495 3.545 3.545 0 0 0 4.495 2.132zM86.718 97.05l16.697-5.865a3.544 3.544 0 0 0 2.144-4.471 3.544 3.544 0 0 0-4.495-2.156L84.355 90.4a3.544 3.544 0 0 0-2.156 4.495 3.544 3.544 0 0 0 4.518 2.156zm-28.605 10.04 16.697-5.865a3.548 3.548 0 0 0 2.162-4.471 3.544 3.544 0 0 0-4.495-2.156l-16.697 5.865a3.544 3.544 0 0 0-2.162 4.494 3.544 3.544 0 0 0 4.495 2.133z" fill="#B3B9C6"/><path d="m143.89 76.968 16.691-5.859a3.545 3.545 0 0 0 2.162-4.495 3.543 3.543 0 0 0-4.495-2.161l-16.697 5.865a3.546 3.546 0 0 0-2.162 4.495 3.546 3.546 0 0 0 4.501 2.155zm-28.6 10.042 16.697-5.865a3.545 3.545 0 0 0 2.156-4.471 3.544 3.544 0 0 0-4.495-2.156l-16.691 5.865a3.546 3.546 0 0 0-2.162 4.495 3.545 3.545 0 0 0 4.495 2.132zM86.719 97.05l16.697-5.865a3.544 3.544 0 0 0 2.144-4.471 3.544 3.544 0 0 0-4.495-2.156L84.356 90.4a3.544 3.544 0 0 0-2.156 4.495 3.544 3.544 0 0 0 4.518 2.156zm-28.605 10.04 16.697-5.865a3.547 3.547 0 0 0 2.162-4.471 3.544 3.544 0 0 0-4.495-2.156l-16.697 5.865a3.545 3.545 0 0 0-2.162 4.494 3.543 3.543 0 0 0 4.495 2.133z" fill="#fff" opacity=".8"/><path d="m152.56 44.932-14.856 5.217a2.422 2.422 0 0 0-1.483 3.088l3.096 8.815a2.422 2.422 0 0 0 3.087 1.483l14.857-5.217a2.422 2.422 0 0 0 1.483-3.088l-3.096-8.816a2.422 2.422 0 0 0-3.088-1.482z" fill="#B3B9C6"/><path d="m152.56 44.932-14.856 5.217a2.422 2.422 0 0 0-1.483 3.088l3.096 8.815a2.422 2.422 0 0 0 3.087 1.483l14.857-5.217a2.422 2.422 0 0 0 1.483-3.088l-3.096-8.816a2.422 2.422 0 0 0-3.088-1.482z" opacity=".3"/><path d="M62.904 61.316a8.534 8.534 0 0 0-10.885-5.233L40.017 60.59l-.154.04-.354.149-.219.082a8.27 8.27 0 0 0 6.09 15.357l11.364-3.78a9.59 9.59 0 0 0 .968-.272c.235-.082.466-.177.691-.284a8.529 8.529 0 0 0 4.5-10.566z" fill="#B3B9C6"/><path d="M62.904 61.316a8.534 8.534 0 0 0-10.885-5.233L40.017 60.59l-.154.04-.354.149-.219.082a8.27 8.27 0 0 0 6.09 15.357l11.364-3.78a9.59 9.59 0 0 0 .968-.272c.235-.082.466-.177.691-.284a8.529 8.529 0 0 0 4.5-10.566z" fill="#fff" opacity=".8"/></svg>
            <p class="fs-4 font-weight-bold mt-2">No cards added</p>
          </div>
        </div>
        <!-- <hr class="mt-1 mb-1" /> -->
        <!-- <div>
          <a href="" class="d-inline-flex align-items-center gap-50"> <Icon icon="material-symbols:add" class="" width="20" :inline="true" />Add another card</a>
        </div> -->
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

const setDefaultCard = (id) => {
  // /api/v1/card-default/{id}
  return ToNote.get(`/card-default/${id}`)
                .then(res => {
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
                  
                  console.log('err', err)
                  return err
                })
}
onMounted(() => {
  GetCard()
})


</script>

<style scoped>

</style>