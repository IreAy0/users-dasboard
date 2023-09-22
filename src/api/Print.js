import ToNote from "@/Services/Tonote";

const END_POINT = "prints";

export default {
  all(token) {
    return ToNote.get(`${END_POINT}`, token);
  },

  show(id) {
    return ToNote.get(`${END_POINT}/${id}`);
  },

  store(data) {
    return ToNote.post(END_POINT, data);
  },

  update(data) {
    return ToNote.put(`${END_POINT}/${data.id}`, data.payload);
  },

  deletePrint(printId) {
    return ToNote.delete(`${END_POINT}/${printId}`);
  },

  // /api/v1/prints-set-default/{id}
  makeDefault(printId){
    return ToNote.get(`prints-set-default/${printId}`)
  }
};

