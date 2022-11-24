import { apiInstance, fileInstance } from "./index.js";

const api = apiInstance();
const fileApi = fileInstance("board");

async function registArticleBoard(params, success, fail) {
  await fileApi.post("", params).then(success).catch(fail);
}

async function getArticleBoard(id, success, fail) {
  await api.get(`board/view/${id}`).then(success).catch(fail);
}

async function getArticleBoardList(success, fail) {
  await api.get(`board/`).then(success).catch(fail);
}

async function getArticleBoardListById(id, success, fail) {
  await api.get(`board/${id}`).then(success).catch(fail);
}

async function modifyArticleBoard(params, success, fail) {
  await fileApi.put("", params).then(success).catch(fail);
}

async function deleteArticleBoard(id, success, fail) {
  await api.delete(`board/${id}`).then(success).catch(fail);
}
async function listOrderByHit(success, fail) {
  await api.get(`board/list/orderbyhit`).then(success).catch(fail);
}

export {
  registArticleBoard,
  getArticleBoard,
  getArticleBoardList,
  getArticleBoardListById,
  modifyArticleBoard,
  deleteArticleBoard,
  listOrderByHit
};
