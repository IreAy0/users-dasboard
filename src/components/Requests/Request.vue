<template>
  <div>
    <main-layout>


      <template v-slot:default>
        <div class="row">
          <div class="col-12">
            <div class="card ">
              <div class="card-body">

                <div class="tab-pane fade show active" id="nav-teammates" role="tabpanel"
                  aria-labelledby="nav-teammates-tab">
                  <div class="row flex-lg-nowrap justify-content-between mb-1">
                    <div class="col-12 col-md-7">
                      <!-- <input type="text" v-model="searchValue" /> -->
                      <input type="text" id="search" class="form-control my-1" placeholder="Search request..."
                        v-model="searchValue" />
                    </div>
                    <div class="col-12 my-1" v-show="getActiveUser?.permission === 'Admin'">
                      <button @click="modalShow = !modalShow" class="rounded btn btn-primary btn-prev">
                        <span class="align-middle d-inline-block">Invite your teammates</span>
                      </button>
                    </div>
                  </div>
                  <!-- modal vertical center -->

                  <div class="table-responsive">
                    <b-table 
                    striped 
                    hover  
                    per-page="10"
                    :current-page="currentPage" :items="filteredItems" :key="filteredItems?.index" :fields="fields" responsive="sm">
                      <template #cell(status)="data">
                        <span
                          :class="{ 'bg-success ': data.item.status === 'Completed', 'bg-danger ': data.item.status === 'Cancelled', 'bg-warning ': data.item.status === 'Awaiting', 'bg-warning ': data.item.status === 'Processing', 'bg-primary ': data.item.status === 'New' }"
                          class="text-white px-1 rounded-pill">{{ data?.item?.status }}</span>
                      </template>

                      <template #cell(created)="data">
                        <div>
                          {{ formatDate(data?.item?.created_at) }}
                        </div>
                      </template>
                      <template #cell(action)="data">
                        <div v-if="data?.item?.completed_file_request !== null">
                          <a class="nav-link nav-link-style" download :href="data?.item?.completed_file_request" target="_blank">
            <button class="btn btn-sm btn-outline-primary waves-effect" >
              Download
            </button></a>
                        </div>
                      </template>
                    </b-table>
                    <b-pagination
                    class="my-2"
              v-model="currentPage"
              :total-rows="filteredItems?.length"
              :per-page="10"
              aria-controls="myTable"
            ></b-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from "@/components/MainLayout.vue";
import { mapState } from "vuex";
import { dateFormat } from "@/Services/helpers";

export default {
  name: "DocumentPage",
  components: { MainLayout },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        "title", 'type', "status", { key: 'created', label: 'created at', sortable : true}, "action"
      ],
      searchValue: ""
    }
  },
  computed: {
    ...mapState('DocumentModule', ['requests']),

    filteredItems() {
      return this.requests?.filter((item) => {
        return (
          item?.title
            ?.toLowerCase()
            ?.indexOf(this.searchValue?.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    formatDate: dateFormat,
//     exportPDF(){
//   const data = document.getElementById("mainWrapper");
//   html2canvas(data).then((canvas) => {
//     const imgWidth = 208;
//     const pageHeight = 295;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     let heightLeft = imgHeight - 10;
//     let position = 10;

//     heightLeft -= pageHeight;

//     const doc = new jsPDF("p", "mm");

//     doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");

//     while (heightLeft >= 0) {
//       position = heightLeft - imgHeight;
//       doc.addPage();
//       doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
//       heightLeft -= pageHeight;
//     }

//     // if (params == "done") { return doneDataUrl.value = canvas.toDataURL() }

//     doc.save(userDocument.value.title + ".pdf");
//   });
// }
  },
};
</script>

<style scoped>
</style>
