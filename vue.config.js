const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// Generate pages object
const pagesObj = {}

const chromeName = ['popup', 'options']

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    template: 'public/index.html',
    filename: `${name}.html`
  }
})

const manifestPath = process.env.NODE_ENV === 'production' ? 'src/manifest.production.json' : 'src/manifest.development.json'

const plugins = [
  CopyWebpackPlugin(
    [
      {
        from: path.resolve(manifestPath),
        to: `${path.resolve('dist')}/manifest.json`
      },
      {
        from: path.resolve('src/assets'),
        to: `${path.resolve('dist')}/assets`
      }
    ]
  )
]

module.exports = {
  pages: pagesObj,
  // // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  configureWebpack: {
    entry: {
      'content': './src/content/index.js',
      'background': './src/background/index.js'
    },
    output: {
      filename: 'js/[name].js'
    },
    plugins
  },
  css: {
    extract: {
      filename: 'css/[name].css'
    }
  },
  chainWebpack: config => {
    // 处理字体文件名，去除hash值
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'fonts/[name].[ext]'
      })
  }
}
