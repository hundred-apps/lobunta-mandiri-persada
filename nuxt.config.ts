export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/fonts', '@nuxt/icon'],
  icon: {
    serverBundle: 'local',
    clientBundle: { scan: true }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'PT Lobunta Mandiri Persada',
      meta: [
        { name: 'theme-color', content: '#007a36' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'PT Lobunta Mandiri Persada (LMP) adalah bagian dari LOBUNTA Group: kontraktor pertambangan bijih, kontraktor umum, plant hire, dan penyewaan alat berat dengan tenaga kerja lebih dari 600 orang.'
        },
        { property: 'og:site_name', content: 'PT Lobunta Mandiri Persada' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  routeRules: {
    '/admin/**': { ssr: false },
    '/services': { redirect: '/products' },
    '/services/**': { redirect: '/products' },
    '/id/services': { redirect: '/id/products' },
    '/id/services/**': { redirect: '/id/products' },
    '/en/services': { redirect: '/en/products' },
    '/en/services/**': { redirect: '/en/products' }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://be.lobuntamandiri.com/api/',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.lobunta.com'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config'
  },
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'id',
    langDir: 'locales',
    detectBrowserLanguage: false,
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    locales: [
      { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ]
  }
})