import ToNote from "@/Services/Tonote";

export default {
  async Teams() {
    // get user profile
    return ToNote.get("/teams");
  },

  // async getTeamUsers(){
  //   return ToNote.get("/team-users");
  // },

  async getSubcriptions(){
    return ToNote.get("/subscription-plans?type=Subscription&periodicity_type=Year");
  }
};
