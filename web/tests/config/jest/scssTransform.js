module.exports = {
  process () {
    return 'module.exports = {};'
  },
  getCacheKey () {
    return 'scssTransform'
  }
}
