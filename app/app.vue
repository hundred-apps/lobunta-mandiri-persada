<script setup lang="ts">
const { locale } = useI18n()
const { data: company } = useStaticCompany()

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'en' ? 'en-US' : 'id-ID' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: company.value?.logo || '/favicon.ico' }
  ]
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
