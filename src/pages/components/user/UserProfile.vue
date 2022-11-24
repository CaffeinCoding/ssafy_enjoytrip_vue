<template>
  <div>
    <div
      class="page-header clear-filter"
      filter-color="orange"
      style="color: white"
    >
      <parallax
        class="page-header-image"
        style="background-image: url('img/bg5.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img :src="profileImage" alt="" />
        </div>
        <h3 class="title">{{ user.userName }}</h3>
        <p class="category">
          {{ user.userId }} | {{ user.email }}|
          {{ user.userAge }}
        </p>

        <div class="content">
          <div class="social-description">
            <h2>{{ articles.length }}</h2>
            <p>여행피드</p>
          </div>
          <div class="social-description">
            <h2>26</h2>
            <p>여행계획</p>
          </div>
          <div class="social-description">
            <h2>48</h2>
            <p>팔로워</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section section-javascript" id="javascriptComponents">
      <div class="container">
        <div class="button-container" id="modals">
          <div class="col-md-15 modal-buttons">
            <n-button
              class="btn btn-default btn-round btn-lg btn-icon"
              @click.native="modals.classic = true"
            >
              <i class="now-ui-icons ui-1_settings-gear-63"></i>
            </n-button>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="row">
          <tabs
            pills
            slot="raw-content"
            tab-content-classes="tab-content-padding text-center "
            class="tabs-content nav-align-center"
          >
            <tab-pane title="Feed">
              <p>여행피드</p>
              <div class="feed-content">
                <div class="col-md-10 ml-auto mr-auto mt-4">
                  <div class="row collections">
                    <masonry
                      :cols="{ default: 3, 1000: 3, 700: 2, 400: 1 }"
                      :gutter="{ default: '15px', 700: '5px' }"
                      class="card-style"
                    >
                      <div
                        v-for="(article, index) in articles"
                        :key="index"
                        :article="article"
                      >
                        <div @click="moveView(article.articleNo)">
                          <card class="board-card">
                            <img
                              :src="
                                'http://localhost:1010/upload/file/' +
                                article.fileInfos[0].saveFolder +
                                '/' +
                                article.fileInfos[0].saveFile
                              "
                            />
                            <h4 class="card-title">{{ article.title }}</h4>
                            <p class="card-text">{{ article.content }}</p>
                          </card>
                        </div>
                      </div>
                    </masonry>
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Plan" class="tab-panel-plan">
              <p>여행계획</p>
              <div class="col-md-10 ml-auto mr-auto mt-4">
                <board-layout
                  :articles="planList"
                  baseLink="/plan/view"
                ></board-layout>
              </div>
            </tab-pane>

            <tab-pane title="Follower">
              <p>팔로워</p>
              <div class="col-md-10 ml-auto mr-auto mt-4">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg3.jpg" alt="" class="img-raised" />
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                    <img src="img/bg6.jpg" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>
          </tabs>
        </div>
      </div>
    </div>
    <modal :show.sync="modals.classic" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">내 정보 수정</h4>
      <div class="regist mt-3 mb-5">
        <div class="regist_form">
          <div class="regist-title">
            <label for="userId" class="modify-category ml-3">이름</label>

            <fg-input
              placeholder="이름"
              id="userId"
              v-model="userName"
              ref="userId"
            ></fg-input>
          </div>

          <div class="regist-title">
            <label for="userAge" class="modify-category ml-3">나이</label>

            <fg-input
              placeholder="나이"
              id="userAge"
              v-model="userAge"
              ref="userAge"
            ></fg-input>
          </div>
          <div class="regist-title">
            <label for="password" class="modify-category ml-3">비밀번호</label>

            <fg-input
              placeholder="비밀번호"
              id="password"
              v-model="userPw"
              ref="password"
            ></fg-input>
          </div>
          <div class="regist-title">
            <label for="imagefile" class="modify-category ml-3"
              >프로필사진</label
            >
            <div class="input-group">
              <input
                type="file"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                v-on:change="fileSelect()"
                ref="imagefile"
              />
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div>
          <n-button @click="checkValue">수정</n-button>
          <n-button class="ml-3" @click="withdrawal">탈퇴</n-button>
        </div>
        <n-button type="danger" @click.native="modals.classic = false"
          >닫기</n-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import {
  Modal,
  Tabs,
  TabPane,
  Button,
  FormGroupInput,
  Card,
} from "@/components";
import BoardLayout from "@/layout/BoardLayout";

