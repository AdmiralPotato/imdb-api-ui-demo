<template>
  <section class="container">
    <h1>!!!Development In Progress!!!</h1>

    <p>Something is odd with the results from <code>http://www.theimdbapi.org/</code> - It's cutting the last character off a number of names.</p>

    <h3>Important people:</h3>
    <ul>
      <li v-for="person in people">
        <nuxt-link :to="'/actor/' + person.person_id">{{person.title}}</nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script>
  import axios from 'axios'
  let popularPeopleIdList = [
    'nm0001772',
    'nm0000653',
    'nm0000408',
    'nm0000996',
    'nm0000642',
    'nm0000373',
    'nm0000533'
  ]
  export default {
    asyncData (context) {
      let prefix = context.isServer ? 'http://' + context.req.headers.host : ''

      let promiseList = popularPeopleIdList.map((personId) => {
        return axios.get(`${prefix}/api/person/${personId}`)
      })

      return Promise.all(promiseList)
        .then((responseList) => {
          let people = responseList.map((response) => { return response.data })
          return { people: people }
        })
    }
  }
</script>
