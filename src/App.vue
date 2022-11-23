<template>
  <div id="app">
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
  </div>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  created() {
    this.CLEAR_SAVE_DRAWER();
  },
  methods: {
    ...mapMutations("tourStore", ["CLEAR_SAVE_DRAWER"]),
  },
};
</script>
