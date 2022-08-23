<template>
  <div class="col-12 mt-2">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Document Lists</h5>
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
              <tr v-for="document in documents" :key="document.id">
                <td>
                  <a :href="`https://tonote-doc.netlify.app/document/${document.status == 'New' ? 'edit' : 'audit'}/${document.id}?qt=${token}`"
                    class="my-0 py-0">{{ document.title }}</a>
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
    <!-- <nav aria-label="page navigation example">
      <ul class="pagination">
        <li class="page-item disabled">
          <span class="page-link">Prev</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
          <span class="page-link">2</span>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav> -->
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
// eslint-disable-next-line no-unused-vars
const requests = computed(() => store.state.DocumentModule.requests);

const token = computed(() => getToken())
</script>
<style lang="css">
</style>
