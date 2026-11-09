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
  <div class="min-h-screen bg-[#faf9f5] text-ink dark:bg-brand-950 dark:text-slate-100">
    <PageHero
      :eyebrow="$t('nav.contact')"
      :title="$t('contact.heading')"
      :intro="$t('contact.intro')"
    />

    <section class="section">
      <div class="container-page grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <!-- Left: Info + Maps -->
        <div class="space-y-6">
          <!-- Contact info panel -->
          <div class="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-brand-900/50">
            <div class="relative bg-gradient-to-r from-brand-950 via-brand-900 to-brand-800 px-6 py-5 text-white">
              <div class="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.35),transparent_45%)]" />
              <div class="relative">
                <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-300">
                  {{ locale === 'en' ? 'HEAD OFFICE & OPERATIONS' : 'KANTOR PUSAT & OPERASIONAL' }}
                </span>
                <h2 class="mt-1.5 font-display text-xl text-white font-extrabold sm:text-2xl">
                  {{ locale === 'en' ? 'Let’s talk about your project' : 'Mari diskusikan kebutuhan proyek Anda' }}
                </h2>
              </div>
            </div>

            <div class="grid gap-px bg-stone-100 p-px dark:bg-white/5 sm:grid-cols-2">
              <component
                :is="item.href ? 'a' : 'div'"
                v-for="item in details"
                :key="item.label"
                :href="item.href"
                class="group bg-white p-5 transition dark:bg-brand-900/60"
                :class="item.href ? 'hover:bg-brand-50/60 dark:hover:bg-white/[0.04]' : ''"
              >
                <div class="flex items-start gap-3">
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-700 ring-1 ring-accent-500/20 dark:text-accent-300">
                    <UiIcon :name="item.icon" :size="18" />
                  </span>
                  <div class="min-w-0">
                    <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm font-semibold leading-snug text-brand-950 break-words dark:text-white" :class="item.href ? 'group-hover:text-accent-700 dark:group-hover:text-accent-300' : ''">
                      {{ item.value }}
                    </p>
                  </div>
                </div>
              </component>
            </div>
          </div>

          <!-- WhatsApp CTA -->
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener"
            class="group flex items-center justify-between gap-4 rounded-2xl border border-emerald-200/70 bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white shadow-sm transition hover:from-emerald-500 hover:to-emerald-500 hover:shadow-md dark:border-emerald-500/30"
          >
            <div class="flex items-center gap-4">
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20 ring-1 ring-white/25">
                <UiIcon name="whatsapp" filled :size="24" />
              </span>
              <div>
                <p class="font-display text-base font-bold">
                  {{ locale === 'en' ? 'Instant WhatsApp Consultation' : 'Konsultasi via WhatsApp' }}
                </p>
                <p class="mt-0.5 text-xs text-emerald-50/90">
                  {{ locale === 'en' ? 'Fast response from our team' : 'Respon cepat dari tim kami' }}
                </p>
              </div>
            </div>
            <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 transition group-hover:translate-x-0.5 group-hover:bg-white/25">
              <UiIcon name="arrow-right" :size="16" />
            </span>
          </a>

          <!-- Maps: Kantor & Workshop -->
          <div class="grid gap-4 md:grid-cols-2">
            <div class="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-brand-900/50">
              <div class="flex items-center gap-2.5 px-4 py-3">
                <span class="flex h-2.5 w-2.5 rounded-full bg-accent-500" />
                <h3 class="font-display text-sm font-bold text-brand-950 dark:text-white">
                  {{ locale === 'en' ? 'Head Office' : 'Kantor' }}
                </h3>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.246638023245!2d106.98435867499015!3d-6.231181593757003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c3d0d098271%3A0xa416a3f244473e80!2sPT.%20Lobunta%20Kencana%20Raya!5e0!3m2!1sid!2sid!4v1793880948009!5m2!1sid!2sid"
                width="100%"
                height="220"
                style="border:0; display:block;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                :title="locale === 'en' ? 'Google Maps — Head Office' : 'Google Maps — Kantor'"
              />
            </div>

            <div class="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-brand-900/50">
              <div class="flex items-center gap-2.5 px-4 py-3">
                <span class="flex h-2.5 w-2.5 rounded-full bg-accent-500" />
                <h3 class="font-display text-sm font-bold text-brand-950 dark:text-white">
                  {{ locale === 'en' ? 'Workshop' : 'Workshop' }}
                </h3>
              </div>
              <!-- TODO: Ganti WORKSHOP_EMBED_URL di bawah dengan src embed Google Maps workshop -->
              <iframe
                src="WORKSHOP_EMBED_URL"
                width="100%"
                height="220"
                style="border:0; display:block;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                :title="locale === 'en' ? 'Google Maps — Workshop' : 'Google Maps — Workshop'"
              />
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <ContactForm />
      </div>
    </section>
  </div>
</template>
