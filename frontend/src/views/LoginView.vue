<template>
  <section class="login-container">
    <h2 class="title">Login</h2>
    <form class="login-form" @submit.prevent="login">
      <div class="input-wrapper">
        <label for="id" class="label-info">ID</label>
        <input class="input-id" type="text" id="id" v-model="userId" />
      </div>
      <div class="input-wrapper">
        <label for="pw" class="label-info">Password</label>
        <input class="input-pw" type="password" id="pw" v-model="userPw" />
      </div>

      <div class="error-wrapper">
        <span v-if="!userId && !userPw" class="alert-error">계정을 입력해주세요</span>
        <span v-else-if="!userId" class="alert-error">아이디를 입력해주세요</span>
        <span v-else-if="!userPw" class="alert-error">
          비밀번호를 입력해주세요
          <br />
          (영문자/숫자/특수문자)
        </span>
        <span v-else-if="loginError" class="alert-error">
          계정 혹은 비밀번호가 일치하지 않습니다. <br />
          다시 확인해주세요
        </span>
      </div>

      <button class="login">로그인</button>
    </form>
    <router-link to="/join" class="join">회원가입</router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userPw: "",
      loginError: false,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store
          .dispatch("userLogin", {
            id: this.userId,
            password: this.userPw,
          })
          .then(() => {
            if (this.$store.state.user.id) {
              this.$router.push("dashboard");
            } else {
              console.log("로그인 실패!");
            }
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 94vh;
  width: 100%;
}

.title {
  font-size: 32px;
  margin-bottom: 10px;
}

.input-wrapper {
  border-radius: 17px;
  border: 1px solid #dedede;
  padding: 4px 21px;
  margin-bottom: 7px;
}

.label-info {
  color: #adb5bd;
  font-size: 12px;
}

input {
  border: 0;
  width: 100%;
  padding: 6px 0 8px 0;
}

input:focus {
  outline: 0;
}

.login {
  border: none;
  border-radius: 4px;
  padding: 12px 0;
  background-color: #339af0;
  color: #fff;
  width: 100%;
  font-size: 17px;
  margin-bottom: 12px;
}

.login:hover {
  cursor: pointer;
  background-color: #228be6;
}

/* login error css */
.error-wrapper {
  margin-bottom: 16px;
}

.alert-error {
  color: #e03131;
  font-size: 13px;
  background-color: #f1f3f5;
  padding: 20px 25px;
  width: 100%;
}
</style>
