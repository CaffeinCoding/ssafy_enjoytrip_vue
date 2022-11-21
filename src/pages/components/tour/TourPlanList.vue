<template>
  <div>
    <div>
      <p class="view-name text-center">여행계획 공유</p>
    </div>
    <div class="text-right">
      <router-link to="/tour/plan" class="btn btn-round btn-primary"
        >여행계획 작성</router-link
      >
    </div>
    <board-layout :articles="articles"></board-layout>
  </div>
</template>

<script>
import BoardLayout from "@/layout/BoardLayout";
export default {
  name: "TourPlanList",
  components: {
    BoardLayout,
  },
  data() {
    return {
      articles: [
        {
          articleNo: 10,
          userId: "안효인",
          subject: "안녕하세요",
          content: "안녕하세요!!!!",
          hit: 10,
          regtime: "2022-11-08 17:03:15",
        },
      ],
    };
  },
};
</script>

<style scoped>
.view-name {
  font-weight: bold;
  font-size: 1.7rem;
}
</style>
