<template>
  <div>
    <div>
      <p class="view-name text-center">여행 계획</p>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <kakao-map
          style="width: 100%; height: 100%"
          displayMode="route"
          ref="kakaoMap"
        ></kakao-map>
      </div>
      <div class="col-lg-3">
        <div
          class="sidebar row h-100 d-flex text-center justify-content-center py-1"
        >
          <div class="w-75">
            <div class="my-2">
              <input
                type="text"
                class="form-control"
                id="plan-title"
                placeholder="여행 계획 제목"
              />
            </div>
            <div class="row justify-content-center">
              <div class="w-100 px-1 my-2" id="add-place-list">
                <draggable v-model="planItemList">
                  <tour-plan-item
                    v-for="(place, index) in planItemList"
                    :key="index"
                    :place="place"
                    :index="index"
                    @delMarker="delMarker"
                  ></tour-plan-item>
                </draggable>
              </div>
              <button
                type="button"
                class="btn btn-primary my-2"
                id="save-plan-btn"
                @click="setSaveDrawerOn(true)"
              >
                저장
              </button>
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
import draggable from "vuedraggable";

const tourStore = "tourStore";

export default {
  name: "TourPlan",
  components: {
    KakaoMap,
    TourPlanItem,
    draggable,
  },
  created() {
    this.CLEAR_PLANITEM_LIST();
  },
  computed: {
    ...mapState(tourStore, ["planItems"]),
    planItemList: {
      get() {
        return this.planItems;
      },
      set(value) {
        this.setPlanItemList(value);
        this.delMarker();
      },
    },
  },
  methods: {
    ...mapMutations(tourStore, ["CLEAR_PLANITEM_LIST"]),
    ...mapActions(tourStore, ["setPlanItemList", "setSaveDrawerOn"]),
    delMarker() {
      this.$refs.kakaoMap.refreshMarker();
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
