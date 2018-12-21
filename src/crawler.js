import url from 'url'
import { isGithub } from './tool'

export default function crawler () {

  function split (text, s = ': ') {
    const arr = text.split(s)
    const [ first, ...second ] = arr
    return [
      first,
      second.join(s)
    ]
  }

  // 如果是 github 项目地址，检查语言类型
  function getGithubInfo () {

    /**
     * 根据选择器获取内部的值
     * @param {String} selector 选择器
     * @param {*} def 查找失败后的默认返回值
     * @param {Function} handle 返回之前的处理函数
     */
    function getInnerText (selector = '', def = '', handle = function (t) { return t }) {
      const s = document.querySelector(selector)
      if (s) {
        return handle(s.innerText)
      } else {
        return def
      }
    }

    if (isGithub()) {
      // 语言
      const lang = getInnerText('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > button', [], function (text) {
        return text.split('\n').filter(e => e !== '')
      })
      githubInfo.lang = lang.length > 0 ? lang.join(',') : 'other'
      githubInfo.langPrimary = lang.length > 0 ? lang[0] : 'other'
      // watch
      githubInfo.watch = getInnerText('.pagehead-actions li:nth-child(1) form:nth-child(1) a', null)
      // star
      githubInfo.star = getInnerText('.pagehead-actions li:nth-child(2) form:nth-child(1) a', null, function (text) {
        return text.trim().replace(',', '')
      })
      // fork
      githubInfo.fork = getInnerText('.pagehead-actions li:nth-child(3) a.social-count', null)
    }
  }

  const parsedUrl = url.parse(location.href, true)

  let title = document.title
  let description = document.title
  // 如果是 github 开源仓库 获取 github 的数据
  let githubInfo = {
    lang: '',
    langPrimary: '',
    watch: null,
    star: null,
    fork: null
  }

  switch (parsedUrl.host) {
    case 'github.com': {
      title = split(document.title)[0]
      description = split(document.title)[1]
      getGithubInfo()
    }; break;
    case 'juejin.im': {
      title = split(document.title, ' - ')[0]
      description = split(document.title, ' - ')[1]
    }; break;
    case 'mp.weixin.qq.com': {
      title = document.querySelector('#activity-name').innerText
    }; break;
    case 'uimovement.com': {
      title = split(document.title, ' - ')[0]
      description = split(document.title, ' - ')[1]
    }; break;
    default: break;
  }
  // 保底
  title = title || location.href
  description = description || title
  // 返回数据
  return {
    title,
    description,
    url: location.href,
    ...githubInfo
  }
}
