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
  let name = document.title
  let note = document.title
  switch (u.host) {
    case 'github.com': {
      name = split(document.title)[0]
      note = split(document.title)[1]
    }; break;
    case 'juejin.im': {
      name = split(document.title, ' - ')[0]
      note = split(document.title, ' - ')[1]
    }; break;
    case 'mp.weixin.qq.com': {
      name = document.querySelector('#activity-name').innerText
    }; break;
    case 'uimovement.com': {
      name = split(document.title, ' - ')[0]
      note = split(document.title, ' - ')[1]
    }; break;
    default: break;
  }
  return {
    name,
    note,
    url: location.href,
  }
}
