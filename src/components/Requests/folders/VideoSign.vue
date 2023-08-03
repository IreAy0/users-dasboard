<template>
  <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="">Next Scheduled Meeting Today</h3>
            <!-- <p>You have no scheduled meeting for today</p> -->
            <template v-if="filterDocByNextMeeting?.length > 0 ">
              <template v-for="(result, index) in filterDocByNextMeeting" :key="index">
                <div class="border-bottom py-1 d-flex justify-content-between">
                  <div>
                    <div class="h5">Title: {{ result.title }}</div>
                    <div class="text-mute">
                      {{ dateTime(result.date + " " + result.start_time) }}
                    </div>
                  </div>
                  <div>
                    <a :href="`${getEnv()}document/waiting-page/${result.id}}`" class="btn btn-primary btn-sm">Join
                      now</a>
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              You have no pending scheduled meeting today
            </template>
          </div>
        </div>
      </div>
      <div class="col-12">
        <TableSkeleton v-if="sessionsLoading == true"/>
        <div v-else class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Video Signed Document</h4>
            <div class="wrap">
              <a :href="`${getEnv()}document/video-signing-schedule?qt=${token}`" class="btn btn-primary waves-effect">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-plus">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Video Sign</span>
              </a>
            </div>
          </div>
          
          <div class="card-body pt-2 pb-4">
            <div class="table-responsive">
              <!-- <table class="table table-hover" >
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Document Title</th>
                    <th>Participants</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Connect</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, index) in allSessionRecord?.data" :key="index">
                    <td>{{ ++index }}</td>

                    <td>
                      <h6 class="user-name text-truncate mb-0" style="width: 300px">
                        {{ result.title }}
                      </h6>
                      <small class="badge rounded-pill me-1" :class="[
                                                  result.immediate == true
                                                    ? 'badge-light-danger'
                                                    : 'badge-light-primary',
                                                ]">
                        {{
                                                result.immediate == true
                                                ? "Immediate Session"
                                                : "Scheduled Session"
                                                }}
                      </small>
                    </td>

                    <td>
                      <small class="badge badge-light-primary">
                        Participants {{ result.participants_count }}
                      </small>
                    </td>

                    <td>
                      <div class="d-flex flex-column">
                        <h6 class="user-name text-truncate mb-0">
                          {{ dateTime(result.date + " " + result.start_time) }}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <span class="badge rounded-pill me-1" :class="[
                                                  result.status == 'Pending'
                                                    ? 'bg-warning'
                                                    : 'bg-success',
                                                ]">
                        {{ result.status }}
                      </span>
                    </td>
                    <td>
                      <template v-if="
                                                  result.immediate === 1 &&
                                                  result.date === today &&
                                                  result.end_session === 0 &&
                                                  result.status === 'Pending'
                                                ">
                        <a :href="`${getEnv()}document/waiting-page/${result.id}`" class="btn btn-primary btn-sm">Join</a>
                      </template>
                    </td>
                    <td>
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          
                          <template v-if="result.status !== 'Completed'">
                            <router-link class="dropdown-item" :to="{name: 'admin.preview', params:{ doc_id: result?.document?.id}}" @click="getDocument({
                              id: result?.document?.id
                            })">
                            <Icon icon="fontisto:preview" />
                            Preview
                            </router-link>
                            
                            <div @click="openSessionModal(result.id)" class="dropdown-item">
                              <Icon icon="mdi:reschedule" />
                              Reschedule
                            </div>
                            <div @click="cancelSessionModal(result.id)" class="dropdown-item">
                              <Icon icon="mdi:cancel" />
                              Cancel
                            </div>
                          </template>
                          <template v-else>
                           
                            <router-link :to="`/admin/download/${result?.document?.id}/preview`" class="dropdown-item"  @click="getDocument({
                              id: result?.document?.id
                            })">
                            <Icon icon="carbon:download" /> Download
                            </router-link>
                           
                           
                          </template>
                        </div>
                      </div>

                      
                    </td>
                  </tr>
                </tbody>
              </table> -->
              <b-form @submit="submitSearch">
                <b-row align-h="end">
              
                  <b-col lg="4" align-self="end">
                  
                   <b-form-group
                   class="mb-1"
                     label="Search"
                     label-for="search-input"
                   >
                     <b-input-group size="md">
                       <b-form-input
                         id="search-input"
                         v-model="search"
                         type="search"
                         placeholder="Type to Search"
                         trim
                       ></b-form-input>
                     </b-input-group>
                   </b-form-group>
   
                 </b-col>
                 </b-row>
              </b-form>
              
              
             
              <b-table striped hover per-page="10"  :current-page="currentPage" :items="allSessionRecord?.data|| []" :fields="fields">
                 <template #cell(document_title)="data">
                  <div>
               
                    <h6 class="user-name text-truncate mb-0" style="width: 300px">
                      {{ data.item.title }}
                    </h6>
                    <small class="badge rounded-pill me-1" :class="[
                                                data.item.immediate == true
                                                  ? 'badge-light-danger'
                                                  : 'badge-light-primary',
                                              ]">
                      {{
                                              data.item.immediate == true
                                              ? "Immediate Session"
                                              : "Scheduled Session"
                                              }}
                    </small>
                  </div>
                </template>
               <template #cell(participants)="data">
                <small class="badge badge-light-primary">
                  Participants {{ data.item.participants_count }}
                </small>
                </template>
                <template #cell(time)="data">
                  <div class="d-flex flex-column">
                    <h6 class="user-name text-truncate mb-0">
                      {{ dateTime(data.item.date + " " + data.item.start_time) }}
                    </h6>
                  </div>
                  </template>
                  <template #cell(status)="data">
                    <span class="badge rounded-pill me-1" :class="[
                                                  data.item.status == 'Pending'
                                                    ? 'bg-warning'
                                                    : 'bg-success',
                                                ]">
                        {{ data.item.status }}
                      </span>
                    </template>
                    <template #cell(connect)="data">
                      <template v-if="
                                                 data.item.immediate === 1 &&
                                                  data.item.date === today &&
                                                  data.item.end_session === 0 
                                                
                                                ">
                        <a :href="`${getEnv()}document/waiting-page/${data.item.id}`" class="btn btn-primary btn-sm">Join</a>
                      </template>
                      <template v-else> Missed Session </template>
                      </template>
                      <template #cell(actions)="data">
                        <div class="dropdown">
                          <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                          </a>
                          <div class="dropdown-menu dropdown-menu-end">
                            
                            <template v-if="data.item.status !== 'Completed'">
                              <router-link class="dropdown-item" :to="{name: 'admin.preview', params:{ doc_id: data.item?.document?.id}}" @click="getDocument({
                                id: data.item?.document?.id
                              })">
                              <Icon icon="fontisto:preview" />
                              Preview
                              </router-link>
                              
                              <div @click="openSessionModal(data.item.id)" class="dropdown-item">
                                <Icon icon="mdi:reschedule" />
                                Reschedule
                              </div>
                              <div @click="cancelSessionModal(data.item.id)" class="dropdown-item">
                                <Icon icon="mdi:cancel" />
                                Cancel
                              </div>
                            </template>
                            <template v-else>
                              <!-- <div  class="dropdown-item">
                                <Icon icon="carbon:download" /> Download
                              </div> -->
                              <router-link :to="`/admin/download/${data.item?.document?.id}/preview`" class="dropdown-item"  @click="getDocument({
                                id: data.item?.document?.id
                              })">
                              <Icon icon="carbon:download" /> Download
                              </router-link>
                              <!-- <router-link :to="{name: 'admin.download' , params:{doc_id: result?.document?.id } }" class="dropdown-item" @click="getDocument({
                                id: result?.document?.id
                              })">
                              <Icon icon="carbon:download" /> Download
                              </router-link> -->
                             
                            </template>
                          </div>
                        </div>
                        </template>
                       
              </b-table>
              <b-col class="my-1">  
            <div class="d-flex justify-content-between align-items-center ">
              <p class=" fw-bold text-secondary   disable">Showing {{ allSessionRecord?.meta?.from }} to {{ allSessionRecord?.meta?.to }} of {{ allSessionRecord?.meta?.total }} entries
              </p>
              <ul class="pagination justify-content-start my-2" role="menubar" aria-disabled="false" aria-label="Pagination">
                <li :key="index+1" v-for="(link, index) in allSessionRecord?.meta?.links " :class="{'active': link.active, 'disabled' : link.url == null }" class="page-item " :disabled="link.url == null" role="presentation">
                  <button v-html="link.label" @click="changePagination(link.url)" class="page-link no-whitespace" aria-controls="myTable"  role="menuitemradio" type="button" :disabled="link.url == null" tabindex="0" />
                </li>
                
              </ul>
             

              <!-- <b-col md="2" class="my-1">
               
                  <b-form-select
                    id="per-page-select"
                    v-model="perPage"
                    :options="pageOptions"
                    size="md"
                    class="mb-0"
                    @input="changePerPage"
                  ></b-form-select>
            
              </b-col> -->
              </div>  
              
              </b-col>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalComp :show="questionModal" :size="modal - sm" :footer="false" :closeBtn="true" @close="questionModal = false">
      <template #header>
        <h5 class="modal-title">Reschedule Session</h5>
      </template>

      <template #body>
        <p class="text-center">Change your schedule below</p>
        <div class="my-2">
          <form @submit.prevent="submitReschedule">
            <div class="form-group mb-2">
              <label>Date</label>
              <Datepicker @selected="dateSelected" :value="reschedule.date" format="yyyy-MM-dd" :iconHeight="0"
                :iconWidth="0" :disabled-dates="{
                                    to: new Date(
                                      new Date().getFullYear(),
                                      new Date().getMonth(),
                                      new Date().getDate(),
                                    ),
                                  }" />
            </div>

            <div class="form-group mb-4">
              <label>Time</label>
              <select v-model="reschedule.start_time" class="form-select">
                <option v-for="(time, index) in displayTimeSlot" :key="time + index" :value="time">
                  {{ time }}
                </option>
              </select>
            </div>

            <div class="modal-footer px-0 pb-0">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
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
import { request } from "../data.js";
import { ref, onMounted, onUpdated, computed, defineProps, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";
import ModalComp from "@/components/ModalComp.vue";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import $ from "jquery";
import { getToken } from "@/Services/helpers";
import TableSkeleton from '@/components/Loader/TableSkeleton'


const today = moment().format("YYYY-MM-DD");

const dateTime = (date) => {
  return moment(date).format("Do MMM YYYY · h:mm a");
};

const prop = defineProps({
  data: Array
})

const token = getToken()
const {  allSessionRecord, allSessionRecordToday, time_slots, sessionsLoading } =
  useGetters({
    
    allSessionRecord: "schedule/allSessionRecord",
    allSessionRecordToday: "schedule/allSessionRecordToday",
    getRescheduled: "schedule/getRescheduled",
    time_slots: "schedule/time_slots",
    sessionsLoading: 'schedule/sessionsLoading'
  });

const {
  getSessionRecords,
  getSessionRecordToday,
  rescheduleSession,
  getUserDocument,
  TimeSlotsAction,
  deleteSession
} = useActions({
  getSessionRecords: "schedule/getSessionRecords",
  getSessionRecordToday: "schedule/getSessionRecordToday",
  rescheduleSession: "schedule/rescheduleSession",
  TimeSlotsAction: "schedule/TimeSlotsAction",
  getUserDocument: "document/getUserDocument",
  deleteSession: "schedule/deleteSession",
});

const data = ref("");
data.value = request;
const currentPage = ref()
const fields = ref(['document_title', 'participants', 'time','status', 'connect', 'actions'])
const perPage = ref(10)
const  pageOptions= ref([
          { value: null, text: 'Per page' },
          { value: '5', text: '5' },
          { value: '10', text: '10' },
          { value: '20', text: '20' }
        ])
const search = ref('')
const cancelModal = ref(false);
const questionModal = ref(false);
let page = ref()
const sessionId = ref("");
const openSessionModal = (id) => {
  sessionId.value = id;
  questionModal.value = true;
};

const changePagination = (page_number) => {
   page.value = page_number.split('&').pop().split('=').pop()
  console.log('page.value, search.value', page.value, search.value)
  getSessionRecords({entry_point: 'Video', page: page.value, name: search.value, per_page: perPage.value})
}
console.log('search', search.value)

const changePerPage = () => {
  getSessionRecords({entry_point: 'Video', page: page.value, name: search.value, per_page: perPage.value})
}
const submitSearch = (event) => {
  event.preventDefault()
  getSessionRecords({entry_point: 'Video', name: search.value, per_page: perPage.value})
}
const cancelSessionModal = (id) => {
  sessionId.value = id;
  cancelModal.value = true;
};

const cancelSession = (params) => {
  if (params) {
    let formData = { id: sessionId.value};
    // console.log(formData);
    deleteSession(formData);
    cancelModal.value = false;
  } else {
    cancelModal.value = false;
  }
};


const reschedule = ref({});
const submitReschedule = () => {
  let formData = { id: sessionId.value, payload: reschedule.value };
  rescheduleSession(formData);
  questionModal.value = false;
  reschedule.value = {};
};

const getDocument = (params) => {
  getUserDocument(params.id);
};

// const getToken = () => {
//       const token = getToken();
//       return token;
//     }



const  getEnv =() =>{
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIDEO_SIGN_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIDEO_SIGN_STAGING : process.env.VUE_APP_VIDEO_SIGN_LIVE
    }
  
  
const dateSelected = (data) => {
  reschedule.value.date = moment(data).format("YYYY-MM-DD");
};

const displayTimeSlot = computed(() => {
  const convertTimeToSeconds = (params) => {
    const slittedTimeSlots = params.split(":");
    return (
      +slittedTimeSlots[0] * 3600 +
      +slittedTimeSlots[1] * 60 +
      +slittedTimeSlots[2]
    );
  };

  const convertSecondsToTime = (seconds) => {
    if (seconds < 0) return "-" + convertSecondsToTime(-seconds);
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  const timeSlots = time_slots.value;
  const isToday = moment(reschedule.value.date).isSame(moment(), "day");

  const currentDate = new Date();
  let hr = currentDate.getHours();
  let min = currentDate.getMinutes();
  let sec = currentDate.getSeconds();

  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  const time = hr + ":" + min + ":" + sec;
  const currentTimeInSeconds = convertTimeToSeconds(time);

  const availableTime = timeSlots.filter((slot) => {
    const slotInSeconds = convertTimeToSeconds(slot);

    if (currentTimeInSeconds <= slotInSeconds) {
      return convertSecondsToTime(slotInSeconds);
    }
  });

  return isToday ? availableTime : timeSlots;
});

const filterDocByVideo = computed(() => {
  return allSessionRecord?.value?.filter((respond) => respond.entry_point === "Video",
  );
});




const filterDocByNextMeeting = computed(() => {
  return allSessionRecordToday?.value?.data?.filter(
    (res) =>
      res.entry_point === "Video" &&
      res.immediate == false &&
      res.status != "Completed",
  );
});

// watch(currentPage, async (newCurrentPage, oldCurrentPage) => {
//   console.log('newCurrentPage, oldCurrentPage', newCurrentPage, oldCurrentPage)
//   getSessionRecords({entry_point: 'Video', page: newCurrentPage})
// })

onMounted(() => {
  getSessionRecords({token: token, entry_point: 'Video', page: 1});
  getSessionRecordToday({token: token,  entry_point: 'Video'});
  TimeSlotsAction();
});

onUpdated(() => {

  setTimeout(() => {
    currentPage.value = allSessionRecord?.value?.meta?.current_page
    if ($.fn.dataTable.isDataTable("#allrecord")) {
      $("#allrecord").DataTable();
    } else {
      if (allSessionRecord.value.length > 0) {
        $("#allrecord").DataTable({
          columnDefs: [{ orderable: false, targets: [0, 6] }],
          // order: [[3, "desc"]],
          aaSorting: [],
          lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"],
          ],
          pageLength: 10,
        });
      }
    }
  }, 100);
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
