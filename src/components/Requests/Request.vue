<template>
  <div class="container">
    <ul class="nav nav-tabs mb-2 demo-horizontal-spacing" role="tablist">
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

  <div class="card d-none">
    <div class="card-body">
      <ul class="show" data-bs-popper="none">
        <li class="dropdown-menu-header">
          <div class="dropdown-header d-flex">
            <h4 class="notification-title mb-0 me-auto">Action Required</h4>
            <!-- <div class="badge rounded-pill badge-light-primary">6 New</div> -->
            <router-link
              :to="'/'"
              class="btn btn-sm btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Video sign</span>
            </router-link>
          </div>
        </li>

        <li
          class="my-1 pb-1 row border-bottom scrollable-container media-list ps ps--active-y"
        >
          <div class="col-lg-4">
            <a class="" href="#">
              <div class="list-item d-flex align-items-start">
                <div class="me-1">
                  <div class="avatar bg-light-dark">
                    <div class="avatar-content">NR</div>
                  </div>
                </div>
                <div class="list-item-body flex-grow-1">
                  <div class="media-heading">
                    <span class="fw-bolder text-dark">Notary Request</span>
                  </div>
                  <small class="notification-text"> Lease Agreement</small>
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-4">
            <div class="fw-bold">Status</div>
            <div>
              <small class="badge rounded-pill badge-light-danger"
                >Immediate</small
              >
            </div>
          </div>
          <div class="col-lg-4">
            <button class="btn btn-sm btn-success">Join Now</button>
          </div>
        </li>
        <li
          class="my-1 pb-1 row border-bottom scrollable-container media-list ps ps--active-y"
        >
          <div class="col-lg-4">
            <a class="" href="#">
              <div class="list-item d-flex align-items-start">
                <div class="me-1">
                  <div class="avatar bg-light-dark">
                    <div class="avatar-content">VS</div>
                  </div>
                </div>
                <div class="list-item-body flex-grow-1">
                  <div class="media-heading">
                    <span class="fw-bolder text-dark">Video Sign</span>
                  </div>
                  <small class="notification-text">
                    Service Level Agreement</small
                  >
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-4">
            <div class="fw-bold">Status</div>
            <div>
              <small class="badge rounded-pill badge-light-primary"
                >Scheduled</small
              >
            </div>
          </div>
          <div class="col-lg-4">
            <button
              class="btn btn-sm btn-light text-center"
              disabled
              rounded-pill
            >
              Join Now
            </button>
          </div>
        </li>
      </ul>
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
  getAffidavitRequest();
  getSessionRecords(token);
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
