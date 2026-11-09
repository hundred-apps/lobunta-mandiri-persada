<script setup lang="ts">
import type { UnitItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: units } = await useCms<UnitItem[]>('units', 'all')

const keyword = ref('')

/** Semua unit ditampilkan sebagai tersedia di halaman publik armada. */
const availableUnits = computed<UnitItem[]>(() =>
  units.value.map((u) => ({ ...u, status: 'available' }))
)

const filteredUnits = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  if (!query) return availableUnits.value
  return availableUnits.value.filter((unit) => unit.name.toLowerCase().includes(query))
})

useSeoMeta({
  title: () => `${t('units.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('units.intro')
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100">
    <PageHero
      :eyebrow="$t('units.eyebrow')"
      :title="$t('units.heading')"
      :intro="$t('units.intro')"
    />

    <!-- Main Fleet Inventory -->
    <section class="section">
      <div class="container-page">
        <!-- Filter Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80 dark:border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'EQUIPMENT INVENTORY' : 'DAFTAR POPULASI UNIT' }}
              </span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">
              {{ $t('units.title') }}
            </h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {{ $t('units.homeIntro') }}
            </p>
          </div>

          <!-- Search -->
          <div class="relative w-full sm:w-auto">
            <input
              v-model="keyword"
              type="search"
              class="field w-full pl-9 pr-4 sm:w-64"
              :placeholder="locale === 'en' ? 'Search unit type / brand...' : 'Cari tipe unit / merk...'"
            >
            <UiIcon name="truck-dump" :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <!-- Units Grid -->
        <div v-if="filteredUnits.length" class="mt-8 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <UnitCard
            v-for="unit in filteredUnits"
            :key="unit.id"
            :unit="unit"
          />
        </div>

        <div v-else class="mt-12 text-center py-12 rounded-2xl border border-dashed border-stone-300 dark:border-white/10 bg-white/50 dark:bg-brand-900/20">
          <UiIcon name="truck-dump" :size="40" class="mx-auto text-slate-400 mb-3" />
          <p class="font-display font-semibold text-base text-brand-950 dark:text-white">
            {{ $t('units.empty') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Rental CTA Banner -->
    <CtaBanner
      :heading="t('units.ctaHeading')"
      :body="t('units.ctaBody')"
      :button-label="t('nav.contact')"
      button-to="/contact"
      :secondary-label="t('projects.backToProjects')"
      secondary-to="/projects"
    />
  </div>
</template>
