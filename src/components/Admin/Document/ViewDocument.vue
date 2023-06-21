<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-10">
            <div class="d-flex justify-content-between mb-2">
              <a @click="goBack()" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/><path fill="currentColor" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/></svg></a>
              <h4 class="h4">Title: {{ userDocument.title }} </h4>
              <div class="">
                <a :href="`${getEnv}?document_id=${userDocument.id}&ed=1&qt=${token}`" class="btn btn-sm btn-primary" >
                  <Icon icon="akar-icons:edit" /> Edit Document
                </a>
              </div>
            </div>
            
            <!-- {{userDocument?.documentUploads?.map((file, index) => <RenderPage :file="doc.file_url" @click="$emit('docId', doc.id)" @documentHeight="getHeight" />)}} -->
            <div v-for="(doc, index) in sortedDocumentUpload" :key="index" class="position-relative border">
        
              <!-- {{ doc.number_ordering }} -->
              <RenderPage :file="doc.file_url" @click="$emit('docId', doc.id)" @documentHeight="getHeight" />
            </div>
            <!-- <div v-if="userDocument?.documentUploads?.find((item ) => item?.status == 'Completed'
              )">
              <div class="position-relative border">
                <VuePdfEmbed
                :key="files?.id"
                :source="files?.file_url"
                @loaded="handleDocumentRender"
              />              
            </div> -->
             
            </div>
            
          
         

         

          <ModalComp :show="openAddParticipantModal" :size="'modal-lg'" :footer="false"
            @close="openAddParticipantModal = false">
            <template #header>
              <h5 class="modal-title">Add Participants</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <AddSigner />
            </template>
          </ModalComp>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from 'vue-router'
import { useGetters, useActions } from "vuex-composition-helpers/dist";
import RenderPage from "@/components/Documents/Edit/Main/RenderPage";
import DropZone from "@/components/DropZone";
import AddSigner from "@/components/Documents/Edit/Left/AddSigner";
import VuePdfEmbed from "vue-pdf-embed";
import { saveAs } from "file-saver";
import { getToken, timeFormat } from "@/Services/helpers";
import { Icon } from "@iconify/vue";
import ModalComp from "@/components/ModalComp.vue";

const { userDocument } = useGetters({
  userDocument: "document/userDocument",
});

const { removeParticipant, getUserDocument } = useActions({
  removeParticipant: "document/removeParticipant",
  getUserDocument: "document/getUserDocument",
  //   editParticipant: "document/editParticipant",
});

const route = useRoute()

const openModal = ref(false);
const openAddParticipantModal = ref(false);
const removeParticipantModal = ref(false);
const participantId = ref("");
const getEnv = computed(() => process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_DOCUMENT_PAGE_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_DOCUMENT_PAGE_STAGING : process.env.VUE_APP_DOCUMENT_PAGE_LIVE)
const token = computed(() => getToken())
const sortedDocumentUpload = ref()
const theDoc = ref("");
const documentfiles = ref ([])
const replaceModal = () => {
  openModal.value = true;
};

watch(
  () => [userDocument.value],
  ([newUserDoc], [oldUserDoc]) => {
    if (newUserDoc != oldUserDoc) {
      theDoc.value = newUserDoc;
      if (
        theDoc.value.documentUploads.length > 0 
      ) {
        theDoc.value.documentUploads.forEach(element => {
          documentfiles.value.push({
            id: element.id,
            file_url: element.file_url,
            number_ordering: element.number_ordering,
      })
        });
        return sortedUploads(documentfiles.value);
      }
    }
  }
);

const sortedUploads = (params) => {
  if (params.length > 0 ) {
    return  sortedDocumentUpload.value = params.sort((a, b) =>  a.number_ordering > b.number_ordering ? 1 : -1)
  }}


const addParticipantModal = () => {
  openAddParticipantModal.value = true;
};

const getDocument = (params) => {
  getUserDocument(params.id);
};

const handleDocumentRender = (e) => {
  console.log("ob", e);
};

const files = computed(() => {
  return userDocument?.value?.documentUploads?.find((item) => {
    return (item.status == "Completed" || item.status == 'Sent') ;
  });
});

const remove = (params) => {
  removeParticipantModal.value = true;
  participantId.value = params;
};

const exportHTMLToPDF = async () => {
  let url = files?.value?.file_url;
  let fileName = userDocument.value.title;
  const res = await fetch(url);
  const blob = await res.blob();
  saveAs(blob, fileName);
};

const deleteParticipant = () => {
  removeParticipant(participantId.value);
  removeParticipantModal.value = false;
};
const goBack = () =>{
 return window.history.back()
}
onMounted(() => {
  getDocument({
  id: route?.params?.doc_id,
})
});
</script>
