import axios from "axios";

// local vue api axios instance
function apiInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function fileInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL+"board",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return instance;
}

export { apiInstance, fileInstance };
