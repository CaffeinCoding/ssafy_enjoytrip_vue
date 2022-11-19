<template>
  <div>
    <div class="page-header clear-filter" style="min-height: 900px">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppUser",
};
</script>

<style scoped>
.section {
  padding-bottom: 0;
}
.page-header > .container {
  padding-bottom: 0;
}
</style>
