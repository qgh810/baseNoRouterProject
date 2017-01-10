var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var autoprefixer = require('autoprefixer')

// 样式表需要兼容的最低系统或浏览器版本
var AUTOPREFIXER_BROWSERS = [
  // 'Android 2.3',
  'Android >= 4',
  'Chrome >= 36',
  'Explorer >= 8',
  'iOS >= 7',
  'Safari >= 7'
]

var entry = {}
config.pages.forEach((page) => {
  entry[page.name] = page.entry
})

module.exports = {
  entry: entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules|static/
      }
    ],
    loaders: [
      {
        test: /\.jade$/,
        loader: 'template-html-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  postcss: function () {
    return [autoprefixer({browsers: AUTOPREFIXER_BROWSERS})]
  }
}
