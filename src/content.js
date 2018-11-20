import { issuePage } from './setting'
import url from 'url'

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

// 判断当前页面是否为 issue 提交页面
function isIssuePage () {
  const u = url.parse(location.href, true)
  return `${u.protocol}//${u.host}${u.pathname}` === issuePage
}

// 获取当前日期
function getDate () {
  const dt = new Date()
  let year = dt.getFullYear()
  let month = dt.getMonth() + 1
  let day = dt.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return `${year}年${month}月${day}日`
}

// 自动提交
function autoSubmit () {
  
  const u = url.parse(location.href, true)

  const title = `🔗 日报提交 | ${u.query.name}`
  const body = `
**:hash: 标题** : ${u.query.name}

**:page_with_curl: 介绍** : ${u.query.note}

**:link: 链接** : [${u.query.url}](${u.query.url})

**:pencil2: Markdown**

\`\`\`
- name: ${u.query.type}
  list:
  - name: ${u.query.name}
    note: ${u.query.note}
    url: ${u.query.url}
\`\`\`

**:space_invader: JSON**

\`\`\` js
${JSON.stringify(u.query)}
\`\`\`

> \`${getDate()}\` | 来自 Chrome 插件分享
`.trim()
  
  document.querySelector('#issue_title').value = title
  document.querySelector('#issue_body').value = body
  
  // 提交
  const buttonSubmit = document.querySelector('#new_issue > div > div.discussion-timeline > div > div > div.form-actions > button')
  buttonSubmit.disabled = false
  buttonSubmit.click()
}

if (isIssuePage()) autoSubmit()
