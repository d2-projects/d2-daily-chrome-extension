// 点击回调
function handleMenuClick(info, tab) {
  chrome.tabs.sendMessage(tab.id, {
    action: 'Hello'
  }, response => {
    console.log('response', response)
  });
}

// 所有的分类
var types = [ '新闻', '开源项目', '分享', '教程', '工具', '招聘', '设计' ]

var menus = types.map(type => {
  return chrome.contextMenus.create({
    title: type,
    onclick: handleMenuClick
  })
})
