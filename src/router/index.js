
import { createRouter, createWebHistory } from "vue-router";
// import Dashboard from "../views/Dashboard.vue";

// import Profile from "../views/Profile.vue";
// import SignIn from "../views/auth/login/loginPage.vue";
// import RegisterPage from "../views/auth/signUp/registerPage.vue";
// import ForgotPassword from "../views/auth/passwords/forgotPassword.vue";
// import ResetPassword from "@/views/auth/passwords/resetPassword.vue";
// import verifyPage from "../views/auth/verify-email/verifyPage.vue";
// import RedirectPage from "../views/auth/fromDoc.vue";
import AdminLayout from "../layout.vue"

import store from "@/store";
import isAuthenticated from "@/Services/isAuthenticated";

const RequestPage = () =>
  import(
    /* webpackChunkName: "requests" */ "@/components/Requests/Request.vue"
  );

const LockerPage = () => import( /* webpackChunkName: "locker" */ "@/components/Locker/locker.vue");

const Dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"
  );

const SignIn = () =>
  import(
    /* webpackChunkName: "signIn" */ "../views/auth/login/loginPage.vue"
  );
const RegisterPage = () =>
  import(
    /* webpackChunkName: "register" */ "../views/auth/signUp/registerPage.vue"
  );
const ForgotPassword = () =>
  import(
    /* webpackChunkName: "forgotPassword" */ "../views/auth/passwords/forgotPassword.vue"
  );
const SettingPage = () =>
  import(
    /* webpackChunkName: "settings" */ "../components/Settings/Setting.vue"
  );

  const VideoSign = () =>
  import(
    /* webpackChunkName: "settings" */ "@/components/Requests/folders/VideoSign.vue"
  );

  const DocumentPreview = () =>
  import(
    /* webpackChunkName: "preview-document" */ "@/components/Requests/DocumentPreview.vue"
  );

  const NewDocumentPreview = () => 
    import(
      /* webpackChunkName: "preview-dashboard-document" */ "@/components/Admin/Document/ViewDocument.vue"
    );

  const DocumentDownload = () =>
  import(
    /* webpackChunkName: "download-document" */ "@/components/Requests/DocumentDownload.vue"
  );

  const ResetPassword = () =>
    import(
      /* webpackChunkName: "settings" */ "@/views/auth/passwords/resetPassword.vue"
    );
  
const verifyPage = () =>
  import(
    /* webpackChunkName: "settings" */ "../views/auth/verify-email/verifyPage.vue"
  );
const reVerify = () =>
  import(
    /* webpackChunkName: "settings" */ "../views/auth/verify-email/reverify.vue"
  );
const RedirectPage = () =>
  import(
    /* webpackChunkName: "settings" */ "../views/auth/fromDoc.vue"
  );
const PaymentConfirmationPage = () =>
  import(
    /* webpackChunkName: "document" */ "../components/Payment/PaymentConfirmation.vue"
  );

const routes = [

  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    meta: {
      title: "SignIn | ToNote",
    },

  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/reset-password",
    name: "resetPassword",
    component: ResetPassword,
  },
  {
    path: "/verify",
    name: "verify-email",
    component: verifyPage,
  },
  {
    path: "/verify-email",
    name: "re-verify",
    component: reVerify,
  },
  {
    path: "/redirecting",
    name: "redirect",
    component: RedirectPage,
  },

  {
    path: "/admin",
    name: "admin",
    component: AdminLayout,
    meta: {
      title: "Dashboard | ToNote",
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "payment-confirmation",
        name: "paymentconfirmation",
        component: PaymentConfirmationPage,
      },
      {
        path: "requests",
        name: "admin.requests",
        component: RequestPage,
        meta: {
          title: " Requests | Tonote",
        }
      },
      {
        path: "locker",
        name: "admin.locker",
        component: LockerPage,

        meta: {
          title: " Locker | Tonote",
        }
      },
      {
        path: "settings",
        name: "admin.settings",
        component: SettingPage,
        meta: {
          title: " Settings | ToNote ",
        },
      },
      {
        path: "preview/:doc_id",
        name: "admin.preview",
        component: DocumentPreview,
        meta: {
          title: "Preview Document | ToNote",
         
        },
      },
       {
        path: "document/:doc_id/preview",
        name: "admin.preview-dashboard-document",
        component: NewDocumentPreview,
        meta: {
          title: "Preview Document | ToNote",
         
        },
      },
        {
          path: "download/:doc_id",
          name: "admin.download",
          component: DocumentDownload,
          meta: {
            title: "Download Document | ToNote",
           
          },
      },
      // {
      //   path: "video-signing-schedule",
      //   name: "admin.document",
      //   component: VideoSign,
      //   meta: {
      //     title: "Video Signing Schedule | ToNote",
      //     // metaTags: [
      //     //   {
      //     //     name: "description",
      //     //     content: "The document upload's page of ToNote.",
      //     //   },
      //     //   {
      //     //     property: "og:description",
      //     //     content: "The document upload's page of ToNote.",
      //     //   },
      //     // ],
      //   },
      // },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "router-link-exact-active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: "smooth",
      };
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});


router.beforeEach(async (to, from, next) => {
  
  // await  store.dispatch("ProfileModule/getUser");
  if (to.fullPath?.includes("admin") && isAuthenticated() == false) {
    next("/");
  } else if (to.fullPath == "/" || to.fullPath == "/register") {
    if (isAuthenticated() == true) {
      next("/admin/dashboard");
    }
  }

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags)

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    // document.title = previousNearestWithMeta.meta.title
  }

  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();

  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).foreEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));
  next();

});

export default router;
