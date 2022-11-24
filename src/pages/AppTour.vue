<template>
  <div class="page-header clear-filter">
    <div class="container">
      <router-view class="tour-router-view"></router-view>
    </div>
    <el-drawer
      title="여행 계획 상세 설정"
      class="plan-save-drawer"
      :visible.sync="saveDrawerShow"
      direction="btt"
      size="70%"
      ref="saveDrawer"
      :withHeader="false"
      :close-on-press-escape="false"
    >
      <div class="row detail-header">
        <div class="col-sm-auto detail-header-title" v-if="!isPlanView">
          여행계획 상세설정
        </div>
        <div class="col-sm-auto mt-4 detail-header-title" v-else>
          여행계획 상세정보
        </div>
        <div class="row col-sm-2 detail-btn-div">
          <button
            class="btn btn-primary"
            @click="planDataCheck"
            v-if="!isPlanView"
          >
            저장
          </button>
          <button
            class="btn close-btn"
            @click="$refs.saveDrawer.closeDrawer()"
            v-if="isPlanView"
          >
            닫기
          </button>
          <button class="btn" @click="$refs.saveDrawer.closeDrawer()" v-else>
            취소
          </button>
        </div>
      </div>
      <div class="row mx-4 mb-4 detail-title-div" v-if="!isPlanView">
        <label for="detail-title" class="col-sm-1 detail-title-label"
          >제목</label
        >
        <input
          type="text"
          class="form-control col-sm-10"
          id="detail-title"
          v-model="planTitle"
        />
      </div>
      <div class="mx-4 mb-4 detail-title-label plan-view" v-else>
        {{ plan.title }}
      </div>
      <div class="row mx-4 detail-date-div" v-if="!isPlanView">
        <label for="detail-date" class="col-sm-2 detail-date-label"
          >날짜 설정</label
        >
        <el-date-picker
          class="col-sm-4"
          v-model="dateRange"
          type="daterange"
          align="left"
          start-placeholder="여행 시작 날짜"
          end-placeholder="여행 종료 날짜"
          size="mini"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <div class="row mx-4 detail-date-div" v-else>
        <div class="col-sm-2 detail-date-label">여행기간 :</div>
        <div class="col-sm-3 detail-date-label">{{ setDateRange }}</div>
      </div>
      <tour-plan-drawer-item
        v-for="(place, index) in planItems"
        :key="index"
        :place="place"
        :index="index"
        @setPlanItemData="setPlanItemData"
      ></tour-plan-drawer-item>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { Drawer, DatePicker } from "element-ui";
import TourPlanDrawerItem from "@/pages/components/tour/TourPlanDrawerItem";

const tourStore = "tourStore";

export default {
  name: "AppTour",
  components: {
    [Drawer.name]: Drawer,
    [DatePicker.name]: DatePicker,
    TourPlanDrawerItem,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return Date.now() > time.getTime();
        },
      },
      planTitle: "",
      planItemDates: [],
      planItemMemos: [],
    };
  },
  created() {
    this.CLEAR_DATE_RANGE();
  },
  computed: {
    ...mapState(tourStore, [
      "saveDrawerOn",
      "planItems",
      "dateStart",
      "dateEnd",
      "isPlanView",
      "planSaveItems",
      "plan",
    ]),
    ...mapGetters("userStore", ["checkUserInfo"]),
    saveDrawerShow: {
      get() {
        return this.saveDrawerOn;
      },
      set(value) {
        this.setSaveDrawerOn(value);
      },
    },
    dateRange: {
      get() {
        return [new Date(this.dateStart), new Date(this.dateEnd)];
      },
      set(value) {
        this.setStartDate(value[0]);
        this.setEndDate(value[1]);
      },
    },
    setDateRange: {
      get() {
        let range = "";
        range += this.plan.startDate + " ~ ";
        if (this.plan.endDate == null) {
          range += this.plan.startDate;
        } else {
          range += this.plan.endDate;
        }
        return range;
      },
    },
  },
  methods: {
    ...mapActions(tourStore, [
      "setSaveDrawerOn",
      "setStartDate",
      "setEndDate",
      "registPlan",
    ]),
    ...mapMutations(tourStore, ["CLEAR_DATE_RANGE"]),
    planDataCheck() {
      const checkUserInfo = this.checkUserInfo;
      if (checkUserInfo == null) {
        alert("로그인 후 저장 가능합니다.");
        this.$router.push({ name: "login" });
      }

      const checkPlanItemDates = this.planItemDates.filter(
        (item) => item !== null && item !== undefined && item !== ""
      );

      if (this.planTitle == "") {
        alert("제목을 작성해주세요");
        return;
      } else if (this.dateStart == null) {
        alert("여행 시작 날짜를 설정해주세요");
        return;
      } else if (this.dateEnd == null) {
        alert("여행 종료 날짜를 설정해주세요");
        return;
      } else if (checkPlanItemDates.length != this.planItemDates.length) {
        alert("여행지 별 여행 날짜를 설정해주세요");
        return;
      } else {
        const contentList = [];
        for (let i = 0; i < this.planItems.length; i++) {
          contentList.push({
            contentId: this.planItems[i].contentId,
            planDate: this.planItemDates[i],
            memo: this.planItemMemos[i],
          });
        }
        const planData = {
          userId: checkUserInfo.userId,
          title: this.planTitle,
          startDate: this.dateStart,
          endDate: this.dateEnd,
          contentList: contentList,
        };

        console.log(contentList[0]);

        this.registPlan(planData);

        alert("등록이 완료되었습니다");

        this.CLEAR_DATE_RANGE();
        this.planTitle = "";
        this.planItemDates = [];
        this.planItemMemos = [];

        this.$refs.saveDrawer.closeDrawer();

        this.$router.push({ name: "tourplanlist" });
      }
    },
    setPlanItemData(data) {
      this.planItemDates[data.index] = data.date;
      this.planItemMemos[data.index] = data.memo;
    },
  },
};
</script>

<style scoped>
.page-header {
  min-height: 900px;
}
.page-header > .container {
  padding-bottom: 0;
  padding-top: 10vh;
}
.tour-router-view {
  color: black;
}
.plan-save-drawer {
  color: black;
}
.detail-header {
  justify-content: space-between;
  margin-bottom: 10px;
}
.detail-header-title {
  font-size: 20px;
  margin-left: 15px;
  align-self: center;
}
.detail-title-label,
.detail-date-label {
  font-size: 16px;
  text-align: center;
  margin-bottom: 0;
  align-self: center;
}
.plan-view {
  font-size: 20px;
  font-weight: bold;
}
#detail-title {
  font-size: 20px;
}
.close-btn {
  position: absolute;
  right: 40px;
  top: 5px;
}
</style>
