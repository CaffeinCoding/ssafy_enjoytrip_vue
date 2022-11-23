<template>
  <div class="row">
    <div class="col-md-15 ml-auto col-xl-15 mr-auto">
      <card>
        <div class="regist mt-3 mb-5">
          <div class="regist_form">
            <h4 class="category mb-4">글수정</h4>
            <div class="regist-title">
              <label for="userId" class="category ml-3">작성자</label>
              <fg-input id="userId" ref="userId" v-model="userId" readonly></fg-input>
            </div>
            <div class="regist-title">
              <label for="title" class="category ml-3">제목</label>
              <fg-input id="title" v-model="title" ref="title"></fg-input>
            </div>
            <div class="regist-title ml-3">
              <label for="content" class="category">내용</label>
              <br />
              <div class="textarea-container">
                <textarea
                  id="content"
                  class="form-control"
                  name="name"
                  rows="100"
                  cols="80"
                  v-model="content"
                ></textarea>
              </div>
            </div>

            <div class="regist-title">
              <label for="upfile" class="category ml-3">이미지</label>
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  v-on:change="fileSelect()"
                  ref="imagefile"
                />
              </div>
            </div>
          </div>
        </div>
      </card>
      <n-button type="primary" round @click="checkValue" class="btn-regist mr-3">완료</n-button>
      <n-button type="primary" round @click="moveList" class="btn-list ml-3">목록</n-button>
    </div>
  </div>
</template>

<script>
import { Button, FormGroupInput, Card, Tabs, TabPane } from "@/components";
import { mapActions, mapState } from "vuex";

const boardStore = "boardStore";

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
      articleNo: null,
      userId: "",
      title: "",
      content: "",
      upfile: "",
    };
  },
  computed: { ...mapState(boardStore, ["article"]) },
  created() {
    this.articleNo = this.article.articleNo;
    this.userId = this.article.userId;
    this.title = this.article.title;
    this.content = this.article.content;
    this.upfile = this.article.upfile;
  },
  methods: {
    ...mapActions(boardStore, ["modifyArticle"]),

    checkValue() {
      let err = true;
      let msg = "";
      !this.userId && ((msg = "작성자를 입력해주세요"), (err = false));
      err && !this.title && ((msg = "제목을 입력해주세요"), (err = false));
      err && !this.content && ((msg = "내용을 입력해주세요"), (err = false));
      err && !this.upfile && ((msg = "이미지를 등록해주세요."), (err = false));

      if (!err) alert(msg);
      else {
        alert("수정되었습니다.");
        let tempArticle = {
          articleNo: this.articleNo,
          userId: this.userId,
          title: this.title,
          content: this.content,
          upfile: this.upfile,
          hit: this.article.hit,
          registDate: this.article.registDate,
          isNotice: this.article.isNotice,
        };
        this.modifyArticle(tempArticle);

        this.$router.push({ name: "boardview" });
      }
    },

    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    fileSelect() {
      this.upfile = this.$refs.imagefile.files[0];
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
