import { apiInstance } from "./index.js";

const api = apiInstance();

function getUserInfo(id, success, fail) {
    api.get(`/user/${id}`).then(success).catch(fail);
}


export { getUserInfo };