require('dotenv').config()

// there's a reason for explicitly un-specifying the host here;
// I'm working and testing on my dev box at http://localhost:port/
// but test mobile devices MUST access it via http://localNetworkHostname:port/
// reference: https://github.com/nuxt/nuxt.js/blob/a289a55a728c21083d1f9e6948790904e6fb0684/bin/nuxt-dev#L76
process.env.npm_package_config_nuxt_host = ''

module.exports = {
  /*
  ** Headers of the page
  */
  dev: process.env.dev || false,
  port: process.env.PORT || 3000,
  head: {
    title: 'imdb-api-ui-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Employers want examples of my ability to work with an API - so here it is' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: '/styles.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css',
        integrity: 'sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/api/start.js' },
    { path: '/api/person', handler: '~/api/person.js' },
    { path: '/api/movie', handler: '~/api/movie.js' },
    { path: '/api', handler: '~/api/error.js' }
  ]
}
