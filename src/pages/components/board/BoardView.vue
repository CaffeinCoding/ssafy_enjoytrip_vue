<template>
  <div>
    <div class="row">
      <div class="col-md-10 ml-auto col-xl-6 mr-auto mt-3">
        <!-- Nav tabs -->
        <card>
          <tabs
            slot="raw-content"
            tab-content-classes="tab-content-padding text-center"
            class="tabs-content"
          >
            <tab-pane>
              <template slot="label"> <i class="now-ui-icons media-1_album"></i> 사진 </template>
              <div class="tab-content">
                <img src="@/assets/bg3.jpg" />
              </div>
            </tab-pane>
            <tab-pane>
              <template slot="label"> <i class="now-ui-icons objects_globe"></i> 위치 </template>
              <div class="tab-content">
                <p>지도가 들어갈 자리</p>
              </div>
            </tab-pane>
          </tabs>
        </card>
      </div>
      <div class="col-md-10 ml-auto col-xl-6 mr-auto mt-3">
        <!-- Tabs with Background on Card -->
        <div class="card">
          <div class="view">
            <h3>{{ article.subject }}</h3>

            <div class="post-info">
              작성자 {{ article.userid }} | 조회수{{ article.hit }} | 작성시간
              {{ article.regtime }}
            </div>

            <hr size="5" />

            <div class="view">{{ article.content }}</div>
          </div>
        </div>
        <!-- End Tabs on plain Card -->
      </div>
    </div>

    <router-link
      :to="{
        name: 'boardmodify',
        params: { articleno: article.articleno },
      }"
      ><n-button type="primary" round class="btn-modify mr-3 mt-4">수정</n-button></router-link
    >

    <n-button type="primary" round class="btn-delete mt-4">삭제</n-button>
    <n-button type="primary" round @click="moveList" class="btn-list ml-3 mt-4">목록</n-button>
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
  padding-top: 50px;
  padding-bottom: 20px;
  color: black;
  height: 614px;
}
.post-info {
  color: grey;
}
.tab-content {
  height: 473px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tabs-content::v-deep .nav {
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
</style>
