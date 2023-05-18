<template>
  <div>
      <div>
        <div class="content-header mb-1">
          <h4 class="mb-0 text-primary font-weight-bold">Saved Cards</h4>
          <!-- <small class="text-muted">Select a plan</small> -->
        </div>

        <div class="bg-white shadow-none mt-3 ">
          <b-card no-body class="overflow-hidden shadow-none " style="max-width: 450px;">
            <b-row no-gutters class="p-50 align-content-stretch align-items-center shadow rounded border border-primary">
              <b-col md="1">
                <b-card-img style="height:45px; width:45px" src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-3"></b-card-img>
              </b-col>
              <b-col md="5">
                <b-card-body class="p-50 ms-1">
                  <b-card-text>
                    <h5 class="">VISA CARD</h5>
                    Expires 12/2023
                  </b-card-text>
                </b-card-body>
              </b-col>
              <b-col md="">
                <b-card-body class="p-50">
                  <b-card-text>
                    <h4>**** **** **** 4567</h4>
                     
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
import { onMounted }  from 'vue'
import { Icon } from "@iconify/vue";
import { useState, useActions, useGetters, createNamespacedHelpers } from 'vuex-composition-helpers';

const {
  GetCard,
} = useActions({
  GetCard: "PaymentModule/GetCard",
});


onMounted(() => {
  GetCard()
})


</script>

<style scoped>

</style>