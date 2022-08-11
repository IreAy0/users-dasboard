import ToNote from "@/Services/Tonote";

const getDocuments = async () => {
  return ToNote.get("/documents?per_page=10");
};

const getRequests = async () => {
  return ToNote.get("/scheduled-requests");
};
export { getDocuments, getRequests };
