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
    if (isGithub()) {
      // 语言
      githubInfo.lang = (document.querySelector('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > button').innerText || '')
        .split('\n')
        .filter(e => e !== '')
      // watch
      githubInfo.watch = document.querySelector('.pagehead-actions li:nth-child(1) form:nth-child(1) a').innerText
      // star
      githubInfo.star = document.querySelector('.pagehead-actions li:nth-child(2) form:nth-child(1) a').innerText.trim().replace(',', '')
      // fork
      githubInfo.fork = document.querySelector('.pagehead-actions li:nth-child(3) a.social-count').innerText
    }
  }

  const parsedUrl = url.parse(location.href, true)

  let title = document.title
  let description = document.title
  // 如果是 github 开源仓库 获取 github 的数据
  let githubInfo = {
    lang: [],
    watch: '',
    star: '',
    fork: ''
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
