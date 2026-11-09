<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

defineProps<{ project: ProjectItem }>()
const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/${locale}/projects/${project.slug}`"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-[#fcfbfa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
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

    </div>

    <!-- Content Card -->
    <div class="flex min-h-[168px] flex-1 flex-col justify-between p-5 sm:min-h-[180px] sm:p-6">
      <div>
        <div class="flex min-h-[1.5rem] flex-wrap items-center gap-2">
          <p class="truncate text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400">
            {{ project.clientName || '\u00A0' }}
          </p>
          <span
            v-if="project.type"
            class="inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            :class="project.type === 'mining'
              ? 'bg-accent-100 text-accent-800 dark:bg-accent-950/60 dark:text-accent-300'
              : 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200'"
          >
            {{ project.type === 'mining' ? $t('projects.typeMining') : $t('projects.typeCivil') }}
          </span>
        </div>

        <!-- Project Title -->
        <h3 class="mt-2 line-clamp-3 font-display text-base font-bold leading-snug text-brand-950 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400 sm:text-lg">
          {{ pick(project.name) }}
        </h3>

        <!-- Site Location -->
        <p class="mt-2.5 flex min-h-[1.25rem] items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <UiIcon name="map-pin" :size="14" class="shrink-0 text-accent-500" />
          <span class="truncate">{{ project.siteAddress || (locale === 'en' ? 'Location —' : 'Lokasi —') }}</span>
        </p>
      </div>

      <!-- Footer -->
      <div class="mt-5 flex items-center justify-end border-t border-stone-200/60 pt-3.5 text-xs dark:border-white/10">
        <span class="inline-flex items-center gap-1 font-bold text-accent-600 dark:text-accent-400">
          <span>{{ $t('common.learnMore') }}</span>
          <UiIcon name="arrow-right" :size="13" class="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
