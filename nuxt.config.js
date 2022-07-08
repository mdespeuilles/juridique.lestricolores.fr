export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Les tricolores',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
    script: [
      { src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDrvGW4Tc6OqqJMJ_6yGVAXegFC8Ig3eLs&libraries=places", defer: true},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss',
    '~/assets/scss/loading.min.css',
    '~/assets/scss/hamburgers.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-select.js', mode: 'client' },
    { src: '~/plugins/vuejs-datepicker.js', mode: 'client' },
    { src: '~/plugins/vue-js-toggle-button.js', mode: 'client' },
    { src: '~plugins/vue-lazytube.js' , mode: 'client'},
    { src: '~plugins/filters.js' },
    { src: '~plugins/image.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/google-analytics'
  ],

  googleAnalytics: {
    id: 'UA-223469622-1'
  },

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      "Yeseva One": {
        wght: [400]
      },
      "Montserrat": {
        wght: [100,200,300,400,500,600,700],
        ital: [100,200,300,400,500,600,700]
      }
    },
    display: 'swap',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    '@nuxtjs/auth-next',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/mixins.scss',
    ]
  },

  dayjs: {
    locales: ['fr'],
    defaultLocale: 'fr',
    defaultTimeZone: 'Europe/Paris',
    plugins: [
      'utc',
      'timezone'
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://api.juridique.lestricolores.fr',
    //baseURL: 'http://localhost:1337',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          global: true
        },
        user: {
          property: ''
        },
        endpoints: {
          login: {
            url: '/api/auth/local',
            method: 'post',
            propertyName: 'jwt'
          },
          user: {
            url: '/api/users/me',
            method: 'get',
            propertyName: false
          },
          logout: true
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    stripeKey: process.env.STRIPE_KEY
  }
}
