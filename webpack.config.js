const path = require('path')

module.exports = {
  // 多入口 多输出
  entry: {
    background: './background.js',
    content: './content.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
