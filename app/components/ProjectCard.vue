<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

defineProps<{ project: ProjectItem }>()
const { locale } = useI18n()

function formatValue(value: number): string {
  if (!value) return ''
  return new Intl.NumberFormat(locale.value === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value)
}
</script>

<template>
  <NuxtLink
    :to="`/${locale}/projects/${project.slug}`"
    class="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-[#fcfbfa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
  >
    <!-- Project Photo / Visual Thumbnail -->
    <div class="relative aspect-[16/10] w-full overflow-hidden bg-stone-200 dark:bg-brand-950">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="pick(project.name)"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div
        v-else
        class="grid h-full w-full place-items-center bg-gradient-to-br from-brand-900 to-brand-950 text-accent-400"
      >
        <UiIcon name="factory" :size="48" :stroke-width="1.3" />
      </div>

      <!-- Top Overlay Badges -->
      <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
        <span v-if="project.year" class="inline-flex items-center rounded-lg bg-brand-950/85 px-2.5 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-md">
          {{ project.year }}
        </span>

        <span v-if="project.type" class="inline-flex items-center rounded-lg bg-accent-500 px-2.5 py-1 text-[11px] font-bold text-brand-950 shadow-sm">
          {{ project.type === 'mining' ? $t('projects.typeMining') : $t('projects.typeCivil') }}
        </span>
      </div>
    </div>

    <!-- Content Card -->
    <div class="flex flex-1 flex-col p-5 sm:p-6 justify-between">
      <div>
        <!-- Client Name -->
        <p v-if="project.clientName" class="text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400 truncate">
          {{ project.clientName }}
        </p>

        <!-- Project Title -->
        <h3 class="mt-1.5 font-display text-base sm:text-lg font-bold text-brand-950 dark:text-white leading-snug group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
          {{ pick(project.name) }}
        </h3>

        <!-- Site Location -->
        <p v-if="project.siteAddress" class="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <UiIcon name="map-pin" :size="14" class="text-accent-500 shrink-0" />
          <span class="truncate">{{ project.siteAddress }}</span>
        </p>
      </div>

      <!-- Footer Info (Contract Value & Link) -->
      <div class="mt-5 pt-3.5 border-t border-stone-200/60 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
        <div>
          <span v-if="project.contractValue" class="inline-block font-mono font-bold text-brand-900 dark:text-accent-300">
            {{ formatValue(project.contractValue) }}
          </span>
          <span v-else class="text-slate-400">
            {{ locale === 'en' ? 'Completed' : 'Selesai' }}
          </span>
        </div>

        <span class="inline-flex items-center gap-1 font-bold text-accent-600 dark:text-accent-400">
          <span>{{ $t('common.learnMore') }}</span>
          <UiIcon name="arrow-right" :size="13" class="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
