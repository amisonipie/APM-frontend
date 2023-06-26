/* eslint-disable no-extend-native */
import axios from "axios";
import { env, codeword } from "utility/config";
import { store } from "redux/storeConfig/store";
import { logout } from "redux/actions/auth/loginActions";

import { authHeader } from "./authHeader";

const baseUrl = env.API_LAB + env.BACKEND_VERSION;
let source;

const generateCancelTokenSource = () => {
  const { CancelToken } = axios;
  source = CancelToken.source();
};

generateCancelTokenSource();
// Add a request interceptor

axios.interceptors.request.use((req) => {
  // `req` is the Axios request config, so you can modify
  // the `headers`.
  req.cancelToken = source.token;
  return req;
});
// Add a response interceptor
axios.interceptors.response.use(
  (response) =>
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

    response,
  (error) => {
    const codewordRes = error?.response?.data?.codeword;
    // const responseVersion = error.response?.config?.params?.version;

    if (codewordRes === codeword.REACT_VERSION_MISMATCH) {
      localStorage.clear();
      window.location.reload(true);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response?.status === 401) {
      store.dispatch(logout({ reason: "unAuthorized" }));
      source.cancel("Requests cancelled!");
      generateCancelTokenSource();
    }
    return Promise.reject(error);
  },
);

function getCall({
  url,
  customUrl,
  page,
  params,
  customToken,
  callbackProgressUpload = null,
}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(customToken),
    params,

    onDownloadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      if (callbackProgressUpload) callbackProgressUpload(percentCompleted);
    },
  };
  return axios
    .get(customUrl || baseUrl + url, requestOptions)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}
function postCall({
  url,
  customUrl,
  data,
  callbackProgressUpload = null,
  source,
  customToken,
}) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(customToken),
    // body: JSON.stringify(data),
    onUploadProgress: (progressEvent) => {
      // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
      if (callbackProgressUpload) callbackProgressUpload(progressEvent);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(customUrl || baseUrl + url, data, requestOptions)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}
function postAttachment({
  url, data, callbackProgressUpload = null, source,
}) {
  Date.prototype.toJSON = function () {
    // return moment(this).format();
  };
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      if (callbackProgressUpload) callbackProgressUpload(percentCompleted);
    },
  };
  if (source) {
    requestOptions.cancelToken = source.token;
  }
  return axios
    .post(baseUrl + url, data, requestOptions)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}
function putCall({ url, customUrl, data }) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(data),
  };
  if (url === "order/217") {
  }
  return axios
    .put(customUrl || baseUrl + url, data, requestOptions)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}
function deleteCall({ customUrl, url }) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  return axios
    .delete(customUrl || baseUrl + url, requestOptions)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}

function postCallWithoutAuth({ url, customUrl, data }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return axios
    .post(customUrl || baseUrl + url, data, requestOptions)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
}
// get data with id
function getCallWithId({ url, customUrl, id }) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return axios
    .get(customUrl || `${baseUrl + url}/${id}`, requestOptions)
    .then((response) => response)
    .catch((error) => {
      // return Promise.reject(error);
    });
}

function downloadCall({
  url, fileName, fileExtension, params, isDownload,
}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
    responseType: "blob", // important,
    params,
  };

  return axios
    .get(baseUrl + url, requestOptions)
    .then((response) => {
      const file = response.data;
      const link = document.createElement("a");
      if (params?.isDownload || isDownload) {
        const url = window.URL.createObjectURL(new Blob([file]));
        link.href = url;
        link.setAttribute("download", fileName + fileExtension); // or any other extension

        document.body.appendChild(link);
        link.click();
      } else {
        const url = window.URL.createObjectURL(file);
        const tab = window.open();
        tab.location.href = url;
      }
      return response;
    })
    .catch((error) => Promise.reject(error));
}

export const SC = {
  getCall,
  postCall,
  putCall,
  deleteCall,
  postCallWithoutAuth,
  getCallWithId,
  postAttachment,
  downloadCall,
};
