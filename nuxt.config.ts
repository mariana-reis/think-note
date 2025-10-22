export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/icon'],
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
    },
    externals: {
      inline: ['.prisma/client'],
    },
  },
  
   vite: {
    ssr: {
      noExternal: ['@prisma/client'],
    },
  },
  
  compatibilityDate: '2024-11-01',
})