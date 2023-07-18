
<template>
  <nav
    class="shadow navbar bg-white py-1 my-2 mx-2 navbar-main navbar-expand-lg border-radius-xl position-sticky  left-auto top-1 z-index-2 px-0 "
    v-bind="$attrs" id="navbarBlur" data-scroll="true" :class="isAbsolute ? 'mt-4' : ''">
    <div class="container-fluid">
      <ul class="nav navbar-nav align-items-center bookmark-icons">
        <li @click="toggleSidebar" class="nav-item d-xl-none  d-flex align-items-center">
          <a href="#" class="p-1 nav-link text-body lh-1" id="iconNavbarSidenav">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </a>
        </li>
        <li class="nav-item ">
          <a class="nav-link text-body font-weight-bold px-0 me-1 me-lg-3" href="#">
            <h6 class="mb-0 fs-3 text-capitalize">{{ title }}</h6>
          </a>
         
        </li>
        <li class="nav-item ">
          <span :class="{
            'badge rounded-pill badge-light-danger':
              !userProfile?.national_verification,
            'badge rounded-pill badge-light-success':
              userProfile?.national_verification,
          }" class="fs-5 ">
            {{
                userProfile?.national_verification ? "Verified" : "Not Verified"
            }}
          </span>
        </li>

      </ul>

      <div class="mt-0 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar">

        <ul class="navbar-nav justify-content-end ms-md-auto">


          <li class="nav-item dropdown d-flex align-items-center">
            <a href="#" class="p-0 nav-link lh-1 d-flex justify-content-center align-items-center"
              :class="[color ? color : 'text-body', showMenu ? 'show' : '']" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
              <div class="user-nav d-sm-flex flex-column gap-50 d-none me-1">
                <span class="user-name fw-bolder">{{ userProfile?.first_name }}
                  {{ userProfile?.last_name }}</span><span class="user-status">{{ getActive?.subscription?.plan?.name }}
                  Plan</span>
              </div>
              
              <span class="avatar">
                <img v-if="companyProfile?.logo || userProfile?.image.includes('user')" :src="companyProfile?.logo || userProfile?.image" :alt="userProfile?.initials"
                  class="img d-flex align-items-center justify-content-center">
                <span v-else  class="img d-flex align-items-center justify-content-center">
                {{
                    userProfile?.initials
                }}
                </span>
                <!-- <img  v-else  :src="userProfile?.image" class="img d-flex align-items-center justify-content-center" alt={{userProfile?.initials}} /> -->

                <span class="avatar-status-online"></span>
              </span>
              <!-- <i class="material-icons cursor-pointer"> notifications </i> -->
            </a>
            <ul style="max-height: 70vh" class=" dropdown-menu dropdown-menu-end me-sm-n4 overflow-auto" :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton">
              <li class="">
                <div class="dropdown-item m-0 demo-inline-spacing d-flex justify-content-center">
                  <div class="avatar avatar-xl m-0">
                    <img v-if="companyProfile?.logo || userProfile?.image.includes('user')" :src="companyProfile?.logo || userProfile?.image" :alt="userProfile?.initials"
                    class="img d-flex align-items-center justify-content-center">
                    <span v-else class="img d-flex align-items-center justify-content-center">{{ userProfile?.initials
                    }}</span>
                  </div>
                </div>
                <div class=" text-center border-bottom pb-1 px-2">

                  <h6>{{ userProfile?.first_name }} {{ userProfile?.last_name }} </h6>
                  <small>{{ userProfile?.email }}</small>
                </div>
              </li>
              <li v-for="(item, index) in Teams" :key="index" class=" border-bottom ">

                <a @click="switchTeam(item?.id)" class="dropdown-item py-1" href="javascript:;">
                  <div class=" d-flex">
                    <div class="my-auto">
                      <div class="avatar avatar-md me-1">
                        <img v-if="item?.image" :src="item?.image" alt=""
                          class="img d-flex align-items-center justify-content-center">
                        <span v-else class="img d-flex align-items-center justify-content-center"
                          style="font-size: 12px;">{{ item?.name?.charAt(0) }}</span>
                        <span :class="{ 'd-none': item.active === false }" class="avatar-status-online"></span>
                      </div>
                      <!-- <img
                        src="../../assets/img/team-2.jpg"
                        class="avatar avatar-md me-1 "
                        alt="user image"
                      /> -->
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-lg font-weight-normal text-truncate" style="max-width: 120px">
                        <span class="font-weight-bold">{{ item.name }}</span> f
                      </h6>
                      <p class="mb-0 text-sm text-secondary">

                        {{ item?.subscription?.plan?.name }} plan
                      </p>
                    </div>
                  </div>
                </a>
              </li>
             
              <li class="">
                <a class="dropdown-item py-1" href="javascript:;">
                  <div @click="logout" class="text-center">
                    <a class="btn btn-outline-seconday mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="14"
                        height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="feather feather-power me-50">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                      </svg>
                      Logout</a>
                  </div>
                </a>
              </li>

            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
