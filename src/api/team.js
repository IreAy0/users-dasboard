import ToNote from "@/Services/Tonote";

export default {
  async Teams() {
    // get user profile
    return ToNote.get("/teams");
  },

  // async getTeamUsers(){
  //   return ToNote.get("/team-users");
  // },

  async getSubcriptions(plan = 'Month'){
    return ToNote.get(`/subscription-plans?periodicity_type=${plan}`);
  }
};
