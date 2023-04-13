<template>
  <div class="col-12 mt-2">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Recent Documents</h5>

      </div>

      <div class="card invoice-list-wrapper">
        <div class="card-datatable table-responsive">
          <table class="invoice-list-table table">
            <thead>
              <tr>
                <th>Document name</th>
                <th>Status</th>
                <th>Last Edited</th>
                <!-- <th class="cell-fit">Actions</th> -->
              </tr>
            </thead>

            <tbody>
              <tr v-for="document in documents?.data?.slice(0, 5)" :key="document.id">
                <td>
                  <a :href="`${getEnv}?di=${document.id}&qt=${token}`" class="my-0 py-0">{{ document.title }}</a>
                  <p v-if="document.participants_count !== 0" class="my-0 py-0">
                    <!-- To:
                    <span
                      v-for="participant in document.participants"
                      :key="participant.user.id"
                    >
                      {{
                        `${participant.user.first_name} ${participant.user.last_name},`
                      }}
                    </span> -->
                  </p>
                </td>
                <td>
                  <span class="badge rounded-pill badge-light-secondary" text-capitalized="">
                    {{ document.status }}
                  </span>
                </td>
                <td>{{ timeFormat(document.updated_at) }}</td>
                <!-- <td>
                  <i
                    data-feather="more-vertical"
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></i>

                  <div class="dropdown-menu dropdown-menu-start">
                    <a class="dropdown-item border-bottom" href="#">Edit</a>

                    <a class="dropdown-item border-bottom" href="#"
                      >Save as template</a
                    >

                    <a class="dropdown-item border-bottom" href="#">Retract</a>

                    <a class="dropdown-item" href="#">Delete</a>
                  </div>
                </td> -->
              </tr>
            </tbody>
          </table>


        </div>
      </div>
    </div>
    <!--  <nav aria-label="page navigation example">
      <ul class="pagination">
        <li class="page-item " :class="paginationLinks?.prev === null ? 'disabled' : ''" @click="prev" >
          <a class="page-link">Prev</a>
        </li>
        <li  @click="goto(links.label)" class="page-item " :class="links?.active === true ? 'active' : ''" v-for="links in meta?.links" :key="links + 1" aria-current="page">
          <a  class="page-link" :class="links?.label?.includes('Next') || links?.label?.includes('Previous') ? 'd-none': ''"  v-html="links.label"> </a>
          
        </li>
        <li class="page-item" :class="paginationLinks?.next === null ? 'disabled' : ''" @click="next" >
          <a class="page-link"  href="#">Next </a>
        </li>
      </ul>
    </nav>   -->
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { getToken, timeFormat } from "@/Services/helpers";

onBeforeMount(() => {
  store.dispatch("DocumentModule/DocumentsList");
  store.dispatch("DocumentModule/RequestsList");
});



const store = useStore();
const documents = computed(() => store.state.DocumentModule.documents);


const next = () => {
  store.dispatch("DocumentModule/DocumentsList", meta?.value?.current_page + 1);
};

const prev = () => {
  store.dispatch("DocumentModule/DocumentsList", meta?.value?.current_page - 1);
};

const goto = (pageNumber) => {
  store.dispatch("DocumentModule/DocumentsList", pageNumber)
}
// eslint-disable-next-line no-unused-vars
const requests = computed(() => store.state.DocumentModule.requests);
const meta = computed(() => documents.value.meta)
const paginationLinks = computed(() => documents.value.links )
const getEnv = computed(() => process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_DOCUMENT_PAGE_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_DOCUMENT_PAGE_STAGING : process.env.VUE_APP_DOCUMENT_PAGE_LIVE)
const token = computed(() => getToken())
</script>
<style lang="css"></style>
