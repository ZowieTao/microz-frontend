import { handleRouter } from "./handle-router";

let prevRoute = "";
let nextRoute = window.location.pathname;

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export const rewriterRouter = () => {
  // 1.1 hash router:
  // window.addEventListener("hashchange", () => {
  //   var currentHash = window.location.hash;
  //   console.log("current hash value:", currentHash);
  // });

  // 1.2 history router
  window.addEventListener("popstate", () => {
    console.log("popstate handle");
    // router was navigated while popstate trigger
    prevRoute = nextRoute;
    nextRoute = window.location.pathname;
    handleRouter();
  });

  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    // before navigate
    prevRoute = window.location.pathname;
    rawPushState.apply(window.history, args);
    // after navigate
    nextRoute = window.location.pathname;
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    // before navigate
    prevRoute = window.location.pathname;
    rawReplaceState.apply(window.history, args);
    // after navigate
    nextRoute = window.location.pathname;
    handleRouter();
  };
};
