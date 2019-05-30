/* eslint-disable */

import url from 'url'
import $ from 'jquery'
import { isGithub } from './is'

export default function () {

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
      const doms = $('.pagehead-actions').eq(0).children()
      // 语言
      const lang = $('.repository-lang-stats-graph.js-toggle-lang-stats').text().split('\n').map(e => e.trim()).filter(e => e !== '')
      githubInfo.lang = lang.length > 0 ? lang.join(',') : 'other'
      githubInfo.langPrimary = lang.length > 0 ? lang[0] : 'other'
      // watch
      githubInfo.watch = doms.eq(doms.length - 3).find('a.social-count').html().trim().replace(',', '')
      // star
      githubInfo.star = doms.eq(doms.length - 2).find('a.social-count').html().trim().replace(',', '')
      // fork
      githubInfo.fork = doms.eq(doms.length - 1).find('a.social-count').html().trim().replace(',', '')
      console.log('githubInfo', githubInfo)
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
    ...githubInfo,
    isChinese: true,
    video: false,
    vpn: false
  }
}
