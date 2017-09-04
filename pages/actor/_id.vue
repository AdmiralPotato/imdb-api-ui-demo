<template>
  <section class="container detail">
    <p><nuxt-link to="/">Home</nuxt-link></p>
    <h1>{{data.title}}</h1>
    <p>{{data.description}}</p>
    <div class="poster"><img :src="data.image.poster" /></div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData ({ params }) {
    return axios.get(`http://www.theimdbapi.org/api/person?person_id=${params.id}`)
      .then((res) => {
        console.log(res.data)
        return { data: res.data }
      })
  }
}
</script>
