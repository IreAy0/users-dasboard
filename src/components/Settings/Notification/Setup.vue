<!-- eslint-disable no-unused-vars -->
<template>
  <section class="">
    <b-tabs v-model="tabIndexAdv1" class="
        notifications
        modern-horizontal-wizard
        bs-stepper
        wizard-modern
        modern-wizard-example
        d-flex
        flex-column flex-lg-row
      " content-class=" tab-content col-12 col-md-7 bs-stepper-content"
      nav-class="nav-link step align-items-baseline  step align-items-baseline flex-row flex-nowrap overflow-x-auto flex-lg-column"
      active-nav-item-class="nav-link step"
      nav-wrapper-class="py-1 px-0 col-12 col-md-3 bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline">
      <b-tab active>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Notifications</span>
            </span>
          </button>
        </template>

        <b-form @submit.prevent="submitForm" class="tab-pane fade show active" id="nav-teammates" role="tabpanel"
          aria-labelledby="nav-teammates-tab">
          <div class="content-header mb-1">
            <h5 class="mb-0">As a Document Owner</h5>
            <small class="">Notify me when:</small>
          </div>
          <b-form-checkbox id="checkbox-1" v-model="getForms.notify_owner_when_document_complete" name="checkbox-1"
            label="Document Complete">
            A document is completed
          </b-form-checkbox>
          <b-form-checkbox id="checkbox-2" v-model="getForms.notify_owner_when_a_signer_refuse_to_sign"
            name="checkbox-2" label="Document Complete">
            A signer declines to sign
          </b-form-checkbox>
          <b-form-checkbox id="checkbox-3" v-model="getForms.notify_owner_when_each_signer_views_a_document"
            name="checkbox-3" label="Document Complete">
            Each signer views a document
          </b-form-checkbox>
          <b-form-checkbox id="checkbox-4" v-model="getForms.notify_owner_always_cc_admin" name="checkbox-4"
            label="Document Complete">
            Always cc Admin
          </b-form-checkbox>

          <hr class="mt-1 mb-1" />
          <div class="content-header mb-1">
            <h5 class="mb-0">As a Signer</h5>
            <small class="">Notify me when I’m a signer and:</small>
          </div>

          <div>
            <b-form-checkbox id="checkbox-5" v-model="getForms.notify_signer_when_to_sign_a_document" name="checkbox-5"
              label="Document Complete">
              I have a document to sign
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-6" v-model="getForms.notify_signer_when_document_complete" name="checkbox-6"
              label="Document Complete">
              A document is completed
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-7" v-model="
              getForms.notify_signer_when_signer_declines_to_sign_document
            " name="checkbox-7" label="Document Complete">
              Another signer declines to sign
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-8" v-model="getForms.notify_signer_when_owner_withdraws_document"
              name="checkbox-8" label="Document Complete">
              A document owner withdraws a document
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-9" v-model="getForms.notify_signer_when_document_updated" name="checkbox-9"
              label="Document Complete">
              The document is updated
            </b-form-checkbox>
            <b-form-checkbox id="checkbox-10" v-model="getForms.notify_signer_always_cc_admin" name="checkbox-10"
              label="Document Complete">
              Always cc Admin
            </b-form-checkbox>
          </div>

          <hr class="mt-1 mb-1" />

          <b-form-checkbox v-model="getForms.send_sms" name="check-button" switch>
            Send Sms
          </b-form-checkbox>
          <b-form-checkbox v-model="getForms.send_email" name="check-button" switch>
            Send Email
          </b-form-checkbox>

          <hr class="mt-1 mb-1" />

          <div class="mt-1">
            <button type="submit" class="rounded btn btn-primary">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span class="align-middle d-inline-block">Save</span>
            </button>
          </div>
        </b-form>
      </b-tab>

      <b-tab>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 2 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Security</span>
            </span>
          </button>
        </template>
        <b-form @submit.prevent="updatePassword" @reset="onReset" class="tab-pane fade show active" id="nav-teammates"
          role="tabpanel" aria-labelledby="nav-teammates-tab">
          <div class="content-header mb-1">
            <h5 class="mb-0">Change Password</h5>
          </div>

          <div class="form-group my-2">
            <label class="small" for="password">Current password</label>
            <input type="password" class="form-control" id="password" v-model="curent_password" />
          </div>

          <div class="form-group my-2">
            <label class="small" for="new_password">New password</label>
            <input type="password" class="form-control" id="new-password" v-model="new_password" />
          </div>

          <div class="my-2">
            <button class="rounded btn btn-primary">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span class="align-middle d-inline-block">Save</span>
            </button>
          </div>
        </b-form>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";
import { mapState } from "vuex";

const toast = useToast();
export default {
  name: "SetupPage",
  inheritAttrs: false,
  customOptions: {},
  data() {
    return {
      curent_password: "",
      new_password: "",
      loading: false,
    };
  },
  computed: {
    ...mapState("ProfileModule", ["userProfile"]),
    ...mapState("TeamsModule", ["Teams"]),

    getActiveTeam() {
      return this.Teams?.find((element) => element.active === true);
    },

    getActiveUser() {
      const activeUser = this.getActiveTeam?.users?.find(
        (team) => team?.id == this.userProfile?.id
      );
      return activeUser;
    },
    getForms() {
      const form = {
        notify_owner_when_document_complete:
          this.getActiveTeam?.notify_owner_when_document_complete,
        notify_owner_when_a_signer_refuse_to_sign:
          this.getActiveTeam?.notify_owner_when_a_signer_refuse_to_sign,
        notify_owner_when_each_signer_views_a_document:
          this.getActiveTeam?.notify_owner_when_each_signer_views_a_document,
        notify_owner_always_cc_admin:
          this.getActiveTeam?.notify_owner_always_cc_admin,
        notify_signer_when_to_sign_a_document:
          this.getActiveTeam?.notify_signer_when_to_sign_a_document,
        notify_signer_when_document_complete:
          this.getActiveTeam?.notify_signer_when_document_complete,
        notify_signer_when_signer_declines_to_sign_document:
          this.getActiveTeam
            ?.notify_signer_when_signer_declines_to_sign_document,
        notify_signer_when_owner_withdraws_document:
          this.getActiveTeam?.notify_signer_when_owner_withdraws_document,
        notify_signer_always_cc_admin:
          this.getActiveTeam?.notify_signer_always_cc_admin,
        notify_signer_when_document_updated:
          this.getActiveTeam?.notify_signer_when_document_updated,
        send_sms: this.getActiveTeam?.send_sms,
        send_email: this.getActiveTeam?.send_email,
      };

      return form;
    },
  },
  methods: {
    submitForm() {
      this.loading = true;
      // eslint-disable-next-line no-unused-vars
      ToNote.post("/teams", this.getForms)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          this.loading = false;
          this.$store.dispatch("TeamsModule/getTeams");
          toast.success(`Notifications updated successfully`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((error) => {
          this.loading = false;
          // console.log(error);
        });
    },
    updatePassword() {
      const passwords = {
        current_password: this.curent_password,
        password: this.new_password,
      };
      this.loading = true;
      ToNote.post("/user/change/password", passwords)
        .then((res) => {
          this.loading = false;
          toast.success(`Password updated successfully`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });

          (this.curent_password = ""), (this.new_password = "");
        })
        .catch((error) => {
          this.loading = false;
          toast.error(`${error.response.data.message} `, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    },
  },
};
</script>

<style>
.notifications .form-check {
  margin-bottom: 0.5rem !important;
}
</style>
