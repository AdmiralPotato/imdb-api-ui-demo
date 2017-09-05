let shared = require('./shared')

let getPersonById = shared.makeSingularGetterByPathTemplateFunction(
  (id) => `http://www.theimdbapi.org/api/person?person_id=${id}`
)

module.exports = function (req, res, next) {
  console.log('person:')
  let id = req.params[1]
  getPersonById(id)
    .then(res.apiRespondData)
    .catch(res.apiRespondError)
}
