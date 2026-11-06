<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/types/content'

const props = defineProps<{ product: ProductItem; compact?: boolean }>()

const { data: categories } = await useCms<ProductCategory[]>('product-categories', 'all')
const { locale } = useI18n()

function categoryName(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? pick(found.name) : ''
}

const PREVIEW_LIMIT = 200

const description = computed(() => pick(props.product.description).trim())

const descriptionPreview = computed(() =>
  description.value.length > PREVIEW_LIMIT
    ? `${description.value.slice(0, PREVIEW_LIMIT).trimEnd()}…`
    : description.value
)

const hasMore = computed(() => description.value.length > PREVIEW_LIMIT)
</script>

<template>
  <NuxtLink
    :to="`/${locale}/products/${product.slug}`"
    class="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-[#fcfbfa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
  >
    <div class="relative aspect-[16/10] w-full overflow-hidden bg-stone-200 dark:bg-brand-950">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="pick(product.name)"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div
        v-else
        class="grid h-full w-full place-items-center bg-brand-900 text-accent-400"
      >
        <UiIcon name="truck" :size="48" :stroke-width="1.3" />
      </div>

      <div v-if="categoryName(product.categorySlug)" class="absolute top-3 left-3">
        <span class="inline-flex items-center rounded-lg bg-brand-950/80 px-2.5 py-1 text-[11px] font-bold text-accent-300 backdrop-blur-md">
          {{ categoryName(product.categorySlug) }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5 sm:p-6 justify-between">
      <div>
        <h3 class="font-display text-base sm:text-lg font-bold text-brand-950 dark:text-white transition-colors group-hover:text-accent-600 dark:group-hover:text-accent-400 leading-snug">
          {{ pick(product.name) }}
        </h3>

        <p v-if="description" class="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
          {{ descriptionPreview }}
        </p>
      </div>

      <div class="mt-5 pt-3.5 border-t border-stone-200/60 dark:border-white/10 flex items-center justify-between text-xs font-bold text-accent-600 dark:text-accent-400">
        <span>{{ locale === 'en' ? 'View Details' : 'Lihat Detail & Spesifikasi' }}</span>
        <UiIcon name="arrow-right" :size="14" class="transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </NuxtLink>
</template>
