<script setup lang="ts">
import type { ProductCategory, ProductItem } from '~/types/content'

const route = useRoute()
const { locale, t } = useI18n()

const slug = computed(() => String(route.params.slug || ''))
const { data: products } = await useCmsReady<ProductItem[]>('products', 'published')
const { data: categories } = await useCmsReady<ProductCategory[]>('product-categories', 'all')
const { data: settings } = useStaticCompany()

const product = computed(() => products.value.find((item) => item.slug === slug.value) ?? null)
const category = computed(() => categories.value.find((item) => item.slug === product.value?.categorySlug) ?? null)
const related = useState<ProductItem[]>(`related:${slug.value}`, () => {
  const pool = products.value.filter(
    (item) => item.slug !== slug.value && item.categorySlug === product.value?.categorySlug
  )
  const copy = [...pool]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i] as ProductItem
    copy[i] = copy[j] as ProductItem
    copy[j] = tmp
  }
  return copy.slice(0, 4)
})

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

const waHref = computed(() => {
  const title = pick(product.value!.name)
  const message = locale.value === 'en'
    ? `Hello, I would like to ask about the service ${title}.`
    : `Halo, saya ingin bertanya tentang layanan ${title}.`
  return whatsappLink(String(settings.value?.whatsapp || ''), message)
})

useSeoMeta({
  title: () => `${pick(product.value!.name)}  | PT Lobunta Mandiri Persada`,
  description: () => pick(product.value!.description)
})

const { trackView } = useContentSource()
onMounted(() => {
  if (product.value) trackView('/product-view', product.value.id).catch(() => {})
})
</script>

<template>
  <div v-if="product">
    <section class="section">
      <div class="container-page">
        <div class="card overflow-hidden">
          <div class="grid md:grid-cols-[280px_1fr]">
            <div class="grid place-items-center bg-brand-50 p-4 dark:bg-white/5">
              <img
                v-if="product.image"
                :src="product.image"
                :alt="pick(product.name)"
                class="h-full w-full object-contain"
              >
              <div v-else class="grid h-full min-h-[200px] w-full place-items-center text-brand-300 dark:text-white/20">
                <UiIcon name="lab" :size="48" :stroke-width="1.2" />
              </div>
            </div>

            <div class="p-6">
              <span v-if="category" class="chip">{{ pick(category.name) }}</span>
              <h1 class="mt-3 text-2xl">
                {{ pick(product.name) }}
              </h1>
              <p class="prose-lkr mt-4 text-sm">
                {{ pick(product.description) }}
              </p>
              <div class="mt-6 flex flex-wrap gap-3">
                <a :href="waHref" target="_blank" rel="noopener" class="btn-primary">
                  <UiIcon name="whatsapp" :size="16" :filled="true" />
                  {{ $t('services.contactCta') }}
                </a>
                <NuxtLink :to="`/${locale}/products${category ? `?category=${category.slug}` : ''}`" class="btn-outline">
                  {{ $t('products.backToProducts') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :heading="$t('products.relatedTitle')" align="left" />
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            v-for="item in related"
            :key="item.id"
            :product="item"
            compact
          />
        </div>
      </div>
    </section>
  </div>
</template>
