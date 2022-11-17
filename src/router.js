import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/Index.vue";
import Landing from "./pages/Landing.vue";
import Login from "./pages/Login.vue";
import UserProfile from "./pages/components/user/UserProfile.vue";
import SignupForm from "./pages/components/SignupForm.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";

// EnjoyTrip
import AppBoard from "@/pages/AppBoard";
import AppTour from "@/pages/AppTour";

Vue.use(Router);

export default new Router({
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
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        default: UserProfile,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
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
          component: () => import("@/pages/components/board/BoardWrite"),
        },
        {
          path: "view/:articleno",
          name: "boardview",
          component: () => import("@/pages/components/board/BoardView"),
        },
        {
          path: "modify/:articleno",
          name: "boardmodify",
          component: () => import("@/pages/components/board/BoardModify"),
        },
        {
          path: "delete/:articleno",
          name: "boarddelete",
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
          name: "tourplaclist",
          component: () => import("@/pages/components/tour/TourPlanList"),
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
