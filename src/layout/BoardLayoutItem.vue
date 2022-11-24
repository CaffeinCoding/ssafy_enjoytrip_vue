<template>
  <tr>
    <td>{{ articleNo }}</td>
    <td>
      <div @click="moveView">
        {{ title }}
      </div>
    </td>
    <td>{{ userId }}</td>
    <td>{{ hit }}</td>
    <td>{{ registDate }}</td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions("tourStore", ["setPlan"]),
    moveView() {
      this.setPlan(this.article);
      this.$router.push(this.link);
    },
  },
};
</script>

<style></style>
