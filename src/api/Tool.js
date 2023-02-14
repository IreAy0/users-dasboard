import ToNote from "@/Services/Tonote";

const END_POINT = "document-resource-tools";
const END_POINT_TOOL = "user-document-resource-tool";

export default {
  all(documentId) {
    return ToNote.get(`${END_POINT_TOOL}/${documentId}`);
  },

  show(toolId) {
    return ToNote.get(`${END_POINT}/${toolId}`);
  },

  store(data) {
    return ToNote.post(END_POINT, data);
  },

  update(data) {
    return ToNote.put(`${END_POINT}/${data.id}`, data.payload);
  },

  delete(toolId) {
    return ToNote.delete(`${END_POINT}/${toolId}`);
  },
};

