<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image: url('img/bg5.jpg')"
      >
      </parallax>
      <div class="container">
        <div class="photo-container">
          <img src="img/ryan.jpg" alt="" />
        </div>
        <h3 class="title">{{ user.user_name }}</h3>
        <p class="category">
          {{ user.user_id }} | {{ user.email_id }}{{ user.email_domain }} |
          {{ user.user_age }}
        </p>

        <div class="content">
          <div class="social-description">
            <h2>26</h2>
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
              <div class="col-md-10 ml-auto mr-auto mt-4">
                <div class="row collections">
                  <div class="col-md-6">
                    <img src="img/bg6.jpg" class="img-raised" />
                    <img src="img/bg11.jpg" alt="" class="img-raised" />
                  </div>
                  <div class="col-md-6">
                    <img src="img/bg7.jpg" alt="" class="img-raised" />
                    <img src="img/bg8.jpg" alt="" class="img-raised" />
                  </div>
                </div>
              </div>
            </tab-pane>

            <tab-pane title="Plan">
              <p>여행계획</p>
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
              v-model="userId"
              ref="userId"
            ></fg-input>
          </div>

          <div class="regist-title">
            <label for="subject" class="modify-category ml-3">나이</label>

            <fg-input
              placeholder="나이"
              id="subject"
              v-model="subject"
              ref="subject"
            ></fg-input>
          </div>
          <div class="regist-title">
            <label for="subject" class="modify-category ml-3">비밀번호</label>

            <fg-input
              placeholder="비밀번호"
              id="subject"
              v-model="subject"
              ref="subject"
            ></fg-input>
          </div>
          <div class="regist-title">
            <label for="subject" class="modify-category ml-3">프로필사진</label>
            <div class="input-group">
              <input
                type="file"
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <div>
          <n-button>수정</n-button>
          <n-button class="ml-3">탈퇴</n-button>
        </div>
        <n-button type="danger" @click.native="modals.classic = false"
          >닫기</n-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import { Modal, Tabs, TabPane, Button, FormGroupInput } from "@/components";

export default {
  name: "profile",
  bodyClass: "profile-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    Modal,
    Tabs,
    TabPane,
  },
  data() {
    return {
      user: Object,
      modals: {
        classic: false,
      },
    };
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
  text-transform: none;
}
.modify-category {
  text-transform: capitalize;
  font-weight: 700;
  color: #9a9a9a;
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
