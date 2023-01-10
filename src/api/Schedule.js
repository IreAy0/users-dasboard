import ToNote from "@/Services/Tonote";
// import ToNote from "./ToNote";
const REQUEST_VIRTUAL_SESSION = "request-virtual-session";
const REQUEST_VIRTUAL_SESSION_TODAY = "request-virtual-session-today";
export default {
  showSessionRecord(token) {
    return ToNote.get(`${REQUEST_VIRTUAL_SESSION}?entry_point=Video`, token);
  },
  showSessionRecordToday(token) {
    return ToNote.get(`${REQUEST_VIRTUAL_SESSION_TODAY}?entry_point=Video`, token);
  },
  // get all the time slots
  TimeSlotsApi() {
    return ToNote.get(`time-slots`);
  },
  // ToNote for country
  CountriesApi() {
    return ToNote.get(`countries`);
  },
  StatesApi(country_id) {
    return ToNote.get(`countries/${country_id}`);
  },
  //request virtual notary session
  ScheduleVirtualSessionApi(data) {
    return ToNote.post(`request-virtual-session`, data);
  },
  //request virtual notary session
  ScheduleVirtualSessionUpdateStatus(data) {
    return ToNote.put(`request-virtual-session/${data.id}`, data.payload);
  },
  RescheduleVirtualSession(data) {
    return ToNote.put(`request-virtual-session/${data.id}`, data.payload);
  },
  //get virtual session details
  VirtualSessionDetailsApi(id) {
    return ToNote.get(`request-virtual-session/${id}`);
  },
  // payment for request virtual notary session
  ScheduleTransactionApi(data) {
    return ToNote.put(`transactions/${data.id}`, {
      payment_gateway: data.payment_gateway,
    });
  },
  // agora
  GenerateAgoraToken(data) {
    return ToNote.post("agora/token", data);
  },
  // 
  AffidavitRequest(data) {
    return ToNote.get("scheduled-requests", data);
  },
  NotaryRequest(data) {
    return ToNote.get("document", data);
  },
  VideoSignRequest(data) {
    return ToNote.get("document", data);
  },
};













