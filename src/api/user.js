import { apiInstance, fileInstance } from "./index.js";

const api = apiInstance();
const fileApi = fileInstance("user");

async function login(user, success, fail) {
  await api.post(`user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function logout(userId, success, fail) {
  await api.get(`user/logout/${userId}`).then(success).catch(fail);
}

async function findById(userId, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userId}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token");
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

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

export {
  login,
  findById,
  tokenRegeneration,
  logout,
  getUserInfo,
  registUserInfo,
  modifyUserInfo,
  deleteUserInfo,
};
