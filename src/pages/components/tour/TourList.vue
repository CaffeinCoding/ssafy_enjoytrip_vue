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
    <board-layout :articles="planList" baseLink="/tour/view"></board-layout>
  </div>
</template>

<script>
import BoardLayout from "@/layout/BoardLayout";
import { mapState, mapActions, mapMutations } from "vuex";

const tourStore = "tourStore";

export default {
  name: "TourList",
  components: {
    BoardLayout,
  },
  async created() {
    this.CLEAR_PLAN_LIST();
    await this.setPlanList();
  },
  computed: {
    ...mapState(tourStore, ["planList"]),
  },
  methods: {
    ...mapActions(tourStore, ["setPlanList"]),
    ...mapMutations(tourStore, ["CLEAR_PLAN_LIST"]),
  },
};
</script>

<style scoped>
.view-name {
  font-weight: bold;
  font-size: 1.7rem;
}
</style>
