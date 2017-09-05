module.exports = function (req, res, next) {
  console.error(res.apiError.message)
  res.statusCode = res.apiError ? 400 : 404
  res.end(JSON.stringify({
    error: res.apiError ? res.apiError.message : res.statusCode
  }, null, '\t'))
}
