<template>
  <div class="row">
    <div class="col-lg-9">
      <div
        class="row w-100 justify-content-end"
        style="z-index: 99; background: rgba(255, 255, 255, 0.8)"
      >
        <div class="col-md-3 my-2">
          <input
            type="text"
            class="form-control"
            id="place-input"
            placeholder="장소 검색"
          />
        </div>
        <div class="d-grid col-sm-2">
          <button class="btn" id="place-search-btn">검색</button>
        </div>
      </div>
      <kakao-map style="width: 100%; height: 700px"> </kakao-map>
    </div>
    <div class="col-lg-3">
      <div
        class="sidebar row h-100 d-flex text-center justify-content-center py-1"
      >
        <div class="w-75">
          <div class="sidebar-title">여행 계획</div>
          <div>
            <input
              type="text"
              class="form-control"
              id="plan-title"
              placeholder="여행 계획 제목"
            />
          </div>
          <div class="row justify-content-center">
            <div
              class="w-100 px-1"
              id="add-place-list"
              style="height: 600px; overflow: auto; overflow-x: hidden"
            ></div>
            <button
              type="button"
              class="btn btn-primary my-1"
              id="save-plan-btn"
            >
              저장
            </button>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/pages/components/tour/KakaoMap";
export default {
  name: "TourPlan",
  components: {
    KakaoMap,
  },
};
</script>

<style>
.sidebar {
  position: relative;
  padding: 30px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.sidebar .sidebar-title {
  font-size: 20px;
  font-weight: 700;
  padding: 0 0 0 0;
  margin: 0 0 15px 0;
  color: #1e4356;
  position: relative;
}
</style>
