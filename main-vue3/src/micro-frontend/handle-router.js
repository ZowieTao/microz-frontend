import { getApps } from ".";
import { importHTML } from "./import-html";
import { getNextRoute, getPrevRoute } from "./rewrite-router";
import { bootstrap, mount, unmount } from "./life-cycle";
import { ProxySandbox } from "./proxy-sandbox";

export const handleRouter = async () => {
  console.log("handleRouter", window.location.pathname);
  const apps = getApps();

  // unmount previous sub app
  const prevApp = apps.find((item) =>
    getPrevRoute().startsWith(item.activeRule)
  );
  if (prevApp) {
    await unmount(prevApp);
  }

  // 2. match sub app
  const app = apps.find((item) => {
    return getNextRoute().startsWith(item.activeRule);
  });

  if (!app) {
    return;
  }

  // 3. load sub app
  // html css js

  // /**
  //  * browser security do not execute script in innerHTML
  //  * manually load script and execute use eval or new Function
  //  */
  // const html = await fetch(app.entry).then((res) => {
  //   return res.text();
  // });
  // container.innerHTML = html;

  const { template, execScripts } = await importHTML(app.entry);
  const container = document.querySelector(app.container);
  const subWrap = document.createElement("div");
  subWrap.id = "__inner_sub_wap__";
  const shadowDom = subWrap.attachShadow({ mode: "open" });
  shadowDom.innerHTML = template.innerHTML;

  container.innerHTML = "";
  container.appendChild(subWrap);

  if (app.proxy) {
    app.proxy.active();
  } else {
    app.proxy = new ProxySandbox(app.name);
    app.proxy.active();
  }

  // config env for sub app, effect resource load url
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry;

  await execScripts(app.proxy.proxy);
  const appExports = window[app.name];

  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;

  await bootstrap(app);
  // 4. render
  await mount(app);
};
