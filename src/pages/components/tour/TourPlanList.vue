<template>
  <div>
    <div class="title text-center">
      <h4>여행계획 공유</h4>
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
          articleno: 10,
          userid: "안효인",
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

<style></style>
