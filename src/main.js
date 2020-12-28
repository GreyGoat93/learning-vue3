import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router.js";
import store from "./store/index.js";
import "es6-promise/auto";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
    .use(Router)
    .use(store)
    .mount("#app");