<template>
  <tr>
    <td>{{ articleNo }}</td>
    <td>
      <router-link :to="link">
        {{ title }}
      </router-link>
    </td>
    <td>{{ userId }}</td>
    <td>{{ hit }}</td>
    <td>{{ registDate }}</td>
  </tr>
</template>

<script>
export default {
  name: "BoardLayoutItem",
  props: {
    article: Object,
    articleNo: Number,
    title: String,
    userId: String,
    hit: Number,
    registDate: String,
    link: String,
  },
};
</script>

<style></style>
