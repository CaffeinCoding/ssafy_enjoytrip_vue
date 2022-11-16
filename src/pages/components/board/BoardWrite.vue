<template>
  <div class="section section-tabs">
    <div class="container">
      <!-- <div class="regist">
        <h1 class="underline">SSAFY 게시글 작성</h1>
        <div class="regist_form">
          <label for="userid">작성자</label>

          <fg-input
            placeholder="작성자"
            id="userid"
            v-model="userid"
            ref="userid"
          ></fg-input>
          <label for="subject">제목</label>
          <fg-input
            placeholder="제목"
            id="subject"
            v-model="subject"
            ref="subject"
          ></fg-input>
          <label for="content">내용</label>
          <br />
          <div class="textarea-container">
            <textarea
              id="content"
              v-model="content"
              class="form-control"
              name="name"
              rows="4"
              cols="80"
              placeholder="내용"
            ></textarea>
          </div>
          <br />
          <n-button type="primary" round @click="checkValue">등록</n-button>
          <n-button type="primary" round @click="moveList">목록</n-button>
        </div>
      </div> -->

      <div class="title">
        <h4>여행공유게시판</h4>
      </div>
      <div class="row">
        <div class="col-md-10 ml-auto col-xl-6 mr-auto">
          <p class="category">글쓰기</p>
          <!-- Nav tabs -->
          <card>
            <tabs
              slot="raw-content"
              tab-content-classes="tab-content-padding text-center"
            >
              <tab-pane>
                <template slot="label">
                  <i class="now-ui-icons objects_umbrella-13"></i> Home
                </template>
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
              </tab-pane>
              <tab-pane>
                <template slot="label">
                  <i class="now-ui-icons shopping_cart-simple"></i> Profile
                </template>
                <p>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers. I understand
                  culture. I am the nucleus. I think that’s a responsibility
                  that I have, to push possibilities, to show people, this is
                  the level that things could be at. I think that’s a
                  responsibility that I have, to push possibilities, to show
                  people, this is the level that things could be at.
                </p>
              </tab-pane>
              <tab-pane>
                <template slot="label">
                  <i class="now-ui-icons shopping_shop"></i> Messages
                </template>
                <p>
                  I think that’s a responsibility that I have, to push
                  possibilities, to show people, this is the level that things
                  could be at. So when you get something that has the name Kanye
                  West on it, it’s supposed to be pushing the furthest
                  possibilities. I will be the leader of a company that ends up
                  being worth billions of dollars, because I got the answers. I
                  understand culture. I am the nucleus.
                </p>
              </tab-pane>
              <tab-pane>
                <template slot="label">
                  <i class="now-ui-icons ui-2_settings-90"></i> Settings
                </template>
                <p>
                  "I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers. I understand
                  culture. I am the nucleus. I think that’s a responsibility
                  that I have, to push possibilities, to show people, this is
                  the level that things could be at."
                </p>
              </tab-pane>
            </tabs>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import http from "@/util/http-common";
import { Button, FormGroupInput, Card, Tabs, TabPane } from "@/components";

export default {
  name: "BoardWrite",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  data() {
    return {
      userid: null,
      subject: null,
      content: null,
    };
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.registArticle();
    },
    registArticle() {
      // 비동기
      // TODO : 글번호에 해당하는 글정보 등록.
      console.log("글작성 하러가자!!!!");
      let article = {
        userid: this.userid,
        subject: this.subject,
        content: this.content,
      };
      http.post("/board", article).then(({ data }) => {
        let msg = "등록 처리 중 문제 발생!!!";
        if (data === "success") msg = "등록 성공!!!";
        alert(msg);
        this.moveList();
      });
    },

    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
