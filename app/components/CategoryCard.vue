<script setup lang="ts">
import type { ProductCategory } from '~/types/content'

const props = defineProps<{ category: ProductCategory; active?: boolean }>()
const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/${locale}/products?category=${category.slug}`"
    class="group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg bg-[#fcfbfa] dark:bg-brand-900/40"
    :class="active ? 'ring-2 ring-accent-500 border-accent-500 bg-accent-50/20' : 'border-stone-200/90 dark:border-white/10'"
  >
    <div>
      <div class="flex items-start justify-between gap-4">
        <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-900 text-accent-400 shadow-sm transition-colors group-hover:bg-accent-500 group-hover:text-brand-950 dark:bg-white/10">
          <UiIcon :name="category.icon" :size="24" :stroke-width="1.8" />
        </span>
        <span v-if="category.productCount > 0" class="inline-flex items-center rounded-full bg-accent-100 dark:bg-accent-950/60 px-3 py-1 text-xs font-bold text-accent-800 dark:text-accent-300">
          {{ $t('products.itemsCount', { count: category.productCount }) }}
        </span>
      </div>

      <h3 class="mt-5 font-display text-lg sm:text-xl font-bold text-brand-950 dark:text-white transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400">
        {{ pick(category.name) }}
      </h3>

      <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {{ pick(category.description) }}
      </p>

      <ul v-if="pickList(category.applications).length" class="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <li v-for="(item, index) in pickList(category.applications)" :key="index" class="flex items-start gap-2">
          <UiIcon name="check" :size="16" class="mt-0.5 text-accent-500 shrink-0" />
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-6 pt-4 border-t border-stone-200/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-accent-600 dark:text-accent-400">
      <span>{{ active ? (locale === 'en' ? 'Active Filter' : 'Filter Aktif') : (locale === 'en' ? 'Explore Category' : 'Lihat Layanan') }}</span>
      <UiIcon name="arrow-right" :size="14" class="transition-transform group-hover:translate-x-1" />
    </div>
  </NuxtLink>
</template>
