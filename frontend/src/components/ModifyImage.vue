<template>
  <div class="modify-image-container flex-c">
    <div class="modify-image-wrapper flex-c">
      <div class="select-image">
        <div class="image-info">
          <img src="../assets/default.jpg" alt="기본" />
          <div class="input-wrapper">
            <input type="radio" id="default" value="default" v-model="picked" />
            <label for="default">기본</label>
          </div>
        </div>
        <div class="image-info">
          <img src="../assets/chicken.jpg" alt="치킨" />
          <div class="input-wrapper">
            <input type="radio" id="chicken" value="chicken" v-model="picked" />
            <label for="chicken">치킨</label>
          </div>
        </div>
        <div class="image-info">
          <img src="../assets/bear.jpg" alt="곰" />
          <div class="input-wrapper">
            <input type="radio" id="bear" value="bear" v-model="picked" />
            <label for="bear">곰</label>
          </div>
        </div>
        <div class="image-info">
          <img src="../assets/apple.jpg" alt="사과" />
          <div class="input-wrapper">
            <input type="radio" id="apple" value="apple" v-model="picked" />
            <label for="apple">사과</label>
          </div>
        </div>
        <div class="image-info">
          <img src="../assets/water.jpg" alt="물" />
          <div class="input-wrapper">
            <input type="radio" id="water" value="water" v-model="picked" />
            <label for="water">물</label>
          </div>
        </div>
      </div>
      <div class="btn-wrapper">
        <button class="modify" @click="changeImage">수정</button>
        <button class="cancle" @click="close">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    curImage: String,
  },
  data() {
    return {
      picked: [],
    };
  },
  created() {
    this.picked = this.curImage;
  },
  methods: {
    async changeImage() {
      this.$emit("changedImg", this.picked);
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.flex-c {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.modify-image-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
}

.modify-image-wrapper {
  background-color: #fff;
  padding: 27px 38px;
}

.select-image {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 30px;
  column-gap: 14px;
}

.image-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-info img {
  width: 160px;
  height: 160px;
  border: 1px solid #9e9e9e70;
  border-radius: 50%;
}

.input-wrapper {
  margin-top: 8px;
}

.input-wrapper input {
  margin-right: 5px;
}

.btn-wrapper {
  margin-top: 25px;
}

.cancle,
.modify {
  border-radius: 4px;
  border: none;
  padding: 6px 12px;
}

.modify {
  background-color: #d0ebff;
  margin-right: 5px;
}
</style>
