const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    open: true // 配置自动启动浏览器
  }
})
