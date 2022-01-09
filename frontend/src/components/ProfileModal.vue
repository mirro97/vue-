<template>
  <section class="profile-container">
    <div class="profile">
      <div class="x" @click="close()">
        <i class="fas fa-times"></i>
      </div>
      <div class="profile-image">
        <i class="fas fa-user"></i>
      </div>
      <span class="id">{{ userInfo.nickname }} ({{ userInfo.id }})</span>
      <span class="introduce">{{ userInfo.introduce }}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: { userId: String },
  data() {
    return { userInfo: {} };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      const getUserInfo = await this.axios.get("/api/User/Item", { params: { userId: this.userId } });
      this.userInfo = getUserInfo.data;
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* common css */
.flex-w {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* 프로필 css */
.profile-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile {
  width: 320px;
  height: 430px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 1px;
  background-color: #fff;
  padding: 20px 26px;
  -webkit-box-shadow: 0px 1px 6px 3px rgba(224, 224, 224, 0.5);
  box-shadow: 0px 1px 6px 3px rgba(224, 224, 224, 0.5);
}

.x {
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 14px;
}
.x .fas {
  font-size: 16px;
}

.profile-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  margin-bottom: 8px;
}

.profile-image .fas {
  font-size: 52px;
}

.profile .id {
  margin-bottom: 8px;
}
</style>
