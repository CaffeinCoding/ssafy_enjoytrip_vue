<template>
  <div id="map">
    <div
      class="row justify-content-end"
      id="info-bar"
      v-if="displayMode != 'view'"
    >
      <div class="searchToggle">
        <n-switch v-model="searchMode"></n-switch>
        <span>{{ searchMode ? "장소 검색" : "카테고리 검색" }}</span>
      </div>
      <div class="col-sm-2 py-2" v-show="!searchMode">
        <select
          v-model="areaCode"
          class="form-control"
          id="select-state"
          @change="sigunguList"
        >
          <option
            v-for="area in areas"
            :value="area.value"
            :key="area.value"
            :disabled="area.disabled"
            v-show="area.value"
          >
            {{ area.text }}
          </option>
        </select>
      </div>
      <div class="col-sm-2 py-2" v-show="!searchMode">
        <select
          v-model="sigunguCode"
          class="form-control"
          id="select-region"
          :disabled="sigunguDisabled"
          @change="placeList"
        >
          <option
            v-for="sigungu in sigungus"
            :value="sigungu.value"
            :disabled="sigungu.disabled"
            :key="sigungu.value"
            v-show="sigungu.value"
          >
            {{ sigungu.text }}
          </option>
        </select>
      </div>
      <div class="col-sm-2 py-2 mr-2" v-show="!searchMode">
        <select
          v-model="contentCode"
          class="form-control"
          id="select-content"
          :disabled="contentDisabled"
          @change="contentSelect"
        >
          <option
            v-for="content in contents"
            :value="content.value"
            :disabled="content.disabled"
            :key="content.value"
            v-show="content.value"
          >
            {{ content.text }}
          </option>
        </select>
      </div>
      <form class="row mx-3" @submit.prevent="placeSearch" v-show="searchMode">
        <div class="col-auto my-2 form-group">
          <input
            type="text"
            class="form-control"
            id="place-input"
            v-model="searchWord"
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
import { mapState, mapActions, mapMutations } from "vuex";
import { Switch } from "@/components";

const placeStore = "placeStore";

