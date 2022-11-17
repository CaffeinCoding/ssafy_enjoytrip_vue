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
            <h3 class="card-title title-up">Sign Up</h3>
            <div class="social-line">
              <div class="logo-container mt-4"></div>
            </div>
          </template>
          <template>
            <fg-input
              class="no-border"
              placeholder="ID"
              addon-left-icon="now-ui-icons users_circle-08"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Password"
              addon-left-icon="now-ui-icons text_caps-small"
            >
            </fg-input>

            <fg-input
              class="no-border"
              placeholder="Email"
              addon-left-icon="now-ui-icons ui-1_email-85"
            >
            </fg-input>
            <fg-input
              class="no-border"
              placeholder="Age"
              addon-left-icon="now-ui-icons ui-1_email-85"
            >
            </fg-input>

            <div class="input-group">
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
                href="#pablo"
                class="col btn btn-neutral btn-round btn-lg btn-block"
                >Get Started</a
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
          to="/login"
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

export default {
  data() {
    return {
      windowHeight: window.innerHeight - 69,
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
    onResize() {
      this.windowHeight = window.innerHeight - 69;
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
  /* margin-bottom: 40px; */
}
.card-signup::v-deep .card-header {
  padding: 24px;
}
</style>
