import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import tourStore from "@/store/modules/tourStore";
import boardStore from "@/store/modules/boardStore";
import userStore from "@/store/modules/userStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { tourStore, boardStore, userStore },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
