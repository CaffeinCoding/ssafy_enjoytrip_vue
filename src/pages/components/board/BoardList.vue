<template>
  <div>
    <h1 class="underline">SSAFY 게시글 목록</h1>
    <div style="text-align: right">
      <n-button type="primary" round @click="moveWrite">글작성</n-button>
    </div>
    <board-layout :articles="articles" :baseLink="`/board/view`"></board-layout>
  </div>
</template>

<script>
// import http from "@/util/http-common";
import BoardLayout from "@/layout/BoardLayout";
import { Button } from "@/components";
export default {
  name: "BoardList",
  components: {
    [Button.name]: Button,
    BoardLayout,
  },
  data() {
    return {
      articles: [],
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
  },
};
</script>

<style></style>
