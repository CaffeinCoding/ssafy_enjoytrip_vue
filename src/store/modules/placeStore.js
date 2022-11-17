const placeStore = {
  namespaced: true,
  state: {
    areas: [{ value: null, text: "" }],
    siguguns: [{ value: null, text: "" }],
    contents: [
      { value: 0, text: "전체" },
      { value: 12, text: "관광지" },
      { value: 14, text: "문화시설" },
      { value: 15, text: "행사/공연/축제" },
      { value: 25, text: "여행코스" },
      { value: 28, text: "레포츠" },
      { value: 32, text: "숙박" },
      { value: 38, text: "쇼핑" },
      { value: 39, text: "음식점" },
    ],
    places: [],
    place: null,
  },
  getters: {},
  mutations: {
    CLEAR_AREA_LIST(state) {
      state.areas = [{ value: null, text: "" }];
    },
    CLEAR_SIGUGUN_LIST(state) {
      state.siguguns = [{ value: null, text: "" }];
    },
    CLEAR_PLACE_LIST(state) {
      state.places = [];
    },
    SET_AREA_LIST(state, areas) {
      areas.forEach((area) => {
        state.areas.push({ value: area.areaCode, text: area.areaName });
      });
    },
    SET_SIGUNGU_LIST(state, sigungus) {
      sigungus.forEach((sigungu) => {
        state.sigungus.push({
          value: sigungu.sigunguCode,
          text: sigungu.sigunguName,
        });
      });
    },
    SET_PLACE_LIST(state, places) {
      state.places = places;
    },
    SET_DETAIL_PLACE(state, place) {
      state.place = place;
    },
  },
  actions: {
    getArea: ({ commit }) => {},
  },
};
