<script setup lang="ts">
import type { UnitItem } from '~/types/content'

const props = defineProps<{ unit: UnitItem }>()

const { data: settings } = useStaticCompany()
const { locale, t } = useI18n()

const STATUS_KEY: Record<UnitItem['status'], string> = {
  available: 'units.statusAvailable',
  maintenance: 'units.statusMaintenance',
  inactive: 'units.statusInactive'
}

const STATUS_CLASS: Record<UnitItem['status'], string> = {
  available: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  maintenance: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  inactive: 'bg-stone-100 text-stone-600 border-stone-200 dark:bg-white/10 dark:text-stone-300 dark:border-white/10'
}

const waInquiryLink = computed(() => {
  const number = (settings.value?.whatsapp || '').replace(/[^0-9]/g, '')
  if (!number) return '#'
  const message = locale.value === 'en'
    ? `Hello PT Lobunta Mandiri Persada, I would like to inquire about the rental / availability of unit ${props.unit.name}.`
    : `Halo PT Lobunta Mandiri Persada, saya ingin menanyakan skema penyewaan / ketersediaan unit ${props.unit.name}.`
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <article class="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-[#fcfbfa] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40">
    <div>
      <!-- Thumbnail Image -->
      <div class="relative aspect-[16/10] w-full overflow-hidden bg-stone-200 dark:bg-brand-950">
        <img
          v-if="unit.image"
          :src="unit.image"
          :alt="unit.name"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        >
        <div v-else class="grid h-full w-full place-items-center bg-brand-900 text-accent-400">
          <UiIcon name="truck-dump" :size="48" :stroke-width="1.3" />
        </div>

        <!-- Status Badge -->
        <div class="absolute top-3 right-3">
          <span
            class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold shadow-sm backdrop-blur-md"
            :class="STATUS_CLASS[unit.status]"
          >
            <span
              v-if="unit.status === 'available'"
              class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"
            />
            <span>{{ $t(STATUS_KEY[unit.status]) }}</span>
          </span>
        </div>
      </div>

      <!-- Unit Info -->
      <div class="p-5">
        <h3 class="font-display text-base font-bold text-brand-950 dark:text-white leading-snug">
          {{ unit.name }}
        </h3>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {{ locale === 'en' ? 'Heavy Equipment Fleet Unit' : 'Armada Unit Alat Berat LMP' }}
        </p>
      </div>
    </div>

    <!-- Bottom Action -->
    <div class="p-5 pt-0">
      <a
        :href="waInquiryLink"
        target="_blank"
        rel="noopener"
        class="flex items-center justify-center gap-2 w-full rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-bold text-brand-900 shadow-sm transition hover:border-accent-400 hover:bg-accent-50 dark:border-white/10 dark:bg-brand-950 dark:text-white dark:hover:bg-white/10"
      >
        <UiIcon name="whatsapp" filled :size="14" class="text-emerald-600" />
        <span>{{ locale === 'en' ? 'Check Availability' : 'Tanya Kesiapan Unit' }}</span>
      </a>
    </div>
  </article>
</template>
