<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: projects } = await useCms<ProjectItem[]>('projects', 'all')

const activeFilter = ref<'all' | 'mining' | 'civil'>('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter((p) => p.type === activeFilter.value)
})

const statsCount = computed(() => ({
  total: projects.value.length,
  mining: projects.value.filter((p) => p.type === 'mining').length,
  civil: projects.value.filter((p) => p.type === 'civil').length
}))

useSeoMeta({
  title: () => `${t('projects.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('projects.intro')
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100">
    <PageHero
      :eyebrow="$t('nav.projects')"
      :title="$t('projects.heading')"
      :intro="$t('projects.intro')"
    />

    <!-- Projects Grid Section with Filter Bar -->
    <section class="section">
      <div class="container-page">
        <!-- Filter Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80 dark:border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'PORTFOLIO & TRACK RECORD' : 'REKAM JEJAK PROYEK' }}
              </span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">
              {{ $t('projects.title') }}
            </h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {{ $t('home.projectsBody') }}
            </p>
          </div>

          <!-- Type Filter Tabs -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm"
              :class="activeFilter === 'all'
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200 dark:bg-white/10 dark:text-slate-200'"
              @click="activeFilter = 'all'"
            >
              {{ locale === 'en' ? 'All Projects' : 'Semua Proyek' }} ({{ statsCount.total }})
            </button>

            <button
              type="button"
              class="rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm"
              :class="activeFilter === 'mining'
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200 dark:bg-white/10 dark:text-slate-200'"
              @click="activeFilter = 'mining'"
            >
              {{ $t('projects.typeMining') }} ({{ statsCount.mining }})
            </button>

            <button
              type="button"
              class="rounded-xl px-4 py-2 text-xs font-bold transition shadow-sm"
              :class="activeFilter === 'civil'
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200 dark:bg-white/10 dark:text-slate-200'"
              @click="activeFilter = 'civil'"
            >
              {{ $t('projects.typeCivil') }} ({{ statsCount.civil }})
            </button>

            <NuxtLink :to="`/${locale}/units`" class="btn-outline !py-2 !px-3.5 !text-xs !rounded-xl ml-1">
              <UiIcon name="truck" :size="14" />
              {{ $t('projects.viewFleet') }}
            </NuxtLink>
          </div>
        </div>

        <!-- Project Cards Grid -->
        <div v-if="filteredProjects.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </div>

        <div v-else class="mt-12 text-center py-12 rounded-2xl border border-dashed border-stone-300 dark:border-white/10 bg-white/50 dark:bg-brand-900/20">
          <UiIcon name="factory" :size="40" class="mx-auto text-slate-400 mb-3" />
          <p class="font-display font-semibold text-base text-brand-950 dark:text-white">
            {{ $t('projects.empty') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Project CTA Banner -->
    <CtaBanner
      :heading="t('projects.ctaHeading')"
      :body="t('projects.ctaBody')"
      :button-label="t('nav.contact')"
      button-to="/contact"
      :secondary-label="locale === 'en' ? 'Fleet Availability' : 'Kesiapan Armada Unit'"
      secondary-to="/units"
    />
  </div>
</template>
