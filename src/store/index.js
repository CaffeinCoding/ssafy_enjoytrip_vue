import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import placeStore from "@/store/modules/placeStore";
import boardStore from "@/store/modules/boardStore";
import userStore from "@/store/modules/userStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { placeStore, boardStore, userStore },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
