<template>
  <tr>
    <td>{{ article.articleNo }}</td>
    <td>
      <router-link :to="link">
        {{ article.subject }}
      </router-link>
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.regtime }}</td>
  </tr>
</template>

<script>
export default {
  name: "BoardLayoutItem",
  props: {
    article: Object,
    link: String,
  },
};
</script>

<style></style>
