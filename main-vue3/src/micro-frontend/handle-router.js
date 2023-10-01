import { getApps } from ".";

export const handleRouter = async () => {
  console.log("handleRouter", window.location.pathname);
  const apps = getApps();

  // 2. match sub app
  const app = apps.find((item) => {
    return window.location.pathname.startsWith(item.activeRule);
  });

  if (!app) {
    return;
  }

  // 3. load sub app
  // html css js
  const html = await fetch(app.entry).then((res) => {
    return res.text();
  });

  console.log("html", html);
};
