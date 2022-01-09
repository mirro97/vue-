import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";
// import VueCookies from "vue3-cookies";
import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(store)
  .use(VueAxios, axios)
  .use(router)
  // .use(VueCookies)
  .mount("#app");
