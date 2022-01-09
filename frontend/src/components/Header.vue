<template>
  <header>
    <h1><router-link to="/dashboard">게시판 프로젝트</router-link></h1>
    <div class="flex-x">
      <div v-if="isLogin" class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{{ userId }} 님</button>
        <ul class="dropdown-menu drop-box" aria-labelledby="dropdownMenuButton1">
          <li><router-link to="/modify">회원정보 수정하기</router-link></li>
        </ul>
      </div>
      <span v-else-if="!isLogin"> <router-link to="/login">로그인하기</router-link></span>
      <button v-if="isLogin" class="logout" @click="logout">로그아웃</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLogin: this.$store.state.isLogin,
      userId: this.$store.state.user.id,
      text: "",
    };
  },
  computed: {
    checkIsLogin() {
      return this.$store.state.user.id;
    },
    checkId() {
      return this.$store.state.user.id;
    },
  },
  watch: {
    checkIsLogin(val) {
      this.isLogin = val;
    },
    checkId(val) {
      this.userId = val;
    },
  },
  created() {
    // this.userIsLogin();
  },
  methods: {
    userIsLogin() {
      if (this.userId) {
        return (this.isLogin = true);
      } else {
        return (this.isLogin = false);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("userLogout").then(() => {
          this.isLogin = false;
          alert("로그아웃 하셨습니다");
          this.$router.push("/dashboard");
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #c2c2c2;
  padding: 14px 18px;
  background-color: #fff;
}

h1 > span {
  height: 100%;
}

.logout {
  font-size: 12px;
  padding: 3px 9px;
  border: none;
  border-radius: 20px;
  margin-left: 9px;
  cursor: pointer;
}

.flex-x {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.menu {
  position: relative;
}

.sub-menu {
  position: absolute;
  top: 41px;
  left: 0;
  width: 100%;
  /* display: none; */
}

.menu:hover .sub-menu,
.sub-menu:hover {
  display: block;
}

.dropdown-menu {
  display: none;
}

.dropdown-menu > li {
  text-align: center;
}

.dropdown-menu.show {
  display: block;
}

.drop-box {
  -webkit-box-shadow: 0px 0px 6px 0px rgba(116, 116, 116, 0.68);
  box-shadow: 0px 0px 6px 0px rgba(116, 116, 116, 0.68);
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
}
</style>
