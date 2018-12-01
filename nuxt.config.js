const pkg = require('./package')
const bodyParser = require('body-parser')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00bfff', height: '5px', duration: 5000 },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'https://nuxt-app-ac0bc.firebaseio.com/'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  env: {
    fbAPIKey: 'AIzaSyAdS89o5BH29ycx6ufgHi2AxGh9xQwi-rk'
  },
  serverMiddleware: [
    bodyParser.json(),
    '~api'
  ]
}
