import { fetchResource } from "./fetch-resource";

export const importHTML = async (url) => {
  const html = await fetchResource(url);
  const template = document.createElement("div");

  template.innerHTML = html;
  const scripts = template.querySelectorAll("script");
  const styles = template.querySelectorAll("link");

  // all of style
  function fetchStyles() {
    const filterStyle = Array.from(styles).filter(
      (item) => item.rel === "stylesheet"
    );
    return Promise.all(
      filterStyle.map((style) => {
        const hrefUrl = style.href.replace("http://localhost:8080/", url);
        return fetchResource(hrefUrl);
      })
    );
  }

  const endStyles = await fetchStyles();
  // const tplHeader = template.querySelector("header")

  for (let eStyle of endStyles) {
    const newStyle = document.createElement("style");
    newStyle.setAttribute("type", "text/css");
    newStyle.innerHTML = eStyle;
    template.appendChild(newStyle);
  }

  // obtain of of script tag
  function getExternalScripts() {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src");
        if (!src) {
          // case: <script> //some code</script>
          return Promise.resolve(script.innerHTML);
        } else {
          return fetchResource(src.startsWith("http") ? src : `${url}${src}`);
        }
      })
    );
  }

  // get and execute all of script code
  async function execScripts(global) {
    global;
    const scripts = await getExternalScripts();

    // make commonJS env manually
    const module = { exports: {} };
    const exports = module.exports;
    console.log(exports);

    scripts.forEach((code) => {
      eval(code);
    });

    // scripts.forEach((code) => {
    //   window.proxy = global;
    //   const scriptText = `
    //     ((window) => {
    //       ${code}
    //     })(window.proxy)
    //   `;
    //   new Function(scriptText)();
    // });

    return module.exports;
  }
  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
