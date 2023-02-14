// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  transpileDependencies: ['vuex-composition-helpers'],
  chainWebpack: (config) => {
      // Disable prefetching and preloading
      config.plugins.delete('prefetch')
      config.plugins.delete('preload')
  },
}