import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
import Landing from "./pages/Landing.vue";
import UserProfile from "./pages/components/user/UserProfile.vue";
import SignupForm from "./pages/components/user/Signup.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

// EnjoyTrip
import store from "@/store";

import AppBoard from "@/pages/AppBoard";
import AppTour from "@/pages/AppTour";
import AppUser from "@/pages/AppUser";

// User
import UserLogin from "@/pages/components/user/UserLogin";

Vue.use(Router);

const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  // if (checkUserInfo != null && token) {
  //   console.log("토큰 유효성 체크하러 가자!!!!");
  //   await store.dispatch("userStore/getUserInfoLogin", token);
  // }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};
const router = new Router({
  linkExactActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/profile",
      name: "profile",
      beforeEnter: onlyAuthUser,
      components: {
        default: UserProfile,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 50 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: SignupForm,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/login",
      name: "login",
      components: { default: UserLogin, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/user",
      name: "user",
      components: {
        default: AppUser,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: "black" },
      },
      children: [
        {
          path: "mailconfirm",
          name: "mailconfirm",
          component: () => import("@/pages/components/user/MailConfirm"),
        },
      ],
    },

    {
      path: "/board",
      name: "board",
      components: {
        default: AppBoard,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: "black" },
      },
      redirect: "/board/list",
      children: [
        {
          path: "list",
          name: "boardlist",
          component: () => import("@/pages/components/board/BoardList"),
        },
        {
          path: "write",
          name: "boardwrite",
          beforeEnter: onlyAuthUser,
          component: () => import("@/pages/components/board/BoardWrite"),
        },
        {
          path: "view/:articleNo",
          name: "boardview",
          component: () => import("@/pages/components/board/BoardView"),
        },
        {
          path: "modify/:articleNo",
          name: "boardmodify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/pages/components/board/BoardModify"),
        },
        {
          path: "delete/:articleNo",
          name: "boarddelete",
          beforeEnter: onlyAuthUser,
          component: () => import("@/pages/components/board/BoardDelete"),
        },
      ],
    },
    {
      path: "/tour",
      name: "tour",
      components: {
        default: AppTour,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 0 },
        footer: { backgroundColor: "black" },
      },
      children: [
        {
          path: "place",
          name: "tourplace",
          component: () => import("@/pages/components/tour/TourPlace"),
        },
        {
          path: "plan",
          name: "tourplan",
          component: () => import("@/pages/components/tour/TourPlan"),
        },
        {
          path: "list",
          name: "tourplanlist",
          component: () => import("@/pages/components/tour/TourList"),
        },
        {
          path: "view/:articleNo",
          name: "tourview",
          component: () => import("@/pages/components/tour/TourPlanView"),
        },
      ],
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
