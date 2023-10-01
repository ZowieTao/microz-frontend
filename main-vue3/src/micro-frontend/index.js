import { handleRouter } from "./handle-router";
import { rewriterRouter } from "./rewrite-router";

let _apps = [];

export const getApps = () => {
  return _apps;
};

export const registerMicroApps = (apps) => {
  _apps = apps;
};

export const start = () => {
  /**
   * watching router change
   * match sub application
   * load sub app
   * render sub app
   */
  // 1. watching router change
  rewriterRouter();
  // cover refresh initial case
  handleRouter();
};
