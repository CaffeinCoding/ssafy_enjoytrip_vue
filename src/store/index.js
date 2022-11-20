import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import placeStore from "@/store/modules/placeStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { placeStore },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
