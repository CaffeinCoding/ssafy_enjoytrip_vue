<template>
  <div>
    <div>
      <div style="text-align: right">
        <n-button type="primary" round @click="moveWrite">글작성</n-button>
      </div>
    </div>
    <div>
      <ul
        ref="notification-list"
        class="list"
        @scroll="handleNotificationListScroll"
      >
        <masonry
          :cols="{ default: 3, 1000: 3, 700: 2, 400: 1 }"
          :gutter="{ default: '15px', 700: '5px' }"
          class="card-style"
        >
          <div
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
          >
            <div @click="moveView(article.articleNo)">
              <card class="board-card">
                <img
                  :src="
                    'http://localhost:1010/upload/file/' +
                    article.fileInfos[0].saveFolder +
                    '/' +
                    article.fileInfos[0].saveFile
                  "
                />
                <h4 class="card-title">{{ article.title }}</h4>
                <p class="card-text">{{ article.content }}</p>
              </card>
            </div>
          </div>
        </masonry>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { Button, Card } from "@/components";

export default {
  name: "BoardList",
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  computed: {
    ...mapState(["articles"]),
  },
  async created() {
    console.log("create");
    this.CLEAR_ARTICLE_LIST();
    await this.getArticleList();
  },

  methods: {
    ...mapActions(["getArticleList", "getArticle"]),
    ...mapMutations(["CLEAR_ARTICLE_LIST"]),
    async moveView(articleNo) {
      await this.getArticle(articleNo);
      this.$router.push({
        name: "boardview",
        params: { articleNo: articleNo },
      });
    },
    moveWrite() {
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
.card {
  color: black;
}
</style>
