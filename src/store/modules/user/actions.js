import Print from "@/api/Print";
import { useToast } from "vue-toast-notification";
const toast = useToast();

export const setVerificationImage = ({ commit }, formData) => {

  commit("SET_VERIFICATION_IMAGE", formData);
  
  // Print.store(formData)
  //   .then((response) => {
  //     commit("SET_PRINTS", response.data.data);
  //     commit("SET_PRINT_NOTIFICATION", false);
  //     toast.success("Saved successfully", {
  //       timeout: 5000,
  //       position: "top-right",
  //     });
  //   })
  //   .catch((error) => {
  //     if (error.response.status == 403) {
  //       commit("SET_PRINT_NOTIFICATION", true);
  //     }
  //     toast.error(`${error.response.data.data.error}`, {
  //       timeout: 5000,
  //       position: "top-right",
  //     });
  //   });
};

