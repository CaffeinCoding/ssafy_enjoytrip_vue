<template>
  <div id="map"></div>
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
      latitude: 0,
      longitude: 0,
    };
  },
  mounted() {
    // this.getLocation();
    console.log("mounted");
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
  async created() {
    console.log("created");
    await this.getLocation();
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const mapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, mapOptions);
      //   this.map.setCenter(new kakao.maps.LatLng(this.latitude, this.longitude));
    },
    getLocation() {
      console.log(navigator);
      console.log("getLocation");
      navigator.geolocation.getCurrentPosition(
        this.getCoord,
        this.getError,
        this.options,
      );
    },
    getCoord(response) {
      return () => {
        console.log("getCoord");
        const { coords } = response;
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;
        this.map.setCenter(
          new kakao.maps.LatLng(this.latitude, this.longitude),
        );
      };
    },
    getError(error) {
      console.log(error.code);
      console.log(error.message);
    },
  },
};
</script>

<style scoped></style>
