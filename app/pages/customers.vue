<script setup lang="ts">
import type { CustomerItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: apiCustomers } = useCms<CustomerItem[]>('customers', 'all')
const customers = useStaticCustomers(apiCustomers)

const activeFilter = ref<'all' | 'mining' | 'civil'>('all')

const filteredCustomers = computed(() => {
  if (activeFilter.value === 'all') return customers.value
  return customers.value.filter((c) => c.type === activeFilter.value)
})

useSeoMeta({
  title: () => `${t('customers.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('customers.intro')
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100">
    <PageHero
      :eyebrow="$t('nav.customers')"
      :title="$t('customers.heading')"
      :intro="$t('customers.intro')"
    />

    <!-- Main Client Section with Filters -->
    <section class="section">
      <div class="container-page">
        <!-- Section Header & Filter Tabs -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80 dark:border-white/10">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'STRATEGIC CLIENTS & PARTNERS' : 'KLIEN & MITRA STRATEGIS' }}
              </span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-950 dark:text-white">
              {{ $t('customers.title') }}
            </h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {{ locale === 'en' ? 'Trusted by state-owned enterprises and private corporations across Indonesia.' : 'Dipercaya oleh BUMN dan korporasi terkemuka di berbagai sektor industri Indonesia.' }}
            </p>
          </div>

          <div class="inline-flex rounded-xl border border-stone-200 bg-stone-100/80 p-1 dark:border-white/10 dark:bg-white/5">
            <button
              type="button"
              class="rounded-lg px-4 py-2 text-xs font-bold transition"
              :class="activeFilter === 'all'
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950 shadow-sm'
                : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
              @click="activeFilter = 'all'"
            >
              {{ locale === 'en' ? 'All Clients' : 'Semua Klien' }}
            </button>

            <button
              type="button"
              class="rounded-lg px-4 py-2 text-xs font-bold transition"
              :class="activeFilter === 'mining'
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950 shadow-sm'
                : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
              @click="activeFilter = 'mining'"
            >
              {{ $t('customers.typeMining') }}
            </button>

            <button
              type="button"
              class="rounded-lg px-4 py-2 text-xs font-bold transition"
              :class="activeFilter === 'civil'
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950 shadow-sm'
                : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
              @click="activeFilter = 'civil'"
            >
              {{ $t('customers.typeCivil') }}
            </button>
          </div>
        </div>

        <!-- Client Grid -->
        <div class="mt-8">
          <CustomerGrid v-if="filteredCustomers.length" :items="filteredCustomers" />
          <p v-else class="prose-lkr mt-8">
            {{ $t('common.comingSoon') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Trust & Quality Standards Callout -->
    <section class="section bg-[#faf9f5] dark:bg-brand-900/30 border-t border-stone-200/70 dark:border-white/5">
      <div class="container-page">
        <div class="grid gap-8 lg:grid-cols-3">
          <div class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-brand-900/60">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-900 text-accent-400">
              <UiIcon name="shield" :size="20" />
            </span>
            <h3 class="mt-4 font-display text-base font-bold text-brand-950 dark:text-white">
              {{ locale === 'en' ? 'Strict HSE Standards' : 'Standar K3L & Lingkungan' }}
            </h3>
            <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ locale === 'en' ? 'Compliance with mining safety protocols and environmental management systems.' : 'Kepatuhan penuh pada regulasi K3 pertambangan dan tata kelola lingkungan hidup.' }}
            </p>
          </div>

          <div class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-brand-900/60">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-900 text-accent-400">
              <UiIcon name="target" :size="20" />
            </span>
            <h3 class="mt-4 font-display text-base font-bold text-brand-950 dark:text-white">
              {{ locale === 'en' ? 'On-Time Project Delivery' : 'Ketepatan Eksekusi & Target' }}
            </h3>
            <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ locale === 'en' ? 'Commitment to agreed production milestones and infrastructure schedules.' : 'Komitmen menjaga target volume produksi tambang dan jadwal penyelesaian konstruksi.' }}
            </p>
          </div>

          <div class="rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-brand-900/60">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-900 text-accent-400">
              <UiIcon name="truck" :size="20" />
            </span>
            <h3 class="mt-4 font-display text-base font-bold text-brand-950 dark:text-white">
              {{ locale === 'en' ? 'Integrated Fleet Capacity' : 'Dukungan Armada Mandiri' }}
            </h3>
            <p class="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ locale === 'en' ? 'Self-owned heavy equipment fleets backed by centralized maintenance.' : 'Didukung populasi alat berat milik sendiri dengan pemeliharaan rutin terjamin.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <CtaBanner
      :heading="t('home.ctaHeading')"
      :body="t('home.ctaBody')"
      :button-label="t('home.ctaButton')"
      button-to="/contact"
      :secondary-label="t('nav.projects')"
      secondary-to="/projects"
    />
  </div>
</template>
