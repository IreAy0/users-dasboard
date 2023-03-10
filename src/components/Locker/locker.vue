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
                      <!-- <small
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
                      </small> -->
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
                         
                           
                            <div @click="cancelSessionModal(result.id)" class="dropdown-item">
                              <Icon icon="mdi:cancel" />
                              Delete
                            </div>
                            <div class="dropdown-item" @click="$event => shareDocumentModal(result.id)">
                              <Icon icon="carbon:share" /> Share
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
      <p class="text-center my-2">Are you sure you want to cancel this Document?</p>
    </template>

    <template #footer>
      <button class="btn btn-sm btn-secondary" @click="deleteLockerDocument(false)">
        No
      </button>
      <button class="btn btn-sm btn-primary" @click="deleteLockerDocument(true)">
        Yes
      </button>
    </template>
  </ModalComp>
  <ModalComp :show="shareModal" :size="'modal-sm'" @close="shareModal = false">
    <template #header>
      <h4 class="text-primary mb-0">
        <!-- <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" /> -->
        Share with others
      </h4>
    </template>

    <template #body>
      <!-- <p class="text-center my-2">Are you sure you want to cancel this Document?</p> -->
      <input type="email" class="form-control" id="email" placeholder="Please Enter email"
        :style="error_message.email && 'border: 1px solid red'"  v-model="email"
        @change="error_message.email = null" />
    </template>

    <template #footer>
      <button class="btn btn-sm btn-secondary" @click="deleteLockerDocument(false)">
        cancel
      </button>
      <button :disabled="loading" class="btn btn-sm btn-primary" @click="shareLockerDocument(true)">
        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
        Share
      </button>
    </template>
  </ModalComp>
  <div>
    <ModalComp :show="otpModal == false ? true : false"  :size="'modal-sm'" @close="otpModal = false">
      <template #header>
        <h4 class="text-primary mb-0">
          <!-- <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" /> -->
          Enter OTP 
        </h4>
      </template>
  
      <template #body>

        <a class="text-center my-2">We have sent an OTP to <span class="text-primary text-bold">{{profile?.email}}</span>  <br/>
           If you don't get a code, please request another
        </a>
        <div>
          <p  @click="resendOtp(true)" class="text-primary text-right mt-1 mb-0">Resend</p>
        </div>
        <input type="number" class="form-control" id="otp" placeholder="Please Enter Otp"
          :style="error_message.otp && 'border: 1px solid red'"  v-model="otp"
          @change="error_message.otp = null" />

      </template>
  
      <template #footer>
        <button :disabled="loading" class="btn btn-sm btn-primary" @click="otpLocker(true)">
          <span v-show="loading" class="spinner-border spinner-border-sm"></span>
          Proceed
        </button>
      </template>
    </ModalComp>
  </div>
  
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";
import ModalComp from "@/components/ModalComp.vue";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import { useStore } from 'vuex'
import UploadDocument from './UploadDocument';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import { useToast } from "vue-toast-notification";
import $ from "jquery";
import { getToken } from "@/Services/helpers";
import ToNote from "@/Services/Tonote";

const $toast = useToast();
const store = useStore()

const today = moment().format("YYYY-MM-DD");

const profile = computed(() => store.state.ProfileModule.userProfile)

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
  getLockerDocuments,
  deleteDocument,
  getUser
} = useActions({
  getLockerDocuments: "locker/getLockerDocuments",
  deleteDocument: "locker/deleteDocument",
  getUser: "ProfileModule/getUser",
});


const data = ref("");
// data.value = request;
const email = ref("");
const error_message =({
  email: "",
  otp: ""
})
const otp = ref("");
const cancelModal = ref(false);
const shareModal = ref(false);
const otpModal = ref(profile.value.access_locker_documents)
const questionModal = ref(false);
const document_id= ref("")
const sessionId = ref("");
const loading = ref(false)
const openSessionModal = () => {
  // sessionId.value = id;
  questionModal.value = true;
};

const cancelSessionModal = (id) => {
  sessionId.value = id;
  cancelModal.value = true;
};

const shareDocumentModal = (id) => {
  document_id.value = id;
  shareModal.value = true;
};

const deleteLockerDocument = (params) => {
  if (params) {
    let formData = { id: sessionId.value};
    // console.log(formData);
    deleteDocument(formData);
    cancelModal.value = false;
  } else {
    cancelModal.value = false;
  }
};
const shareLockerDocument = (params) => {
  if (params) {
    let formData = { id: sessionId.value};
    let documents = [
      {
      "document_id": document_id.value,
      "email": email.value
      }
    ]
    loading.value = true;
    ToNote.put(`/document-share/${document_id.value}`, {documents} )
      .then(res => {
        shareModal.value = false;
        loading.value = false;
        $toast.success("shared successfully", {
        timeout: 5000,
        position: "top-right",
      });
      }).catch(err => {
        shareModal.value = false;
        loading.value = false;
        $toast.error(err.message, {
        timeout: 5000,
        position: "top-right",
      });
      })

    
  } else {
    shareModal.value = false;
  }
};

const otpLocker = (params) => {
  if (params) {
    let documents = {
      "email": profile.value.email,
      "otp": `${otp.value}`
      }
      loading.value = true;
    ToNote.post(`/document-otp-locker`, documents)
      .then(res => {
        otpModal.value = true;
        getUser()
        loading.value = false;
        $toast.success("updated successfully", {
        timeout: 5000,
        position: "top-right",
      });
      }).catch(err => {
        loading.value = false;
        $toast.error(err.response.data.data.error, {
        timeout: 5000,
        position: "top-right",
      });
      })
  } else {
    otpModal.value = false;
  }
};

const resendOtp = (params) => {
  if(params){
    ToNote.get('/document-otp-locker')
        .then(res => {
          $toast.success(res?.data?.message, {
        timeout: 5000,
        position: "top-right",
      });
        })
        .catch((err) => {
          $toast.error(err.message);
        })
  }

}
const reschedule = ref({});


const  getEnv = () =>{
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
  if(profile.value?.access_locker_documents === false){
    // /api/v1/document-otp-locker
      ToNote.get('/document-otp-locker')
        .then(res => {
          $toast.success(res?.data?.message, {
        timeout: 5000,
        position: "top-right",
      });
        })
        .catch((err) => {
          $toast.error(err.message);
        })
    }
});

onUpdated(() => {
  
  
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#allrecord")) {
      $("#allrecord").DataTable();
    } else {
      if (allLockerDocuments.value.length > 0) {
        $("#allrecord").DataTable({
          columnDefs: [{ orderable: false, targets: [0, 4] }],
          order: [[3, "desc"]],
          aaSorting: [],
          // sPrevious: "Previous page", // This is the link to the previous page
          // sNext: "Next page", // This is the link to the next page  
          lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"],
          ],
         
          pageLength: 5,
        });
      }
    }
  }, 100);
});

</script>

<style>
.text-right{
  text-align: right;
  cursor: pointer
}
.backdrop {
  backdrop-filter: blur(4px);

}
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
