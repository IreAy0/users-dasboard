import ToNote from "@/Services/Tonote";

export default {
  async Teams() {
    // get user profile
    return ToNote.get("/teams");
  },

  // async getTeamUsers(){
  //   return ToNote.get("/team-users");
  // },
  // periodicity=1&periodicity=Month
  // periodicity=12&periodicity=Month
  async getSubcriptions(number_of_month = 1, plan = 'Month' ){
    return ToNote.get(`/subscription-plans?periodicity=${number_of_month}&periodicity_type=${plan}`);
  }
};
