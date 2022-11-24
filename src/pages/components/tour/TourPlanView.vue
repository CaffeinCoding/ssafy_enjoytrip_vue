<template>
  <div>
    <div class="row">
      <div class="col-lg-9">
        <kakao-map
          style="width: 100%; height: 100%"
          displayMode="view"
          ref="kakaoMap"
        ></kakao-map>
      </div>
      <div class="col-lg-3">
        <div
          class="sidebar row h-100 d-flex text-center justify-content-center py-1"
        >
          <div class="w-75">
            <div class="my-2">여행 계획</div>
            <div class="row justify-content-center">
              <div class="w-100 px-1 my-2" id="add-place-list">
                <tour-plan-item
                  v-for="(place, index) in planItems"
                  :key="index"
                  :place="place"
                  :index="index"
                  displayMode="view"
                ></tour-plan-item>
              </div>
              <div class="row">
                <button
                  type="button"
                  class="btn btn-primary my-2"
                  id="save-plan-btn"
                  @click="setSaveDrawerOn(true)"
                >
                  상세보기
                </button>
                <button type="button" class="btn my-2" @click="movePlanList">
                  목록
                </button>
                <button
                  type="button"
                  class="btn btn-danger my-2"
                  @click="deletePlanItem"
                  v-if="checkUser"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/pages/components/tour/KakaoMap";
import { mapState, mapMutations, mapActions } from "vuex";
import TourPlanItem from "@/pages/components/tour/TourPlanItem";

const tourStore = "tourStore";
const userStore = "userStore";

export default {
  name: "TourPlanView",
  components: {
    KakaoMap,
    TourPlanItem,
  },
  data() {
    return {
      articleNo: null,
    };
  },
  async created() {
    this.articleNo = this.$route.params.articleNo;
    this.CLEAR_PLANITEM_LIST();
    this.CLEAR_PLAN_SAVE_ITEM_LIST();
    this.setIsPlanView(true);
    await this.setPlanItemView(this.articleNo);
  },
  computed: {
    ...mapState(tourStore, ["planItems", "plan"]),
    ...mapState(userStore, ["userInfo"]),
    checkUser: {
      get() {
        if (this.userInfo != null) {
          if (this.plan.userId == this.userInfo.userId) {
            return true;
          }
        }
        return false;
      },
    },
  },
  methods: {
    ...mapMutations(tourStore, [
      "CLEAR_PLANITEM_LIST",
      "CLEAR_PLAN_SAVE_ITEM_LIST",
    ]),
    ...mapActions(tourStore, [
      "setPlanItemList",
      "setSaveDrawerOn",
      "setPlanItemView",
      "setIsPlanView",
      "deletePlan",
    ]),
    movePlanList() {
      this.$router.push({ name: "tourplanlist" });
    },
    async deletePlanItem() {
      if (confirm("여행 일정을 삭제하시겠습니까?")) {
        await this.deletePlan(this.articleNo);
        alert("삭제되었습니다");
        this.movePlanList();
      }
    },
  },
};
</script>

<style>
.sidebar {
  position: relative;
  padding: 30px 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
}
.view-name {
  font-weight: bold;
  font-size: 1.7rem;
}
#add-place-list {
  height: 600px;
  overflow: auto;
  overflow-x: hidden;
}
#add-place-list::-webkit-scrollbar {
  display: none;
}
</style>
