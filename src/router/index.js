
import { createRouter, createWebHistory } from "vue-router";
// import Dashboard from "../views/Dashboard.vue";

import Profile from "../views/Profile.vue";
// import SignIn from "../views/auth/login/loginPage.vue";
// import RegisterPage from "../views/auth/signUp/registerPage.vue";
// import ForgotPassword from "../views/auth/passwords/forgotPassword.vue";
// import ResetPassword from "@/views/auth/passwords/resetPassword.vue";
// import verifyPage from "../views/auth/verify-email/verifyPage.vue";
// import RedirectPage from "../views/auth/fromDoc.vue";


import store from "@/store";

const RequestPage = () =>
  import(
    /* webpackChunkName: "requests" */ "@/components/Requests/Request.vue"
  );

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
  const ResetPassword = () =>
  import(
    /* webpackChunkName: "settings" */ "@/views/auth/passwords/resetPassword.vue"
  );
  const verifyPage = () =>
  import(
    /* webpackChunkName: "settings" */ "../views/auth/verify-email/verifyPage.vue"
  );
  const RedirectPage = () =>
  import(
    /* webpackChunkName: "settings" */ "../views/auth/fromDoc.vue"
  );
  
const routes = [
  
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    meta: {
      title: "SignIn | Dashboard",
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
    path: "/redirecting",
    name: "redirect",
    component: RedirectPage,
  },
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    component: Dashboard,
   meta: {
    title: "Tonote | Dashboard",
   }
  },
  {
    path: "/admin/requests",
    name: "admin.requests",
    component: RequestPage,

   meta: {
    title: "Tonote | Requests",
   }
  },
  {
    path: "/admin/settings",
    name: "admin.settings",
    component: SettingPage,
    meta: {
      title: "ToNote | Settings",
    },
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   component: Tables,
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   component: Billing,
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL",
  //   component: RTL,
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   component: Notifications,
  // },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: Profile,
  // },
 
  // {
  //   path: "/sign-up",
  //   name: "SignUp",
  //   component: SignUp,
  // },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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

router.beforeResolve(async (to, from, next) => {
 
  store.dispatch("getUser");
  await store.dispatch("ProfileModule/getUser");

  const getUser = store.state.ProfileModule.userProfile;

  if (to.fullPath?.includes("admin") && getUser == null) {
    next("/");
  }

  console.log(getUser, 'getUser');
  if (to.fullPath == "/" || to.fullPath == "/register") {
    if (getUser) {
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
