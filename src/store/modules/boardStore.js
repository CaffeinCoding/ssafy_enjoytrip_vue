import {
  registArticleBoard,
  getArticleBoard,
  getArticleBoardList,
  modifyArticleBoard,
  deleteArticleBoard,
} from "@/api/board.js";

const errorCall = (error) => {
  console.log(error);
};

const boardStore = {
  namespaced: true,
  state: {
    articles: [],
    article: null,
  },
  mutations: {
    // board
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
    SET_ARTICLE(state, article) {
      state.article = article;
    },
    CLEAR_ARTICLE_LIST(state) {
      state.articles = [];
      state.article = null;
    },
    CLEAR_ARTICLE(state) {
      state.article = null;
    },
  },
  actions: {
    async registArticle({ commit }, article) {
      const formData = new FormData();
      formData.append("userId", article.userId);
      formData.append("title", article.title);
      formData.append("content", article.content);
      formData.append("upfile", article.upfile);

      await registArticleBoard(
        formData,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getArticle({ commit }, id) {
      await getArticleBoard(
        id,
        ({ data }) => {
          commit("SET_ARTICLE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async getArticleList({ commit }, id) {
      await getArticleBoardList(({ data }) => {
        commit("SET_ARTICLE_LIST", data);
      }, errorCall);
    },
    async modifyArticle({ commit }, article) {
      const formData = new FormData();
      formData.append("articleNo", article.articleNo);
      formData.append("userId", article.userId);
      formData.append("title", article.title);
      formData.append("content", article.content);
      formData.append("upfile", article.upfile);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }

      await modifyArticleBoard(
        formData,
        ({ data }) => {
          commit("SET_ARTICLE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async deleteArticle({ commit }, id) {
      await deleteArticleBoard(
        id,
        ({ data }) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default boardStore;
