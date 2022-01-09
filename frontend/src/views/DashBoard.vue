<template>
  <section class="board-page">
    <h1 class="home-title">게시판</h1>
    <div>
      <button class="index" :class="{ 'cur-board': curType === undefined }" @click="getBoardData()">전체 게시판</button>
      <button class="index" :class="{ 'cur-board': curType === 'free' }" @click="getBoardData('free')">자유 게시판</button>
      <button class="index" :class="{ 'cur-board': curType === 'share' }" @click="getBoardData('share')">정보공유 게시판</button>
      <button class="index" :class="{ 'cur-board': curType === 'daily' }" @click="getBoardData('daily')">일상 게시판</button>
    </div>
    <div class="board-container">
      <div class="table-wrapper">
        <div class="table-header">
          <div>번호</div>
          <div>제목</div>
          <div>작성자</div>
          <div>날짜</div>
        </div>
        <div class="table-body">
          <router-link :to="`/content/${item.boardId}`" class="content" v-for="(item, b_index) in board" :key="b_index">
            <div>{{ b_index + 1 }}</div>
            <div class="title">
              {{ item.title }} <span v-if="item.replyCount !== 0" class="is-reply">[{{ item.replyCount }}]</span>
            </div>
            <div>{{ item.writer }}</div>
            <div>{{ item.regdate }}</div>
          </router-link>
        </div>
      </div>

      <div class="links">
        <router-link to="/newboard" class="btn write">글쓰기</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      board: {},
      curType: "",
    };
  },
  created() {
    this.getBoardData();
  },
  methods: {
    async getBoardData(type) {
      this.curType = type;
      console.log(this.curType);
      const getBoard = await this.axios.get("/api/Board", { params: { type: this.curType } });
      this.board = getBoard.data;
    },
  },
};
</script>

<style scoped>
section.board-page {
  max-width: 780px;
  margin: 0 auto;
  padding: 10px 20px;
}

.board-container {
  margin-bottom: 12px;
}

.table-wrapper {
  margin-bottom: 10px;
}

.home-title {
  padding: 26px 0 8px;
  font-size: 18px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr;
  justify-items: center;
  align-items: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr;
  justify-items: center;
  align-items: center;
}

.content:hover {
  background-color: #f8f9fa;
}

.is-reply {
  font-size: 14px;
  display: inline-block;
  color: #228be6;
}

.index {
  padding: 4px 14px;
  border: none;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

/* tabel css */
.table-header > div,
.content > div {
  width: 100%;
  padding: 7px 0;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}

.table-header {
  border-top: 1px solid #252525;
}
.table-header,
.content {
  border-right: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
}

.title {
  text-align: left !important;
}

.links {
  text-align: right;
}

.write {
  border-radius: 4px;
}
</style>
