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
              <template slot="label">
                <i class="now-ui-icons media-1_album"></i> 사진
              </template>
              <div class="tab-content">
                <img
                  :src="
                    'http://localhost:1010/upload/file/' +
                    article.fileInfos[0].saveFolder +
                    '/' +
                    article.fileInfos[0].saveFile
                  "
                />
              </div>
            </tab-pane>
            <tab-pane>
              <template slot="label">
                <i class="now-ui-icons objects_globe"></i> 위치
              </template>
              <div class="tab-content">
                <p>지도가 들어갈 자리</p>
              </div>
            </tab-pane>
          </tabs>
        </card>
      </div>
      <div class="col-md-10 ml-auto col-xl-6 mr-auto mt-3">
        <div class="card">
          <div class="view">
            <h3>{{ article.title }}</h3>

            <div class="post-info">
              작성자 {{ article.userId }} | 조회수 {{ article.hit }} | 작성시간
              {{ article.registDate }}
            </div>

            <hr size="5" />

            {{ article.content }}
          </div>
        </div>
      </div>
    </div>

    <router-link
      :to="{
        name: 'boardmodify',
        params: { articleNo: article.articleNo },
      }"
      ><n-button type="primary" round class="btn-modify mr-3 mt-4"
        >수정</n-button
      ></router-link
    >

    <n-button
      type="primary"
      round
      @click="removeArticle"
      class="btn-delete mt-4"
      >삭제</n-button
    >
    <n-button type="primary" round @click="moveList" class="ml-3 mt-4"
      >목록</n-button
    >
  </div>
</template>

<script>
import { Button, FormGroupInput, Card, Tabs, TabPane } from "@/components";
import { mapState, mapActions, mapMutations } from "vuex";

const boardStore = "boardStore";

export default {
  name: "BoardView",
  data() {
    return {
      articleNo: null,
    };
  },
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  async created() {},
  computed: { ...mapState(boardStore, ["article"]) },

  methods: {
    ...mapActions(boardStore, ["getArticle", "deleteArticle"]),
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    removeArticle() {
      this.deleteArticle(this.article.articleNo);
      alert("삭제되었습니다.");
      this.moveList();
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
  min-height: 633px;
}
.post-info {
  color: grey;
}
.tab-content {
  height: 473px;
  color: black;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.tab-content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.tabs-content::v-deep .nav {
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
</style>
