module.exports = {
  publicPath: './',
  // 配置less
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    open: true
  }
}
