import { getApps } from ".";
import { importHTML } from "./import-html";
import { getNextRoute, getPrevRoute } from "./rewrite-router";

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

  // config env for sub app, effect resource load url
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry;

  // 3. load sub app
  // html css js
  const container = document.querySelector(app.container);

  // /**
  //  * browser security do not execute script in innerHTML
  //  * manually load script and execute use eval or new Function
  //  */
  // const html = await fetch(app.entry).then((res) => {
  //   return res.text();
  // });
  // container.innerHTML = html;

  const { template, getExternalScripts, execScripts } = await importHTML(
    app.entry
  );
  container.appendChild(template);

  getExternalScripts().then((scripts) => {
    console.log(scripts);
  });

  const appExports = await execScripts();

  console.log(appExports);

  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;

  await bootstrap(app);
  await mount(app);
  await unmount(app);

  // 4. render
};

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}

async function unmount(app) {
  app.unmount && (await app.unmount());
}
