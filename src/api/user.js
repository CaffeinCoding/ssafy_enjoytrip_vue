import { apiInstance, fileInstance } from "./index.js";

const api = apiInstance();
const fileApi = fileInstance("user");

async function getUserInfo(id, success, fail) {
  await api.get(`user/${id}`).then(success).catch(fail);
}

async function registUserInfo(params, success, fail) {
  await fileApi.post("", params).then(success).catch(fail);
}

async function modifyUserInfo(params, success, fail) {
  await fileApi.put("", params).then(success).catch(fail);
}

async function deleteUserInfo(id, success, fail) {
  await api.delete(`user/${id}`).then(success).catch(fail);
}

export { getUserInfo, registUserInfo, modifyUserInfo, deleteUserInfo };
