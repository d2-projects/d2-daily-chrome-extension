import {
  Message
} from 'element-ui'

// 发现element的字体文件无法通过打包加载，所以另外通过cdn来加载样式
let elementCss = document.createElement('link')
elementCss.href = 'https://unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css'
elementCss.rel = 'stylesheet'
document.head.append(elementCss)

// Message({
//   type: 'info',
//   message: '你好'
// })

console.log('Hello')