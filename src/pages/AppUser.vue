<template>
  <div>
    <div class="page-header clear-filter">
      <div class="container">
        <router-view></router-view>
        <user-certification></user-certification>
        <user-confirm-password></user-confirm-password>
        <user-forgot-password></user-forgot-password>
      </div>
    </div>
  </div>
</template>

<script>
import UserCertification from "./components/user/UserCertification.vue";
import UserConfirmPassword from "./components/user/UserConfirmPassword.vue";
import UserForgotPassword from "./components/user/UserForgotPassword.vue";

export default {
  name: "AppUser",
  components: {
    UserCertification,
    UserConfirmPassword,
    UserForgotPassword,
  },
};
</script>

<style scoped>
.page-header {
  background-color: #eeeeee;
}
</style>
