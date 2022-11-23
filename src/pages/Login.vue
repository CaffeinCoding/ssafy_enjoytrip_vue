<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image: url('img/login.jpg')"></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain class="login-card">
            <div class="title" id="login-title">
              <h2>로그인</h2>
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="ID"
            >
            </fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons text_caps-small"
              placeholder="Password"
            >
            </fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <div class="row mx-1">
                  <a href="#pablo" class="col btn btn-primary btn-round btn-lg btn-block"
                    >Get Started</a
                  >
                  <div class="col-2 ml-2 btn btn-icon btn-round" id="btn-kakao-background">
                    <div id="btn-kakao">
                      <img v-lazy="'img/kakaotalk_logo_icon.png'" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="pull-left mt-1">
                <router-link to="/signup">
                  <h6>
                    <a class="link footer-link">Create Account</a>
                  </h6>
                </router-link>
              </div>
              <div class="pull-right mt-1">
                <router-link to="/user/mailconfirm">
                  <h6>
                    <a class="link footer-link">Forgot your password</a>
                  </h6>
                </router-link>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
};
</script>
<style scoped>
#login-title {
  margin-top: 40px;
  margin-bottom: 60px;
}
.login-card::v-deep .card-body {
  padding: 0px;
}
#btn-kakao {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#btn-kakao-background {
  background-color: rgba(255, 255, 255, 0.1);
  min-height: 50px;
  min-width: 50px;
  max-height: 50px;
  max-width: 50px;
  /* margin-bottom: 40px; */
}
</style>
