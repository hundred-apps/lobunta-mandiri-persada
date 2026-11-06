<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/types/content'

const { locale, t } = useI18n()
const route = useRoute()

const { data: categories } = await useCms<ProductCategory[]>('product-categories', 'all')
const { data: products } = await useCms<ProductItem[]>('products', 'published')
const { data: settings } = useStaticCompany()

const keyword = ref('')
const activeCategory = ref(typeof route.query.category === 'string' ? route.query.category : 'all')
const productsSection = ref<HTMLElement | null>(null)

watch(() => route.query.category, (slug) => {
  activeCategory.value = typeof slug === 'string' ? slug : 'all'
  if (activeCategory.value !== 'all') {
    productsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})

const filteredProducts = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  return products.value.filter((product) => {
    const matchCategory = activeCategory.value === 'all' || product.categorySlug === activeCategory.value
    if (!matchCategory) return false
    if (!query) return true
    const haystack = [product.name.id, product.name.en].join(' ').toLowerCase()
    return haystack.includes(query)
  })
})

useSeoMeta({
  title: () => `${t('products.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('products.intro')
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100">
    <PageHero
      :eyebrow="$t('nav.products')"
      :title="$t('products.heading')"
      :intro="$t('products.intro')"
    />

    <!-- Kategori Layanan Utama -->
    <section v-if="categories.length" class="section">
      <div class="container-page">
        <div class="flex items-center gap-2.5 mb-8">
          <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
          <h2 class="font-display text-xl sm:text-2xl font-bold tracking-tight text-brand-950 dark:text-white">
            {{ locale === 'en' ? 'Core Business Sectors' : 'Divisi & Bidang Layanan Utama' }}
          </h2>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            v-for="category in categories"
            :key="category.id"
            :category="category"
            :active="category.slug === activeCategory"
          />
        </div>
      </div>
    </section>

    <!-- Katalog Layanan & Filter -->
    <section ref="productsSection" class="section bg-[#faf9f5] dark:bg-brand-900/30 border-t border-stone-200/70 dark:border-white/5 scroll-mt-20">
      <div class="container-page">
        <!-- Filter Toolbar -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80 dark:border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'SERVICE CATALOG' : 'KATALOG LAYANAN LENGKAP' }}
              </span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">
              {{ $t('products.title') }}
            </h2>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="relative">
              <input
                v-model="keyword"
                type="search"
                class="field pl-10 pr-4 sm:w-64"
                :placeholder="$t('products.searchPlaceholder')"
              >
              <UiIcon name="target" :size="16" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <select v-model="activeCategory" class="field sm:w-60 font-medium">
              <option value="all">
                {{ $t('products.allCategories') }}
              </option>
              <option v-for="category in categories" :key="category.slug" :value="category.slug">
                {{ pick(category.name) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Product Cards Grid -->
        <div v-if="filteredProducts.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-else class="mt-12 text-center py-12 rounded-2xl border border-dashed border-stone-300 dark:border-white/10 bg-white/50 dark:bg-brand-900/20">
          <UiIcon name="truck" :size="40" class="mx-auto text-slate-400 mb-3" />
          <p class="font-display font-semibold text-base text-brand-950 dark:text-white">
            {{ $t('products.empty') }}
          </p>
          <p class="text-xs text-slate-500 mt-1">
            {{ locale === 'en' ? 'Try adjusting your search or category filter.' : 'Coba ubah kata kunci pencarian atau filter kategori.' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Consultation Card -->
    <section class="section">
      <div class="container-page">
        <div class="rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-8 sm:p-10 shadow-card dark:border-white/10 dark:bg-brand-900/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="max-w-2xl">
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ locale === 'en' ? 'PROJECT CONSULTATION' : 'KONSULTASI SPESIFIKASI PROYEK' }}
            </span>
            <h2 class="mt-2 font-display text-xl sm:text-2xl font-bold text-brand-950 dark:text-white">
              {{ $t('products.catalogNote') }}
            </h2>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ locale === 'en'
                ? 'Contact our engineering team to discuss operational volume, mine plan requirements, or civil contract specifications.'
                : 'Hubungi tim teknis kami untuk mendiskusikan volume operasional, rencana tambang, atau spesifikasi kontrak pekerjaan konstruksi.'
              }}
            </p>
          </div>

          <NuxtLink
            :to="`/${locale}/contact`"
            class="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-bold text-brand-950 shadow-md transition hover:bg-accent-400 shrink-0"
          >
            <UiIcon name="phone" :size="16" />
            <span>{{ $t('home.ctaButton') }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
