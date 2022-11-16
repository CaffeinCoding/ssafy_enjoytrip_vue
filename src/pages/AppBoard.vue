<template>
  <div>
    <div class="page-header clear-filter">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBoard",
};
</script>

<style scoped>
.page-header {
  background-color: #eeeeee;
}
</style>
