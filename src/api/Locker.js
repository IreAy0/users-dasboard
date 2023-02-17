import ToNote from "@/Services/Tonote";

export default {
  getLockerDocuments() {
    return ToNote.get(`/document-locker`);
  },

  uploadLockerDocument(payload){
    return ToNote.post( `/document-locker`, payload)
  },

  deleteLockerDocument(payload){
    return ToNote.delete(`/document-locker/${payload}`)
  }
  // showSessionRecordToday(token, entry_point) {
  //   // Video
  //   return ToNote.get(`${REQUEST_VIRTUAL_SESSION_TODAY}?entry_point=${entry_point}`, token);
  // },
  
  // ToNote for country

 
};