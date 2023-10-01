import "../public-path";
import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

let instance = null;

function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    render: (h) => {
      return h(App);
    },
  }).$mount(container ? container.querySelector("#app") : "#app");

  // const shadowApp = container?.firstChild.shadowRoot.querySelector("#app");
  // instance = new Vue({
  //   render: (h) => h(App),
  // }).$mount(shadowApp ? shadowApp : "#app");
}

// running not in main app
if (!window?.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
