let axios = require('axios')

module.exports = {
  makeSingularGetterByPathTemplateFunction (pathTemplateFunction) {
    let inMemoryResultMap = {}
    return (id) => {
      return new Promise((resolve, reject) => {
        let cachedResult = inMemoryResultMap[id]
        if (!id) {
          throw new Error('Missing ID')
        } else if (cachedResult) {
          console.log(`Pull ${id}(${cachedResult.title}) from cache`)
          resolve(cachedResult)
        } else {
          axios.get(pathTemplateFunction(id))
            .then((result) => {
              if (result.data.title) {
                console.log(`Load ${id + result.data.title} from remote`)
                inMemoryResultMap[id] = result.data
                resolve(result.data)
              } else {
                throw new Error('No result by that id')
              }
            })
        }
      })
    }
  }
}
