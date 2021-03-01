module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/278255/',
        changeOrigin: true,
        paperRewrite: {
          '/api': ''
        }
      }
    }
  }
}
