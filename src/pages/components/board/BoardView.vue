<template>
  <!-- <div class="regist">
    <h1 class="underline">SSAFY 글 상세보기</h1>
    <div class="regist_form">
      <label> 글번호</label>
      <div class="view">{{ article.articleno }}</div>
      <label> 글제목</label>
      <div class="view">{{ article.subject }}</div>
      <label> 작성자</label>
      <div class="view">{{ article.userid }}</div>
      <label> 조회수</label>
      <div class="view">{{ article.hit }}</div>
      <label> 작성시간</label>
      <div class="view">{{ article.regtime }}</div>
      <label> 내용</label>
      <div class="view">{{ article.content }}</div>

      <div style="padding-top: 15px">
        <router-link
          :to="{
            name: 'boardmodify',
            params: { articleno: article.articleno },
          }"
          class="btn"
          >수정</router-link
        >
        <router-link
          :to="{
            name: 'boarddelete',
            params: { articleno: article.articleno },
          }"
          class="btn"
          >삭제</router-link
        >
        <router-link :to="{ name: 'boardlist' }" class="btn">목록</router-link>
      </div>
    </div>
  </div> -->

  <div>
    <div class="row">
      <div class="col-md-10 ml-auto col-xl-6 mr-auto">
        <p class="category">Tabs with Icons on Card</p>
        <!-- Nav tabs -->
        <card>
          <tabs
            slot="raw-content"
            tab-content-classes="tab-content-padding text-center"
          >
            <tab-pane>
              <template slot="label">
                <i class="now-ui-icons objects_umbrella-13"></i> 사진
              </template>
              <img src="@/assets/bg1.jpg" />
            </tab-pane>
            <tab-pane>
              <template slot="label">
                <i class="now-ui-icons shopping_cart-simple"></i> 위치
              </template>
              <p>
                I will be the leader of a company that ends up being worth
                billions of dollars, because I got the answers. I understand
                culture. I am the nucleus. I think that’s a responsibility that
                I have, to push possibilities, to show people, this is the level
                that things could be at. I think that’s a responsibility that I
                have, to push possibilities, to show people, this is the level
                that things could be at.
              </p>
            </tab-pane>
          </tabs>
        </card>
      </div>
      <div class="col-md-10 ml-auto col-xl-6 mr-auto">
        <p class="category">Tabs with Background on Card</p>
        <!-- Tabs with Background on Card -->
        <div class="card">
          <div class="view">
            <div class="regist_form">
              <h3>{{ article.subject }}</h3>

              <div class="post-info">
                작성자 {{ article.userid }} | 조회수{{ article.hit }} | 작성시간
                {{ article.regtime }}
              </div>

              <hr size="5" />

              <div class="view">{{ article.content }}</div>
            </div>
          </div>
        </div>
        <!-- End Tabs on plain Card -->
      </div>
    </div>
    <n-button type="primary" round class="btn-modify mr-3">수정</n-button>
    <n-button type="primary" round class="btn-delete">삭제</n-button>
    <n-button type="primary" round @click="moveList" class="btn-list ml-3"
      >목록</n-button
    >
  </div>
</template>

<script>
// import http from "@/util/http-common";
import { Button, FormGroupInput, Card, Tabs, TabPane } from "@/components";

export default {
  name: "BoardView",
  data() {
    return {
      article: Object,
    };
  },
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    // http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
    //   this.article = data;
    // });
    this.article = {
      articleno: 10,
      userid: "안효인",
      subject: "안녕하세요. 글제목입니다",
      content: "안녕하세요!!!! 내용입니다.",
      hit: 10,
      regtime: "2022-11-08 17:03:15",
    };
  },
  methods: {
    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style scoped>
.category {
  text-transform: capitalize;
  font-weight: 700;
  color: #9a9a9a;
}
.title {
  text-transform: capitalize;
  font-weight: bold;
  color: #9a9a9a;
}
textarea.form-control {
  min-height: 200px;
}
.regist-title {
  text-align: left;
  padding-left: 20px;
  margin-bottom: 20px;
}
.form-control {
  background-color: white;
}
.view {
  padding-top: 25px;
  padding-bottom: 20px;
  color: black;
}
.post-info {
  color: grey;
}
</style>
