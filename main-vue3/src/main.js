import { createApp } from "vue";
import App from "./App.vue";
import Home from "./Home.vue";
import { registerMicroApps, start } from "qiankun";

import { createRouter, createWebHistory } from "vue-router";

const apps = [];
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
