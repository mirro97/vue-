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
    isLogin: false,
  },
  mutations: {
    SET_USER(state, userInfo) {
      if (userInfo) {
        state.user.id = userInfo.id;
        state.user.nickName = userInfo.nickName;
        state.user.introduce = userInfo.introduce;
        state.user.regdate = userInfo.regdate;
        state.isLogin = true;
      }
    },
    DELETE_USER(state) {
      state.user.id = "";
      state.user.nickName = "";
      state.user.introduce = "";
      state.user.regdate = "";
      state.isLogin = false;
    },
  },
  actions: {
    async userLogin({ commit }, { id, password }) {
      return await axios.post("/api/Auth/login", { id, password }).then((res) => {
        if (res.data.id) {
          commit("SET_USER", res.data);
        }
      });
    },
    async userLogout({ commit }) {
      commit("DELETE_USER");
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
