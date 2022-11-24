<template>
  <div>
    <div v-if="articles.length">
      <table class="table table-hover table-bordered" id="article-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 50%" />
          <col style="width: 15%" />
          <col style="width: 10%" />
          <col style="width: 15%" />
        </colgroup>
        <thead class="thead-light">
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
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
            :articleNo="index + 1"
            :title="article.title"
            :userId="article.userId"
            :hit="article.hit == null ? 0 : article.hit"
            :registDate="article.registerDate.split(' ')[0]"
            :link="`${baseLink}/${article.articleNo}`"
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

<style scoped>
#article-list {
  text-align: center;
  border-left: hidden;
  border-right: hidden;
}
.thead-light th {
  border-bottom-color: gray;
}
</style>
