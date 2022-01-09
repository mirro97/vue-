<template>
  <Header />
  <router-view></router-view>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: { Header },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap");
* {
  box-sizing: border-box;
  color: #495057;
  margin: 0px;
  padding: 0px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 15px;
}

body {
  width: 100%;
  height: 100vh;
}

h1,
h2,
h1 {
  font-weight: normal;
}

span {
  text-decoration: none;
  display: inline-block;
}

a {
  display: inline-block;
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

.btn {
  padding: 7px 12px;
  background-color: #d7d7d6;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  /* width: fit-content; */
}

.btn:hover {
  background-color: #c5c5c5;
}

.input-design {
  padding: 6px 8px;
}
</style>
