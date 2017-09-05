module.exports = function (req, res, next) {
  console.log('/api: ' + req.url)
  let params = req.url.split('/')
  params.shift()
  req.params = params
  res.apiRespondData = (data) => {
    res.end(JSON.stringify(data, null, '\t'))
  }
  res.apiRespondError = (err) => {
    res.apiError = err
    next()
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  next()
}
