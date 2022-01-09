import { createStore } from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    user: {
      id: "",
      nickName: "",
      introduce: "",
      regdate: "",
    },
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    loginToken(state, payload) {
      this.$cookies.set("accessToken", payload.accessToken, "60s");
      this.VueCookies.set("refreshToken", payload.refreshToken, "1h");
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    refreshToken(state, payload) {
      VueCookies.set("accessToken", payload.accessToken, "60s");
      VueCookies.set("refreshToken", payload.refreshToken, "1h");
      state.accessToken = payload;
    },
    removeToken() {
      VueCookies.remove("accessToken");
      VueCookies.remove("refreshToken");
    },
    SET_USER(state, userInfo) {
      if (userInfo) {
        state.user.id = userInfo.id;
        state.user.nickName = userInfo.nickName;
        state.user.introduce = userInfo.introduce;
        state.user.regdate = userInfo.regdate;
      }
    },
  },
  getters: {
    getToken(state) {
      let ac = VueCookies.get("accessToken");
      let rf = VueCookies.get("refreshToken");
      return {
        access: ac,
        refresh: rf,
      };
    },
  },
  actions: {
    async userLogin({ commit }, { id, password }) {
      return await axios.post("/api/Auth/login", { id, password }).then((res) => {
        if (!res.data.loginResult) {
          console.log("로그인 실패");
        } else {
          commit("SET_USER", res.data.userInfo);
        }
      });
    },
  },
  modules: {},
  plugins: [createPersistedState({ paths: ["userStore"] })],
});
