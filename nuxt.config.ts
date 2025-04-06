export default defineNuxtConfig({
  modules: ['@prisma/nuxt', '@vueuse/nuxt', '@nuxt/icon'],
  devtools: { enabled: true },
  
  css: ['~/assets/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    prerender: {
      routes: ['/login']
    }
  },
  compatibilityDate: '2024-11-01',
})