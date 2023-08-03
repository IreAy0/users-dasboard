<template>
  <form @submit.prevent="onAddParticipant">
    <div id="addSignerErrorMsg" class="text-center text-danger"></div>
    <div class="d-flex align-items-center  gap-3 mb-2" v-for="(row, index) in rows" :key="index">
      <p class="border border-primary p-1 mb-0 text-primary rounded-3">{{index + 1}}</p>
      <div class="row gx-1">
        <div class="col-md-3 col-12">
          <div class="mb-1">
            <label class="form-label" for="first-name">First Name</label>
            <input type="text" v-model="row.first_name" id="first-name" class="form-control form-control-sm"
              placeholder="First Name" name="first_name" required />
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="mb-1">
            <label class="form-label" for="last-name-column">Last Name</label>
            <input type="text" v-model="row.last_name" id="last-name-column" class="form-control form-control-sm"
              placeholder="Last Name" name="lname-column" required />
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="mb-1">
            <label class="form-label" for="email-id-column">Email</label>
            <input type="email" v-model="row.email" id="email-id-column" class="form-control form-control-sm"
              name="email-id-column" placeholder="Email" required />
          </div>
        </div>
        <div class="col-md-3 col-12">
          <div class="mb-1">
            <label class="form-label" for="role-column">Permissions</label>
            <select name="permission" id="permission" v-model="row.permission" class="form-select form-control-sm py-0" required>
              <option value="" selected>select role</option>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
     
     
      </div>
      
      <template v-if="row.action != '+'">
        <div>
          <small class="hover" :class="['text-danger', isRemove]" @click="removeRow(index)">
            <Icon icon="ph:x-light" width="24"/>
          </small>
        </div>
      </template>
      <hr />
      


    </div>
    <div class="mb-3">
      <button type="button" @click="addRow" class="d-inline-flex text-primary border-0  bg-transparent align-items-center gap-50 "> <Icon icon="material-symbols:add" class="" width="20" :inline="true" />Add More</button>
    </div>
    <div class="d-flex gap-2 align-items-center">
      <button @click="emit('close')" type="button"  class="btn btn-md btn-secondary waves-effect waves-float waves-light">
        Back
      </button>
      <button type="submit" class="btn btn-primary btn-md waves-effect waves-float waves-light" tabindex="5">
        Invite
        <img v-if="saving"
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
    
      </button>
      <!-- <button type="submit" class="btn btn-md btn-primary waves-effect waves-float waves-light">
        Send Invite
      </button> -->
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers/dist";
import { Icon } from "@iconify/vue";
import { useToast } from "vue-toast-notification";
import { useStore } from 'vuex'

import ToNote from "@/Services/Tonote";
const store = useStore()

const emit = defineEmits(["close"]);
const $toast = useToast();

const { useActions, useGetters } = createNamespacedHelpers(["document"]);
const { userDocument } = useGetters(["userDocument"]);
const { addParticipant, addTeamMembers } = useActions(["addParticipant", "addTeamMembers"]);


const isRemove = ref(false);
const saving = ref(false)
const rows = ref([{ first_name: "", last_name: "", email: "", permission: "", action: "+" }]);
const addRow = () => {
  rows.value.push({
    first_name: "",
    last_name: "",
    email: "",
    // phone: "",
    permission: "",
    action: "-",
  });
};

const removeRow = (index) => {
  isRemove.value = true;
  rows.value.splice(index, 1);
};

let formObj = [];
const onAddParticipant = () => {
  rows.value.forEach((obj) => {
    formObj.push({
      // document_id: userDocument.value.id,
      first_name: obj.first_name,
      last_name: obj.last_name,
      email: obj.email,
      // phone: obj.phone,
      permission: obj.permission,
    });
  });
  saving.value = true
      // eslint-disable-next-line no-unused-vars
      ToNote.post("/team-users",{team: formObj, number_of_users: formObj.length})
        // eslint-disable-next-line no-unused-vars
        .then((_res) => {
          // this.modalShow = false;
          saving.value = false;
          // this.$store.dispatch("TeamsModule/getTeamUsers");
          // this.$store.dispatch("TeamsModule/getTeams");
          store.dispatch("TeamsModule/getSubcriptions")
          store.dispatch("TeamsModule/getTeams")
          $toast.success(`Team member invited successfully`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
            
          });
          emit('close');
          formObj = [];
        })
        .catch((err) => {
          // emit('close');
          // formObj = [];
          if (err.response.status == 422) {
            saving.value = false;
          let values = Object.values(err?.response?.data?.errors);
          values.forEach((data) => {
            $toast.error(data, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
          })
          }else {
            formObj = [];
            emit('close');
            rows.value = [{ first_name: "", last_name: "", email: "", permission: "", action: "+" }];
            $toast.info(`${err?.response?.data?.data?.error}`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,

          });
          }
        });
    

  // addTeamMembers(formObj);
  // emit('close');
  // formObj = [];
  // rows.value = [{ first_name: "", last_name: "", email: "", permission: "", action: "+" }];
};

const inviteTeamMember=() =>{
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        permission: this.permission,
        email: this.email,
      };
      this.saving = true
      // eslint-disable-next-line no-unused-vars
      ToNote.post("/team-users", data)
        // eslint-disable-next-line no-unused-vars
        .then((_res) => {
          this.modalShow = false;
          this.saving = false;
          // this.$store.dispatch("TeamsModule/getTeamUsers");
          this.$store.dispatch("TeamsModule/getTeams");
          $toast.success(`Team member invited successfully`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
          this.first_name = "";
          this.last_name = "";
          this.permission = "";
          this.email = "";
        })
        .catch((err) => {
          this.modalShow = false;
          this.saving = false;
          this.first_name = "";
          this.last_name = "";
          this.permission = "";
          this.email = "";
          let values = Object.values(err?.response?.data?.data);
          console.log('err', err?.response?.data?.data.error, values)
          $toast.error(` ${err?.response?.data?.data.error}`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         
        });
    
    
    }
</script>

<style scoped>
.hover:hover {
  cursor: pointer;
}

.v-toast .v-toast__item.v-toast__item--info{
  background-color: #003bb3 !important;
}
</style>
