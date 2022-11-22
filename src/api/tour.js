import { apiInstance } from "./index.js";

const api = apiInstance();

function areaList(success, fail) {
  api.get(`/content/getArea`).then(success).catch(fail);
}

function sigunguList(params, success, fail) {
  api.get(`/content/getSigungu/${params.areaCode}`).then(success).catch(fail);
}

async function placeList(params, success, fail) {
  await api
    .get(`/content/getPlace/${params.areaCode}/${params.sigunguCode}`)
    .then(success)
    .catch(fail);
}

async function placeListWord(word, success, fail) {
  await api.get(`/content/searchPlace/${word}`).then(success).catch(fail);
}

export { areaList, sigunguList, placeList, placeListWord };
