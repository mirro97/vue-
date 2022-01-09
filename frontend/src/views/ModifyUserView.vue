<template>
  <div class="modify-user-container">
    <div class="modify-user-wrapper">
      <div class="img-wrapper flex-r">
        <img v-if="userInfo.imageUrl" class="profile-img" :src="require(`@/assets/${userInfo.imageUrl}.jpg`)" alt="유저 이미지" />
        <button class="modify" @click="openModifyImage()">프로필 사진 변경하기</button>
      </div>

      <div class="input-container">
        <div class="user-info">
          <span>Id </span>
          <input type="text" v-model="userInfo.id" disabled />
        </div>
        <div class="user-info">
          <span>닉네임 </span>
          <input type="text" v-model="userInfo.nickname" />
        </div>
        <div class="user-info">
          <span>한줄 소개 </span>
          <input type="text" v-model="userInfo.introduce" />
        </div>
        <div class="btn-container">
          <button class="quit" @click="deleteInfo()">회원 탈퇴하기</button>
        </div>
      </div>
    </div>
    <button class="modify" @click="modifyInfo()">수정</button>
  </div>

  <ModifyImage v-if="openModal" @click.self="close()" @close="close" :curImage="userInfo.imageUrl" @changedImg="changedImg" />
</template>

<script>
import ModifyImage from "../components/ModifyImage.vue";
export default {
  components: { ModifyImage },
  data() {
    return {
      userInfo: {},
      curUserId: this.$store.state.user.id,
      profileImg: "",
      openModal: false,
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const getUserInfo = await this.axios.get("/api/User/Item", { params: { userId: this.curUserId } });
      this.userInfo = getUserInfo.data;
    },
    openModifyImage() {
      this.openModal = true;
    },
    changedImg(image) {
      this.userInfo.imageUrl = image;
    },
    async modifyInfo() {
      await this.axios
        .post("/api/User/Update", {
          userInfo: {
            nickname: this.userInfo.nickname,
            introduce: this.userInfo.introduce,
            imageUrl: this.userInfo.imageUrl,
            id: this.userInfo.id,
          },
        })
        .then(() => {
          alert("회원정보가 수정되었습니다");
        });
    },
    async deleteInfo() {
      if (confirm("회원 탈퇴를 하시겠습니까?")) {
        await this.axios
          .post("/api/User/Delete", {
            userInfo: {
              id: this.userInfo.id,
            },
          })
          .then(async () => {
            try {
              await this.$store.dispatch("userLogout").then(() => {
                this.isLogin = false;
                alert("탈퇴가 완료되었습니다. 메인페이지로 이동합니다");
                this.$router.push("/dashboard");
              });
            } catch (e) {
              console.log(e);
            }
          });
      }
    },
    close() {
      this.openModal = false;
    },
  },
};
</script>

<style scoped>
/* common css */
.flex-r {
  display: flex;
  flex-direction: column;
}

/* modify-view css */
.modify-user-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modify-user-wrapper {
  display: flex;
  flex-direction: row;
  margin-top: 57px;
  justify-content: center;
  align-items: center;
}

.profile-img {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
}

.input-container {
  margin-left: 30px;
}

.user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.user-info span {
  margin-right: 15px;
}

.user-info input {
  padding: 8px 9px;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}

.quit {
  cursor: pointer;
  margin-top: 3px;
  font-size: 13px;
  color: #f03e3e;
  border: none;
  background-color: rgba(229, 229, 229, 0);
}

.modify {
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin-top: 36px;
  padding: 6px 14px;
}
</style>
