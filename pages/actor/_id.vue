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
  asyncData (context) {
    let prefix = context.isServer ? 'http://' + context.req.headers.host : ''
    return axios.get(`${prefix}/api/person/${context.params.id}`)
      .then((res) => {
        return { data: res.data }
      })
  }
}
</script>
