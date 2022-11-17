import { apiInstance } from "./index.js";

const api = apiInstance();

function areaList(success, fail) {
  api.get(`/content/getArea`).then(success).catch(fail);
}

function sigunguList(params, success, fail) {
  api.get(`/content/getSigungu/`, { params: params }).then(success).catch(fail);
}

function placeList(params, success, fail) {
  api
    .get(`/content/getPlace/${params.areaCode}/${params.sigunguCode}`)
    .then(success)
    .catch(fail);
}

export { sidoList, gugunList, houseList };
