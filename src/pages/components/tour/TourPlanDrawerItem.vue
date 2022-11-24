<template>
  <el-card
    class="mx-4 my-3 place-card"
    body-style="padding: '0px'; padding-left:'10px'"
  >
    <div class="row">
      <el-date-picker
        class="col-sm-2 p-0 place-date-picker"
        v-model="date"
        align="right"
        size="mini"
        placeholder="날짜 선택"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        @change="setPlanItemData"
        v-if="!isPlanView"
      ></el-date-picker>
      <div class="place-date-picker" v-else>
        여행날짜 : {{ planSaveItems[index].planDate }}
      </div>
    </div>
    <div class="row">
      <img :src="itemImg" class="place-card-img" />
      <div style="padding: 14px">
        <div class="place-title">
          {{ place.title }}
        </div>
        <div class="my-1 place-address">
          {{ place.address }}
        </div>
        <textarea
          class="form-control place-card-memo"
          cols="120"
          rows="2"
          maxlength="200"
          v-model="memo"
          placeholder="간단메모 (최대 200자)"
          @change="setPlanItemData"
          v-if="!isPlanView"
        ></textarea>
        <div>{{ planSaveItems[index].memo }}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { Card, DatePicker } from "element-ui";
import { mapState } from "vuex";

export default {
  name: "TourPlanDrawerItem",
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker,
  },
  props: {
    place: Object,
    index: Number,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: this.disabledDate,
      },
      date: null,
      memo: "",
    };
  },
  computed: {
    ...mapState("tourStore", [
      "dateStart",
      "dateEnd",
      "planSaveItems",
      "isPlanView",
    ]),
    itemImg: {
      get() {
        let img = encodeURI(this.place.placeImg);
        if (img == "null") {
          img = require(`@/assets/no_img.jpg`);
        }
        return img;
      },
    },
  },
  methods: {
    disabledDate(time) {
      const start = new Date(this.dateStart);
      const end = new Date(this.dateEnd);
      return (
        start - 1000 * 60 * 60 * 24 > time.getTime() || end < time.getTime()
      );
    },
    setPlanItemData() {
      const data = {
        index: this.index,
        date: this.date,
        memo: this.memo,
      };
      this.$emit("setPlanItemData", data);
    },
  },
};
</script>

<style scoped>
.place-card {
  position: relative;
}
.place-date-picker {
  position: absolute;
  top: 15px;
  right: 15px;
}
.place-card-img {
  width: 200px;
  height: 130px;
  object-fit: contain;
}
.place-title {
  position: relative;
  font-weight: bold;
  font-size: 16px;
  margin-left: 5px;
}
.place-address {
  font-size: 12px;
  margin-left: 15px;
}
.place-card-memo {
  padding: 1px;
  padding-left: 5px;
  overflow: hidden;
  box-shadow: inset 1px 1px 1px 0px #dddddd;
}
</style>
