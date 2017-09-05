let axios = require('axios')

let inMemoryActorMap = {}

let getActorById = (id) => {
  return new Promise((resolve, reject) => {
    let cachedActor = inMemoryActorMap[id]
    if (!id) {
      throw new Error('Missing ID')
    } else if (cachedActor) {
      console.log(`actor: Display ${id + cachedActor.title} from cache`)
      resolve(cachedActor)
    } else {
      axios.get(`http://www.theimdbapi.org/api/person?person_id=${id}`)
        .then((result) => {
          if (result.data.title) {
            console.log(`actor: Load ${id + result.data.title} from remote`)
            inMemoryActorMap[id] = result.data
            resolve(result.data)
          } else {
            throw new Error('No person by that id')
          }
        })
    }
  })
}

module.exports = function (req, res, next) {
  console.log('actor: i got this')
  let id = req.params[1]
  getActorById(id)
    .then(res.apiRespondData)
    .catch(res.apiRespondError)
}
