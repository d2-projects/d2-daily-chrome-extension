export function isGithub () {
  return /^https:\/\/github.com\/[^\/]+\/[^\/]+$/.test(location.href)
}
