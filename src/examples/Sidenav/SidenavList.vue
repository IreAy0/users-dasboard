<template>
  <div
    class="w-auto bg-white h-auto main-menu-content z-index-sticky  collapse navbar-collapse max-height-vh-100 pt-2 h-100"
    id="sidenav-collapse-main">

    <ul class="navbar-nav navigation navigation-main ">
      <li class="nav-item">
        <sidenav-collapse url="#" class="menu-title fs-18" :aria-controls="''" v-bind:collapse="false"
          collapseRef="/admin/dashboard" navText="Dashboard">
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-home fs-6">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse-item url="#" :aria-controls="''" v-bind:collapse="true" collapseRef="forms" text="My Documents">
          <template v-slot:miniIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>

          </template>
          <template v-slot:nav-child-item>
      <li class="nav-item">
        <a class="nav-link" :href="`${getEnv}?status=completed&qt=${getToken}`">
          <div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-1'">
            <svg style="{{
      height: 20px;
      font-size: 16px;
      margin-right: 0.5rem;
      height: 16px;
      width: 16px;
  }}
  " xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"
              data-v-64c7739b="">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-v-64c7739b=""></path>
              <polyline points="22 4 12 14.01 9 11.01" data-v-64c7739b=""></polyline>
            </svg>
          </div>
          <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">
            <span class="menu-title text-truncate fs-6 d-flex "> <span>Completed</span> </span>

          </span>
          <span class="badge rounded-pill badge-light-warning ms-auto "> {{dashboardData?.completed ?
                      dashboardData?.completed : 0}}</span>
        </a>


      </li>
      <li class="nav-item">
        <a class="nav-link" :href="`${getEnv}?status=received&qt=${getToken}`">
          <div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-1'">
            <svg style="{{
      height: 20px;
      font-size: 16px;
      margin-right: 0.5rem;
      height: 16px;
      width: 16px;
  }}
  " xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"
              data-v-af43c274="" data-v-b8d005c4="">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-v-b8d005c4="">
              </path>
              <polyline points="22,6 12,13 2,6" data-v-b8d005c4=""></polyline>
            </svg>
          </div>
          <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">
            <span class="menu-title text-truncate fs-6 d-flex "> <span>Need to Sign</span> </span>

          </span>
          <span class="badge rounded-pill badge-light-warning ms-auto "> {{dashboardData?.received ?
                      dashboardData?.received : 0}}</span>
        </a>


      </li>
      <li class="nav-item nav-sm ">
        <a class="nav-link" :href="`${getEnv}?status=sent&qt=${getToken}`">
          <div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-1'">
            <svg style="{{
      height: 20px;
      font-size: 16px;
      margin-right: 0.5rem;
      height: 16px;
      width: 16px;
  }}
  " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"
              data-v-af43c274="" data-v-b8d005c4="">
              <line x1="22" y1="2" x2="11" y2="13" data-v-b8d005c4=""></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2" data-v-b8d005c4=""></polygon>
            </svg>
          </div>
          <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">
            <span class="menu-title text-truncate fs-6 d-flex gap-3">Sent </span>

          </span>
          <span class="badge rounded-pill badge-light-warning ms-auto"> {{dashboardData?.sent ? dashboardData.sent :
                      0}}</span>
        </a>


      </li>
      <li class="nav-item">
        <a class="nav-link" :href="`${getEnv}?status=new&qt=${getToken}`">
          <div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-1'">
            <svg style="{{
      height: 20px;
      font-size: 16px;
      margin-right: 0.5rem;
      height: 16px;
      width: 16px;
  }}
  " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder-plus"
              data-v-af43c274="" data-v-b8d005c4="">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" data-v-b8d005c4="">
              </path>
              <line x1="12" y1="11" x2="12" y2="17" data-v-b8d005c4=""></line>
              <line x1="9" y1="14" x2="15" y2="14" data-v-b8d005c4=""></line>
            </svg>
          </div>
          <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">
            <span class="menu-title text-truncate fs-6 d-flex gap-3">Draft </span>
          </span>
          <span class="badge rounded-pill badge-light-warning ms-auto"> {{dashboardData?.draft ? dashboardData.draft :
                      0}}</span>

        </a>


      </li>
      <li class="nav-item">
        <a class="nav-link" :href="`${getEnv}?status=deleted&qt=${getToken}`">
          <div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-1'">
            <svg style="{{
      height: 20px;
      font-size: 16px;
      margin-right: 0.5rem;
      height: 16px;
      width: 16px;
  }}
  " xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"
              data-v-af43c274="" data-v-b8d005c4="">
              <polyline points="3 6 5 6 21 6" data-v-b8d005c4=""></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-b8d005c4="">
              </path>
            </svg>
          </div>
          <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">
            <span class="menu-title text-truncate fs-6 d-flex gap-3">Deleted Files </span>

          </span>
          <span class="badge rounded-pill badge-light-warning ms-auto"> {{dashboardData?.deleted ? dashboardData?.deleted
                      : 0}}</span>

        </a>


      </li>
      <li class="nav-item">
        <!-- :href="`${signLink}?status=sign&qt=${getToken}`" -->
        <a class="nav-link" href="#">
          <div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-1'">
            <!-- <svg style="{{
    height: '20px';
    font-size: '16px';
    margin-right: '0.5rem';
    height: '16px';
    width: '16px';
}}
" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash" data-v-af43c274="" data-v-b8d005c4=""><polyline points="3 6 5 6 21 6" data-v-b8d005c4=""></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-b8d005c4=""></path></svg>  -->
            <svg data-v-1a464b11="" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-link">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <span class="nav-link-text d-flex" :class="isRTL ? ' me-1' : 'ms-1'">
            <span class="menu-title text-truncate fs-6 d-flex gap-3">Sign Link </span>
            <span title="Coming Soon" class="coming-soon  border border-warning text-warning" data-v-735b3461=""> Coming Soon</span>

          </span>
          <!-- <span class="badge rounded-pill badge-light-warning ms-auto"> {{signLinkDocuments ? signLinkDocuments.length :
                      0}}</span> -->

        </a>


      </li>
      </template>
      </sidenav-collapse-item>
      </li>

      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="/admin/requests"
          navText="Requests">
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-file-text">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="/admin/locker"
          navText="Digital Locker">
          <template v-slot:icon>

            <svg fill="none" stroke="currentColor" stroke-width="20" xml:space="preserve" id="Layer_1" x="0" y="0"
              version="1.1" viewBox="0 0 607 623">
              <path
                d="M128 618H49l-1-3-3-10-1-5h-4l-13-1c-14-2-21-8-22-22V183c1-14 8-21 22-22h311v8H28c-11 1-14 4-15 14v393c1 11 4 14 15 15l13 1 6 1h3l3 10 2 7h67l6-19h66l151 1h3l3 8 3 10h67l3-12 2-6h8l12-1c14-1 16-4 17-17V299h4v-3h4v278c-1 18-7 24-24 25l-12 1h-3l-4 15-1 3h-79l-1-3-4-12-1-3-148-1h-60l-6 19zm110-52H61c-23 0-26-3-26-27V220c0-10 1-17 5-21 4-5 11-5 22-5h268l-2 6-4 8-2 7-2 3v1l-2 4 12 6 48 23 46 22h1l13 7 3 1v258c0 10-1 17-5 21s-11 5-21 5H238zM43 387v152c0 8 0 14 2 16s8 3 16 3a207682 207682 0 0 0 370-2l2-14V287l-12-6h-1l-46-22-47-23-19-9 4-11h1v-1l1-3 3-7 1-3H61c-8 0-14 0-16 2s-2 8-2 16v167zm189 81a92 92 0 0 1-82-86c0-48 41-90 88-90 49 0 88 47 88 87 1 23-12 49-32 67a73 73 0 0 1-56 21l-6 1zm6-168c-42 0-80 38-80 82 0 19 11 42 29 59 16 14 34 20 51 18h1c16 2 34-5 50-19 18-17 30-40 29-61 0-18-9-38-24-53a78 78 0 0 0-56-26zm138 150c-6 0-16-1-20-13l-1-8v-98c0-16 9-20 15-20l3-1c8-1 19-3 27 12l2 4-25 8-1 77v16h4l16 4 3 1v3c-1 15-12 15-18 15h-5zm-13-119v104c2 5 6 7 16 7h2c5 0 8 0 9-4l-12-3-10-2v-22l1-81v-3l21-6c-5-5-10-4-17-3l-3 1c-3 0-7 2-7 12z" />
              <path
                d="M232 468a92 92 0 0 1-82-86c0-48 41-90 88-90 49 0 88 47 88 87 1 23-12 49-32 67a73 73 0 0 1-56 21l-6 1zm6-168c-42 0-80 38-80 82 0 19 11 42 29 59 16 14 34 20 51 18h1c16 2 34-5 50-19 18-17 30-40 29-61 0-18-9-38-24-53a78 78 0 0 0-56-26zm138 150c-6 0-16-1-20-13l-1-8v-98c0-16 9-20 15-20l3-1c8-1 19-3 27 12l2 4-25 8-1 77v16h4l16 4 3 1v3c-1 15-12 15-18 15h-5zm5-133-7 1-4 1c-3 0-7 2-7 12v104c2 5 6 7 16 7h2c5 0 8 0 9-4l-12-3-10-2v-22l1-81v-3l21-6c-3-3-6-4-9-4zM56 303h-1l-4-1v-3c-2-14-4-27 3-42l1-4 4 2c13 7 12 18 11 25v7c1 5 0 9-3 12-2 2-6 4-11 4zm3-38c-3 10-2 19-1 29l3-1c1-1 2-2 1-5v-9c1-6 1-10-3-14zm4 244-4-4c-8-9-12-21-10-32 2-7 6-13 13-16l4-2 1 4c4 12 6 26-2 44l-2 6zm-2-42-4 8c-1 6 0 12 4 18 2-8 2-16 0-26z" />
              <path
                d="M308 380c4-38-35-70-69-71-39 0-72 35-72 71 0 37 35 70 70 70 39 1 75-35 71-70zm-50-15c-9 15-7 30-5 45l-2 8h-25l-3-6c2-17 4-32-5-48-3-3 3-14 8-20 4-6 20-6 24 0 5 6 11 17 8 21z"
                class="st0" />
              <path
                d="m559 160-4-2-159-81-3-2v-1l2-3 20-43 59-24 130 63-45 93zM404 71l151 78 38-78-119-58-53 21-18 36 1 1z" />
              <path d="M399 74h-1l-1-1 1-2h1v1h1l-1 2z" />
              <path
                d="m422 278-93-45-1-1-5-2-1-1-9-4 3-7 1-1 1-4H55v30c17 4 25 14 25 32v6c0 19-9 30-26 36v127l7 2c18 3 19 4 19 21v22c0 23-1 25-21 26-2 0-3 2-4 3v29h258c7-6 2-19 16-18l5 18h86c4-15 4-176 2-269zM238 463c-42 5-85-42-84-81 0-46 40-86 84-86 46 0 84 44 84 83 1 43-43 89-84 84zm134-33 23 5c-1 12-9 11-16 11-8 0-16-1-19-10l-1-7v-98c0-8 2-15 11-16 9-2 19-5 26 9l-23 6-1 100z"
                class="st0" />
              <path
                d="m511 325-4-2-41-20h-1l-20-10-10-5-14-7h-1l-46-22-47-23-19-9 4-11h1v-1l1-3 3-7 3-8 1-1 13-33h1l41-101 2-4 25 13h1l-2 4-44 91-22 45 133 64 21 10 66-136 3 2 16 7 8 5-18 41-52 117-2 4zM318 223l12 6 48 23 46 22h1a872 872 0 0 1 14 7l10 5 20 10 38 18 51-113 15-35h-2l-11-7-66 136-28-13-140-67 25-53 42-87v-1l-11-6-40 97v1l-14 33v1l-3 8-3 7-2 3v1l-2 4z" />
              <path
                d="m513 208-133-68 10-19 132 68-9 19zm-122-72 118 61 3-4-118-61-3 4zm107 99-132-69 9-18 133 68-10 19zm-122-72 118 61 3-4-118-62-3 5zm109 98-133-69 10-18 132 68-9 19zm-122-72 118 61 2-4-118-62-2 5z" />
            </svg>

          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse url="#" :aria-controls="''" v-bind:collapse="false" collapseRef="/admin/settings"
          navText="Settings">
          <template v-slot:icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-settings">
              <circle cx="12" cy="12" r="3"></circle>
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
              </path>
            </svg>
          </template>
        </sidenav-collapse>
      </li>


    </ul>
    <hr />
    <div class="sidenav-footer ">
      <div class="help-box help-box-light text-center">
        <a href="javascript: void(0);" class="float-end close-btn text-body">
          <i class="mdi mdi-close"></i>
        </a>
        <div class="text-center">
          <img src="/app-assets/images/pages/help-icon.svg" height="90" alt="Helper Icon Image" />
        </div>
        <h5 class="mt-3">
          Your current plan is
          <span class="text-primary font-weight-bold d-flex justify-content-center mt-1">{{
                      getActive?.subscription?.plan?.name
                      }}
            <span v-if="getActive?.subscription?.plan?.trial == true" title="Free trial"
              class="coming-soon  border border-warning text-warning" data-v-735b3461=""> Free Trial </span>
          </span>
        </h5>
        <hr />

        <div>Sends remaining: {{remainingEnvelops}} </div>
        <hr />
        <!-- {{getActive?.subscription?.plan?.expired_at?.toLocaleString() > new Date().toLocaleString() ? 'Your plan will expire on ' + getActive?.subscription?.plan?.expired_at : 'Your plan has expired'}} -->
        <p v-show="getActive?.subscription?.plan?.trial == true" class="text-primary font-weight-bold"> {{
                  getActive?.subscription?.plan?.days_remaining }} left</p>

        <div
          v-show="getActive?.subscription?.plan?.name == 'Basic' || getActive?.subscription?.plan?.name == 'Pro' || getActive?.subscription?.plan?.trial == true">
          <p class="mb-2" v-show="getActive?.subscription?.plan?.trial == false">
            Upgrade to <span
              class="text-primary font-weight-bold">{{getActive?.subscription?.plan?.next_suggested_plan}}</span> to
            share more documents.
          </p>
          <div class="text-center">
            <a href="/admin/settings/?tab=billing" class="btn btn-primary btn-sm"> {{getActive?.subscription?.plan?.trial
                          == true ? 'Pay now' : 'Upgrade' }}</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/Services/helpers";
