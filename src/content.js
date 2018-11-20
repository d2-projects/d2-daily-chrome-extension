import url from 'url'
import tool from './tool'
import template from './template'

// 响应 background 信息
chrome.extension.onMessage.addListener(
  function(request, sender, sendMessage) {
    // 获取页面信息
    if (request.action == 'getInfo') {
      sendMessage({
        name: document.title,
        note: document.title,
        url: location.href,
      })
    }
  }
)

// 自动提交
function submit () {
  const u = url.parse(location.href, true)
  const title = `🔗 日报提交 | ${u.query.name}`
  const body = template(u.query)
  document.querySelector('#issue_title').value = title
  document.querySelector('#issue_body').value = body
  // 提交
  const buttonSubmit = document.querySelector('#new_issue > div > div.discussion-timeline > div > div > div.form-actions > button')
  buttonSubmit.disabled = false
  buttonSubmit.click()
}

if (tool.isIssuePage()) submit()
