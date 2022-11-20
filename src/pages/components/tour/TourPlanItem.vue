<template>
  <div class="plan-item-wrap">
    <div class="plan-item-content">
      <div class="plan-item-title-wrap">
        <div class="plan-item-title w-100">
          {{ place.title }}
        </div>
      </div>
      <div class="plan-item-body">
        <div class="plan-item-img">
          <img :src="imgCheck" width="73" height="70" />
        </div>
        <div class="plan-item-desc">
          <div class="plan-item-address">
            {{ place.address }}
          </div>
          <div class="plan-item-link-wrap">
            <a :href="detailLink" class="plan-item-link" target="_blank"
              >상세보기</a
            >
          </div>
          <button class="plan-item-remove-btn btn btn-danger">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TourPlanItem",
  props: {
    place: Object,
  },
  data() {
    return {
      link: "http://data.visitkorea.or.kr/resource/",
      img: "../img/no_img.jpg",
    };
  },
  computed: {
    detailLink() {
      return this.link + this.place.contentId;
    },
    imgCheck() {
      let imgUrl = encodeURI(this.place.placeImg);
      if (imgUrl != "null") {
        return imgUrl;
      } else {
        return this.img;
      }
    },
  },
};
</script>

<style scoped>
.plan-item-wrap {
  margin-top: 5px;
  height: 120px;
  text-align: left;
  overflow: hidden;
}
.plan-item-wrap .plan-item-content {
  border-radius: 10px;
}
.plan-item-wrap .plan-item-content:nth-child(1) {
  /* border: 0; */
  border: 1px solid black;
  /* box-shadow: 0px 0px 1px 2px #888; */
}
.plan-item-content .plan-item-title-wrap {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
}
.plan-item-title-wrap .plan-item-title {
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.plan-item-content .plan-item-body {
  position: relative;
  overflow: hidden;
}
.plan-item-content .plan-item-desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 70px;
}
.plan-item-desc .plan-item-remove-btn {
  position: absolute;
  font-size: 10px;
  bottom: 0;
  right: 10px;
  padding: 5px 10px;
}
.plan-item-desc .plan-item-address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.plan-item-content .plan-item-img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.plan-item-content .plan-item-link {
  color: #5085bb;
}
</style>
