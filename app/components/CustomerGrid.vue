<script setup lang="ts">
import type { CustomerItem } from '~/types/content'

defineProps<{ items: CustomerItem[] }>()
const { locale } = useI18n()
</script>

<template>
  <ul class="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="item in items"
      :key="item.id"
      class="group flex h-full items-start gap-4 rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
    >
      <!-- Logo Box -->
      <span class="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-stone-200/80 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-brand-950">
        <img
          v-if="item.logo"
          :src="item.logo"
          :alt="item.name"
          class="h-full w-full object-contain"
          loading="lazy"
        >
        <span v-else class="font-display text-sm font-extrabold text-brand-900 dark:text-accent-400">
          {{ item.name.slice(0, 2).toUpperCase() }}
        </span>
      </span>

      <!-- Client Info -->
      <span class="flex min-w-0 flex-1 flex-col">
        <span class="block font-display text-base font-bold leading-snug text-brand-950 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
          {{ item.name }}
        </span>

        <span class="mt-1 block min-h-[2rem] text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
          {{ pick(item.industry) || (locale === 'en' ? 'Strategic Business Partner' : 'Mitra Bisnis Strategis') }}
        </span>

        <span
          v-if="item.type"
          class="mt-auto inline-flex self-start rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm"
          :class="item.type === 'mining'
            ? 'bg-accent-100 text-accent-800 dark:bg-accent-950/60 dark:text-accent-300'
            : 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200'"
        >
          {{ item.type === 'mining' ? $t('customers.typeMining') : $t('customers.typeCivil') }}
        </span>
        <span v-else class="mt-auto block min-h-[1.25rem]" />
      </span>
    </li>
  </ul>
</template>
