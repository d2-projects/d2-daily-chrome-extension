import url from 'url'
import setting from './setting'

let tool = {}

// 判断当前页面是否为 issue 提交页面
tool.isIssuePage = function () {
  const u = url.parse(location.href, true)
  return `${u.protocol}//${u.host}${u.pathname}` === setting.issuePage
}

// 获取当前日期
tool.getDate = function () {
  const dt = new Date()
  let year = dt.getFullYear()
  let month = dt.getMonth() + 1
  let day = dt.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return `${year}年${month}月${day}日`
}

export default tool
