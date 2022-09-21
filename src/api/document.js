import ToNote from "@/Services/Tonote";

const getDocuments = async (pageNumber = 1) => {
  return ToNote.get(`/documents?per_page=10&page=${pageNumber}`);
};

const getRequests = async () => {
  return ToNote.get("/scheduled-requests");
};
export { getDocuments, getRequests };
