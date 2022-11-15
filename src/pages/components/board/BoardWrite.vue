<template>
  <div class="regist">
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
  </div>
</template>

<script>
// import http from "@/util/http-common";
import { Button, FormGroupInput } from "@/components";

export default {
  name: "BoardWrite",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
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
