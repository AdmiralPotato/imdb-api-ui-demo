<template>
  <section class="container">
    <div class="row">
      <div class="col">
        <h1>!!!Development In Progress!!!</h1>
        <p>Something is odd with the results from <code>http://www.theimdbapi.org/</code> - It's cutting the last character off a number of names.</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>Important people:</h3>
        <ul>
          <li v-for="item in people">
            <nuxt-link :to="'/actor/' + item.person_id">{{item.title}}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="col">
        <h3>Important movies:</h3>
        <ul>
          <li v-for="item in movies">
            <nuxt-link :to="'/movie/' + item.imdb_id">{{item.title}}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
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
  let popularMovieIdList = [
    'tt0092455',
    'tt0106145',
    'tt0111280',
    'tt0117731',
    'tt0120844'
  ]
  export default {
    asyncData (context) {
      let prefix = context.isServer ? 'http://' + context.req.headers.host : ''

      let peoplePromises = popularPeopleIdList.map((id) => {
        return axios.get(`${prefix}/api/person/${id}`)
      })
      let moviePromises = popularMovieIdList.map((id) => {
        return axios.get(`${prefix}/api/movie/${id}`)
      })
      let extractResponseData = response => response.data

      return Promise.all([
        Promise.all(peoplePromises),
        Promise.all(moviePromises)
      ])
        .then(([peopleResponses, movieResponses]) => {
          return {
            people: peopleResponses.map(extractResponseData),
            movies: movieResponses.map(extractResponseData)
          }
        })
    }
  }
</script>
