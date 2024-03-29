import ToNote from "@/Services/Tonote";

export default {
  async Profile() {
    // get user profile
    return ToNote.get("/user/profile");
  },

  async getDashboard(){
    return ToNote.get("/user/dashboard")
  },
  async updateProfile(payload) {
    // update user profile
    return ToNote.post("/user/update", payload);
  },

  async createSignature(payload) {
    // create signature
    return ToNote.post("/prints", payload);
  },

  async getPrints(){
    return ToNote.get('/prints')
  },

  async getDashboardData(){
    return ToNote.get('/document-statistics')
  },

  async getSignLinkDocuments(){
    return ToNote.get('/signlink-documents')
  },
  async getTransactions(){
    return ToNote.get('/transactions')
  }

};
