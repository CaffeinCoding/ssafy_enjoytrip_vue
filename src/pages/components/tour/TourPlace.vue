<template>
  <div>
    <div>
      <p class="page-name text-center">여행지 검색</p>
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
.page-name {
  font-weight: bold;
  font-size: 1.7rem;
}
</style>
