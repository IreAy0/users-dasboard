// import ToNote from "./ToNote";
import ToNote from "@/Services/Tonote";

const END_POINT = "documents";
const DOCUMENT_DELETE = "document-multiple-delete";
const DOCUMENT_COMPLETE = "document-complete";
const DECLINE_DOCUMENT = "declined-documents";
const DOCUMENT_RECEIVED = "documents-received";
// const SIGNED_DOCUMENTS ="signed-documents"
const DOCUMENT_TEMPORAL_DELETED = "documents-temporal-deleted";
const SIGNED_DOCUMENTS ="signed-documents"
const DOCUMENT_PARTICIPANT_ADD_SELF = "document-participant-add-self";
const DOCUMENT_PARTICIPANTS = "document-participants";
const DOCUMENT_PARTICIPANTS_DONE = "document-participants-done";
const DOCUMENT_PARTICIPANTS_SEND_MAIL = "document-participants-send-email";

const DOCUMENT_RESOURCE_TOOLS = "document-resource-tools";

export default {
  allDocuments(token) {
    return ToNote.get(`${END_POINT}?entry_point=Video`, token);
  },

  allDocumentByStatus(status) {
    return ToNote.get(`${DOCUMENT_COMPLETE}?status=${status}&per_page=10`);
  },



  allCompletedDocuments(documentId) {
    return ToNote.get(`${DOCUMENT_COMPLETE}/${documentId}`);
  },

  allReceivedDocuments(token) {
    return ToNote.get(`${DOCUMENT_RECEIVED}`, token);
  },

  allDeclinedDocuments(token) {
    return ToNote.get(`${DECLINE_DOCUMENT}?per_page=10`);
  },

  allDeletedDocuments(token) {
    return ToNote.get(`${DOCUMENT_TEMPORAL_DELETED}`, token);
  },

  showDocument(documentId) {
    return ToNote.get(`${END_POINT}/${documentId}`);
  },

  storeFileUpload(data) {
    return ToNote.post(END_POINT, data);
  },

  storeSelf(documentId) {
    return ToNote.get(`${DOCUMENT_PARTICIPANT_ADD_SELF}/${documentId}`);
  },

  deleteDocument(data) {
    return ToNote.post(DOCUMENT_DELETE, data);
  },

  storeParticipant(data) {
    return ToNote.post(DOCUMENT_PARTICIPANTS, data);
  },

  updateParticipant(data) {
    return ToNote.put(`${DOCUMENT_PARTICIPANTS}/${data.participants[0].document_id}`, data);
  },

  mailToParticipant(data) {
    return ToNote.post(DOCUMENT_PARTICIPANTS_SEND_MAIL, data);
  },

  participantDone(data) {
    return ToNote.post(DOCUMENT_PARTICIPANTS_DONE, data);
  },

  deleteParticipant(participantId) {
    return ToNote.delete(`${DOCUMENT_PARTICIPANTS}/${participantId}`);
  },

  storeTools(data) {
    return ToNote.post(DOCUMENT_RESOURCE_TOOLS, data);
  },

  updateTool(id, data) {
    return ToNote.put(`${DOCUMENT_RESOURCE_TOOLS}/${id}`, data);
  },

  deleteTool(toolId) {
    return ToNote.delete(`${DOCUMENT_RESOURCE_TOOLS}/${toolId}`);
  },
};

