import ToNote from "@/Services/Tonote";

const getAffidavitTemplates = async () => {
  return ToNote.get("/document-templates");
};
const getPaymentGatways = async () => {
  return ToNote.get("/payment-gateways");
};
const postNotaryRequestForm = async (data) => {
  return ToNote.post("/request-affidavits-upload", data);
};
const postAffidavitRequestForm = async (data) => {
  return ToNote.post("/request-affidavits", data);
};
const putNotaryRequestTransaction = async (data) => {
  return ToNote.put(`/transactions/${data.id}`, {
    payment_gateway: data.payment_gateway,
  });
};

export {
  postAffidavitRequestForm,
  getAffidavitTemplates,
  getPaymentGatways,
  postNotaryRequestForm,
  putNotaryRequestTransaction,
};
