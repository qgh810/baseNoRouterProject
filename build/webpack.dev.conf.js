var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var htmlWebpackPlugins = []
config.pages.forEach((page) => {
  // 为每个入口添加热替换
  baseWebpackConfig.entry[page.name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[page.name])

  // 为每个页面配置对应的入口模板文件
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    filename: page.filename,
    template: page.template,
    chunks: page.devChunks,
    inject: true
  }))
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders()
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // https://github.com/ampedandwired/html-webpack-plugin
  ].concat(htmlWebpackPlugins)
})
