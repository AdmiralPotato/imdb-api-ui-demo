let shared = require('./shared')

let getMovieById = shared.makeSingularGetterByPathTemplateFunction(
  (id) => `http://www.theimdbapi.org/api/movie?movie_id=${id}`
)

module.exports = function (req, res, next) {
  console.log('movie:')
  let id = req.params[1]
  getMovieById(id)
    .then(res.apiRespondData)
    .catch(res.apiRespondError)
}
