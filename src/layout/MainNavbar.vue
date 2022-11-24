<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        EnjoyTrip
      </router-link>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <router-link :to="`/board`">
          <a class="nav-link" target="_blank">
            <i class="now-ui-icons media-1_camera-compact"></i>
            <p>여행피드</p>
          </a>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/tour/place">
          <a class="nav-link" target="_blank">
            <i class="now-ui-icons location_map-big"></i>
            <p>장소검색</p>
          </a>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/tour/list">
          <a class="nav-link" target="_blank">
            <i class="now-ui-icons ui-1_calendar-60"></i>
            <p>여행계획</p>
          </a>
        </router-link>
      </li>
      <drop-down
        tag="li"
        title="User"
        icon="now-ui-icons users_single-02"
        class="nav-item"
      >
        <nav-link to="/profile" v-if="userInfo">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
        <nav-link to="/signup" v-else>
          <i class="now-ui-icons users_circle-08"></i> 회원가입
        </nav-link>
        <nav-link v-if="userInfo">
          <n-button @click="logoutMethod">
            <i class="now-ui-icons media-1_button-power"></i>
            Logout
          </n-button>
        </nav-link>
        <nav-link to="/login" v-else>
          <i class="now-ui-icons ui-1_lock-circle-open"></i> 로그인
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";

import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    async logoutMethod() {
      await this.userLogout(this.userInfo.userId);
      alert("로그아웃되었습니다.");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped></style>
