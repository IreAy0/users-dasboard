<template>
  <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
     
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Locker Documents</h4>
            <div class="wrap">
              <span
              @click="openSessionModal()"
              
                class="btn btn-primary waves-effect"
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
                <span>Upload Document</span>
              </span>
            </div>
          </div>
          <div class="card-body py-4">
            <div class="table-responsive">
              <table class="table table-hover" id="allrecord">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Document Title</th>
                    
                    <th>Time</th>
                    <th>Status</th>
                   
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, index) in allLockerDocuments.filter(result => result.status == 'Locked')" :key="index">
                    <!-- <template v-if="result.entry_point === 'Video'"> -->
                    <td>{{ ++index }}</td>

                    <td>
                      <h6
                        class="user-name text-truncate mb-0"
                        style="width: 300px"
                      >
                        {{ result.title }}
                      </h6>
                      <small
                        class="badge rounded-pill me-1"
                        :class="[
                          result.immediate == true
                            ? 'badge-light-danger'
                            : 'badge-light-primary',
                        ]"
                      >
                        {{
                          result.immediate == true
                            ? "Immediate Session"
                            : "Scheduled Session"
                        }}
                      </small>
                    </td>

                   <!-- <td>
                      <small class="badge badge-light-primary">
                        Participants {{ result.participants_count }}
                      </small>
                    </td> -->

                    <td>
                      <div class="d-flex flex-column">
                        <h6 class="user-name text-truncate mb-0">
                          {{ dateTime(result.created_at) }}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <span
                        class="badge rounded-pill me-1"
                        :class="[
                          result.status == 'Pending'
                            ? 'bg-warning'
                            : 'bg-success',
                        ]"
                      >
                        {{ result.status }}
                      </span>
                    </td>
                   
                    <td>
                      <div class="dropdown">
                        <a
                          class="btn btn-sm btn-icon dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <Icon
                            icon="oi:ellipses"
                            :rotate="1"
                            :verticalFlip="true"
                          />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                         
                           
                            <div class="dropdown-item">
                              <Icon icon="mdi:cancel" />
                              Delete
                            </div>
                          
                            <div class="dropdown-item">
                              <Icon icon="carbon:download" /> Download
                            </div>
                         
                        </div>
                      </div>

                     
                    </td> 
                    <!-- </template> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalComp
      :show="questionModal"
      :size="modal - sm"
      :footer="false"
      :closeBtn="true"
      @close="questionModal = false"
    >
    <template #header>
      <h4 class="mb-0">
       
       Upload Locker Document
      </h4>
    </template>
      <template #body>
        <UploadDocument  @close="questionModal = false"/>
      </template>
    </ModalComp>


    <ModalComp :show="cancelModal" :size="'modal-sm'" @close="cancelModal = false">
    <template #header>
      <h4 class="text-danger mb-0">
        <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" />
        Alert
      </h4>
    </template>

    <template #body>
      <p class="text-center my-2">Are you sure you want to cancel this session?</p>
    </template>

    <template #footer>
      <button class="btn btn-sm btn-secondary" @click="cancelSession(false)">
        No
      </button>
      <button class="btn btn-sm btn-primary" @click="cancelSession(true)">
        Yes
      </button>
    </template>
  </ModalComp>

  </div>
</template>

<script setup>
// import { request } from "../data.js";
import { ref, onMounted, onUpdated, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";
import ModalComp from "@/components/ModalComp.vue";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import UploadDocument from './UploadDocument';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import $ from "jquery";
import { getToken } from "@/Services/helpers";


const today = moment().format("YYYY-MM-DD");

const dateTime = (date) => {
  return moment(date).format("Do MMM YYYY · h:mm a");
};
const token = getToken()
const {  allLockerDocuments, postLockerDocument } =
  useGetters({
    allLockerDocuments: "locker/allLockerDocuments",
    postLockerDocument: "locker/postLockerDocument",

  });

const {
  getLockerDocuments
} = useActions({
  getLockerDocuments: "locker/getLockerDocuments",
 
});

console.log(postLockerDocument, 'post')

const data = ref("");
// data.value = request;

const cancelModal = ref(false);
const questionModal = ref(false);

const sessionId = ref("");
const openSessionModal = () => {
  // sessionId.value = id;
  questionModal.value = true;
};

const cancelSessionModal = (id) => {
  sessionId.value = id;
  cancelModal.value = true;
};

// const cancelSession = (params) => {
//   if (params) {
//     let formData = { id: sessionId.value};
//     // console.log(formData);
//     deleteSession(formData);
//     cancelModal.value = false;
//   } else {
//     cancelModal.value = false;
//   }
// };


const reschedule = ref({});


const  getEnv =() =>{
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIDEO_SIGN_PAGE_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIDEO_SIGN_PAGE_STAGING : process.env.VUE_APP_VIDEO_SIGN_PAGE_LIVE

    }
  
  
const dateSelected = (data) => {
  reschedule.value.date = moment(data).format("YYYY-MM-DD");
};



onMounted(() => {
  getLockerDocuments()
  // getSessionRecords(token.value);
  // getSessionRecordToday({token: token.value,  entry_point: 'Video'});
  // TimeSlotsAction();
});

onUpdated(() => {
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#allrecord")) {
      $("#allrecord").DataTable();
    } else {
      if (allLockerDocuments.value.length > 0) {
        $("#allrecord").DataTable({
          columnDefs: [{ orderable: false, targets: [0, 4] }],
          // order: [[3, "desc"]],
          aaSorting: [],
          lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"],
          ],
          pageLength: 15,
        });
      }
    }
  }, 1000);
});
</script>

<style>
.vuejs3-datepicker {
  display: block;
}

.vuejs3-datepicker__value {
  width: 100% !important;
  min-width: 200px;
  padding: 0.571rem 1rem !important;
  border: 1px solid #d8d6de !important;
}
</style>
