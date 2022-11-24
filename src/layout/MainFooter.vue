<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <div class="copyright">
        Contact Us.
        <a href="https://github.com/rlooo" target="_blank" rel="noopener">정은영 </a>
        <a href="https://github.com/too519" target="_blank" rel="noopener">황진태 </a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
