import {
  getUserInfo,
  registUserInfo,
  modifyUserInfo,
  deleteUserInfo,
} from "@/api/user.js";

const errorCall = (error) => {
  console.log(error);
};

const userStore = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    //user
    async getUser({ commit }, id) {
      await getUserInfo(
        id,
        ({ data }) => {
          commit("SET_USER", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async deleteUser({ commit }, id) {
      await deleteUserInfo(
        id,
        ({ data }) => {
          console.log(data);
        },
        errorCall
      );
    },
    async modifyUser({ commit }, user) {
      await modifyUserInfo(
        user,
        ({ data }) => {
          console.log(data);
        },
        errorCall
      );
    },
    async registUser({ commit }, user) {
      await registUserInfo(
        user,
        ({ data }) => {
          console.log(data);
        },
        errorCall
      );
    },
  },
};

export default userStore;
