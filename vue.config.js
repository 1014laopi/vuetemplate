const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: "8081",
    proxy: {
      // 配置跨域
      "/img": {
        target: "http://xiyoucloud.pro:15245", // 需要代理的地址
        pathRewrite: {
          "^/img": "",
        },
      },
      "/api": {
        target: "http://xiyoucloud.pro:15246", // 需要代理的地址
        pathRewrite: {
          "^/api": "", // 路径重写，将前缀/apis转为"/"，也可以理解为"/apis"代替target里面的地址
          // 如果本身的接口地址就有"/api"这种通用前缀，也就是说https://www.exaple.com/api，就可以把pathRewrite删掉，如果没有则加上
        },
      },
    },
  },
});
