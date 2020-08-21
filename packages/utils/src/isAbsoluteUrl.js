export default url => {
  return url && /^https?/.test(String(url))
}
