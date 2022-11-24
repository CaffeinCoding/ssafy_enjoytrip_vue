<template>
  <div class="container mb-5 mt-5">
    <a
      class="weatherwidget-io mt-5 mb-5"
      href="https://forecast7.com/en/35d91127d77/south-korea/"
      data-label_1="오늘의 날씨"
      data-theme="pure"
      >오늘의 날씨</a
    >
  </div>
</template>

<script>
export default {
  name: "MainWeather",
  data() {
    return {};
  },
  mounted() {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "https://weatherwidget.io/js/widget.min.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "weatherwidget-io-js");
  },
};
</script>

<style></style>
