import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueMixpanel from 'vue-mixpanel';
// import "./assets/css/nucleo-icons.css";
// import "./assets/css/nucleo-svg.css";
import VeeValidate from "vee-validate";
import ToastPlugin from "vue-toast-notification";
import VueSignaturePad from "vue-signature-pad";
import BootstrapVue3 from "bootstrap-vue-3";
import Flutterwave from "flutterwave-vue3";
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import "vue-toast-notification/dist/theme-sugar.css";
import MaterialDashboard from "./material-dashboard";
import Skeleton from 'vue-loading-skeleton';
import "vue-loading-skeleton/dist/style.css"
import vue3GoogleLogin from 'vue3-google-login'
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const mixpanelConfig = {
  // token: process.env.VUE_APP_MIXPANEL_TOKEN,
  token: '756082806459a1e587b56e6fcd2ce830',
  config: {
    debug: false,
  },
};


const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.use(VueMixpanel, mixpanelConfig);
appInstance.use(VeeValidate)
appInstance.use(BootstrapVue3)
appInstance.use(VueSignaturePad)
appInstance.use(ToastPlugin)
appInstance.use(Flutterwave)
appInstance.use(VueCropper)
appInstance.mount("#app");
appInstance.use(Skeleton)
