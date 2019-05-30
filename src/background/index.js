/* eslint-disable */

var menus = [
  '新闻',
  '开源项目',
  '分享',
  '教程',
  '网站',
  '工具',
  '设计',
  '招聘'
].map(category => {
  return chrome.contextMenus.create({
    title: category,
    onclick: function (info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'getInfo',
        category
      })
    }
  })
})
