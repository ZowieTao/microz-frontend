export async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

export async function mount(app) {
  if (app.mount) {
    await app.mount({
      container: document.querySelector(app.container),
      appInfo: app.appInfo,
    });
  }
}

export async function unmount(app) {
  const container = document.querySelector(app.container);
  if (app.unmount) {
    await app.unmount({ container });
    if (app.proxy) {
      app.proxy.inactive();
    }
  }
  container.innerHTML = "";
}
