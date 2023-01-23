import ToNote from "@/Services/Tonote";
const END_POINT = "documents";

const getDocuments = async (pageNumber = 1) => {
  return ToNote.get(`/documents?per_page=10&page=${pageNumber}`);
};

const getRequests = async () => {
  return ToNote.get("/scheduled-requests");
};

const allDocuments = (token) => {
  return ToNote.get(`${END_POINT}?entry_point=Video`, token);
};

const showDocument = (documentId) => {
  console.log('documentId', documentId)
  return ToNote.get(`${END_POINT}/${documentId}`);
}

export { getDocuments, getRequests, allDocuments, showDocument };
