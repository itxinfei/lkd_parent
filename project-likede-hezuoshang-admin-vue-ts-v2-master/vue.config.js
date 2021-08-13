// eslint-disable-next-line @typescript-eslint/no-var-requires
const devServer = require('./utils/devServer')

const outputDir = 'dist'

module.exports = {
  publicPath: process.env.NODE_ENV !== 'production' ? '/' : './',
  productionSourceMap: false,
  outputDir,
  devServer,
  transpileDependencies: [
    'vue-echarts'
  ],
  chainWebpack: config => {
    const obj = {
      'echarts/lib/echarts': 'echarts'
    }
    if (process.env.NODE_ENV === 'production') {
      obj.vue = 'Vue'
      obj['element-ui'] = 'ELEMENT'
    }
    config
    .externals(obj)
  }
}