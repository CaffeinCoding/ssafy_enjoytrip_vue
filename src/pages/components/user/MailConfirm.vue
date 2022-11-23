<template>
  <div class="row">
    <div class="col-md-15 ml-auto col-xl-15 mr-auto">
      <p id="main-title">EnjoyTrip</p>
      <card>
        <div class="container">
          <div class="section section-javascript" id="javascriptComponents">
            <div>
              <h4 class="category mb-2">비밀번호 찾기</h4>
              <p>가입한 이메일을 입력해주세요.</p>
              <div class="title">
                <label for="email" class="category ml-3">이메일</label>
                <fg-input placeholder="이메일" id="email" v-model="email" ref="email"></fg-input>
              </div>
              <n-button type="primary" round class="btn mb-5" @click="send()"
                >인증번호 전송</n-button
              >
              <div class="title">
                <label for="num" class="category ml-3">인증번호</label>
                <fg-input placeholder="인증번호" id="num" v-model="input" ref="input"></fg-input>
              </div>
              <div class="button-container" id="modals">
                <div class="col-md-15 modal-buttons">
                  <n-button type="primary" round @click="chkEmailConfirm" class="btn"
                    >인증번호 확인</n-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </card>
    </div>
    <!-- Classic Modal -->
    <modal :show.sync="modals.classic" headerClasses="justify-content-center" class="confirm mt-5">
      <h4 slot="header" class="title title-up">비밀번호 찾기</h4>
      <p>해당 계정의 비밀번호는 다음과 같습니다.</p>
      <p>{{ password }}</p>
      <template slot="footer">
        <router-link to="/login">
          <n-button>확인</n-button>
        </router-link>
      </template>
    </modal>
  </div>
</template>
<script>
import { Button, FormGroupInput, Card, Tabs, TabPane, Modal } from "@/components";
import { mapActions, mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "mail-confirm",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    Modal,
  },
  computed: { ...mapState(userStore, ["code", "password"]) },
  data() {
    return {
      email: "",
      input: "",
      modals: {
        classic: false,
      },
    };
  },
  methods: {
    ...mapActions(userStore, ["sendMail", "finePw"]),
    async send() {
      let err = true;
      !this.email && ((msg = "이메일을 입력해주세요"), (err = false));
      if (!err) alert(msg);
      else {
        await this.sendMail(this.email);
        console.log(this.password);
        alert("해당 이메일로 인증번호 발송이 완료되었습니다.");
      }
    },
    async chkEmailConfirm() {
      if (this.input == this.code) {
        await this.finePw(this.email);
        this.modals.classic = true;
      } else {
        alert("인증번호가 틀렸습니다. 다시 입력해주세요.");
      }
    },
  },
  created() {},
};
</script>
<style scoped>
.category {
  text-transform: capitalize;
  font-weight: 700;
  color: #9a9a9a;
}
.title {
  text-transform: capitalize;
  font-weight: bold;
  color: #9a9a9a;
  text-align: center;
}
textarea.form-control {
  min-height: 200px;
}
.title {
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
}
.container {
  padding-bottom: 20px;
  height: 550px;
  width: 500px;
}
.btn {
  text-align: center;
}
#javascriptComponents {
  padding-top: 25px;
}
.row {
  color: black;
}
#main-title {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
}
.confirm::v-deep .modal-footer {
  justify-content: center;
}
</style>
<style lang="scss">
#javascriptComponents {
  .modal-buttons {
    .btn + .btn {
      margin-left: 3px;
    }
  }
}
</style>