import { mapState, mapActions, mapMutations } from "vuex";
const userStore = "userStore";
const tourStore = "tourStore";
const boardStore = "boardStore";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    Modal,
    Tabs,
    TabPane,
    BoardLayout,
    [Card.name]: Card,
  },
  data() {
    return {
      userId: "",
      userName: "",
      userPw: "",
      userAge: "",
      upfile: "",
      email: "",
      profileImage: "",
      modals: {
        classic: false,
      },
    };
  },

  computed: {
    ...mapState(userStore, ["userInfo", "user"]),
    ...mapState(tourStore, ["planList"]),
    ...mapState(boardStore, ["articles"]),
  },
  async created() {
    await this.getUser(this.userInfo.userId);
    this.userId = this.user.userId;
    this.userName = this.user.userName;
    this.userPw = this.user.userPw;
    this.userAge = this.user.userAge;
    this.email = this.user.email;
    this.upfile = this.user.upfile;

    if (this.user.fileInfos[0]) {
      this.profileImage =
        "http://localhost:1010/upload/file/" +
        this.user.fileInfos[0].saveFolder +
        "/" +
        this.user.fileInfos[0].saveFile;
    } else {
      this.profileImage = require(`@/assets/default_img.jpg`);
    }

    this.CLEAR_PLAN_LIST();
    this.setUserPlanList(this.userId);
    await this.getArticleListById(this.userId);
  },

  methods: {
    ...mapActions(userStore, [
      "modifyUser",
      "getUser",
      "deleteUser",
      "userLogout",
    ]),
    ...mapActions(boardStore, ["getArticleListById", "getArticle"]),
    ...mapActions(tourStore, ["setUserPlanList"]),
    ...mapMutations(tourStore, ["CLEAR_PLAN_LIST"]),

    checkValue() {
      let err = true;
      let msg = "";
      !this.userName && ((msg = "이름을 입력해주세요"), (err = false));
      err &&
        !this.userPw &&
        ((msg = "변경할 비밀번호를 입력해주세요"), (err = false));
      err && !this.userAge && ((msg = "나이를 입력해주세요"), (err = false));
      err && !this.upfile && ((msg = "이미지를 등록해주세요."), (err = false));

      if (!err) alert(msg);
      else {
        alert("수정되었습니다.");
        let tempUser = {
          userId: this.user.userId,
          userName: this.userName,
          userPw: this.userPw,
          userAge: this.userAge,
          email: this.email,
          upfile: this.upfile,
          joinDate: this.user.joinDate,
          isManager: this.user.isManager,
        };
        this.modifyUser(tempUser);
        window.location.reload(true);
      }
    },
    fileSelect() {
      this.upfile = this.$refs.imagefile.files[0];
    },
    async withdrawal() {
      this.userId = this.userInfo.userId;
      this.userLogout(this.userInfo.userId);
      this.deleteUser(this.userId);
      alert("탈퇴완료되었습니다.");
      this.$router.push({ name: "index" });
    },
    async moveView(articleNo) {
      await this.getArticle(articleNo);
      this.$router.push({
        name: "boardview",
        params: { articleNo: articleNo },
      });
    },
  },
};
</script>
<style scoped>
.category {
  text-transform: none;
}
.modify-category {
  text-transform: capitalize;
  font-weight: 700;
  color: #9a9a9a;
}
.row {
  justify-content: center;
}

.card-style > div > div {
  border-radius: 5px;
  margin: 0 0 5px 0;
}

.card-style > div > div > img {
  width: 100%;
}
.tab-panel-plan {
  width: 98vw;
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
