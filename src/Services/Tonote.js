import axios from "axios";
import { getToken, removeToken } from "./helpers";
// import Auth from '../api/auth';

const ToNote = axios.create();

const env_variable = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_TONOTE_API_BASE_URL_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_TONOTE_API_BASE_URL_STAGING : process.env.VUE_APP_TONOTE_API_BASE_URL_LIVE
const redirect_url = process.env.VUE_APP_ENVIRONMENT == 'local' ? process.env.VUE_APP_BASE_URL_LOCAL : process.env.VUE_APP_ENVIRONMENT == 'staging' ?  process.env.VUE_APP_BASE_URL_STAGING : process.env.VUE_APP_BASE_URL_LIVE

// console.log(env_variable, 'VUE_APP_API_BASE_URL', redirect_url+'/tonote/callback')



ToNote.interceptors.request.use(config => {
  config.baseURL = env_variable;
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
    //   removeToken();
    //   // const currentUrl = encodeURIComponent(window.location.href);
    //   window.location.href = `/`;
    //   return;
    // }
    return Promise.reject(error);
  });




export default ToNote;


