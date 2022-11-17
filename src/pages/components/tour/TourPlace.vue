<template>
  <div>
    <div>
      <p class="view-name text-center">여행지 검색</p>
    </div>
    <kakao-map style="width: 100%; height: 700px"></kakao-map>
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

<style scoped>
.view-name {
  font-weight: bold;
  font-size: 1.7rem;
}
</style>
