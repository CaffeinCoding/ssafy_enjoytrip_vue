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
      :wrapperClosable="false"
      ref="saveDrawer"
      :withHeader="false"
    >
      <div class="row detail-header">
        <div class="col-sm-auto detail-header-title">여행계획 상세설정</div>
        <div class="row col-sm-2 detail-btn-div">
          <button class="btn btn-primary">저장</button>
          <button class="btn" @click="$refs.saveDrawer.closeDrawer()">
            취소
          </button>
        </div>
      </div>
      <div class="row mx-4 mb-4 detail-title-div">
        <label for="detail-title" class="col-sm-1 detail-title-label"
          >제목</label
        >
        <input type="text" class="form-control col-sm-10" id="detail-title" />
      </div>
      <div class="row mx-4 detail-date-div">
        <label for="detail-date" class="col-sm-1 detail-date-label"
          >날짜 설정</label
        >
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Drawer } from "element-ui";
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";

export default {
  name: "AppTour",
  components: {
    [Drawer.name]: Drawer,
    Datepicker: VueDatepickerUi,
  },
  computed: {
    ...mapState("tourStore", ["saveDrawerOn"]),
    saveDrawerShow: {
      get() {
        return this.saveDrawerOn;
      },
      set(value) {
        this.setSaveDrawerOn(value);
      },
    },
  },
  methods: {
    ...mapActions("tourStore", ["setSaveDrawerOn"]),
  },
};
</script>

<style scoped>
.page-header {
  min-height: 900px;
}
.page-header > .container {
  padding-bottom: 0;
  padding-top: 8vh;
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
.detail-title-label {
  font-size: 16px;
  text-align: center;
  margin-bottom: 0;
  align-self: center;
}
#detail-title {
  font-size: 20px;
}
</style>
