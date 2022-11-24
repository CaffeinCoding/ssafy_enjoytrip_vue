<template>
  <div>
    <carousel-section></carousel-section>

    <!-- <div class="container">
        <div class="content-center brand">
          <img class="n-logo" src="img/now-logo.png" alt="" />
          <h1 class="h1-seo">Now UI Kit.</h1>
          <h3>A beautiful Bootstrap 4 UI kit. Yours free.</h3>
        </div>
      </div> -->
    <weather></weather>
    <card-widget-list></card-widget-list>
    <div class="section">
      <kakao-map style="height: 50vh" displayMode="main"></kakao-map>
    </div>
  </div>
</template>
<script>
// import { Parallax } from "@/components";
import BasicElements from "./components/BasicElementsSection";
import Navigation from "./components/Navigation";
import TabsSection from "./components/Tabs";
import ProgressPagination from "./components/ProgressPagination";
import Notifications from "./components/Notifications";
import Typography from "./components/Typography";
import JavascriptComponents from "./components/JavascriptComponents";
import CarouselSection from "./components/CarouselSection";
import NucleoIconsSection from "./components/NucleoIconsSection";
import SignupForm from "./components/SignupForm";
import ExamplesSection from "./components/ExamplesSection";
import DownloadSection from "./components/DownloadSection";
import CardWidgetList from "./components/widget/CardWidgetList";
import Weather from "./components/widget/Weather";

// EnjoyTrip
import { mapState, mapActions, mapMutations } from "vuex";
import KakaoMap from "@/pages/components/tour/KakaoMap";

const userStore = "userStore";
const tourStore = "tourStore";

export default {
  name: "index",
  bodyClass: "index-page",
  components: {
    KakaoMap,
    // Parallax,
    // BasicElements,
    // Navigation,
    // TabsSection,
    // ProgressPagination,
    // Notifications,
    // Typography,
    // JavascriptComponents,
    CarouselSection,
    // NucleoIconsSection,
    // SignupForm,
    // ExamplesSection,
    // DownloadSection,
    CardWidgetList,
    Weather,
  },
  async created() {
    this.CLEAR_RANDOM_PLACE();
    await this.getRandomPlaces();
    let authorization_code = this.$route.query.code;
    if (authorization_code) {
      let params = {
        code: authorization_code,
        "redirect-url": document.location.href.split("?")[0],
      };
      await this.kakaoUserConfirm(params);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfoLogin(token);
        this.$router.push({ name: "index" });
      }
    }
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["kakaoUserConfirm", "getUserInfoLogin"]),
    ...mapActions(tourStore, ["getRandomPlaces"]),
    ...mapMutations(tourStore, ["CLEAR_RANDOM_PLACE"]),
  },
};
</script>
<style></style>
