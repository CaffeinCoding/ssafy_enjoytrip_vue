<template>
  <div id="map">
    <div class="row justify-content-end" id="info-bar">
      <div class="col-sm-2 py-2">
        <select class="form-control" id="select-state">
          <option value="" disabled selected style="display: none">
            시/도 선택
          </option>
        </select>
      </div>
      <div class="col-sm-2 py-2">
        <select class="form-control" id="select-region">
          <option value="" disabled selected style="display: none">
            구/군 선택
          </option>
        </select>
      </div>
      <div class="col-sm-2 py-2">
        <select class="form-control" id="select-content">
          <option value="" selected>전체</option>
        </select>
      </div>
      <form class="row mx-3" @submit.prevent="test">
        <div class="col-auto my-2 form-group">
          <input
            type="text"
            class="form-control"
            id="place-input"
            placeholder="장소 검색"
          />
        </div>
        <div class="col-auto form-group">
          <button
            type="submit"
            class="btn btn-round btn-primary"
            id="place-search-btn"
          >
            검색
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      options: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      },
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAOMAP_KEY;
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const mapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, mapOptions);
      this.getLocation();
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        this.getCoord,
        this.getError,
        this.options,
      );
    },
    getCoord(response) {
      const { coords } = response;
      this.map.setCenter(
        new kakao.maps.LatLng(coords.latitude, coords.longitude),
      );
    },
    getError(error) {
      console.log(error.code);
      console.log(error.message);
    },
    test() {
      console.log("test");
    },
  },
};
</script>

<style scoped>
.form-group {
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 0;
}
#info-bar {
  z-index: 99;
  position: relative;
  opacity: 0.8;
  background: rgb(255, 255, 255);
}
#info-bar:hover {
  opacity: 1;
}
#info-bar:focus-within {
  opacity: 1;
}
#place-input {
  font-size: 15px;
}
</style>
