<template>
  <div>
    <div v-if="articles.length">
      <table id="article-list">
        <colgroup>
          <col style="width: 5%" />
          <col style="width: 65%" />
          <col style="width: 10%" />
          <col style="width: 5%" />
          <col style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <board-layout-item
            v-for="article in articles"
            :key="article.articleno"
            :article="article"
            :link="`${baseLink}/${article.articleno}`"
          ></board-layout-item>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-else>게시글이 없습니다.</div>
  </div>
</template>

<script>
import BoardLayoutItem from "@/layout/BoardLayoutItem";
export default {
  name: "BoardLayout",
  components: {
    BoardLayoutItem,
  },
  props: {
    articles: Array,
    baseLink: String,
  },
};
</script>

<style></style>
