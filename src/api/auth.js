import { removeToken } from "@/Services/helpers"
import ToNote from "@/Services/Tonote"

export default {
  async Logout () {
    // delete token
    removeToken();
  },

  async Login (loginData) { 
    // login
    return ToNote.post("/user/login", {...loginData})
   },

   async Register (formData) {
    // register
    return ToNote.post("/user/register", {...formData})

   },

   async VerifyEmail ( payload){
    return ToNote.post("/user/email/verify", {...payload})
   }
}