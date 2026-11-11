<script setup lang="ts">
export interface IntegratedServiceItem {
  id: string | number
  title: string
  description: string
  image: string
  icon: string
  to: string
}

const props = defineProps<{
  service: IntegratedServiceItem
}>()

const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="service.to"
    class="group flex flex-col sm:flex-row gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#fcfbfa] dark:bg-brand-900/40 border border-stone-200/90 dark:border-white/10 hover:border-accent-400 dark:hover:border-accent-400/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Left Thumbnail Image -->
    <div class="w-full aspect-[16/10] sm:aspect-auto sm:w-44 md:w-48 lg:w-44 sm:self-stretch shrink-0 rounded-xl overflow-hidden bg-stone-200 dark:bg-brand-950">
      <img
        :src="service.image"
        :alt="service.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      >
    </div>

    <!-- Right Content (Title + Description) -->
    <div class="flex flex-col justify-start py-1 flex-1 min-w-0 pr-1">
      <h3 class="text-base sm:text-lg font-bold font-display text-brand-950 dark:text-white leading-tight group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
        {{ service.title }}
      </h3>

      <p class="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
        {{ service.description }}
      </p>

      <div class="mt-auto pt-3 flex items-center gap-1.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
        <span>{{ locale === 'en' ? 'Learn More' : 'Lihat Selengkapnya' }}</span>
        <UiIcon name="arrow-right" :size="13" class="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </NuxtLink>
</template>
