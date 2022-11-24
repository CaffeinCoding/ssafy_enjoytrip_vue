<template>
  <div class="row mt-5">
    <card-list-item
      v-for="(article, index) in articles"
      :key="index"
      :article="article"
    />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

const boardStore = "boardStore";
import CardListItem from "@/pages/components/widget/CardWidget";

export default {
  name: "CardList",
  components: {
    CardListItem,
  },
  async created() {
    this.CLEAR_ARTICLE_LIST();
    await this.getArticleListOrderByHit();
    console.log(this.articles);
  },
  computed: {
    ...mapState(boardStore, ["articles"]),
  },
  methods: {
    ...mapActions(boardStore, ["getArticleListOrderByHit"]),
    ...mapMutations(boardStore, ["CLEAR_ARTICLE_LIST"]),
  },
};
</script>
<style scoped>
.row {
  display: flex;
  justify-content: space-around;
}
</style>
