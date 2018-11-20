export default function crawler () {
  return {
    name: document.title,
    note: document.title,
    url: location.href,
  }
}
