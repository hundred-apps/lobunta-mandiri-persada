<script setup lang="ts">
import type { PostItem } from '~/types/content'

const { locale, t } = useI18n()
const route = useRoute()

const { data: posts } = await useCms<PostItem[]>('posts', 'all')
const { data: settings } = useStaticCompany()

const page = ref(Number(route.query.page) || 1)
const limit = 9

const allPosts = computed(() => [...(posts.value || [])].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
))

const totalPages = computed(() => Math.max(1, Math.ceil(allPosts.value.length / limit)))
const paginatedPosts = computed(() => {
  const start = (page.value - 1) * limit
  return allPosts.value.slice(start, start + limit)
})

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString(locale.value === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

useSeoMeta({
  title: () => `${t('meta.blogTitle')} | PT Lobunta Mandiri Persada`,
  description: () => t('meta.blogDescription')
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100 min-h-screen">
    <PageHero
      :eyebrow="$t('nav.blog')"
      :title="$t('blog.heading')"
      :intro="$t('blog.intro')"
    />

    <!-- Blog Articles Grid -->
    <section class="section">
      <div class="container-page">
        <div v-if="paginatedPosts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="post in paginatedPosts"
            :key="post.id"
            class="group flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-[#fcfbfa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
          >
            <div>
              <NuxtLink :to="`/${locale}/blog/${post.slug}`" class="block aspect-[16/10] overflow-hidden bg-stone-200 dark:bg-brand-950">
                <img
                  v-if="post.cover"
                  :src="post.cover"
                  :alt="pick(post.title)"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                >
                <div v-else class="grid h-full w-full place-items-center bg-brand-900 text-accent-400">
                  <UiIcon name="document" :size="48" :stroke-width="1.3" />
                </div>
              </NuxtLink>

              <div class="p-5 sm:p-6">
                <!-- Meta: Date & Category -->
                <div class="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span class="inline-flex items-center gap-1">
                    <UiIcon name="calendar" :size="13" class="text-accent-500" />
                    <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
                  </span>

                  <span v-if="post.category?.id" class="rounded-md bg-accent-100 dark:bg-accent-950/60 px-2 py-0.5 text-[10px] font-bold text-accent-800 dark:text-accent-300">
                    {{ pick(post.category) }}
                  </span>
                </div>

                <!-- Title -->
                <NuxtLink :to="`/${locale}/blog/${post.slug}`" class="block">
                  <h3 class="font-display text-base sm:text-lg font-bold text-brand-950 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400 leading-snug">
                    {{ pick(post.title) }}
                  </h3>
                </NuxtLink>

                <!-- Excerpt -->
                <p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {{ pick(post.excerpt) }}
                </p>
              </div>
            </div>

            <!-- Card Footer -->
            <div class="p-5 sm:p-6 pt-0">
              <div class="pt-3.5 border-t border-stone-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                <span v-if="post.author" class="text-slate-500 font-medium">
                  {{ post.author }}
                </span>
                <span v-else class="text-slate-400">PT LMP</span>

                <NuxtLink
                  :to="`/${locale}/blog/${post.slug}`"
                  class="inline-flex items-center gap-1 font-bold text-accent-600 dark:text-accent-400 hover:text-accent-700"
                >
                  <span>{{ locale === 'en' ? 'Read Article' : 'Baca Selengkapnya' }}</span>
                  <UiIcon name="arrow-right" :size="13" class="transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 rounded-2xl border border-dashed border-stone-300 dark:border-white/10 bg-white/50 dark:bg-brand-900/20">
          <UiIcon name="document" :size="40" class="mx-auto text-slate-400 mb-3" />
          <h3 class="font-display font-semibold text-base text-brand-950 dark:text-white">
            {{ locale === 'en' ? 'No Articles Published Yet' : 'Belum Ada Artikel' }}
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            {{ locale === 'en' ? 'Stay tuned for updates and industry insights.' : 'Nantikan kabar terkini dan wawasan industri dari kami.' }}
          </p>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-2">
          <NuxtLink
            v-for="p in totalPages"
            :key="p"
            :to="{ query: { ...route.query, page: p } }"
            class="h-10 w-10 grid place-items-center rounded-xl text-xs font-bold transition shadow-sm"
            :class="p === page
              ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950'
              : 'border border-stone-200 bg-white text-slate-700 hover:bg-stone-100 dark:border-white/10 dark:bg-brand-900/40 dark:text-slate-200'"
          >
            {{ p }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Blog Newsletter / CTA -->
    <CtaBanner
      :heading="t('home.ctaHeading')"
      :body="t('home.ctaBody')"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>
