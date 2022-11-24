<template>
  <div>
    <carousel-section></carousel-section>
    <weather></weather>
    <card-widget-list></card-widget-list>
    <div class="section">
      <kakao-map style="height: 50vh" displayMode="main"></kakao-map>
    </div>
  </div>
</template>
<script>
import CarouselSection from "./components/CarouselSection";
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
    CarouselSection,
    CardWidgetList,
    Weather,
  },
  async created() {
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
