import { handleRouter } from "./handle-router";

export const rewriterRouter = () => {
  // 1.1 hash router:
  // window.addEventListener("hashchange", () => {
  //   var currentHash = window.location.hash;
  //   console.log("current hash value:", currentHash);
  // });

  // 1.2 history router
  window.addEventListener("popstate", () => {
    console.log("popstate handle");
    handleRouter();
  });

  const rawPushState = window.history.pushState;
  window.history.pushState = (...args) => {
    rawPushState.apply(window.history, args);
    console.log("pushState handle");
    handleRouter();
  };

  const rawReplaceState = window.history.replaceState;
  window.history.replaceState = (...args) => {
    rawReplaceState.apply(window.history, args);
    console.log("replaceState handle");
    handleRouter();
  };
};
