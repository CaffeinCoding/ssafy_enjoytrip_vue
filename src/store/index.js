import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import http from "../api/http";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    articles: [],
    article: null,
  },
  mutations: {
    //user
    SET_USER(state, user) {
      state.user = user;
    },
    DELETE_USER(state) {
      state.user = null;
    },
    // board
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
    SET_ARTICLE(state, article) {
      state.article = article;
    },
    DELETE_ARTICLE(state, article) {
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
    //user
    getUser({ commit }, id) {
      http.get(`/user/${id}`).then(({ data }) => {
        commit("SET_USER", data);
      });
    },
    deleteUser({ commit }, id) {
      http.delete(`/user/${id}`);
      commit("DELETE_USER", id);
    },
    modifyUser({ commit }, user) {
      http.put(`/user`, user).then(({ data }) => {
        commit("SET_USER", data);
      });
    },
    registUser({ commit }, user) {
      http.post(`/user`, user);
    },
    //board
    async getArticleList({ commit }) {
      await http
        .get(`/board`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_ARTICLE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //board
    async registArticle({ commit }, article) {
      const formData = new FormData();
      formData.append("userId", article.userId);
      formData.append("title", article.title);
      formData.append("content", article.content);
      formData.append("upfile", article.upfile);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }
      await axios({
        method: "post",
        url: "http://localhost:1010/board",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    async getArticle({ commit }, id) {
      await http.get(`board/${id}`).then(({ data }) => {
        commit("SET_ARTICLE", data);
      });
    },
    modifyArticle({ commit }, article) {
      const formData = new FormData();
      formData.append("articleNo", article.articleNo);
      formData.append("userId", article.userId);
      formData.append("title", article.title);
      formData.append("content", article.content);
      formData.append("upfile", article.upfile);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }
      axios({
        method: "put",
        url: "http://localhost:1010/board",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      commit("SET_ARTICLE", article);
    },
    deleteArticle({ commit }, id) {
      http.delete(`board/${id}`);
      commit("DELETE_ARTICLE");
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
