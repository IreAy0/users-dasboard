<template>
  <div class="container">
   
    <TableSkeleton v-if="affidavits == null"/>
    <!-- <PuSkeleton  width="30px" height="20px" count="3"/> -->
    <div v-else>
      <ul  class="nav nav-tabs mb-2 demo-horizontal-spacing" role="tablist">
        <li class="nav-item">
          <a id="affidavit-tab" data-bs-toggle="tab" href="#affidavit" role="tab" aria-selected="true"
            class="btn btn-outline-primary waves-effect" :class="{ active: isAffidavitActive }">
            Affidavit Request 
            <span class="badge bg-secondary badge-center ms-1">
              {{ countAffidavit?.length > 0 ? countAffidavit?.length : 0 }}
            </span>
          </a>
        </li>
  
        <li class="nav-item ms-2">
          <a id="notary-tab" data-bs-toggle="tab" href="#notary" role="tab" aria-selected="true" 
          class="btn btn-outline-primary waves-effect"
            :class="{ active: isNotaryActive }">
                 Notary Requests 
                 <span class="badge bg-secondary badge-center ms-1">
                  {{ countNotaryRequest?.length > 0  ? countNotaryRequest?.length : 0 }}
                 </span>
          </a>
        </li>
  
        <li class="nav-item ms-2">
          <a id="videoSign-tab" data-bs-toggle="tab" href="#videoSign" role="tab" aria-selected="true"
            class="btn btn-outline-primary waves-effect" :class="{ active: isActive }">
            Video Sign   
            <span class="badge bg-secondary badge-center ms-1">
              {{ tableRecord.length }}
            </span>
          </a>
        </li>
      </ul>
     
      
      <!-- <AnalyticsPage /> -->
      <div class="tab-content">
        <div
          class="tab-pane"
          :class="{ active: isAffidavitActive }"
          id="affidavit"
          aria-labelledby="affidavit-tab"
          role="tabpanel"
        >
          <AffidavitRequest :data="countAffidavit"/>
        </div>
  
        <div
          class="tab-pane"
          :class="{ active: isNotaryActive }"
          id="notary"
          aria-labelledby="notary-tab"
          role="tabpanel"
        >
          <NotaryRequest />
        </div>
  
        <div
          class="tab-pane"
          :class="{ active: isActive }"
          id="videoSign"
          aria-labelledby="videoSign-tab"
          role="tabpanel"
        >
          <VideoSign />
        </div>
      </div>
    </div>
    
  </div>

</template>

<script setup>
// import { Icon } from "@iconify/vue";
import AffidavitRequest from "./folders/AffidavitRequest";
import NotaryRequest from "./folders/NotaryRequest";
import VideoSign from "./folders/VideoSign";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getToken } from "@/Services/helpers";
import { useGetters, useActions } from "vuex-composition-helpers";
import TableSkeleton from '@/components/Loader/TableSkeleton'

const uri = ref("");
const token = getToken()
const route = useRouter();
const isAffidavitActive = ref(false);
const isActive = ref(false);
const isNotaryActive = ref(false);

const { allSessionRecord, affidavits } = useGetters({
  allSessionRecord: "schedule/allSessionRecord",
  affidavits: "schedule/affidavits",
  
});

const { getAffidavitRequest, getSessionRecordToday, getSessionRecords} = useActions({
  getAffidavitRequest: "schedule/getAffidavitRequest",
  getSessionRecordToday: "schedule/getSessionRecordToday",
  getSessionRecords: "schedule/getSessionRecords",
})

// const { getSessionRecords } = useActions({
//   getSessionRecords: "schedule/getSessionRecords",
// });


const countAffidavit = computed(() => {
  return affidavits.value?.filter((respond) => respond.entry_point == "Affidavit");
});

const countNotaryRequest = computed(() => {
  return affidavits?.value?.filter((respond) => respond.entry_point == "Notary");
});

const tableRecord = computed(() => {
  return allSessionRecord?.value?.filter((respond) => respond.entry_point == "Video");
});

onMounted(() => {
  // getAffidavitRequest();
  // getSessionRecords(token, );
  uri.value = route.currentRoute.value.query;
  isAffidavitActive.value = uri.value.page === undefined ? true : false;
  isNotaryActive.value = uri.value.page === "notary-request" ? true : false;
  isActive.value = uri.value.page === "video-sign" ? true : false;
});

</script>

<style scoped>
.nav-item .card {
  min-width: 270px !important;
}

.show li {
  list-style: none;
}

.nav-tabs .nav-link.active {
  background-color: #003bb3 !important;
  border-radius: 2px;
  /* border-bottom: 2px solid #ff9f43 !important; */
}

.nav-tabs .nav-link:hover {
  background-color: #b8cdf3 !important;
  /* border-bottom: 2px solid #ff9f43 !important; */
}

/* .nav-tabs .nav-link:hover .h5 {
  color: #fff !important;
} */
.nav-tabs .nav-link.active .h5 {
  color: #fff !important;
}
</style>
