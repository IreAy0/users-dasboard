import Print from "@/api/Print";
import { useToast } from "vue-toast-notification";
const toast = useToast();

export const getUserPrints = ({ commit }, token) => {
  Print.all(token)
    .then((response) => {
      commit("SET_PRINTS", response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserPrint = ({ commit }, formData) => {
  Print.show(formData)
    .then((response) => {
      commit("SET_PRINT", response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const  savePrint = async ({ commit }, formData) => {
  commit("SET_PRINT_NOTIFICATION", true);
  return Print.store(formData)
    .then((response) => { 
      
      commit("SET_PRINTS", response.data.data);
      commit("SET_PRINT_NOTIFICATION", false);
      if (formData.type !== 'Initial') {
        toast.success("Saved successfully", {
          timeout: 5000,
          position: "top-right",
        });
      }
     
      return true
    })
    .catch((error) => {
      if (error.response.status == 403) {
        commit("SET_PRINT_NOTIFICATION", true);
      }
      toast.error(`${error.response.data.data.error}`, {
        timeout: 5000,
        position: "top-right",
      });
    });
};

export const editPrint = ({ commit }, formData) => {
  Print.update(formData)
    .then((response) => {
      commit("SET_PRINTS", response.data.data);
    })
    .catch((error) => {
      toast.error(`${error.response.data.data.error}`, {
        timeout: 5000,
        position: "top-right",
      });
    });
};

export const makeDefaultPrint = async ({commit}, formData) => {
 return Print.makeDefault(formData)
    .then((response) => {
      toast.success("Saved successfully", {
        timeout: 5000,
        position: "top-right",
      });
      return true
    })
    .catch((error) => {
      toast.error(`${error.response.data.data.error}`, {
        timeout: 5000,
        position: "top-right",
      });
    });
}

export const removePrint = ({ commit }, formData) => {
  Print.deletePrint(formData)
    .then((response) => {
      commit("SET_PRINTS", response.data.data);
    })
    .catch((error) => {
      toast.error(`${error.message}`, {
        timeout: 5000,
        position: "top-right",
      });
    });
};