// import MaterialInput from "@/components/MaterialInput.vue";
// import Breadcrumbs from "../Breadcrumbs.vue";
import ToNote from '@/Services/Tonote';
import socket from '@/socket';
import { useToast } from 'vue-toast-notification';
import { mapState, mapActions, mapMutations } from 'vuex'
import { getToken } from '@/Services/helpers';

const $toast = useToast()

export default {
  name: "navbarMain",
  data() {
    return {
      showMenu: false,
    };
  },
  props: ["minNav", "color"],
  methods: {
    ...mapMutations("MenuModule", ["navbarMinimize", "toggleConfigurator"]),
    ...mapActions('ProfileModule', ['getUser']),
    ...mapActions('schedule', ['getAffidavitRequest']),
    ...mapActions('AuthModule', ['logout']),
    ...mapActions('TeamsModule', ['getTeams']),
    // ...mapActions('MenuModule', ['toggleMenu']),
    openNav() {
      this.navOpen = !this.navOpen;
    },
    switchTeam(id) {
      ToNote.get('/team-switch/' + id).then(response => {
       
        this.getTeams();
        $toast.success('Team switched successfully', {
          position: 'top-right',
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
            position: 'top-right',
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
    },
    toggleSidebar() {
      this.navbarMinimize();
    },
    emitSocket() {
      const data = this.userProfile.email
      socket.emit('request_sent', data )
    },
    playSound(){
    var audio = new Audio(require('@/assets/sounds/notify.mp3'));
    audio.play();
  },
  },
  components: {
  },
  computed: {
    ...mapState("MenuModule", ["isRTL", "isAbsolute", "isPinned"]),
    ...mapState("ProfileModule", ["userProfile"]),
    ...mapState("CompanyModule", ["companyProfile"]),
    ...mapState("TeamsModule", ["Teams"]),
    // ...mapState("MenuModule", ["openMenu"]),
    getActive() {
      const active = this?.Teams?.find((element) => element.active == true);
      return active;
    },
    currentRouteName() {
      return this.$route.name;
    },
    title(){
      // get pathname
      const path = this.$route.path;
      // get the last part of the path
      const lastPart = path.split('/').pop();
      return lastPart;
    }
  
  },
  mounted: function () {
    this.getUser();
    // this.getTeams()
    socket.auth = {
  username: `${this.userProfile?.first_name}-${this.userProfile?.last_name}`,
  token: getToken(),
  sessionRoom: `video-sign-notification`,
  sessionTitle: `session-title`,
  };
  socket.connect();
 
  socket.on("connect_message", (data) => {
    console.log(data, 'data');
  });

  const tryReconnect = () => {
      setTimeout(() => {
        socket.io.open((err) => {
          if (err) {
            tryReconnect();
          }
        });
      }, 2000);
    };
    socket.io.on("close", tryReconnect);


  },


  created: function () {
    this.minNav;
    socket.on("request_sent", (data) => {
      if (data === this.userProfile.email) {
        this.playSound();
        $toast.success(`You've been invited you to a session`,  {
          duration: 5000,
          queue: false,
          position: "top-right",
          dismissible: true,
          pauseOnHover: true,
        });
      }

      
    });
 
    // socket.connect();
    // socket.on('connected', () => {
    //   // eslint-disable-next-line no-console
    //   console.log('socket connected new');
    // });

    
  
    // jakel67956@ngopy.com


  },
};
</script>
