<template>
  <div>
    <div class="outer">
      <div id="joinInfoArea">
        <form id="joinForm" method="POST" action="">
          <input type="hidden" id="act" name="act" value="" />
          <h2 class="form__title">비밀번호 찾기</h2>
          <div class="password_group">
            <h6 style="text-align: center">비밀번호는 다음과 같습니다.</h6>
            <div class="password_input_area">
              <input
                type="text"
                name="certification_number"
                value="${password}"
                readonly
              />
            </div>
          </div>
          <div class="password_btnArea">
            <a href="#" class="account_btn" style="visibility: hidden"></a>
            <a href="#" id="btn-ok" class="account_btn">확인</a>
            <a href="#" class="account_btn" style="visibility: hidden"></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "confirm-password",
};
</script>
<style></style>
