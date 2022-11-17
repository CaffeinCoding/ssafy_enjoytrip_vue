<template>
  <div class="page-header clear-filter">
    <div class="container">
      <router-view class="tour-router-view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTour",
};
</script>

<style scoped>
.page-header {
  min-height: 900px;
}
.page-header > .container {
  padding-bottom: 0;
  padding-top: 8vh;
}
.tour-router-view {
  color: black;
}
</style>
