import axios from 'axios'
import Swal from 'sweetalert2'
import crawler from './crawler'

const service = axios.create({
  baseURL: 'https://hellogithub.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  auth: {
    username: 'd2-awesome',
    password: 'bsXms5RrbOjOT1OdUYS96WKU+AJ4P2o1'
  }
})

// 响应 background 信息
chrome.extension.onMessage.addListener(
  function(request, sender, sendMessage) {
    // 获取页面信息
    if (request.action == 'getInfo') {
      const data = {
        ...crawler(),
        category: request.category,
        source: 'd2',
        device: 'chrome'
      }
      service({
        url: '/api/v1/project/recommend/',
        method: 'post',
        data
      })
        .then(res => {
          Swal({
            type: 'success',
            title: '提交成功',
            text: '谢谢您的分享，更多人会为此受益',
            footer: '<a href="https://awesome.fairyever.com/daily/">日报地址: https://awesome.fairyever.com/daily/</a>',
            timer: 5000
          })
        })
        .catch(err => {
          Swal({
            type: 'error',
            title: '发生了点意外',
            text: err.message,
            footer: '<a href="https://github.com/d2-projects/d2-awesome-daily-submit-chrome-extension/issues">反馈问题</a>',
            timer: 5000
          })
        })
      sendMessage()
    }
  }
)
