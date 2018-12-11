import url from 'url'

export default function crawler () {
  function split (text, s = ': ') {
    const arr = text.split(s)
    const [ first, ...second ] = arr
    return [
      first,
      second.join(s)
    ]
  }
  const u = url.parse(location.href, true)
  let title = document.title
  let description = document.title
  switch (u.host) {
    case 'github.com': {
      title = split(document.title)[0]
      description = split(document.title)[1]
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
  return {
    title,
    description,
    url: location.href,
  }
}
