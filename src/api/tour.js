import { apiInstance } from "./index.js";

const api = apiInstance();

function areaList(success, fail) {
  api.get(`content/getArea`).then(success).catch(fail);
}

function sigunguList(params, success, fail) {
  api.get(`content/getSigungu/${params.areaCode}`).then(success).catch(fail);
}

async function placeList(params, success, fail) {
  await api
    .get(`content/getPlace/${params.areaCode}/${params.sigunguCode}`)
    .then(success)
    .catch(fail);
}

async function placeListWord(word, success, fail) {
  await api.get(`content/searchPlace/${word}`).then(success).catch(fail);
}

async function registPlanData(planData, success, fail) {
  await api
    .post(`content/plan/write`, JSON.stringify(planData))
    .then(success)
    .catch(fail);
}
async function getPlanList(success, fail) {
  await api.get(`content/plan/list`).then(success).catch(fail);
}

async function getUserPlanList(userId, success, fail) {
  await api.get(`content/plan/list/${userId}`).then(success).catch(fail);
}

async function getPlanItemList(articleNo, success, fail) {
  await api.get(`content/plan/view/${articleNo}`).then(success).catch(fail);
}

async function getRandomPlaceList(success, fail) {
  await api.get(`content/place/random`).then(success).catch(fail);
}

export {
  areaList,
  sigunguList,
  placeList,
  placeListWord,
  registPlanData,
  getPlanList,
  getUserPlanList,
  getPlanItemList,
  getRandomPlaceList,
};
