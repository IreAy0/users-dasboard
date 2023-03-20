<template>
  <section>
    <b-tabs v-model="tabIndexAdv1" class="
        modern-horizontal-wizard
        bs-stepper
        wizard-modern
        modern-wizard-example
        d-flex
        flex-column flex-lg-row
      " content-class=" tab-content col-12 col-lg-9 bs-stepper-content"
      nav-class=" step align-items-baseline flex-row flex-nowrap overflow-auto flex-lg-column"
      active-nav-item-class="nav-link step "
      nav-wrapper-class="py-1 px-0 col-12 col-lg-3 bs-stepper-header d-flex flex-row flex-lg-column nav nav-tabs align-items-baseline">
      <b-tab active>
        <template #title>
          <button class="step-trigger">
            <span class="bs-stepper-box d-none d-lg-block"> 1 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Manage Teammates</span>
            </span>
          </button>
        </template>

        <div class="tab-pane fade show active" id="nav-teammates" role="tabpanel" aria-labelledby="nav-teammates-tab">
          <div class="content-header mb-1">
            <h5 class="mb-0">Team members</h5>
          </div>

          <div class="row flex-lg-nowrap justify-content-between mb-1">
            <div class="col-12 col-md-7">
              <!-- <input type="text" v-model="searchValue" /> -->
              <input type="text" id="search-teams" class="form-control my-1" placeholder="Search teammates"
                v-model="searchValue" />
            </div>
            <div class="col-12 my-1" v-show="getActiveUser?.permission === 'Admin'">
              <button @click="modalShow = !modalShow" class="rounded btn btn-primary btn-prev">
                <span class="align-middle d-inline-block">Invite your teammates</span>
              </button>
            </div>
          </div>
          <!-- modal vertical center -->
          <b-modal id="modal-center" centered title="Invite your teammate" hide-footer v-model="modalShow">
            <form @submit.prevent="inviteTeamMember" class="auth-register-form mt-2 row" novalidate>
              <div class="mb-2 col-6">
                <label class="form-label" for="first-name">First Name</label>
                <input class="form-control" id="first-name" type="text" name="first_name" placeholder="Thomas"
                  aria-describedby="first-name" autofocus="" tabindex="1" v-model="first_name" />
              </div>

              <div class="mb-2 col-6">
                <label class="form-label" for="last-name">Last name</label>
                <input class="form-control" id="last-name" type="text" name="last_name" placeholder="Edison"
                  aria-describedby="last-name" autofocus="" tabindex="1" v-model="last_name" />
              </div>

              <div class="mb-2 col-12">
                <label class="form-label" for="register-email">Email</label>
                <input class="form-control" id="register-email" type="text" name="email" v-model="email"
                  placeholder="john@example.com" aria-describedby="register-email" tabindex="2" />
              </div>
              <div>
                <b-form-group class="permissions" label="Add Permissions">
                  <b-form-radio-group v-model="permission" :options="options" name="radios-stacked" stacked />
                </b-form-group>
              </div>
              <div class="col-12">
                <button class="btn btn-primary w-100" tabindex="5">
                  Invite
                </button>
                <img v-if="loggingIn"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              </div>
            </form>
          </b-modal>

          <div class="table-responsive">
            <b-table :items="filteredItems" :key="filteredItems?.index" :fields="fields" responsive="sm">
              <template #cell(action)="data">
                <!-- <div>
        <span >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>
        </span>
      </div> -->
                <a v-show="
                  getActiveUser?.permission === 'Admin' ||
                  getActiveUser?.isOwner === 'True'
                " @click="deleteTeamMember(data?.item?.id)" class="text-danger">Delete</a>
              </template>
            </b-table>
          </div>
        </div>
      </b-tab>
      <b-tab v-show="
        getActiveUser?.permission == 'Admin' ||
        getActiveUser?.isOwner === 'true'
      ">
        <template #title>
          <button class="step-trigger" v-show="
            getActiveUser?.permission == 'Admin' ||
            getActiveUser?.isOwner == true
          ">
            <span class="bs-stepper-box d-none d-lg-block"> 2 </span>
            <span class="bs-stepper-label">
              <span class="bs-stepper-title">Deleted accounts</span>
            </span>
          </button>
        </template>
        <div class="tab-pane" id="nav-teammates" role="tabpanel" aria-labelledby="nav-teammates-tab">
          <div class="d-flex justify-content-between mb-1">
            <div class="col-12 col-md-7">
              <input type="text" id="searchDeleted" class="form-control" placeholder="Search teammates"
                v-model="searchDeletedValue" />
            </div>
          </div>
          <div></div>
          <b-table :items="filteredDeletedItems" :key="filteredItems?.index" :fields="fields" responsive="sm">
            <template #cell(action)="data">
              <a type="button" @click="restoreDeletedMember(data?.item?.id)" class="text-success">Restore</a>
            </template>
          </b-table>
        </div>
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import { defineComponent, ref } from "vue";
import ToNote from "@/Services/Tonote";
import { useToast } from "vue-toast-notification";
import { mapState } from "vuex";

const $toast = useToast();

