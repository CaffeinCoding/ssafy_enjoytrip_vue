<template>
  <div class="section" id="carousel">
    <div class="row justify-content-center">
      <div class="col">
        <el-carousel trigger="click" :height="`${carouselHeight}px`">
          <el-carousel-item
            id="carousel-item"
            style="background-image: url('img/bg1.jpg')"
          >
            <div class="carousel-item-caption d-none d-md-block">
              <div style="font-size: 100px">EnjoyTrip!</div>
            </div>
          </el-carousel-item>
          <el-carousel-item
            id="carousel-item"
            style="background-image: url('img/bg3.jpg')"
          >
            <div class="carousel-item-caption d-none d-md-block">
              <h1>여행은 정신을</h1>
              <h1>다시 젊어지게 하는 샘이다</h1>
            </div>
          </el-carousel-item>
          <el-carousel-item
            id="carousel-item"
            style="background-image: url('img/bg4.jpg')"
          >
            <div class="carousel-item-caption d-none d-md-block">
              <h1>즐거운 여행되세요</h1>
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
  data() {
    return {
      carouselHeight: window.innerHeight,
      observer: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.carouselHeight = window.innerWidth / 2;
    },
  },
  created() {
    this.onResize();
    // this.observer = new IntersectionObserver((e) => {
    //   e.forEach((item) => {
    //     if (item.isIntersecting) {
    //       item.target.style.opacity = 1;
    //     } else {
    //       item.target.style.opacity = 0;
    //     }
    //   });
    // });
    // const caption = document.querySelectorAll(".carousel-item-caption");
    // caption.forEach((cap) => {
    //   this.observer.observe(cap);
    // });
  },
};
</script>
<style scoped>
#carousel {
  margin-top: -80px;
  padding-bottom: 0;
}

#carousel-item {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;
}
#carousel-item::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
.carousel-item-caption {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
  text-align: center;
  opacity: 0;
  transition: all 2.5s;
}

.is-active > .carousel-item-caption {
  opacity: 1;
}
</style>
