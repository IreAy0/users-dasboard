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
                    <b-table :items="filteredItems" :key="filteredItems?.index" :fields="fields" responsive="sm">
                      <template #cell(status)="data">
                        <span
                          :class="{ 'bg-success ': data.item.status === 'Completed', 'bg-danger ': data.item.status === 'Cancelled', 'bg-warning ': data.item.status === 'Pending', 'bg-primary ': data.item.status === 'New' }"
                          class="text-white px-1 rounded-pill">{{ data?.item?.status }}</span>
                      </template>

                      <template #cell(created)="data">
                        <div>
                          {{ formatDate(data?.item?.created_at) }}
                        </div>
                      </template>
                    </b-table>
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
      fields: ["title", 'type', "status", 'created', "action"],
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
    formatDate: dateFormat
  },
};
</script>

<style scoped>
</style>
