import ToNote from "@/Services/Tonote";

export default {
  async Company() {
    // get user profile
    return ToNote.get("/company");
  },

  async updateCompany(payload) {
    // update user profile
    return ToNote.post("/company", payload);
  },

  async createSignature(payload) {
    // create signature
    return ToNote.post("/prints", payload);
  },
  async createCompanySeal(payload) {
    // create company seal
    return ToNote.post("/prints", payload);
  },
  async createCompanyStamp(payload) {
    // create company seal
    return ToNote.post("/prints", payload);
  },
  async getCompanySeals() {
    // create company seal
    return ToNote.get("/prints");
  },
  async getCompanyStamps() {
    // create company seal
    return ToNote.get("/prints");
  },
  // company-profile-status
  async getCompanyStatus () {
    return ToNote.get('/company-profile-status')
  }
};
