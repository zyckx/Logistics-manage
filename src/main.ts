import { createApp } from "vue";
import pinia from "./store/pinia";
import "./style.css";
import "./assets/font/iconfont";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "font-awesome/css/font-awesome.css";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(pinia).mount("#app");
