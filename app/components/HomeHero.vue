<script setup lang="ts">
import type { HeroBlock } from '~/types/content'

const props = defineProps<{ hero?: HeroBlock | null }>()
const { locale, t } = useI18n()

const eyebrowText = computed(() => {
  const fromCms = pick(props.hero?.eyebrow)
  return fromCms || (locale.value === 'en' ? 'MINING AND CIVIL DIVISION' : 'DIVISI PERTAMBANGAN DAN SIPIL')
})

const headingText = computed(() => {
  const fromCms = pick(props.hero?.heading)
  return fromCms || (locale.value === 'en'
    ? 'Mining Contractor & Civil Engineering'
    : 'Kontraktor Pertambangan & Konstruksi Teknik')
})

const subheadingText = computed(() => {
  const fromCms = pick(props.hero?.subheading || props.hero?.description)
  return fromCms || (locale.value === 'en'
    ? 'PT Lobunta Mandiri Persada (LMP) is a premier mining and civil engineering contractor in Indonesia founded in 1973, with over 50+ years of proven track record supporting mining and infrastructure projects nationwide.'
    : 'PT Lobunta Mandiri Persada (LMP) adalah kontraktor pertambangan dan konstruksi teknik terkemuka di Indonesia yang didirikan pada tahun 1973, dengan pengalaman lebih dari 50+ tahun dalam mendukung berbagai proyek pertambangan dan pembangunan infrastruktur di seluruh Indonesia.')
})

const heroImage = computed(() => {
  return props.hero?.image || '/img/lmp/hero-mining-truck.jpg'
})

const primaryLabel = computed(() => {
  const fromCms = pick(props.hero?.ctaPrimary?.label || props.hero?.ctaProduct?.label)
  return fromCms || (locale.value === 'en' ? 'View Projects' : 'Lihat Proyek')
})

const primaryTo = computed(() => {
  return props.hero?.ctaPrimary?.to || props.hero?.ctaProduct?.to || '/projects'
})

const secondaryLabel = computed(() => {
  const fromCms = pick(props.hero?.ctaSecondary?.label || props.hero?.ctaContact?.label)
  return fromCms || (locale.value === 'en' ? 'Contact Us' : 'Hubungi Kami')
})

const secondaryTo = computed(() => {
  return props.hero?.ctaSecondary?.to || props.hero?.ctaContact?.to || '/contact'
})
</script>

<template>
  <section class="relative overflow-hidden bg-brand-900 text-white">
    <!-- Background Image with seamless dark green gradient blend -->
    <div class="absolute inset-0 z-0">
      <img
        :src="heroImage"
        :alt="headingText"
        class="h-full w-full object-cover object-right lg:object-[80%_center] select-none"
        fetchpriority="high"
      >
      <!-- Gradient overlay: Deep dark green on left fading to partial transparency on right -->
      <div class="absolute inset-0 bg-gradient-to-b from-brand-900/90 via-brand-900/80 to-brand-950 sm:bg-gradient-to-r sm:from-brand-900 sm:via-brand-900/95 sm:to-brand-900/35" />
      <div class="absolute inset-0 bg-radial-gradient from-brand-800/30 via-transparent to-transparent pointer-events-none" />
    </div>

    <!-- Hero Content -->
    <div class="container-page relative z-10 py-12 sm:py-20 lg:py-24">
      <div class="max-w-2xl">
        <!-- Eyebrow with gold accent bar -->
        <div class="flex items-center gap-2.5 sm:gap-3">
          <span class="inline-block h-[3px] w-6 sm:w-8 rounded-full bg-accent-500 shrink-0" />
          <span class="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-accent-300">
            {{ eyebrowText }}
          </span>
        </div>

        <!-- Main Headline -->
        <h1 class="mt-4 sm:mt-5 font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.18] sm:leading-[1.12] tracking-tight text-white">
          {{ headingText }}
        </h1>

        <!-- Subheading Paragraph -->
        <p class="mt-4 sm:mt-5 max-w-xl text-sm leading-relaxed text-slate-200/95 sm:text-base md:text-[17px]">
          {{ subheadingText }}
        </p>

        <!-- CTA Action Buttons -->
        <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <NuxtLink
            :to="`/${locale}${primaryTo}`"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-bold text-brand-950 shadow-md transition hover:bg-accent-400 active:scale-[0.98]"
          >
            <span>{{ primaryLabel }}</span>
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>

          <NuxtLink
            :to="`/${locale}${secondaryTo}`"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-[0.98]"
          >
            <UiIcon name="phone" :size="16" />
            <span>{{ secondaryLabel }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Bottom Strip: 3 Key Highlights with Gold Icons -->
    <div class="relative z-10 border-t border-white/15 bg-brand-950/85 backdrop-blur-md">
      <div class="container-page py-3.5 sm:py-5">
        <div class="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 text-left">
          <!-- Highlight 1: Experience -->
          <div class="flex items-center gap-3.5 py-3 sm:py-0 sm:pr-6">
            <span class="text-accent-500 shrink-0">
              <UiIcon name="calendar" :size="22" :stroke-width="1.8" />
            </span>
            <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {{ locale === 'en' ? '50+ YEARS EXPERIENCE' : '50+ TAHUN PENGALAMAN' }}
            </span>
          </div>

          <!-- Highlight 2: Nationwide Operation -->
          <div class="flex items-center gap-3.5 py-3 sm:py-0 sm:px-6">
            <span class="text-accent-500 shrink-0">
              <UiIcon name="map-pin" :size="22" :stroke-width="1.8" />
            </span>
            <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {{ locale === 'en' ? 'OPERATIONS ACROSS INDONESIA' : 'OPERASI DI SELURUH INDONESIA' }}
            </span>
          </div>

          <!-- Highlight 3: Core Disciplines -->
          <div class="flex items-center gap-3.5 py-3 sm:py-0 sm:pl-6">
            <span class="text-accent-500 shrink-0">
              <UiIcon name="truck-dump" :size="22" :stroke-width="1.8" />
            </span>
            <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {{ locale === 'en' ? 'MINING • CIVIL CONSTRUCTION • PLANT HIRE' : 'PERTAMBANGAN • KONSTRUKSI SIPIL • SEWA ALAT' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
