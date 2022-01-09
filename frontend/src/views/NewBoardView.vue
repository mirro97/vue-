<template>
  <section class="newBoard-container">
    <div class="header-wrapper">
      <h1 class="title">새 글 작성하기</h1>
      <button class="btn" @click="writeNewBoard()">등록</button>
    </div>
    <div class="text-input">
      <label for="title" class="input-label">제목을 입력해주세요</label>
      <input type="text" id="title" class="input-design" v-model="title" />
    </div>
    <div class="editor"><QuillEditor ref="quillEditor" theme="snow" v-model:content="content" contentType="html" /></div>
  </section>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: { QuillEditor },
  data() {
    return {
      title: "",
      writer: "GANGI",
      content: "",
      boardData: {},
    };
  },
  methods: {
    async writeNewBoard() {
      if (this.title === "") alert("제목을 입력하세요");
      else if (this.content === "") alert("내용을 입력하세요");
      else {
        await this.axios
          .post("/api/Board/Insert", {
            boardData: {
              title: this.title,
              writer: this.writer,
              content: this.content,
            },
          })
          .then(() => {
            alert("등록을 완료했습니다");
            this.$router.push("/dashboard");
          });
      }
    },
  },
};
</script>

<style scoped>
.newBoard-container {
  padding: 50px 20px;
  max-width: 780px;
  margin: 0 auto;
}

.header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  padding: 6px 2px;
  margin-bottom: 16px;
}

.title {
  font-size: 25px;
}

.text-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.input-label {
  margin-bottom: 6px;
}

.editor {
  height: 550px;
}
</style>
