import { createLogger, createStore,  } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { TeamsModule } from "./modules/Teams.module";
import { AuthModule } from './modules/Auth.module'
import { AlertModule } from './modules/Alert.module'
import { PaymentModule } from './modules/Payment'

import { ProfileModule } from './modules/Profile.module'
import { CompanyModule } from './modules/Company.module'
import { AffidavitModule } from "./modules/Affidavit.module";
import { DocumentModule } from "./modules/Document.module";
import { MenuModule } from "./modules/Menu.Module";
import schedule from "@/store/modules/schedule";
import locker from "@/store/modules/locker";
import print from "@/store/modules/print";
import user from "@/store/modules/user";

import document from "@/store/modules/document"
// import { TeamsModule } from "./modules/Teams.module";
const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    AuthModule,
    AlertModule,
    ProfileModule,
    CompanyModule,
    AffidavitModule,
    TeamsModule,
    DocumentModule,
    MenuModule,
    schedule,
    document,
    locker,
    PaymentModule,
    print,
    user
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : [],
});
