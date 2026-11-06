<script setup lang="ts">
import type { UnitItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: units } = await useCms<UnitItem[]>('units', 'all')

const activeStatus = ref<'all' | 'available' | 'maintenance'>('all')
const keyword = ref('')

const availableCount = computed(() => units.value.filter((u) => u.status === 'available').length)
const maintenanceCount = computed(() => units.value.filter((u) => u.status === 'maintenance').length)

const filteredUnits = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  return units.value.filter((unit) => {
    const matchStatus = activeStatus.value === 'all' || unit.status === activeStatus.value
    if (!matchStatus) return false
    if (!query) return true
    return unit.name.toLowerCase().includes(query)
  })
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

    <!-- Fleet Readiness Statistics Banner -->
    <section class="section border-b border-stone-200/70 bg-[#faf9f5] dark:border-white/5 dark:bg-brand-900/30">
      <div class="container-page">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:divide-x sm:divide-stone-200 dark:sm:divide-white/10 text-left">
          <div class="sm:pr-4">
            <p class="font-display text-2xl sm:text-3xl font-extrabold text-brand-900 dark:text-white">
              {{ units.length }}
            </p>
            <p class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {{ locale === 'en' ? 'Registered Units' : 'Total Unit Terdaftar' }}
            </p>
          </div>

          <div class="sm:px-4">
            <p class="font-display text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {{ availableCount }}
            </p>
            <p class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {{ locale === 'en' ? 'Ready to Deploy' : 'Unit Siap Operasi' }}
            </p>
          </div>

          <div class="sm:px-4">
            <p class="font-display text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {{ maintenanceCount }}
            </p>
            <p class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {{ locale === 'en' ? 'Routine Maintenance' : 'Perawatan Terjadwal' }}
            </p>
          </div>

          <div class="sm:pl-4">
            <p class="font-display text-2xl sm:text-3xl font-extrabold text-accent-600 dark:text-accent-400">
              24/7
            </p>
            <p class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              {{ locale === 'en' ? 'Workshop Support' : 'Dukungan Workshop & Part' }}
            </p>
          </div>
        </div>
      </div>
    </section>

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

          <!-- Controls: Search & Status Filter -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="relative">
              <input
                v-model="keyword"
                type="search"
                class="field pl-9 pr-4 sm:w-56"
                placeholder="Cari tipe unit / merk..."
              >
              <UiIcon name="truck-dump" :size="15" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <div class="inline-flex rounded-xl border border-stone-200 bg-stone-100/80 p-1 dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                class="rounded-lg px-3.5 py-1.5 text-xs font-bold transition"
                :class="activeStatus === 'all'
                  ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950 shadow-sm'
                  : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
                @click="activeStatus = 'all'"
              >
                {{ locale === 'en' ? 'All' : 'Semua' }}
              </button>

              <button
                type="button"
                class="rounded-lg px-3.5 py-1.5 text-xs font-bold transition"
                :class="activeStatus === 'available'
                  ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950 shadow-sm'
                  : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
                @click="activeStatus = 'available'"
              >
                {{ locale === 'en' ? 'Available' : 'Siap Operasi' }}
              </button>

              <button
                type="button"
                class="rounded-lg px-3.5 py-1.5 text-xs font-bold transition"
                :class="activeStatus === 'maintenance'
                  ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950 shadow-sm'
                  : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
                @click="activeStatus = 'maintenance'"
              >
                {{ locale === 'en' ? 'Maintenance' : 'Perawatan' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Units Grid -->
        <div v-if="filteredUnits.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
