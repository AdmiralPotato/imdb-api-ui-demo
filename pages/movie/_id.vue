<template>
  <section class="container detail">
    <div class="row">
      <div class="col">
        <p><nuxt-link to="/">Home</nuxt-link></p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1>{{data.title}}</h1>
        <p>{{data.description}}</p>
      </div>
      <div class="col-3 poster"><img :src="data.poster.large" /></div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData (context) {
    let prefix = context.isServer ? 'http://' + context.req.headers.host : ''
    return axios.get(`${prefix}/api/movie/${context.params.id}`)
      .then((res) => {
        return { data: res.data }
      })
  }
}
</script>
