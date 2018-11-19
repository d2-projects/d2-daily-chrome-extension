// 响应 background 信息
chrome.extension.onMessage.addListener(
  function(request, sender, sendMessage) {
    alert(request.action)
    if (request.action == 'Hello') {
      sendMessage('1')
    } else {
      sendMessage('2')
    }
  }
)
