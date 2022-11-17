<template>
  <div class="section" style="min-height: 900px">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTour",
};
</script>

<style scoped>
.section {
  padding-bottom: 0;
}
</style>
