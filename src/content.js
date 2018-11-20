import crawler from './crawler'
import './submit'

// 响应 background 信息
chrome.extension.onMessage.addListener(
  function(request, sender, sendMessage) {
    // 获取页面信息
    if (request.action == 'getInfo') {
      sendMessage(crawler())
    }
  }
)
