import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
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


const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.use(VeeValidate)
appInstance.use(BootstrapVue3)
appInstance.use(VueSignaturePad)
appInstance.use(ToastPlugin)
appInstance.use(Flutterwave)
appInstance.component("EasyDataTable", Vue3EasyDataTable)
appInstance.mount("#app");
