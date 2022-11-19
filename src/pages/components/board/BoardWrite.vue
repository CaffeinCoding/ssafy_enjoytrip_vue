<template>
  <div class="row">
    <div class="col-md-15 ml-auto col-xl-15 mr-auto">
      <card>
        <div class="regist mt-3 mb-5">
          <div class="regist_form">
            <h4 class="category mb-4">글쓰기</h4>
            <div class="regist-title">
              <label for="userid" class="category ml-3">작성자</label>

              <fg-input placeholder="작성자" id="userid" v-model="userid" ref="userid"></fg-input>
            </div>
            <div class="regist-title">
              <label for="subject" class="category ml-3">제목</label>

              <fg-input placeholder="제목" id="subject" v-model="subject" ref="subject"></fg-input>
            </div>
            <div class="regist-title ml-3">
              <label for="content" class="category">내용</label>
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

            <div class="regist-title">
              <label for="subject" class="category ml-3">이미지</label>
              <div class="input-group">
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
        </div>
      </card>
      <n-button type="primary" round @click="checkValue" class="btn-regist mr-3">등록</n-button>
      <n-button type="primary" round @click="moveList" class="btn-list ml-3">목록</n-button>
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
      !this.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err &&
        !this.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

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
  padding-right: 20px;
  margin-bottom: 20px;
}
</style>
