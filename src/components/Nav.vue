<template>
  <nav class="header-navbar navbar  align-items-center floating-nav navbar-light navbar-shadow container-xxl">
    <div class="navbar-container d-flex content">
      <div class="bookmark-wrapper d-flex align-items-center">
        <ul class="nav navbar-nav d-xl-none">
          <li class="nav-item">
            <a class="nav-link menu-toggle" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg></a>
          </li>
        </ul>
        <ul class="nav navbar-nav align-items-center bookmark-icons">
          <li class="nav-item ">
           Dashboard
          </li>

          <li class="nav-item d-none d-lg-block">
            <span :class="{
              'badge rounded-pill badge-light-danger':
                !userProfile?.national_verification,
              'badge rounded-pill badge-light-success':
                userProfile?.national_verification,
            }" class="fs-5">
              {{
                  userProfile?.national_verification ? "Verified" : "Not Verified"
              }}
            </span>
          </li>

        </ul>
      </div>
      <ul class="nav navbar-nav align-items-center ms-auto">

        <li class="nav-item dropdown">
          <a @click="openNav" class="nav-link dropdown-toggle dropdown-user-link" id="dropdown-users" href="#"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="user-nav d-sm-flex d-none">
              <span class="user-name fw-bolder">{{ userProfile?.first_name }}
                {{ userProfile?.last_name }}</span><span class="user-status">{{ getActive?.subscription?.plan?.name }}
                Plan</span>
            </div>
            <span class="avatar">
              <img v-if="userProfile.image.includes('user')" src={{userProfile?.image}} class="img d-flex align-items-center justify-content-center" alt={{userProfile?.initials}} />
              <span v-else class="img d-flex align-items-center justify-content-center">{{ userProfile?.initials }}
              </span>
              <span class="avatar-status-online"></span>
            </span>
          </a>
          <div :class="{ show: navOpen }" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-users">
            <div style="" class="">
              <div class="demo-inline-spacing d-flex justify-content-center">
                <div class="avatar avatar-xl">
                  <span class="img d-flex align-items-center justify-content-center">{{ userProfile?.initials }}</span>
                </div>
              </div>
              <div class="p-2 text-center border-bottom">
                <h6>{{ userProfile?.first_name }} {{ userProfile?.last_name }}</h6>
                <small>{{ userProfile?.email }}</small>
              </div>
              <a v-for="(item, index) in Teams" :key="index"
                class="dropdown-item border-bottom align-items-center d-flex justify-content-between" href="#">
                <div @click="switchTeam(item?.id)" class="d-flex align-items-center d-flex justify-content-between">
                  <div class="avatar ">
                    <span class="img d-flex align-items-center justify-content-center"
                      style="font-size: 12px;">{{ item?.name?.charAt(0) }}</span>
                    <span :class="{ 'd-none': item.active === false }" class="avatar-status-online"></span>
                  </div>
                  <div>
                    <h5 class="text-truncate" style="max-width: 120px">
                      {{ item.name }}
                    </h5>
                    <div>
                      <small>{{ item?.subscription?.plan?.name }} plan</small>
                    </div>
                  </div>
                </div>

              </a>
              <!-- <a class="dropdown-item border-bottom align-items-center d-flex justify-content-between" href="#">
                <div class="avatar avatar-xl">
                    <span class="img d-flex align-items-center justify-content-center"
                        style="font-size: 12px;">TT</span>
                </div>
                <div>
                    <h5 class="text-truncate" style="max-width: 120px;">ToNote Technologies Ltd.</h5>
                    <div><small>Business Plan</small></div>
                </div>
            </a> -->
              <div @click="logout" class="text-center">
                <a class="btn btn-outline-seconday"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" class="feather feather-power me-50">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                  </svg>
                  Logout</a>
              </div>
            </div>
          </div>
        </li>

        <div></div>
        <div></div>
      </ul>
    </div>
  </nav>
</template>

<script>
import ToNote from '@/Services/Tonote';
import { useToast } from 'vue-toast-notification';
import { mapState, mapActions } from 'vuex'


const $toast = useToast()
export default {
  name: "NavBar",
  data() {
    return {
      navOpen: false,
    };
  },
  components: {},
  computed: {
    ...mapState("ProfileModule", ["userProfile"]),
    ...mapState("CompanyModule", ["companyProfile"]),
    ...mapState("TeamsModule", ["Teams"]),
    ...mapState("MenuModule", ["openMenu"]),
    getActive() {
      const active = this?.Teams?.find((element) => element.active == true);
      return active;
    },
  },
  methods: {
    ...mapActions('ProfileModule', ['getUser']),
    ...mapActions('AuthModule', ['logout']),
    ...mapActions('TeamsModule', ['getTeams']),
    ...mapActions('MenuModule', ['toggleMenu']),
    openNav() {
      this.navOpen = !this.navOpen;

    },
    switchTeam(id) {
      ToNote.get('/team-switch/' + id).then(response => {
        this.getTeams();
        $toast.success('Team switched successfully', {
          position: 'center',
          duration: 3000,
          action: {
            text: 'Dismiss',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        });
        window.location.reload();
      })
        .catch(error => {
        
          $toast.error(error?.response?.data?.data?.error, {
            position: 'center',
            duration: 3000,
            action: {
              text: 'Dismiss',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              }
            }

          })
        })

        ;
    }

  },
  mounted: function () {
    this.getUser();
    // this.getTeams()
  },
};
</script>
<script></script>
<style scoped>
.avatar.img {
  border-radius: 50%;
  min-width: 40px;
  min-height: 40px;
}
</style>
