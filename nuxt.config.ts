export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    '~/stores/api.js'
  ],
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    'motion-v',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})