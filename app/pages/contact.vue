<script setup lang="ts">
import type { SiteSettings } from '~/types/content'

const { locale, t } = useI18n()
const { data: settings } = useStaticCompany()

const details = computed(() => {
  if (!settings.value) return []
  const value: SiteSettings = settings.value
  return [
    {
      icon: 'map-pin',
      label: t('common.address') + ' ' + t('contact.officeTitle'),
      value: pick(value.address),
      href: undefined
    },
    {
      icon: 'phone',
      label: t('common.callUs'),
      value: value.phone.join(' / '),
      href: `tel:+62${value.phone[0]?.replace(/^0/, '')}`
    },
    {
      icon: 'mail',
      label: t('common.email'),
      value: value.email,
      href: `mailto:${value.email}`
    },
    {
      icon: 'clock',
      label: t('common.openHours'),
      value: pick(value.officeHours),
      href: undefined
    }
  ]
})

const whatsappHref = computed(() => {
  const number = (settings.value?.whatsapp || '').replace(/[^0-9]/g, '')
  if (!number) return '#'
  return `https://wa.me/${number}?text=${encodeURIComponent(
    'Halo PT Lobunta Mandiri Persada, saya ingin berkonsultasi mengenai kerja sama proyek.'
  )}`
})

useSeoMeta({
  title: () => `${t('contact.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('contact.intro')
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100 min-h-screen">
    <PageHero
      :eyebrow="$t('nav.contact')"
      :title="$t('contact.heading')"
      :intro="$t('contact.intro')"
    />

    <!-- Main Contact Grid -->
    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <!-- Left: Contact Details & Map -->
        <div class="space-y-6">
          <div>
            <div class="inline-flex items-center gap-2 mb-2">
              <span class="inline-block h-2 w-2 rounded-full bg-accent-500" />
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'HEAD OFFICE & OPERATIONS' : 'KANTOR PUSAT & OPERASIONAL' }}
              </span>
            </div>
            <h2 class="font-display text-2xl font-extrabold text-brand-950 dark:text-white">
              {{ locale === 'en' ? 'Direct Communication Channels' : 'Saluran Komunikasi Resmi' }}
            </h2>
          </div>

          <!-- Contact Cards -->
          <ul class="space-y-3.5">
            <li
              v-for="item in details"
              :key="item.label"
              class="flex items-start gap-4 rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-5 shadow-sm transition hover:border-accent-400 dark:border-white/10 dark:bg-brand-900/40"
            >
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-900 text-accent-400 dark:bg-white/10">
                <UiIcon :name="item.icon" :size="20" />
              </span>

              <div class="flex-1 min-w-0">
                <span class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ item.label }}
                </span>
                <component
                  :is="item.href ? 'a' : 'p'"
                  :href="item.href"
                  class="mt-1 text-sm sm:text-base font-semibold text-brand-950 dark:text-white"
                  :class="item.href ? 'hover:text-accent-600 dark:hover:text-accent-400 transition-colors' : ''"
                >
                  {{ item.value }}
                </component>
              </div>
            </li>
          </ul>

          <!-- Quick WhatsApp Card -->
          <div class="rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-brand-900 to-brand-950 p-6 text-white shadow-md">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white">
                <UiIcon name="whatsapp" filled :size="22" />
              </span>
              <div>
                <h4 class="font-display text-base font-bold text-white">
                  {{ locale === 'en' ? 'Instant WhatsApp Consultation' : 'Konsultasi Cepat via WhatsApp' }}
                </h4>
                <p class="text-xs text-slate-300">
                  {{ locale === 'en' ? 'Direct response from our business development team' : 'Respon cepat langsung bersama tim business development' }}
                </p>
              </div>
            </div>

            <a
              :href="whatsappHref"
              target="_blank"
              rel="noopener"
              class="mt-5 flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 py-3 text-xs font-bold text-white transition hover:bg-emerald-600 shadow-sm"
            >
              <UiIcon name="whatsapp" filled :size="16" />
              <span>{{ locale === 'en' ? 'Chat on WhatsApp Now' : 'Hubungi WhatsApp Kami Sekarang' }}</span>
            </a>
          </div>

          <!-- Embedded Map -->
          <div class="overflow-hidden rounded-2xl border border-stone-200/90 shadow-sm dark:border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.246638023245!2d106.98435867499015!3d-6.231181593757003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c3d0d098271%3A0xa416a3f244473e80!2sPT.%20Lobunta%20Kencana%20Raya!5e0!3m2!1sid!2sid!4v1793880948009!5m2!1sid!2sid"
              width="100%"
              height="320"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              title="Google Maps — PT Lobunta Mandiri Persada"
            />
          </div>
        </div>

        <!-- Right: Executive Contact Form -->
        <ContactForm />
      </div>
    </section>
  </div>
</template>