import { mapActions, mapState } from "vuex";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import { timeFormat } from "@/Services/helpers";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavCollapse,
    SidenavCollapseItem


  },
  computed: {
    ...mapState("ProfileModule", ["userProfile", "dashboardData", "signLinkDocuments"]),
    ...mapState("TeamsModule", ["Teams"]),
    ...mapState("MenuModule", ["openMenu"]),
    ...mapState("DocumentModule", ["counter"]),
    getToken() {
      const token = getToken();
      return token;
    },
    formateDate(data) {

      return timeFormat(data)
    },

    getEnv() {
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_DOCUMENT_PAGE_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ? process.env.VUE_APP_DOCUMENT_PAGE_STAGING : process.env.VUE_APP_DOCUMENT_PAGE_LIVE

    },
    signLink() {
      return process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_SIGN_LINK_DEV : process.env.VUE_APP_ENVIRONMENT == 'staging' ? process.env.VUE_APP_SIGN_LINK_STAGING : process.env.VUE_APP_SIGN_LINK_LIVE

    },
    getActive() {
      const active = this?.Teams?.find((element) => element.active == true);
      return active;
    },
    remainingEnvelops() {
      const number = this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.limit_number - this.getActive?.subscription?.plan?.features?.find(feat => feat?.name?.includes('Envelops'))?.executed;

      return number
    }
  },
  methods: {

    ...mapActions("TeamsModule", ["getTeams"]),
    ...mapActions("TeamsModule", ["logout"]),
    ...mapActions('ProfileModule', ['getUser', 'getPrints', 'getDashboardData', '']),

    openNav() {
      this.navOpen = !this.navOpen;
    },
  },
  mounted: function () {
    this.getDashboardData();
  }
};
</script>
<style>
.coming-soon {
  display: inline-block;
  padding: 2px 5px;
  text-align: center;
  border-radius: 5px;
  font-size: 10px;
  font-weight: 700;
  margin: 0 10px;
}

.cls-1 {
  stroke-width: 8px;
  fill: none;
  stroke: currentColor;
  stroke-miterlimit: 10
}

.st0 {
  fill: none;
  stroke: currentColor;
  stroke-width: 8;
  stroke-miterlimit: 10
}
</style>