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
                <fg-input
                  placeholder="이메일"
                  id="email"
                  v-model="email"
                  ref="email"
                ></fg-input>
              </div>
              <n-button type="primary" round class="btn mb-5"
                >인증번호 전송</n-button
              >
              <div class="title">
                <label for="num" class="category ml-3">인증번호</label>
                <fg-input
                  placeholder="인증번호"
                  id="num"
                  v-model="num"
                  ref="num"
                ></fg-input>
              </div>
              <div class="button-container" id="modals">
                <div class="col-md-15 modal-buttons">
                  <n-button type="primary" round @click="checkValue" class="btn"
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
    <modal
      :show.sync="modals.classic"
      headerClasses="justify-content-center"
      class="mt-5"
    >
      <h4 slot="header" class="title title-up">비밀번호 찾기</h4>
      <p>해당 계정의 비밀번호는 다음과 같습니다.</p>
      <p>1234</p>
      <template slot="footer">
        <n-button>Nice Button</n-button>
        <n-button type="danger" @click.native="modals.classic = false"
          >Close</n-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import {
  Button,
  FormGroupInput,
  Card,
  Tabs,
  TabPane,
  Modal,
} from "@/components";

export default {
  name: "forgot-password",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    Modal,
  },
  data() {
    return {
      user: Object,
      modals: {
        classic: false,
      },
    };
  },
  methods: {
    // 입력값 체크하기 - 체크가 성공하면 registArticle 호출
    checkValue() {
      this.modals.classic = true;
      this.modifyArticle();
    },
    modifyArticle() {
      console.log("글수정 하러가자!!!!");
      // 비동기
      // TODO : 글번호에 해당하는 글정보 수정.
      //   http.put("/board", this.article).then(({ data }) => {
      //     let msg = "수정 처리 중 문제 발생!!!";
      //     if (data === "success") msg = "수정 성공!!!";
      //     alert(msg);
      //     this.moveList();
      //   });
    },

    moveList() {
      console.log("글목록 보러가자!!!");
      this.$router.push({ name: "boardlist" });
    },
  },
  created() {
    this.user = {
      user_id: "ssafy",
      user_name: "김싸피",
      user_pw: "1234",
      user_age: 25,
      email_id: "ssafy",
      email_domain: "@ssafy.com",
      join_date: "",
      profile_img: "",
      is_manager: 0,
    };
  },
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
