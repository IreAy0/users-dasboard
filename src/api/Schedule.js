import ToNote from "@/Services/Tonote";
// import ToNote from "./ToNote";
const REQUEST_VIRTUAL_SESSION = "request-virtual-session";
const REQUEST_VIRTUAL_SESSION_TODAY = "request-virtual-session-today";
const SCHEDULE = "schedules";

export default {
  showSessionRecord(token, entry_point, page, name, per_page = 10) {
    // https://dev-api.gettonote.com/api/v1/request-virtual-session?per_page=10&entry_point=Notary
    return ToNote.get(`${REQUEST_VIRTUAL_SESSION}?${per_page ? `&per_page=${per_page}` : ''}&entry_point=${entry_point}${page ? `&page=${page}` : ''}${name ? `&title=${name}` : ''}`, token);
  },
  showSessionRecordToday(token, entry_point) {
    // Video
    return ToNote.get(`${REQUEST_VIRTUAL_SESSION_TODAY}?entry_point=${entry_point}`, token);
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

  CancelVirtualSession(sessionId) {
    return ToNote.delete(`${SCHEDULE}/${sessionId}`);
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
    return ToNote.get("request-virtual-session?sort_by_desc=updated_at", data);
  },
  NotaryRequest(data) {
    return ToNote.get("document", data);
  },
  VideoSignRequest(data) {
    return ToNote.get("document", data);
  },
};













