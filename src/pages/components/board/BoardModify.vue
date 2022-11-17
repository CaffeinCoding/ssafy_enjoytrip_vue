<template>
  <div class="row">
    <div class="col-md-15 ml-auto col-xl-15 mr-auto">
      <card>
        <div class="regist mt-3 mb-5">
          <div class="regist_form">
            <h4 class="modify-title mb-4">글수정</h4>
            <div class="regist-title">
              <label for="userid" class="modify-title ml-3">작성자</label>

              <fg-input
                placeholder="작성자"
                id="userid"
                v-model="userid"
                ref="userid"
              ></fg-input>
            </div>
            <div class="regist-title">
              <label for="subject" class="modify-title ml-3">제목</label>

              <fg-input
                placeholder="제목"
                id="subject"
                v-model="subject"
                ref="subject"
              ></fg-input>
            </div>
            <div class="regist-title ml-3">
              <label for="content" class="modify-title">내용</label>
              <br />
              <div class="textarea-container">
                <textarea
                  id="content"
                  v-model="content"
                  class="form-control"
                  name="name"
                  rows="100"
                  cols="80"
                  placeholder="내용"
                ></textarea>
              </div>
            </div>
            <br />
            <div class="input-group ml-3">
              <input
                type="file"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
            </div>
          </div>
        </div>
      </card>
      <n-button type="primary" round @click="checkValue" class="btn-regist mr-3"
        >수정</n-button
      >
      <n-button type="primary" round @click="moveList" class="btn-list ml-3"
        >목록</n-button
      >
    </div>
  </div>
</template>

<script>
// import http from "@/util/http-common";
import { Button, FormGroupInput, Card, Tabs, TabPane } from "@/components";

export default {
  name: "BoardModify",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  data() {
    return {
      article: Object,
    };
  },
  created() {
    // 비동기
    // TODO : 글번호에 해당하는 글정보 얻기.
    // http.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
    //   this.article = data;
    // });
    this.article = {
      articleno: 10,
      userid: "ssafy",
      subject: "안녕하세요",
      content: "안녕하세요!!!!",
      hit: 10,
      regtime: "2022-11-08 17:03:15",
    };
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    checkValue() {
      // 사용자 입력값 체크하기
      // 작성자아이디, 제목, 내용이 없을 경우 각 항목에 맞는 메세지를 출력
      let err = true;
      let msg = "";
      !this.article.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.modifyArticle();
    },
    modifyArticle() {
      console.log("글수정 하러가자!!!!");
      // 비동기
      // TODO : 글번호에 해당하는 글정보 수정.
      //   http.put("/board", this.article).then(({ data }) => {
      //     let msg = "수정 처리 중 문제 발생!!!";
      //     if (data === "success") msg = "수정 성공!!!";
      //     alert(msg);
      //     this.moveList();
      //   });
    },

    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style>
.modify-title {
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
</style>
