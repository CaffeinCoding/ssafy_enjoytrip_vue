<template>
  <div
    class="section section-signup"
    :style="`background-image: url('img/bg11.jpg');
      background-size: cover;
      background-position: top center;
      min-height: ${windowHeight}px;`"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">회원가입</h3>
            <div class="social-line">
              <div class="logo-container mt-4"></div>
            </div>
          </template>
          <template>
            <fg-input
              class="no-border"
              placeholder="ID"
              addon-left-icon="now-ui-icons users_circle-08"
              v-model="userId"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Name"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="userName"
            >
            </fg-input>
            <fg-input
              class="no-border"
              placeholder="Password"
              addon-left-icon="now-ui-icons text_caps-small"
              v-model="userPw"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Email"
              addon-left-icon="now-ui-icons ui-1_email-85"
              v-model="email"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Age"
              addon-left-icon="now-ui-icons ui-1_email-85"
              v-model="userAge"
            >
            </fg-input>

            <div class="filebox">
              <label for="inputGroupFile04"
                ><i class="now-ui-icons business_badge mr-2 ml-2"></i> 프로필
                사진 업로드</label
              >
              <input
                type="file"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
            </div>
          </template>
          <div class="card-footer text-center">
            <div class="row mx-1">
              <a
                class="col btn btn-neutral btn-round btn-lg btn-block"
                @click="registUser"
                >가입하기</a
              >
              <div
                class="col-2 ml-2 btn btn-icon btn-round btn-neutral"
                id="btn-kakao-background"
              >
                <div id="btn-kakao">
                  <img v-lazy="'img/kakaotalk_logo_icon.png'" alt="" />
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div class="col text-center">
        <router-link
          to="/user/login"
          class="btn btn-simple btn-round btn-white btn-lg"
        >
          View Login Page
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button } from "@/components";
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  data() {
    return {
      windowHeight: window.innerHeight - 69,

      userId: "",
      userName: "",
      userPw: "",
      userAge: "",
      email: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    ...mapActions(userStore, ["registUser"]),
    onResize() {
      this.windowHeight = window.innerHeight - 69;
    },
    registUser() {
      const user = {
        userId: this.userId,
        userName: this.userName,
        userPw: this.userPw,
        userAge: this.userAge,
        email: this.email,
      };
      console.log(user.userId + " " + user.userName);

      this.registUser(this.user);

      alert("가입되었습니다.");

      this.$router.push({ name: "login" });
    },
  },
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
};
</script>
<style scoped>
#btn-kakao {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#btn-kakao-background {
  min-height: 50px;
  min-width: 50px;
  max-height: 50px;
  max-width: 50px;
  background-color: rgba(255, 255, 255, 0.1);
  /* margin-bottom: 40px; */
}
.card-signup::v-deep .card-header {
  padding: 24px;
}
.filebox label {
  display: inline-block;
  padding: 0.5em 0.75em;
  color: white;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2em;
  position: relative;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  margin-bottom: 0;
}

.filebox input[type="file"] {
  /* 파일 필드 숨기기 */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.emailForm {
  float: left;
}
</style>
