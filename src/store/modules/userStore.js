import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  kakaoLogin,
  logout,
  findById,
  tokenRegeneration,
  getUserInfo,
  registUserInfo,
  modifyUserInfo,
  deleteUserInfo,
  emailConfirm,
  findPwByEmail,
} from "@/api/user.js";

const errorCall = (error) => {
  console.log(error);
};

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    user: null,
    code: null,
    password: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_INFO(state, user) {
      // state.isLogin = true;
      state.userInfo = user;
    },
    SET_IS_LOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR(state, isLoginError) {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN(state, isValidToken) {
      state.isValidToken = isValidToken;
    },
    SET_CODE(state, code) {
      state.code = code;
    },
    SET_PASSWORD(state, password) {
      state.password = password;
    },
  },
  actions: {
    // 유저 rest api 로그인 로그아웃 (token 사용)
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        errorCall
      );
    },
    async kakaoUserConfirm({ commit }, param) {
      await kakaoLogin(
        param,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        errorCall
      );
    },
    async getUserInfoLogin({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.userId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", true);
            commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfoLogin() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },

    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userId,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_USER", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_USER", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userId) {
      await logout(
        userId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_USER", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // 유저 마이페이지 기능 (확인, 수정, 삭제)
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
    async modifyUser({ commit }, user) {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("userName", user.userName);
      formData.append("userPw", user.userPw);
      formData.append("userAge", user.userAge);
      formData.append("email", user.email);
      formData.append("joinDate", user.joinDate);
      formData.append("isManager", user.isManager);
      formData.append("upfile", user.upfile);

      await modifyUserInfo(
        formData,
        ({ data }) => {
          commit("SET_USER", data);
        },
        errorCall
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

    // 유저 등록
    async registUser({ commit }, user) {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("userName", user.userName);
      formData.append("userPw", user.userPw);
      formData.append("userAge", user.userAge);
      formData.append("email", user.email);
      formData.append("upfile", user.upfile);

      console.log(user.upfile);

      await registUserInfo(
        formData,
        ({ data }) => {
          console.log(data);
        },
        errorCall
      );
    },

    // 메일 보내기
    async sendMail({ commit }, email) {
      await emailConfirm(
        email,
        ({ data }) => {
          commit("SET_CODE", data);
        },
        errorCall
      );
    },

    //비밀번호 받기
    async finePw({ commit }, email) {
      await findPwByEmail(
        email,
        ({ data }) => {
          commit("SET_PASSWORD", data);
        },
        errorCall
      );
    },
  },
};

export default userStore;
