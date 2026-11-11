<script setup lang="ts">
import type { ProductCategory } from '~/types/content'

const props = defineProps<{ category: ProductCategory; active?: boolean }>()
const { locale } = useI18n()
</script>

<template>
  <NuxtLink
    :to="`/${locale}/products?category=${category.slug}`"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border bg-[#fcfbfa] transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:bg-brand-900/40"
    :class="active ? 'border-accent-500 ring-2 ring-accent-500 bg-accent-50/20' : 'border-stone-200/90 dark:border-white/10'"
  >
    <div class="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-brand-950">
      <img
        v-if="category.image"
        :src="category.image"
        :alt="pick(category.name)"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div v-else class="grid h-full w-full place-items-center bg-gradient-to-br from-brand-900 to-brand-950 text-accent-400/80">
        <UiIcon name="factory" :size="40" :stroke-width="1.4" />
      </div>
      <span
        v-if="category.productCount > 0"
        class="absolute right-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-900 shadow-sm backdrop-blur dark:bg-brand-900/90 dark:text-accent-300"
      >
        {{ $t('products.itemsCount', { count: category.productCount }) }}
      </span>
    </div>

    <div class="flex flex-1 flex-col justify-between p-5 sm:p-6">
      <div>
        <h3 class="font-display text-lg font-bold text-brand-950 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400 sm:text-xl">
          {{ pick(category.name) }}
        </h3>

        <p class="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
          {{ pick(category.description) }}
        </p>

        <ul v-if="pickList(category.applications).length" class="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
          <li v-for="(item, index) in pickList(category.applications)" :key="index" class="flex items-start gap-2">
            <UiIcon name="check" :size="16" class="mt-0.5 shrink-0 text-accent-500" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-stone-200/60 pt-4 text-xs font-bold text-accent-600 dark:border-white/10 dark:text-accent-400">
        <span>{{ active ? (locale === 'en' ? 'Active Filter' : 'Filter Aktif') : (locale === 'en' ? 'Explore Category' : 'Lihat Layanan') }}</span>
        <UiIcon name="arrow-right" :size="14" class="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </NuxtLink>
</template>
