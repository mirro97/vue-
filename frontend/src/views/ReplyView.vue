<template>
  <section class="reply-container">
    <div>
      <h2 class="margin-bottom" v-if="replys.length === 0">댓글</h2>
      <h2 class="margin-bottom" v-else>댓글 {{ replys.length }}개</h2>
    </div>
    <div class="reply-wrapper">
      <ul v-if="replys.length !== 0">
        <li v-for="(reply, replyIdx) in replys" :key="replyIdx" class="reply">
          <div class="reply-bottom">
            <div class="user-info flex-w">
              <div class="user-profil flex-w" @click="openProfile(reply.writer)">
                <div class="profile-image profile"><i class="fas fa-user"></i></div>
                <div class="reply-info">
                  <span class="writer profile" title="프로필보기">
                    {{ reply.writer }}
                  </span>
                  <span class="regdate">
                    {{ reply.regdate }}
                  </span>
                </div>
              </div>
              <button v-if="curUserId === reply.writer" class="delete" @click="deleteReply(reply.replyId)">삭제</button>
            </div>
            <div class="reply-content" v-html="reply.content"></div>
          </div>
        </li>
      </ul>
      <span class="reply-alert" v-else>첫번째 댓글을 달아주세요!</span>
      <div class="editor-container">
        <div class="user-info flex-w self">
          <div class="user-profil flex-w self">
            <div class="profile-image self"><i class="fas fa-user-check"></i></div>
            <span v-if="isLogin" class="writer profile self" title="내 프로필"> {{ curUserId }} </span>
            <span v-else-if="!isLogin">로그인을 해주세요!</span>
          </div>
          <button class="submit btn" @click="writeNewReply">제출</button>
        </div>
        <div class="editor"><QuillEditor ref="quillEditor" theme="bubble" v-model:content="content" contentType="html" /></div>
      </div>
    </div>
  </section>
  <ProfileModal v-if="openModal" @click.self="close()" @close="close" :userId="userId" />
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import ProfileModal from "../components/ProfileModal.vue";
export default {
  components: { QuillEditor, ProfileModal },
  props: {
    boardId: Number,
  },
  data() {
    return {
      replys: [],
      content: "",
      userId: "",
      openModal: false,
      isLogin: this.$store.state.isLogin,
      curUserId: this.$store.state.user.id,
    };
  },
  created() {
    this.getReplys();
  },
  methods: {
    async getReplys() {
      const replyDatas = await this.axios.get("/api/Reply", { params: { boardID: this.$route.params.id } });
      this.replys = replyDatas.data;
    },
    async writeNewReply() {
      if (this.content === "") alert("내용을 입력하세요");
      else if (this.isLogin === false) {
        alert("로그인 후 이용해주세요");
      } else {
        await this.axios
          .post("/api/Reply/Insert", {
            replyData: {
              boardId: this.boardId,
              writer: this.curUserId,
              content: this.content,
            },
          })
          .then(() => {
            this.getReplys();
            this.$refs.quillEditor.setHTML("");
          });
      }
    },
    openProfile(userId) {
      this.userId = userId;
      this.openModal = true;
    },
    deleteReply(replyId) {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        this.axios.post("/api/Reply/Delete", { replyId: replyId }).then(() => {
          this.getReplys();
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
.flex-w {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 게시된 댓글 */
.margin-bottom {
  margin-bottom: 10px;
}

.reply-container {
  margin-top: 22px;
}

.reply-wrapper {
  border-radius: 4px;
  background-color: #e7f5ff;
  padding: 12px 19px;
}

.reply {
  padding: 11px 3px;
}

.reply-content {
  padding: 3px 0 12px 0;
  border-bottom: 1px solid #9e9e9e70;
}
.reply:last-child .reply-content {
  border-bottom: none;
}

.reply-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-info {
  justify-content: space-between;
  margin-bottom: 6px;
}

.profile-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #1864ab;
  background-color: #fff;
  margin-right: 8px;
}

.fas {
  font-size: 23px;
}

.profile:hover {
  cursor: pointer;
  text-decoration: underline;
}

.reply-alert {
  text-align: center;
  padding: 38px 0;
  width: 100%;
}

.regdate {
  font-size: 12px;
}

.delete {
  font-size: 13px;
  cursor: pointer;
  border: none;
  background-color: #ffffff00;
  color: #f03e3e;
}

/* 댓글 작성란 */
.editor-container {
  padding: 9px 0px;
  background-color: #fff;
  border: 1px solid rgb(184, 184, 184);
}
.editor {
  border-radius: 4px;
}

.user-profil.self {
  margin-left: 10px;
}

.profile-image.self {
  width: 29px;
  height: 29px;
}

.profile-image.self .fas {
  font-size: 16px;
}

.writer.self,
.submit {
  font-size: 13px;
}

.submit {
  color: #fff;
  background-color: #1c7ed6;
  margin-right: 10px;
}
</style>
