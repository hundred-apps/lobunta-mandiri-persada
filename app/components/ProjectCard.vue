<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

defineProps<{ project: ProjectItem }>()

const { locale } = useI18n()

/** Nilai kontrak dalam format Rupiah ringkas (mis. Rp 4,3 M). */
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
    class="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-500/50"
  >
    <div class="aspect-[16/10] w-full overflow-hidden bg-brand-50 dark:bg-white/5">
      <img
        v-if="project.image"
        :src="project.image"
        :alt="pick(project.name)"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div
        v-else
        class="grid h-full w-full place-items-center bg-gradient-to-br from-brand-600 to-brand-800 text-white/90"
      >
        <UiIcon name="factory" :size="46" :stroke-width="1.3" />
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-center gap-2 text-xs text-ink-mute">
        <span v-if="project.year" class="chip">{{ project.year }}</span>
        <span v-if="project.type" class="chip">{{ project.type === 'mining' ? $t('projects.typeMining') : $t('projects.typeCivil') }}</span>
        <span>{{ project.siteAddress }}</span>
      </div>
      <h3 class="mt-2 text-base">
        {{ pick(project.name) }}
      </h3>
      <p v-if="project.clientName" class="mt-2 line-clamp-2 text-sm text-ink-soft dark:text-slate-400">
        {{ project.clientName }}
      </p>
      <div class="mt-auto flex items-center justify-between gap-3 pt-4">
        <span v-if="project.contractValue" class="font-mono text-xs text-ink-mute">
          {{ formatValue(project.contractValue) }}
        </span>
        <span class="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:text-brand-500 dark:text-brand-300">
          {{ $t('common.learnMore') }}
          <UiIcon name="arrow-right" :size="15" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
