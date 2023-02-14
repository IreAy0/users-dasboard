export default {
  lockerDocuments: [],
  sessionRecordToday: [],
  errors: null,
  uploaded: false,
  deleteSession: null,
  // schedule details form data
  schedule_formdata: {
    title: null,
    documentTitle: null,
    temDocData: [],
    documentFile: [],
    participants: [],
    schedule_type: null, //immediate or schedule
    notary: null, // yes or no
    date: null,
    time: null,
  },

  filter_loading: false,

  // schedule details
  schedule_details: {
    id: null,
    comment: null,
    customer: {
      id: null,
      first_name: null,
      email: null,
      last_name: null,
    },
    customer_id: null,
    document_id: null,
    participants: [],
    participants_count: null,
    tools_count: null,
    uploads_count: null,
    end_session: null,
    date: null,
    description: null,
    end_time: null,
    immediate: null,
    meeting_link: null,
    notary: null,
    request_type: null,
    session: null,
    start_session: null,
    start_time: null,
    status: null,
    title: null,
    token: null,
  },


};
