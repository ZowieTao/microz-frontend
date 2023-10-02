const packageName = require("./package.json").name;

module.exports = {
  publicPath: "/",
  configureWebpack: {
    output: {
      // 必须打包出一个库文件
      library: `${packageName}-[name]`,
      // 库的格式必须是 umd (Universal Module Definition) Compatible with AMD, CommonJS or global variant
      libraryTarget: "umd",
    },
  },
  devServer: {
    port: 2000,
    headers: {
      "Access-Control-Allow-Origin": "*", // allow CORS Request cause resource loaded to main app
    },
  },
  css: {
    // loaderOptions: {
    //   css: {
    //     // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
    //     // Vue CLI v3 用户可参考 css-loader v1 文档
    //     // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
    //     modules: {
    //       localIdentName: '[name]-[hash]'
    //     },
    //     localsConvention: 'camelCaseOnly'
    //   }
    // },
    // requireModuleExtension: false
    extract: true,
  },
  productionSourceMap: false,
};
