import {
  areaList,
  sigunguList,
  placeList,
  placeListWord,
  registPlanData,
  getPlanList,
  getUserPlanList,
  getPlanItemList,
  getRandomPlaceList,
} from "@/api/tour.js";

const errorCall = (error) => {
  console.log(error);
};

const tourStore = {
  namespaced: true,
  state: {
    areas: [{ value: null, text: "시/도 선택" }],
    sigungus: [{ value: null, text: "구/군 선택" }],
    contents: [{ value: 1, text: "전체" }],
    places: [],
    randomPlaces: [],
    planList: [],
    planItems: [],
    planSaveItems: [],
    plan: null,
    place: null,
    saveDrawerOn: false,
    dateStart: "",
    dateEnd: "",
    isPlanView: false,
  },
  mutations: {
    CLEAR_AREA_LIST(state) {
      state.areas = [{ value: null, text: "시/도 선택" }];
    },
    CLEAR_SIGUNGU_LIST(state) {
      state.sigungus = [{ value: null, text: "구/군 선택" }];
    },
    CLEAR_RANDOM_PLACE(state) {
      state.randomPlaces = [];
    },
    CLEAR_PLACE_LIST(state) {
      state.places = [];
    },
    CLEAR_CONTENT_LIST(state) {
      state.contents = [{ value: 1, text: "전체" }];
    },
    CLEAR_PLAN(state) {
      state.plan = null;
    },
    CLEAR_PLAN_LIST(state) {
      state.planList = [];
    },
    CLEAR_PLANITEM_LIST(state) {
      state.planItems = [];
    },
    CLEAR_PLAN_SAVE_ITEM_LIST(state) {
      state.planSaveItems = [];
    },
    CLEAR_SAVE_DRAWER(state) {
      state.saveDrawerOn = false;
    },
    CLEAR_DATE_RANGE(state) {
      state.dateStart = "";
      state.dateEnd = "";
    },
    SET_AREA_LIST(state, areas) {
      areas.forEach((area) => {
        state.areas.push({
          value: area.areaCode,
          text: area.areaName,
          disabled: false,
        });
      });
    },
    SET_SIGUNGU_LIST(state, sigungus) {
      sigungus.forEach((sigungu) => {
        state.sigungus.push({
          value: sigungu.sigunguCode,
          text: sigungu.sigunguName,
          disabled: false,
        });
      });
    },
    SET_CONTENT_LIST(state, contents) {
      contents.forEach((content) => {
        state.contents.push({
          value: content.contentType,
          text: content.name,
        });
      });
    },
    SET_PLACE_LIST(state, places) {
      state.places = places;
    },
    SET_RANDOM_PLACE(state, places) {
      state.randomPlaces = places;
    },
    SET_DETAIL_PLACE(state, place) {
      state.place = place;
    },
    SET_PLAN(state, plan) {
      state.plan = plan;
    },
    SET_PLAN_LIST(state, plans) {
      state.planList = plans;
    },
    SET_PLANITEM(state, place) {
      state.planItems.push(place);
    },
    SET_PLANITEM_LIST(state, planList) {
      state.planItems = planList;
    },
    SET_PLAN_SAVE_ITEM_LIST(state, planSaveItems) {
      state.planSaveItems = planSaveItems;
    },
    DEL_PLANITEM(state, index) {
      state.planItems.splice(index, 1);
    },
    SET_SAVE_DRAWER(state, param) {
      state.saveDrawerOn = param;
    },
    SET_START_DATE(state, startDate) {
      state.dateStart = startDate;
    },
    SET_END_DATE(state, endDate) {
      state.dateEnd = endDate;
    },
    SET_IS_PLANVIEW(state, check) {
      state.isPlanView = check;
    },
  },
  actions: {
    getAreas: ({ commit }) => {
      areaList(({ data }) => {
        commit("SET_AREA_LIST", data);
      }, errorCall);
    },
    getSigungus: ({ commit }, areaCode) => {
      const params = { areaCode };
      sigunguList(
        params,
        ({ data }) => {
          commit("SET_SIGUNGU_LIST", data);
        },
        errorCall,
      );
    },
    async getPlaces({ commit }, params) {
      await placeList(
        params,
        ({ data }) => {
          commit("SET_PLACE_LIST", data);
        },
        errorCall,
      );
    },
    async getRandomPlaces({ commit }) {
      await getRandomPlaceList(({ data }) => {
        commit("SET_RANDOM_PLACE", data);
      }, errorCall);
    },
    async getPlaceSearch({ commit }, word) {
      await placeListWord(
        word,
        ({ data }) => {
          commit("SET_PLACE_LIST", data);
        },
        errorCall,
      );
    },
    setContents({ commit }, params) {
      commit("SET_CONTENT_LIST", params);
    },
    async setPlanList({ commit }) {
      await getPlanList(({ data }) => {
        commit("SET_PLAN_LIST", data);
      }, errorCall);
    },
    async setUserPlanList({ commit }, userId) {
      await getUserPlanList(
        userId,
        ({ data }) => {
          commit("SET_PLAN_LIST", data);
        },
        errorCall,
      );
    },
    async setPlanItemView({ commit }, articleNo) {
      await getPlanItemList(
        articleNo,
        ({ data }) => {
          commit("SET_PLANITEM_LIST", data.placeList);
          commit("SET_PLAN_SAVE_ITEM_LIST", data.planItems);
        },
        errorCall,
      );
    },
    setPlan({ commit }, plan) {
      commit("SET_PLAN", plan);
    },
    setPlanItem({ commit }, place) {
      commit("SET_PLANITEM", place);
    },
    setPlanItemList({ commit }, planList) {
      commit("SET_PLANITEM_LIST", planList);
    },
    delPlanItem({ commit }, index) {
      commit("DEL_PLANITEM", index);
    },
    setSaveDrawerOn({ commit }, param) {
      commit("SET_SAVE_DRAWER", param);
    },
    setStartDate({ commit }, startDate) {
      commit("SET_START_DATE", startDate);
    },
    setEndDate({ commit }, endDate) {
      commit("SET_END_DATE", endDate);
    },
    async registPlan({ commit }, planData) {
      await registPlanData(
        planData,
        ({ data }) => {
          console.log(data);
        },
        errorCall,
      );
    },
    setIsPlanView({ commit }, check) {
      commit("SET_IS_PLANVIEW", check);
    },
  },
};

export default tourStore;
