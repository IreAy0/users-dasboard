<template>
  <div class="conatiner-fluid">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-7">
            <div class="d-flex justify-content-between mb-2">
              <h4>Title: {{ userDocument.title }} </h4>
              <!-- <div class="">
                <button class="btn btn-sm btn-warning" @click="replaceModal">
                  <Icon icon="akar-icons:edit" /> Replace Document
                </button>
              </div> -->
            </div>
            
            <div v-if="userDocument?.documentUploads?.find((item ) => item?.status == 'Completed')">
              <div class="position-relative border">
                <VuePdfEmbed
                :key="files?.id"
                :source="files?.file_url"
                @loaded="handleDocumentRender"
              />              
            </div>
             
            </div>
            <div v-else >
              <PreLoader />
            </div>
            <!-- <div v-for="(doc, index) in userDocument?.documentUploads?.find((item ) => item?.status == 'Completed')" :key="index" class="position-relative border">
              <RenderPage :file="doc?.file_url" @click="$emit('docId', doc?.id)" @documentHeight="getHeight" />
            </div> -->
          </div>
          <div class="col-lg-5">
            <div class="card">
              <div class="card-body">
                <div class="d-flex gap-1 mb-2 ">
                  <div>
                    <button class="btn btn-md btn-primary"  @click="exportHTMLToPDF"
                    :disabled="isDownload">
                    <template v-if="isDownload">
                      <span class="spinner-border spinner-border-sm"></span>
                      Downloading
                    </template>
                    <template v-else>
                      <Icon icon="uil:file-download-alt" />
                      Download Document
                    </template>
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-md btn-primary" @click="$event => shareDocumentModal()">
                      <Icon icon="carbon:share" /> Share Document
                    </button>
                  </div>
                </div>
               
              </div>
            </div>
          </div>

          <ModalComp :show="openModal" :size="'modal-lg'" :footer="true" @close="openModal = false">
            <template #header>
              <h5 class="modal-title">Replace Document</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <DropZone />
            </template>

            <template #footer>
              <button type="button" class="btn btn-primary" @click="questionModal = false">
                Repalce
              </button>
            </template>
          </ModalComp>

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

          <ModalComp :show="removeParticipantModal" :size="'modal-sm'" @close="removeParticipantModal = false">
            <template #header>
              <h4 class="text-danger mb-0">
                <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" />
                Alert
              </h4>
            </template>
            <template #body>
              <h5 class="modal-title text-center">
                Are you sure you want to remove this Participant?
              </h5>
            </template>
            <template #footer>
              <div class="d-flex justify-content-end align-items-center">
                <button class="btn btn-sm btn-outline-danger" @click="deleteParticipant">
                  Yes Remove
                </button>
              </div>
            </template>
          </ModalComp>

          <ModalComp :show="shareModal.open" :footer="false" :size="'modal-sm'" @close="shareModal.open = false">
            <template #header>
              <h4 class="text-primary mb-0">
                <!-- <Icon icon="eva:alert-triangle-outline" style="margin-bottom: 3px" /> -->
                Share with others
              </h4>
            </template>
      
            <template #body>
              <p class="text-center">
                This document will be shared with the following people.
              </p>
              <!-- <p class="text-center my-2">Are you sure you want to cancel this Document?</p> -->
              <MailToParticipant @close="shareModal.open = false" :id="userDocument.id" :isLoading="loading" />
              <!-- <input type="email" class="form-control" id="email" placeholder="Please Enter email"
              :style="error_message.email && 'border: 1px solid red'"  v-model="email"
              @change="error_message.email = null" /> -->
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
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted , computed} from "vue";
import { useRoute } from 'vue-router'
import { useGetters, useActions } from "vuex-composition-helpers/dist";
import RenderPage from "@/components/Documents/Edit/Main/RenderPage";
import DropZone from "@/components/DropZone";
import AddSigner from "@/components/Documents/Edit/Left/AddSigner";
import { saveAs } from "file-saver";
import PreLoader from "@/components/PreLoader.vue";
import VuePdfEmbed from "vue-pdf-embed";
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";
import MailToParticipant from '@/components/Locker/MailToParticipant'

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
const $toast = useToast();

const openModal = ref(false);
const shareModal = ref({open: false, id: ''});
const document_id= ref("")
const isDownload = ref(false);
const openAddParticipantModal = ref(false);
const removeParticipantModal = ref(false);
const participantId = ref("");
const loading = ref(false)
const sessionId = ref("");
const email = ref("");

const replaceModal = () => {
  openModal.value = true;
};

const handleDocumentRender = (e) => {
  console.log("ob", e);
};

const addParticipantModal = () => {
  openAddParticipantModal.value = true;
};

const getDocument = (params) => {
  getUserDocument(params.id);
};
const shareDocumentModal = (id) => {
  // document_id.value = id;
  shareModal.value.open = true;
  shareModal.value.id = userDocument.id
};
const remove = (params) => {
  removeParticipantModal.value = true;
  participantId.value = params;
};

const shareLockerDocument = (params) => {
  if (params) {
    
    let formData = { id: sessionId.value};
    let documents = [
      {
      "document_id": userDocument.id,
      "email": email.value
      }
    ]
    loading.value = true;
    ToNote.put(`/document-share/${userDocument.id}`, {documents} )
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

const files = computed(() => {
  return userDocument?.value?.documentUploads?.find((item) => {
    return (item.status == "Completed" || item.status == 'Sent') ;
  });
});

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

onMounted(() => {
  getDocument({
  id: route?.params?.doc_id,
})
});
</script>
