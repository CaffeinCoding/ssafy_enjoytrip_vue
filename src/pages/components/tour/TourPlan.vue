<template>
  <div>
    <div>
      <p class="view-name text-center">여행 계획</p>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <kakao-map style="width: 100%; height: 100%"></kakao-map>
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

<style scoped>
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
.view-name {
  font-weight: bold;
  font-size: 1.7rem;
}
</style>