export default defineComponent({
  name: "TeamVue",
  props: {
    generalData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    const simpleSchema = {
      email(value) {
        if (!value?.includes("@")) {
          return "Please add a valid email address";
        }
        if (value.length > 100) {
          return "Email must be less than 100 characters";
        }
        if (!value) {
          return "Email is required";
        }
        // validate email value...
        return true;
      },
      company_name(value) {
        if (!value) {
          return "Company name is required";
        }
        return true;
      },

      address(value) {
        if (!value) {
          return "Address is required";
        }
        return true;
      },
      state(value) {
        if (!value) {
          return "State is required";
        }
        return true;
      },
      phone(value) {
        if (!value) {
          return "Phone Number is required";
        }
        return true;
      },

    };
    return {
      fields: ["first_name", "last_name", "email", "permission", "action"],
      localData: this.generalData,
      first_name: "",
      last_name: "",
      permission: "",
      simpleSchema,
      email: "",
      modalShow: false,
      teams: [],
      team_members: [],
      searchDeletedValue: "",
      deleted_members: [],
    };
  },
  setup() {
    const searchValue = ref("");
    const headers = [
      { text: "First Name", value: "first_name" },
      { text: "Last Name", value: "last_name" },
      { text: "Email", value: "email" },
      { text: "Status", value: "status" },
      { text: "Permission", value: "permission" },
      { text: "", value: "action" },
    ];
    const options = [
      { text: "Admin - Full access to everything", value: "Admin" },
      { text: "Send - Can prepare and send documents", value: "Send" },
      {
        text: "View - Can only view and act as a witness on documents",
        value: "View",
      },
    ];

    const items = ref([]);

    const rows = [10, 20, 30, 40, 50];
    const serverItemsLength = ref(0);
    const serverOptions = ref({
      page: 1,
      rowsPerPage: 10,
    });
    const loading = ref(false);

    return {
      headers,
      items,
      serverOptions,
      serverItemsLength,
      loading,
      rows,
      searchValue,
      options,
    };
  },

  components: {},
  computed: {
    ...mapState("ProfileModule", ["userProfile"]),
    ...mapState("TeamsModule", ["Teams", "teamsUsers"]),

    teamMembers() {
      return this.teamsUsers;
    },
    getActiveTeam() {
      return this.Teams?.find((element) => element.active === true);
    },

    getActiveUser() {
      const activeUser = this.getActiveTeam?.users?.find(
        (team) => team?.id == this.userProfile?.id
      );

      return activeUser;
    },

    filteredItems() {
      return this.getActiveTeam?.users?.filter((item) => {
        return (
          item.first_name
            .toLowerCase()
            .indexOf(this.searchValue.toLowerCase()) > -1 ||
          item.last_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) >
          -1
        );
      });
    },

    filteredDeletedItems() {
      return this.getActiveTeam?.usersDeleted?.filter((item) => {
        return (
          item?.first_name
            ?.toLowerCase()
            .indexOf(this.searchDeletedValue.toLowerCase()) > -1 ||
          item.last_name
            .toLowerCase()
            .indexOf(this.searchDeletedValue.toLowerCase()) > -1
        );
      });
    },
  },

  methods: {
    inviteTeamMember() {
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        permission: this.permission,
        email: this.email,
      };

      // eslint-disable-next-line no-unused-vars
      ToNote.post("/team-users", data)
        // eslint-disable-next-line no-unused-vars
        .then((_res) => {
          this.modalShow = false;
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
          // this.modalShow = false;
          $toast.error(` ${err?.response?.data?.errors?.first_name ? err?.response?.data?.errors?.first_name.toString() + '<br /> ' : ''} ${err?.response?.data?.errors?.email ? err?.response?.data?.errors?.email.toString() + '<br /> ' : ''} ${err?.response?.data?.errors?.last_name ? err?.response?.data?.errors?.last_name?.toString() + '<br /> ' : ''} ${err?.response?.data?.errors?.permission ? err?.response?.data?.errors?.permission?.toString() : ''}`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
         
        });
    },

    deleteTeamMember(id) {
      // eslint-disable-next-line no-unused-vars
      ToNote.delete(`/team-users/${id}`)
        // eslint-disable-next-line no-unused-vars
        .then((_res) => {
          // this.$store.dispatch("TeamsModule/getTeamUsers");
          this.$store.dispatch("TeamsModule/getTeams");
          $toast.success(`Team member deleted successfully`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
         
          $toast.error(`${err?.response?.data?.data?.error}`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    },

    restoreDeletedMember(id) {
      // eslint-disable-next-line no-unused-vars
      ToNote.get(`/restore-team-user/${id}`)
        // eslint-disable-next-line no-unused-vars
        .then((_res) => {
          this.$store.dispatch("TeamsModule/getTeamUsers");
          this.$store.dispatch("TeamsModule/getTeams");
          $toast.success(`Team member restored successfully`, {
            duration: 3000,
            queue: false,
            position: "top-right",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
         
        });
    },
  },

});
</script>

<style>
.vue3-easy-data-table>.data-table__body>table>tbody>th>.header-text__wrapper,
.vue3-easy-data-table>.data-table__body>table>thead>tr>th,
.v-data-table>.v-data-table__wrapper>table>tfoot>tr>th {
  font-size: 20px !important;
}

.header-text {
  font-size: 16px !important;
}

.permissions .col-form-label {
  font-weight: 600;
  font-size: 1.125rem;
  border-bottom: 1px solid #e5e5e5;
}

.permissions .btn-group-vertical {
  margin-top: 1rem;
}

.permissions .btn-group-vertical .form-check {
  margin-bottom: 1rem;
  font-size: 1rem;
}
</style>
