import axios from "axios";
import { getToken } from "./helpers";
// import Auth from '../api/auth';

const ToNote = axios.create();

ToNote.interceptors.request.use(config => {
  config.baseURL = process.env.VUE_APP_API_BASE_URL;
  config.headers['Authorization'] = getToken() && `Bearer ${getToken()}`;
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

    
ToNote.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // if (error.response.status === 401) {
    //   Auth.Logout();
    //   // const currentUrl = encodeURIComponent(window.location.href);
    //   // window.location.href = `/`;
    //   return;
    // }
    return Promise.reject(error);
  });
    
    
    

export default ToNote;


