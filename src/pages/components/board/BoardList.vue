<template>
  <div>
    <div>
      <div style="text-align: right">
        <n-button type="primary" round @click="moveWrite">글작성</n-button>
      </div>
    </div>
    <div>
      <ul ref="notification-list" class="list" @scroll="handleNotificationListScroll">
        <masonry
          :cols="{ default: 3, 1000: 3, 700: 2, 400: 1 }"
          :gutter="{ default: '15px', 700: '5px' }"
          class="card-style"
        >
          <!-- <div v-for="(item, index) in 100" :key="index"> -->

          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg3.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/test1.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg4.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/test2.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg5.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg6.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg7.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg8.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>
          <router-link to="view/1">
            <card class="board-card">
              <img src="@/assets/bg11.jpg" />
              <h4 class="card-title">제목</h4>
              <p class="card-text">내용</p>
            </card>
          </router-link>

          <!-- </div> -->
        </masonry>
      </ul>
    </div>
  </div>
</template>

<script>
import { Button, Card } from "@/components";

export default {
  name: "BoardList",
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
  },
  data() {
    return {
      articles: [],
      contents: null,
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  created() {
    // 비동기
    // TODO : 글목록 얻기.
    // http.get(`/board`).then(({ data }) => (this.articles = data));

    this.articles = [
      {
        articleno: 10,
        userid: "안효인",
        subject: "안녕하세요",
        hit: 10,
        regtime: "2022-11-08 17:03:15",
      },
      {
        articleno: 9,
        userid: "kimssafy",
        subject: "안녕하세요2",
        hit: 102,
        regtime: "2022-11-08 14:13:15",
      },
      {
        articleno: 8,
        userid: "parkssafy",
        subject: "안녕하세요7",
        hit: 24,
        regtime: "2022-11-07 11:03:15",
      },
    ];
  },
  methods: {
    moveWrite() {
      console.log("글쓰러 가자!!!");
      this.$router.push({ name: "boardwrite" });
    },

    // 무한 스크롤 정의
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) this.handleLoadMore();
    },

    // 내려오면 api 호출하여 아래에 더 추가, total값 최대이면 호출 안함
    handleLoadMore() {
      if (this.notifications.length < this.total) {
        const params = {
          limit: this.params.limit,
          page: this.params.page + 1,
        };
        this.$store.commit(
          "notification/SET_PARAMS",
          this.filterValue ? { ...params, type: this.filterValue } : params
        );
        this.dispatchGetNotifications(false);
      }
    },

    // 스크롤을 맨위로 올리고 싶을 때
    handleClickTitle() {
      this.$refs["notification-list"].scroll({ top: 0, behavior: "smooth" });
    },

    // 새로고침
    handleClickRefresh() {
      this.$refs["notification-list"].scroll({ top: 0 });
      this.dispatchGetNotifications(true);
    },

    // 처음 렌더링시 이전 알림 불러오기 or reset=true시 새로고침, false시 이전 목록에 추가
    dispatchGetNotifications(reset) {
      this.$store.dispatch("notification/getNotifications", reset);
    },
  },
};
</script>

<style scoped>
.card-style > div > div {
  border-radius: 5px;
  /* padding: 5px; */
  margin: 0 0 5px 0;
}

.card-style > div > div > img {
  width: 100%;
}

.list {
  height: calc(100vh - 120px);
  overflow: auto;
}

.list::-webkit-scrollbar {
  display: none;
}
.board-card::v-deep .card-body {
  padding: 0px;
  padding-bottom: 20px;
}
</style>
