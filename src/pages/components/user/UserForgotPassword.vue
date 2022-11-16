<template>
  <div>
    <div class="outer">
      <div id="joinInfoArea">
        <form id="joinForm" method="POST" action="">
          <input type="hidden" id="act" name="act" value="" />
          <h2 class="form__title">비밀번호 찾기</h2>
          <div class="password_group">
            <h6 style="text-align: center">가입한 계정정보를 입력해주세요.</h6>
            <div class="password_input_area">
              <input
                type="text"
                name="userid"
                placeholder="아이디를 입력해주세요"
              />
            </div>

            <div class="password_input_area">
              <input
                type="email"
                name="useremail"
                placeholder="이메일을 입력해주세요"
              />
            </div>
          </div>
          <div class="password_btnArea">
            <a href="#" class="account_btn" style="visibility: hidden"></a>
            <a href="#" id="btn-certfication" class="account_btn"
              >인증번호 받기</a
            >
            <a href="#" class="account_btn" style="visibility: hidden"></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forgot-password",
};
</script>
<style></style>
