<template>
   <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="">Next Scheduled Meeting Today</h3>
            <!-- <p>You have no scheduled meeting for today</p> -->
            <template v-if="filterDocByNextMeeting.length > 0">
              <template
                v-for="(result, index) in filterDocByNextMeeting"
                :key="index"
              >
                <div class="border-bottom py-1 d-flex justify-content-between">
                  <div>
                    <div class="h5">Title: {{ result.title }}</div>
                    <div class="text-mute">
                      {{ dateTime(result.date + " " + result.start_time) }}
                    </div>
                  </div>
                  <div>
                    
                    <a
                      :href="`${virtualNotary}session-prep/${result.id}?token=${getToken()}}`"
                      class="btn btn-primary btn-sm"
                      >Join now</a
                    >
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
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <h4 class="card-title">Affidavit Requests</h4>
      <div class="wrap">
              <a
              :href="`${virtualNotary}/schedule?session=affidavit&token=${token}`"
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
                <span>Request Affidavit</span>
              </a>
            </div>
    </div>
    <div class="card-body py-4">
      <table class="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(data, index) in filterDocByAffidavitRequests" :key="index">
           
              <td>{{ index + 1 }}</td>
              <td>{{ data.title }}</td>
              <td>
                <span
                  class="badge rounded-pill me-1"
                  :class="[
                    data.status == 'Awaiting' ? 'bg-warning' : 'bg-success',
                  ]"
                >
                  {{ data.status }}
                </span>
              </td>
              <td>{{ dateTime(data.created_at) }}</td>

              <td>
                <template v-if="data.status == 'Completed'">
                  <div class="dropdown">
                    <a
                      class="btn btn-sm btn-icon dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      ><Icon
                        icon="oi:ellipses"
                        :rotate="1"
                        :verticalFlip="true"
                      />
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" style="">
                      <div class="dropdown-item">
                        <Icon icon="carbon:download" /> Download
                      </div>
                    </div>
                  </div>
                </template>
              </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, computed } from "vue";
import moment from "moment";
// import Api from "@/api/Api";
import { getToken } from "@/Services/helpers";
import { useActions, useGetters } from "vuex-composition-helpers";

const dateTime = (value) => {
  return moment(value).format("Do MMM YYYY, hh:mm A");
};

const { affidavits, allSessionRecordToday } = useGetters({
  affidavits: "schedule/affidavits",
  allSessionRecordToday: "schedule/allSessionRecordToday",

});

const { getAffidavitRequest, getSessionRecordToday, } = useActions({
  getAffidavitRequest: "schedule/getAffidavitRequest",
  getSessionRecordToday: "schedule/getSessionRecordToday",

});


const token = computed(()  => {
      const token = getToken();
      return token;
});

const filterDocByAffidavitRequests = computed(() => {
  return affidavits?.value?.filter(
    (data) =>  data?.entry_point == "Affidavit",
  );
});

const filterDocByNextMeeting = computed(() => {
  return allSessionRecordToday?.value.filter(
    (res) =>
      res?.entry_point == "Affidavit" &&
      res?.immediate == false &&
      res?.status != "Completed",
  );
});

const virtualNotary = computed(() => {
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIRTUAL_NOTARY_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIRTUAL_NOTARY_STAGING : process.env.VUE_APP_VIRTUAL_NOTARY_LIVE
    });

onMounted(() => {
  getAffidavitRequest();
});
</script>

<style lang="scss" scoped></style>
