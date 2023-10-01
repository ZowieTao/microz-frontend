export class ProxySandbox {
  active() {
    console.log(this.name + " active");
    this.sandboxRunning = true;
  }
  inactive() {
    console.log(this.name + " inactive");
    this.sandboxRunning = false;
  }
  constructor(name) {
    this.name = name;
    const rawWindow = window;
    const fakeWindow = {};
    const proxy = new Proxy(fakeWindow, {
      set: (target, prop, value) => {
        if (this.sandboxRunning) {
          target[prop] = value;
          return true;
        }
      },
      get: (target, prop) => {
        // If there is one in fakeWindow, it will be taken from fakeWindow. Otherwise, it will be taken from the outside window.
        let value = prop in target ? target[prop] : rawWindow[prop];
        return value;
      },
    });
    this.proxy = proxy;
  }
}
