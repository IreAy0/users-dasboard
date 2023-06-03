<template>
  <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="">Next Scheduled Meeting Today</h3>
            <template v-if="filterDocByNextMeeting?.length > 0">
              <template v-for="(result, index) in filterDocByNextMeeting" :key="index">
                <div class="border-bottom py-1 d-flex justify-content-between">
                  <div>
                    <div class="h5">Title: {{ result?.title }}</div>
                    <div class="text-mute">
                      {{ dateTime(result?.date + " " + result?.start_time) }}
                    </div>
                  </div>
                  <div>
                    <a :href="`${virtualNotary}session-prep/${result.id}?token=${getToken()}}`"
                      class="btn btn-primary btn-sm">Join now</a>
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
          <h4 class="card-title">Notary Requests</h4>
          <div class="wrap">
            <a :href="`${virtualNotary}/schedule?session=notary&token=${token}`" class="btn btn-primary waves-effect">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-plus">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Request a Notary</span>
            </a>
          </div>
        </div>
        <div class="card-body pt-2 pb-4">
          <div class="table-responsive">
            <table class="table table-hover" id="all_notary_requests">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Connect</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in filterDocByNotaryRequests" :key="index">
                  <td>{{ ++index }}</td>
                  <td>
                    <template v-if="data?.status == 'Completed'">
                      <router-link :to="`/admin/download/${data?.document?.id}/preview`" @click="getDocument({
                        id: data?.document?.id
                      })">
                      {{ data.title }}
                      </router-link>
                    </template>
                    <template v-else>
                      <router-link :to="`/admin/preview/${data?.document?.id}/document`" @click="getDocument({
                        id: data?.document?.id
                      })">
                      {{ data.title }}
                      </router-link>
                    </template>
                    </td>
                  <td>
                    <span class="badge rounded-pill me-1" :class="[
                                            data.status == 'Pending' ? 'bg-warning' : data.status == 'Accepted' ? 'bg-success' : data.status == 'Awaiting' ? 'bg-warning' : 'bg-primary',
                                                ]">
                      {{ data.status }}
                    </span>
                  </td>
                  <td>{{ dateTime(data.created_at) }}</td>
                  <td>
                    <template v-if="
                                                data.immediate === 1 &&
                                                data.date === today &&
                                                data.status === 'Accepted'
                                              ">
                      <a :href="`${virtualNotary}/session-prep/${data.id}?token=${token}`"
                        class="btn btn-primary btn-sm">Join</a>
                    </template>
                    <template v-else-if="data.date !== today && data.status === 'Accepted'"> Missed Session </template>

                  </td>
                  <td>
                    <template v-if="data.status == 'Completed'">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" style="">
                          <router-link :to="`/admin/download/${data?.document?.id}/preview`" class="dropdown-item">
                            <Icon icon="carbon:download" /> Download
                          </router-link>
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
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted,  computed, defineProps, onUpdated } from "vue";
import moment from "moment";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
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

const filterDocByNotaryRequests = computed(() => {
  return affidavits?.value?.filter(
    (data) => data?.entry_point == "Notary",
  );
});

const filterDocByNextMeeting = computed(() => {
  if (allSessionRecordToday?.value?.data?.length == 0) {
    return []
  } else {
  return allSessionRecordToday?.value?.data?.filter(
    (res) =>
      res?.entry_point == "Notary" &&
      res?.immediate == false &&
      res?.status == "Accepted",
  );
  };
});

const token = computed(()  => {
      const token = getToken();
      return token;
});

const today = moment().format("YYYY-MM-DD");

const virtualNotary = computed(() => {
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIRTUAL_NOTARY_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIRTUAL_NOTARY_STAGING : process.env.VUE_APP_VIRTUAL_NOTARY_LIVE
    });

const  getEnv =() =>{
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_VIDEO_SIGN_PAGE_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_VIDEO_SIGN_PAGE_STAGING : process.env.VUE_APP_VIDEO_SIGN_PAGE_LIVE

    }

onMounted(() => {
  getAffidavitRequest();
  getSessionRecordToday({token: token.value,  entry_point: 'Notary'});
});

onUpdated(() => {
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#all_notary_requests")) {
      $("#all_notary_requests").DataTable();
    } else {
      if (filterDocByNotaryRequests.value.length > 0) {
        $("#all_notary_requests").DataTable({
          columnDefs: [{ orderable: false, targets: [0, 5] }],
          // order: [[3, "desc"]],
          aaSorting: [],
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

<style lang="scss" scoped></style>
