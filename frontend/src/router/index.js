import { createRouter, createWebHistory } from "vue-router";

import DashBoard from "../views/DashBoard.vue";
import NewBoardView from "../views/NewBoardView.vue";
import ContentView from "../views/ContentView.vue";
import ModifyUserView from "../views/ModifyUserView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "MainpPage",
    component: DashBoard,
  },
  {
    path: "/dashboard",
    name: "HomePage",
    component: DashBoard,
  },

  {
    path: "/newBoard",
    name: "NewBoardView",
    component: NewBoardView,
  },

  {
    path: "/content/:id",
    name: "ContentView",
    component: ContentView,
  },

  {
    path: "/modify",
    name: "ModifyUserView",
    component: ModifyUserView,
  },

  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
