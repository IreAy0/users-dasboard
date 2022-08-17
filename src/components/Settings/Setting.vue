<template>
  <div>
    <main-layout>
      <template v-slot:default>
        <div class="row">
          <div class="col-12 settingsPage">
            <nav class="overflow-auto nav-withScroll">
              <div
                class="nav flex-nowrap text-center d-inline-flex d-sm-flex nav-tabs bg-white shadow pt-1 pe-2 ps-2"
                id="nav-tab"
                role="tablist"
              >
                <router-link
                  :to="{ path: '/admin/settings', query: { tab: 'home' } }"
                  class="nav-link"
                  @click.prevent="setActive('home')"
                  :class="{ active: isActive('home') }"
                >
                  <span class="p-1 span"> Profile </span>
                </router-link>
                <router-link
                  class="nav-link"
                  :to="{ path: '/admin/settings', query: { tab: 'team' } }"
                  @click.prevent="setActive('team')"
                  :class="{ ' active': isActive('team') }"
                >
                  <span class="p-1 span">Team</span>
                </router-link>
                <router-link
                  :to="{ path: '/admin/settings', query: { tab: 'company' } }"
                  class="nav-link"
                  @click.prevent="setActive('company')"
                  :class="{ ' active': isActive('company') }"
                >
                  <span class="p-1 span">Company</span>
                </router-link>
                <router-link
                  :to="{ path: '/admin/settings', query: { tab: 'billing' } }"
                  class="nav-link"
                  @click.prevent="setActive('billing')"
                  :class="{ ' active': isActive('billing') }"
                >
                  <span class="p-1 span"> Billings & Payment</span>
                </router-link>
                <router-link
                  class="nav-link"
                  :to="{ path: '/admin/settings', query: { tab: 'security' } }"
                  @click.prevent="setActive('security')"
                  :class="{ ' active': isActive('security') }"
                >
                  <span class="p-1 span"> Notification & Security</span>
                </router-link>
              </div>
            </nav>
            <div class="tab-content mt-1 mt-lg-3" id="nav-tabContent">
              <div
                class="tab-pane fade"
                :class="{ 'active show': isActive('home') }"
                id="home"
              >
                <ProfileVue />
              </div>
              <div
                class="tab-pane fade"
                :class="{ 'active show': isActive('company') }"
                id="company"
              >
                <div
                  v-show="
                    getActiveTeam?.subscription?.plan?.name === 'Business'
                  "
                >
                  <CompanyDetail
                    :generalData="profile"
                    :getActiveTeam="getActiveTeam"
                  />
                </div>
                <UpgradeRequest
                  @activeName="getMenu"
                  v-show="getActiveTeam?.subscription?.plan?.name === 'Basic' ||
                    getActiveTeam?.subscription?.plan?.name === 'Pro'" 
                />
              </div>
              <div
                class="tab-pane fade"
                :class="{ 'active show': isActive('team') }"
                id="team"
              >
                <div
                  v-show="
                    getActiveTeam?.subscription?.plan?.name === 'Business' ||
                    getActiveTeam?.subscription?.plan?.name === 'Pro'
                  "
                >
                  <Teams
                    :generalData="profile"
                    :getActiveTeam="getActiveTeam"
                  />
                </div>
                <UpgradeRequest
                  @activeName="getMenu"
                  v-show="getActiveTeam?.subscription?.plan?.name === 'Basic'"
                />
              </div>

              <!-- v-show="getActiveUser?.permission === 'Admin'" -->
              <div
                class="tab-pane fade"
                :class="{ 'active show': isActive('billing') }"
                id="billing"
              >
                <Billings />
              </div>
              <div
                class="tab-pane fade"
                :class="{ 'active show': isActive('security') }"
                id="security"
              >
                <Notifications />
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </template>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from "@/components/MainLayout.vue";
import ProfileVue from "./Profile/Profile.vue";
import Teams from "./Teams/Team.vue";
import Billings from "./Billings/Billings.vue";
import Notifications from "./Notification/Setup.vue";
import Company from "../Companies/Company.vue";
import ToNote from "@/Services/Tonote";
import UpgradeRequest from "../UpgradeRequest.vue";
import CompanyDetail from "../Companies/CompanyDetail.vue";
import { mapState } from "vuex";
export default {
  name: "SettingsPage",
  components: {
    MainLayout,
    ProfileVue,
    Teams,
    Billings,
    Notifications,
    UpgradeRequest,
    CompanyDetail,
  },
  data() {
    return {
      profile: {},
      activeItem: this.$route.query.tab || "home",
    };
  },

  methods: {
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    getMenu(value) {
      this.setActive(value);
    },
  },

  computed: {
    ...mapState("TeamsModule", ["Teams"]),
    ...mapState("ProfileModule", ["userProfile"]),

    getActiveUser() {
      const activeUser = this.Teams?.find(
        (team) => team?.id == this?.userProfile?.id
      );
      return activeUser;
    },
    getActiveTeam() {
      return this.Teams?.find((element) => element?.active == true);
    },
  },
};
</script>

<style scoped></style>

