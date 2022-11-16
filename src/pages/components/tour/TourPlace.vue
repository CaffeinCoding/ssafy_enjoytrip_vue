<template>
  <div>
    <div
      class="row p-2 justify-content-end"
      style="
        z-index: 99;
        position: relative;
        background: rgba(255, 255, 255, 0.8);
      "
    >
      <div class="col-md-2">
        <select class="form-control" id="select-state">
          <option value="" disabled selected style="display: none">
            시/도 선택
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-control" id="select-region">
          <option value="" disabled selected style="display: none">
            구/군 선택
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-control" id="select-content">
          <option value="">전체</option>
        </select>
      </div>
    </div>
    <kakao-map style="width: 100%; height: 700px"> </kakao-map>
  </div>
</template>

<script>
import KakaoMap from "@/pages/components/tour/KakaoMap";

export default {
  name: "TourPlace",
  components: {
    KakaoMap,
  },
};
</script>

<style></style>
