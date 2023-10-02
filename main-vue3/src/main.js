import { createApp } from "vue";
import App from "./App.vue";
import Home from "./Home.vue";
// import { registerMicroApps, start } from "qiankun";

import { registerMicroApps, start } from "./micro-frontend";

import { createRouter, createWebHistory } from "vue-router";

const apps = [
  {
    name: "app-vue2-app",
    entry: "http://localhost:2000/", // sub app host domain
    container: "#sub-container", // mount node selector in main app
    activeRule: "/vue2", // which router will active this sub app
    // appInfo,
  },
  {
    name: "app-react16-app",
    entry: "http://localhost:7100/", // sub app host domain
    container: "#sub-container", // mount node selector in main app
    activeRule: "/react16", // which router will active this sub app
    // appInfo,
  },
];

registerMicroApps(apps); // Register App
start(); // Start App

const routes = [
  {
    path: "/home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
