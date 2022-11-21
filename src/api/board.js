import { apiInstance, fileInstance } from "./index.js";

const api = apiInstance();
const fileApi = fileInstance();

async function registArticleBoard(params, success, fail) {
    await fileApi.post("", params).then(success).catch(fail);
}


export { registArticleBoard };