var menus = [
  '新闻',
  '开源项目',
  '分享',
  '教程',
  '工具',
  '招聘',
  '设计'
].map(type => {
  return chrome.contextMenus.create({
    title: type,
    onclick: function (info, tab) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'getInfo',
        type
      })
    }
  })
})
