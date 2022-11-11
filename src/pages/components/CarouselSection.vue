<template>
  <div class="section" id="carousel">
    <div class="row justify-content-center">
      <div class="col">
        <el-carousel trigger="hover" height="900px">
          <el-carousel-item
            style="
              background-image: url('img/bg1.jpg');
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            "
          >
            <!-- <img class="d-block" src="img/bg1.jpg" alt="First slide" /> -->
            <div class="carousel-caption d-none d-md-block">
              <h5>Nature, United States</h5>
            </div>
          </el-carousel-item>
          <el-carousel-item
            style="
              background-image: url('img/bg3.jpg');
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            "
          >
            <!-- <img class="d-block" src="img/bg3.jpg" alt="Second slide" /> -->
            <div class="carousel-caption d-none d-md-block">
              <h5>Somewhere Beyond, United States</h5>
            </div>
          </el-carousel-item>
          <el-carousel-item
            style="
              background-image: url('img/bg4.jpg');
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            "
          >
            <!-- <img class="d-block" src="img/bg4.jpg" alt="Third slide" /> -->
            <div class="carousel-caption d-none d-md-block">
              <h5>Yellowstone National Park, United States</h5>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import { Carousel, CarouselItem } from "element-ui";

export default {
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
  },
};
</script>
<style scoped>
#carousel {
  margin-top: -80px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
