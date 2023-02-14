import Vue from "vue";
import Locker from "@/api/Locker";
import store from "@/store";
import router from "@/router";
import { useToast } from "vue-toast-notification";
import { getToken } from "@/Services/helpers";

const toast = useToast();


export const getLockerDocuments = ({ commit }) => {
  Locker.getLockerDocuments()
    .then((response) => {
      console.log(response, 'response')
      commit("SET_LOCKER_DOCUMENTS", response.data.data);
    })
    .catch((error) => {
      if (error.status === 401 || error.status == 422) {
        // commit("SET_TOKEN", null);
        router.push({ name: "Login" });
      }
    });
};


export const uploadDocument = ({ commit, dispatch }, payload) => {
return Locker.uploadLockerDocument(payload)
    .then((response) => {
      const token = getToken();
    //  dispatch("getLockerDocuments");
     Locker.getLockerDocuments()
     .then((response) => {
       console.log(response, 'response')
       commit("SET_LOCKER_DOCUMENTS", response.data.data);
     })
     .catch((error) => {
       if (error.status === 401 || error.status == 422) {
         // commit("SET_TOKEN", null);
         router.push({ name: "Login" });
       }
     });
      commit("UPLOAD_LOCKER_DOCUMENT", true);
      console.log(response, 'response')
      toast.success("Document  has been Updated successfully", {
        timeout: 5000,
        position: "top-right",
      });

      return true
    })
    .catch((error) => {
      // if (error.response.status == 401 || error.response.status == 404) {
      //   Vue.$toast.error(`${error.response.data.errors.root}`);
      // }
      return false
    });
};

// export const deleteSession = ({ commit }, sessionData) => {

//   Schedule.CancelVirtualSession(sessionData.id)
//     .then((response) => {
//       commit("SET_CANCEL_SESSION", response.data.data);
      
//       // const token = store.getters["auth/token"];
//       const token = getToken();
//       Schedule.showSessionRecord(token)
//         .then((res) => commit("SET_SESSION_RECORD", res.data.data))

//       // Schedule.showSessionRecordToday({token: token,  entry_point: 'Video'})
//       // .then((response) => {
//       //   commit("SET_SESSION_RECORD", response.data);
//       // })
      
//       Schedule.showSessionRecordToday(token)
//         .then((response) => commit("SET_SESSION_RECORD_TODAY", response.data))


//       toast.success("Session cancelled successfully", {
//         timeout: 5000,
//         position: "top-right",
//       });
//     })


//     .catch((error) => {
//       if (error.response.status == 401 || error.response.status == 404) {
//         commit("SET_CANCEL_SESSION", null);
//         Vue.$toast.error(`${error.response.data.errors.root}`);
//       }
//     });
// };


// get AFFI

