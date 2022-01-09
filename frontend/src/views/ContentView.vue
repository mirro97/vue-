<template>
  <section class="content-container">
    <div class="content-wrapper">
      <div class="header-wrapper flex-w">
        <h1 class="board-type">게시판 {타입-이후 추가될 예정}</h1>
        <router-link to="/dashboard" class="btn">목록</router-link>
      </div>
      <h2 class="title">{{ content.title }}</h2>
      <div class="content-info flex-w">
        <div class="flex-w">
          <span class="writer" title="프로필 보기" @click="openProfile()">{{ content.writer }} </span>
          <span class="regdate"> {{ content.regdate }} </span>
          <button v-if="curUserId === content.writer" class="delete" @click="deleteContent()">삭제</button>
        </div>
        <div class="like flex-w" @click="clickLike()">
          <i :class="{ thumb: isLiked }" class="far fa-thumbs-up"></i>
          <span>{{ content.likeCount }}</span>
        </div>
      </div>
      <div class="content">
        <div v-html="content.content"></div>
      </div>
      <ReplyView :boardId="content.boardId" />
    </div>
  </section>

  <ProfileModal v-if="openModal" @click.self="close()" @close="close" :userId="content.writer" />
</template>

<script>
import ProfileModal from "../components/ProfileModal.vue";
import ReplyView from "./ReplyView.vue";
export default {
  components: { ReplyView, ProfileModal },
  data() {
    return {
      content: {},
      openModal: false,
      isLiked: false,
      curUserId: this.$store.state.user.id,
    };
  },
  created() {
    this.getContent();
  },
  methods: {
    async getContent() {
      const contentInfo = await this.axios.get("/api/Board/Content", { params: { boardId: this.$route.params.id } });
      this.content = contentInfo.data;
      this.getLikeList();
    },
    async getLikeList() {
      await this.axios.get("/api/Board/Like", { params: { boardId: this.content.boardId, id: this.$store.state.user.id } }).then((res) => {
        let result = res.data;
        for (var user in result) {
          if (result[user] === this.curUserId) {
            this.isLiked = true;
          }
        }
      });
    },
    async clickLike() {
      await this.axios.post("/api/Board/Like", { boardId: this.content.boardId, id: this.$store.state.user.id }).then((res) => {
        let result = res.data;
        if (!result.isLiked) alert(result.message);
        else if (result.isLiked) alert(result.message);
      });
      this.getContent();
    },
    async deleteContent() {
      await this.axios.post("/api/Board/Delete", { boardId: this.content.boardId }).then((res) => {
        alert(res.data);
        this.$router.push("/dashboard");
      });
    },
    openProfile() {
      this.openModal = true;
    },
    close() {
      this.openModal = false;
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

/* main css */
.content-container {
  max-width: 780px;
  margin: 0 auto;
  padding: 50px 0px;
}

.content-wrapper {
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  padding: 25px 28px;
}

.header-wrapper {
  justify-content: space-between;
  padding: 3px 2px;
}

.board-type {
  font-size: 14px;
}

.regdate {
  margin-right: 8px;
}

.delete {
  font-size: 13px;
  cursor: pointer;
  border: none;
  background-color: #ffffff00;
  color: #f03e3e;
}

.like {
  cursor: pointer;
  font-size: 18px;
}

.thumb {
  color: #1563da;
}

.far {
  margin-right: 5px;
  font-size: 22px;
}

.content-info {
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  padding: 10px 0;
}

.title {
  font-weight: bold;
  font-size: 26px;
}

.writer {
  margin-right: 6px;
}

.writer:hover {
  cursor: pointer;
  text-decoration: underline;
}

.content {
  padding: 38px 3px;
}
</style>
