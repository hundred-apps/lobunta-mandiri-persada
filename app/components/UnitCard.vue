<script setup lang="ts">
import type { UnitItem } from '~/types/content'

defineProps<{ unit: UnitItem }>()

const STATUS_KEY: Record<UnitItem['status'], string> = {
  available: 'units.statusAvailable',
  maintenance: 'units.statusMaintenance',
  inactive: 'units.statusInactive'
}

const STATUS_CLASS: Record<UnitItem['status'], string> = {
  available: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  maintenance: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  inactive: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300'
}
</script>

<template>
  <article class="card flex flex-col overflow-hidden">
    <div class="aspect-[4/3] w-full bg-brand-50 dark:bg-white/5">
      <img
        v-if="unit.image"
        :src="unit.image"
        :alt="unit.name"
        class="h-full w-full object-cover"
        loading="lazy"
      >
      <div v-else class="grid h-full w-full place-items-center text-brand-300 dark:text-white/20">
        <UiIcon name="truck" :size="40" :stroke-width="1.3" />
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 p-4">
      <h3 class="text-sm">
        {{ unit.name }}
      </h3>
      <span class="inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold" :class="STATUS_CLASS[unit.status]">
        {{ $t(STATUS_KEY[unit.status]) }}
      </span>
    </div>
  </article>
</template>
