import { createLogger, createStore,  } from "vuex";
import { TeamsModule } from "./modules/Teams.module";
import { AuthModule } from './modules/Auth.module'
import { AlertModule } from './modules/Alert.module'
import { ProfileModule } from './modules/Profile.module'
import { CompanyModule } from './modules/Company.module'
import { AffidavitModule } from "./modules/Affidavit.module";
import { DocumentModule } from "./modules/Document.module";
import { MenuModule } from "./modules/Menu.Module";
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
    MenuModule
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : [],
});