export default {
  name: "KakaoMap",
  components: {
    [Switch.name]: Switch,
  },
  props: {
    displayMode: {
      type: String,
      default: "search",
    },
  },
  data() {
    return {
      searchWord: "",
      map: null,
      bounds: null,
      areaCode: null,
      sigunguDisabled: true,
      sigunguCode: null,
      contentDisabled: true,
      contentCode: 1,
      clusterer: null,
      markerList: [],
      infoList: [],
      contentList: [],
      locImage: {
        12: "tour",
        14: "culture",
        15: "event",
        25: "travel",
        28: "sports",
        32: "bed",
        38: "shop",
        39: "restaurant",
      },
      defaultContent: [
        { contentType: 12, name: "관광지" },
        { contentType: 14, name: "문화시설" },
        { contentType: 15, name: "행사/공연/축제" },
        { contentType: 25, name: "여행코스" },
        { contentType: 28, name: "레포츠" },
        { contentType: 32, name: "숙박" },
        { contentType: 38, name: "쇼핑" },
        { contentType: 39, name: "음식점" },
      ],
      searchMode: false,
    };
  },
  created() {
    this.CLEAR_AREA_LIST();
    this.getAreas();
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        process.env.VUE_APP_KAKAOMAP_KEY +
        "&libraries=services,clusterer";
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  computed: {
    ...mapState(placeStore, [
      "areas",
      "sigungus",
      "contents",
      "markerImg",
      "places",
    ]),
  },
  watch: {
    searchMode: {
      handler(val) {
        if (val) {
          this.areaCode = null;
          this.sigunguCode = null;
          this.CLEAR_SIGUNGU_LIST();
          this.sigunguDisabled = true;
          this.contentDisabled = true;
          this.contentCode = 1;
        } else {
          this.searchWord = "";
        }
      },
    },
  },
  methods: {
    ...mapActions(placeStore, [
      "getAreas",
      "getSigungus",
      "getPlaces",
      "setContents",
      "getPlaceSearch",
      "setPlanItem",
    ]),
    ...mapMutations(placeStore, [
      "CLEAR_AREA_LIST",
      "CLEAR_SIGUNGU_LIST",
      "CLEAR_PLACE_LIST",
      "CLEAR_CONTENT_LIST",
    ]),
    sigunguList() {
      this.contentDisabled = true;
      this.contentCode = 1;
      this.sigunguDisabled = false;
      this.CLEAR_SIGUNGU_LIST();
      this.sigunguCode = null;
      if (this.areaCode) {
        this.getSigungus(this.areaCode);
      }
    },
    async placeList() {
      this.contentDisabled = false;
      this.CLEAR_PLACE_LIST();
      this.CLEAR_CONTENT_LIST();
      this.contentList = [];
      if (this.areaCode && this.sigunguCode) {
        const params = {
          areaCode: this.areaCode,
          sigunguCode: this.sigunguCode,
        };
        await this.getPlaces(params);
      }

      this.initMarker();
      this.setMarker();
    },
    contentSelect() {
      this.mapDragEvent();
      this.clusterer.clear();
      this.places.forEach((place, index) => {
        if (this.markerList.length > 0) {
          if (place.contentType != this.contentCode && this.contentCode != 1) {
            this.markerList[index].setMap(null);
          } else {
            this.markerList[index].setMap(this.map);
            this.clusterer.addMarker(this.markerList[index]);
          }
        }
      });
    },
    initMap() {
      const container = document.getElementById("map");
      const mapOptions = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      this.map = new kakao.maps.Map(container, mapOptions);
      kakao.maps.event.addListener(this.map, "drag", this.mapDragEvent);
      this.bounds = new kakao.maps.LatLngBounds();
      this.setInitCenter(this.map);
    },
    initMarker() {
      if (this.clusterer) {
        this.clusterer.clear();
      }
      this.markerList = [];
      this.infoList = [];
    },
    setInitCenter(map) {
      if (map) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            map.setCenter(
              new kakao.maps.LatLng(coords.latitude, coords.longitude)
            );
          },
          (error) => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      }
    },
    setMarker() {
      if (!this.searchMode) {
        var contentSet = new Set();
      }
      const bounds = new kakao.maps.LatLngBounds();
      this.clusterer = new kakao.maps.MarkerClusterer({
        map: this.map,
        averageCenter: true,
        minLevel: 7,
      });
      this.places.forEach((place) => {
        if (!this.searchMode) {
          contentSet.add(place.contentType);
        }
        const pos = new kakao.maps.LatLng(
          Number(place.mapY),
          Number(place.mapX)
        );
        const marker = new kakao.maps.Marker({
          position: pos,
          title: place.title,
          image: new kakao.maps.MarkerImage(
            require("@/assets/marker/" +
              this.locImage[place.contentType] +
              ".png"),
            new kakao.maps.Size(37, 37)
          ),
        });
        marker.setMap(this.map);
        this.makeInfoWindow(place, marker);
        this.markerList.push(marker);
        bounds.extend(marker.getPosition());
      });
      if (!this.searchMode) {
        this.setContentList(contentSet);
      }
      this.clusterer.addMarkers(this.markerList);
      this.map.setBounds(bounds);
    },
    setContentList(contentSet) {
      this.contentList = this.defaultContent.filter((obj) =>
        contentSet.has(obj.contentType)
      );
      this.setContents(this.contentList);
    },
    makeInfoWindow(item, marker) {
      let img = encodeURI(item.placeImg);
      let link = "http://data.visitkorea.or.kr/resource/" + item.contentId;
      if (img == "null") {
        img = "../img/no_img.jpg";
      }
      const infoWrap = document.createElement("div");
      infoWrap.className = "info-wrap";

      const infoContent = document.createElement("div");
      infoContent.className = "info-content";
      infoWrap.appendChild(infoContent);

      const infoTitleDiv = document.createElement("div");
      infoTitleDiv.className = "info-title-div";
      infoContent.appendChild(infoTitleDiv);

      const infoTitle = document.createElement("div");
      infoTitle.className = "info-title";
      infoTitle.innerText = item.title;
      infoTitleDiv.appendChild(infoTitle);

      const infoClose = document.createElement("div");
      infoClose.className = "info-close";
      infoTitleDiv.appendChild(infoClose);

      const infoBody = document.createElement("div");
      infoBody.className = "info-body";
      infoContent.appendChild(infoBody);

      const infoImg = document.createElement("div");
      infoImg.className = "info-img";
      infoBody.appendChild(infoImg);

      const placeImg = document.createElement("img");
      placeImg.src = img;
      placeImg.width = 73;
      placeImg.height = 70;
      infoImg.appendChild(placeImg);

      const infoDesc = document.createElement("div");
      infoDesc.className = "info-desc";
      infoBody.appendChild(infoDesc);

      const infoAddress = document.createElement("div");
      infoAddress.className = "info-address";
      infoAddress.innerText = item.address;
      infoDesc.appendChild(infoAddress);

      const infoLinkDiv = document.createElement("div");
      infoDesc.appendChild(infoLinkDiv);

      const infoLink = document.createElement("a");
      infoLink.className = "info-link";
      infoLink.href = link;
      infoLink.target = "_blank";
      infoLink.innerText = "상세보기";
      infoLinkDiv.appendChild(infoLink);

      if (this.displayMode == "route") {
        const AddBtn = document.createElement("button");
        AddBtn.className = "info-add-btn btn btn-primary";
        AddBtn.innerText = "추가";
        AddBtn.addEventListener("click", () => {
          this.setPlanItem(item);
        });
        infoDesc.appendChild(AddBtn);
      }

      const infoWindow = new kakao.maps.CustomOverlay({
        content: infoWrap,
        position: marker.getPosition(),
      });
      this.infoList.push(infoWindow);

      kakao.maps.event.addListener(marker, "click", () => {
        this.mapDragEvent();
        infoWindow.setZIndex(999);
        infoWindow.setMap(this.map);
        this.map.setCenter(marker.getPosition());
      });

      infoClose.addEventListener("click", () => {
        infoWindow.setMap(null);
      });
    },
    mapDragEvent() {
      if (this.infoList.length > 0) {
        this.infoList.forEach((infoWindow) => {
          infoWindow.setMap(null);
        });
      }
    },
    // 장소 검색
    async placeSearch() {
      this.CLEAR_PLACE_LIST();
      if (this.searchWord != "") {
        await this.getPlaceSearch(this.searchWord);
      }
      this.initMarker();
      this.setMarker();
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
.searchToggle {
  text-align: left;
  position: absolute;
  width: 200px;
  left: 30px;
  top: 15px;
}
.searchToggle span {
  position: absolute;
  top: 2px;
  font-weight: bold;
}
#place-input {
  padding-top: 0;
  padding-bottom: 0;
  font-size: 12px;
}

#map::v-deep .info-wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
}
#map::v-deep .info-wrap * {
  padding: 0;
  margin: 0;
}
#map::v-deep .info-wrap .info-content {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
#map::v-deep .info-wrap .info-content:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
#map::v-deep .info-content .info-title-div {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
}
#map::v-deep .info-title-div .info-title {
  width: 250px;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#map::v-deep .info-content .info-close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
}
#map::v-deep .info-content .info-close:hover {
  cursor: pointer;
}
#map::v-deep .info-content .info-body {
  position: relative;
  overflow: hidden;
}
#map::v-deep .info-content .info-desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
#map::v-deep .info-desc .info-add-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px 10px;
}
#map::v-deep .info-desc .info-address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#map::v-deep .info-content .info-img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
#map::v-deep .info-content::after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
#map::v-deep .info-content .info-link {
  color: #5085bb;
}
</style>
