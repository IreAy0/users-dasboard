<template>
  <form @submit.prevent="inviteParticipant">
    <div class="modal-body">
      <!-- <div
        class="row gx-1" 
      >
        <div class="col-12">
          <div class="mb-1">
            <label class="form-label" for="email-id-column">Email</label>
            <input
              type="email"
              v-model="email"
              id="email-id-column"
              class="form-control form-control-sm"
              name="email-id-column"
              placeholder="Email"
            />
          </div>
        </div>

        <hr />
      </div> -->
     
      <template v-if="rows.length > 0">
        <div  class="row gx-1" v-for="(row, index) in rows" :key="index">
          <div class="col-12">
            <div class="mb-1">
              <label class="form-label" for="email-id-column">Email</label>
              <input
                type="email"
                v-model="row.email"
                id="email-id-column"
                class="form-control form-control-sm"
                name="email-id-column"
                placeholder="Email"
              />
            </div>
          </div>

          <div class="col-md-12" v-show="rows.length > 1">
            <small
              role="button"
              style="font-size: small"
              :class="['text-danger', isRemove]"
              @click="removeRow(index)"
            >
              Remove
            </small>
          </div>
          <hr />
        </div>
      </template>

      <div class="row">
        <div class="col-12">
          <button
            type="button"
            @click="addRow"
            class="
              btn btn-sm btn-primary
              waves-effect waves-float waves-light
              float-end
            "
          >
            Add more
          </button>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <button
          type="submit"
          class="
            btn btn-sm btn-primary
            waves-effect waves-float waves-light
            ms-1
          "
          :disabled="loading"
        >
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          Send
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { defineEmits, defineProps, ref, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";

const $toast = useToast();
const props = defineProps({ isLoading: Boolean, files: Array , id: String});

const emit = defineEmits(["close"]);

const { useActions, useGetters } = createNamespacedHelpers(["document"]);

const { userDocument } = useGetters(["userDocument"]);
const { invitationMail } = useActions(["invitationMail"]);

const participants = ref(null);

const addMore = ref(false);
const isRemove = ref(false);
const subject = ref(userDocument.value.title);
const message = ref("");
const files = ref(props.files);
const email = ref("")
const rows = ref([]);
const loading = ref(false)
rows.value.push({
    email: ""
  })
const addRow = () => {
  addMore.value = true;
  rows.value.push({
    email: ""
  });
};

const removeRow = (index) => {
  isRemove.value = true;
  rows.value.splice(index, 1);
};

const inviteParticipant = () => {
  let formObj = [];
  // formObj.push({
  //     document_id: props.id,
  //     email: email.value.toLowerCase(),
  //     // role: obj.role,
  //   })
  
    rows.value.forEach((obj) => {
      formObj.push({
        document_id: props.id,
        email: obj.email,
      });
    });
  
  loading.value= true
  ToNote.put(`/document-share/${props.id}`, {documents: formObj} )
      .then(res => {
        emit("close", true);
        loading.value= false
        $toast.success("shared successfully", {
        timeout: 5000,
        position: "top-right",
      });
      }).catch(err => {
        emit("close", false)
        loading.value=false
        $toast.error(err.message, {
        timeout: 5000,
        position: "top-right",
      });
      })
  // invitationMail(formObj);
  
};
onMounted(() => {

});
</script>

<style scoped>
</style>
