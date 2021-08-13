/* eslint-disable standard/computed-property-even-spacing */
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const devServerPort = 8088
const name = '立可得后台'

module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BACK_API,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)
  }
  // configureWebpack: config => {
  //   // get a reference to the existing ForkTsCheckerWebpackPlugin
  //   const existingForkTsChecker = config.plugins.filter(
  //     p => p instanceof ForkTsCheckerWebpackPlugin
  //   )[0]

  //   // remove the existing ForkTsCheckerWebpackPlugin
  //   // so that we can replace it with our modified version
  //   config.plugins = config.plugins.filter(
  //     p => !(p instanceof ForkTsCheckerWebpackPlugin)
  //   )

  //   // copy the options from the original ForkTsCheckerWebpackPlugin
  //   // instance and add the memoryLimit property
  //   const forkTsCheckerOptions = existingForkTsChecker.options
  //   forkTsCheckerOptions.memoryLimit = 8192

  //   config.plugins.push(new ForkTsCheckerWebpackPlugin(forkTsCheckerOptions))
  // }
}
