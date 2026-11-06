<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/types/content'

const props = defineProps<{ product: ProductItem; compact?: boolean }>()

const { data: categories } = await useCms<ProductCategory[]>('product-categories', 'all')
const { locale } = useI18n()

function categoryName(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? pick(found.name) : ''
}

/** Batas karakter deskripsi yang tampil di kartu. */
const PREVIEW_LIMIT = 220

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
    class="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-500/50"
  >
    <div class="aspect-[4/3] w-full overflow-hidden bg-brand-50 dark:bg-white/5">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="pick(product.name)"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <div
        v-else
        class="grid h-full w-full place-items-center text-brand-300 dark:text-white/20"
      >
        <UiIcon name="lab" :size="46" :stroke-width="1.3" />
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5">
      <span v-if="categoryName(product.categorySlug)" class="chip">
        {{ categoryName(product.categorySlug) }}
      </span>
      <h3 class="mt-3 text-base">
        {{ pick(product.name) }}
      </h3>
      <p v-if="description" class="prose-lkr mt-2 flex-1 line-clamp-4 text-sm">
        {{ descriptionPreview }}
      </p>
      <span
        v-if="hasMore"
        class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:text-brand-500 dark:text-brand-300"
      >
        {{ $t('products.seeMore') }}
        <UiIcon name="arrow-right" :size="15" />
      </span>
    </div>
  </NuxtLink>
</template>