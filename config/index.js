// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var pages = require('./pages')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: './',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {}
  },

  pages: pages
}
