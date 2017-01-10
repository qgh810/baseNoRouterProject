var path = require('path')
var fs = require('fs')
var pages = []
var result = []
var htmlPageName = []

// 读取src/pages下面的带有.page.的文件 将其文件名push到pages种
var files = fs.readdirSync(path.resolve(__dirname, '../src/pages'))
files.forEach(function (fileName) {
  var reg = /\.page\./
  if (!reg.test(fileName)) return
  if (!fileName.split(reg)[0]) return
  if (!fileName.split(reg)[1]) return
  var page = {
    name: fileName.split(reg)[0],
    template: fileName.split(reg)[1]
  }
  pages.push(page)
})

// 定义类Page
var Page = function (name, template) {
  this.name = name
  this.filename = name + '.html'
  this.template = 'src/pages/' + name + '.page.' + template
  this.entry = './src/' + name + '.js'
  this.devChunks = [name, 'common', 'vendor']
  this.prodChunks = [name, 'common', 'vendor', 'manifest']
}
Page.prototype.setAttr = function (key, value) {
  this[key] = value
  return this
}

// 生成每个页面实例
pages.forEach(function (page) {
  // 这里会遍历所有读取到的页面文件
  // 如果某个页面有特殊配置改动的话在这里拦截
  result.push(new Page(page.name, page.template))
})

module.exports = result
