<script setup lang="ts">
import { useScopeOfWork } from '~/composables/useScopeOfWork'
import { useCompanyHistory } from '~/composables/useCompanyHistory'
import { useVisionMission } from '~/composables/useVisionMission'
import { useLegalDocuments } from '~/composables/useLegalDocuments'
import { useMilestones } from '~/composables/useMilestones'

const { locale, t } = useI18n()
const milestones = useMilestones()
const { divisions: legalDivisions } = useLegalDocuments()
const { statements: companyStatements, motto: companyMotto } = useVisionMission()
const { paragraphs: historyParagraphs, highlights: historyHighlights } = useCompanyHistory()
const { divisions: scopeDivisions } = useScopeOfWork()

const activeScopeTab = ref<'mining' | 'civil'>('mining')

function legalLabel(doc: { labelId: string; labelEn: string }): string {
  return locale.value === 'en' ? doc.labelEn : doc.labelId
}

const { data: settings } = await useCompany()

const gallery = computed(() => settings.value?.gallery ?? [])

const docGroups = ['mining', 'civil', 'general'] as const
const docTypeKeys: Record<string, string> = {
  mining: 'projects.docMining',
  civil: 'projects.docCivil',
  general: 'projects.docGeneral'
}

function docLabel(type: string): string {
  return t(docTypeKeys[type] || docTypeKeys.general!)
}

const documentGroups = computed(() => {
  const all = settings.value?.companyProfiles ?? []
  return docGroups
    .map((type) => ({
      type,
      label: docLabel(type),
      documents: all.filter((doc) =>
        (docGroups as readonly string[]).includes(doc.type)
          ? doc.type === type
          : type === 'general'
      )
    }))
    .filter((group) => group.documents.length > 0)
})

const documentCount = computed(() =>
  documentGroups.value.reduce((sum, group) => sum + group.documents.length, 0)
)

const whatsappLink = computed(() => {
  const number = (settings.value?.whatsapp || '').replace(/[^0-9]/g, '')
  if (!number) return '#'
  return `https://wa.me/${number}?text=${encodeURIComponent(
    'Halo PT Lobunta Mandiri Persada, saya ingin berkonsultasi mengenai kerja sama proyek dan dokumen profil perusahaan.'
  )}`
})

const corporatePillars = computed(() => [
  {
    icon: 'truck',
    titleId: 'Kapasitas Armada Mandiri',
    titleEn: 'Dedicated Modern Fleets',
    descId: 'Memiliki ratusan populasi unit alat berat dan dump truck siap operasi dengan fasilitas workshop pemeliharaan internal.',
    descEn: 'Owning hundreds of heavy equipment units and dump trucks supported by centralized maintenance workshops.'
  },
  {
    icon: 'shield',
    titleId: 'Legalitas & Perizinan Lengkap',
    titleEn: 'Comprehensive Licensing & Compliance',
    descId: 'Memiliki Izin Usaha Jasa Pertambangan (IUJP), SBU Konstruksi kualifikasi Besar, serta kepatuhan penuh terhadap regulasi pemerintah.',
    descEn: 'Holding official Mining Services Licenses (IUJP), Large-Grade Construction SBU, and full regulatory compliance.'
  },
  {
    icon: 'target',
    titleId: 'Budaya Keselamatan Kerja (K3L)',
    titleEn: 'Safety & Environmental Excellence',
    descId: 'Menerapkan standar SMK3 dan perlindungan lingkungan tanpa kompromi demi tercapainya operasional Zero Harm.',
    descEn: 'Implementing strict HSE standards and environmental stewardship to maintain a rigorous Zero Harm track record.'
  },
  {
    icon: 'engineer',
    titleId: '50+ Tahun Rekam Jejak Teruji',
    titleEn: '50+ Years Proven Track Record',
    descId: 'Berakar sejak 1973 dan sukses menyelesaikan berbagai proyek strategis bersama BUMN serta korporasi multinasional.',
    descEn: 'Rooted since 1973 with a legacy of delivering strategic projects alongside state enterprises and multinational firms.'
  }
])

useSeoMeta({
  title: () => `${t('nav.profile')} | ${pick(settings.value?.companyName) || 'PT Lobunta Mandiri Persada'}`,
  description: () => pick(settings.value?.description) || t('meta.homeDescription'),
  ogTitle: () => `${t('nav.profile')} | ${pick(settings.value?.companyName) || 'PT Lobunta Mandiri Persada'}`
})
</script>

<template>
  <div class="bg-white text-ink dark:bg-brand-950 dark:text-slate-100">
    <!-- 1. Executive Hero Section: Confident & Authoritative -->
    <section class="relative overflow-hidden bg-brand-900 text-white">
      <div class="absolute inset-0 z-0">
        <img
          src="/img/lmp/civil-1.jpg"
          alt="PT Lobunta Mandiri Persada Corporate Profile"
          class="h-full w-full object-cover object-center select-none"
          fetchpriority="high"
        >
        <!-- Dark Green Gradient Overlay for Maximum Elegance and High Contrast -->
        <div class="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/90 to-brand-900/75" />
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-800/40 via-transparent to-transparent pointer-events-none" />
      </div>

      <div class="container-page relative z-10 py-16 sm:py-24 lg:py-28">
        <div class="max-w-3xl">
          <!-- Eyebrow Badge -->
          <div class="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span class="inline-block h-2 w-2 rounded-full bg-accent-400" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
              {{ locale === 'en' ? 'CORPORATE PROFILE • ESTABLISHED 1973' : 'PROFIL PERUSAHAAN • SEJAK 1973' }}
            </span>
          </div>

          <!-- Main Title -->
          <h1 class="mt-6 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight text-white">
            {{ locale === 'en'
              ? 'Five Decades of Excellence in Mining & Civil Engineering'
              : 'Lima Dekade Dedikasi Membangun Negeri & Memajukan Pertambangan'
            }}
          </h1>

          <!-- Intro Paragraph -->
          <p class="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-200/95 max-w-2xl">
            {{ locale === 'en'
              ? 'PT Lobunta Mandiri Persada is Indonesia\'s premier integrated contractor for open-pit mining operations, earth works, civil construction, and heavy equipment rental.'
              : 'PT Lobunta Mandiri Persada adalah kontraktor terkemuka Indonesia dalam bidang pekerjaan tanah, penambangan terbuka, konstruksi teknik sipil, dan penyewaan alat berat.'
            }}
          </p>

          <!-- Action Buttons -->
          <div class="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#legalitas"
              class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-bold text-brand-950 shadow-md transition hover:bg-accent-400 active:scale-[0.98]"
            >
              <span>{{ locale === 'en' ? 'View Legal Credentials' : 'Lihat Kredensial & Legalitas' }}</span>
              <UiIcon name="arrow-right" :size="16" />
            </a>

            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-[0.98]"
            >
              <UiIcon name="document" :size="16" />
              <span>{{ locale === 'en' ? 'Download Company Profile' : 'Unduh Company Profile (PDF)' }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Hero Bottom Stats Strip (3 Key Corporate Metrics) -->
      <div class="relative z-10 border-t border-white/15 bg-brand-950/85 backdrop-blur-md">
        <div class="container-page py-6">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:divide-x sm:divide-white/15 text-left">
            <div class="sm:pr-6">
              <p class="font-display text-3xl sm:text-4xl font-extrabold text-accent-400">50+</p>
              <p class="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-300">
                {{ locale === 'en' ? 'Years Experience (Since 1973)' : 'Tahun Pengalaman (Sejak 1973)' }}
              </p>
            </div>

            <div class="sm:px-6">
              <p class="font-display text-3xl sm:text-4xl font-extrabold text-white">
                {{ locale === 'en' ? 'Large (B)' : 'Besar (B)' }}
              </p>
              <p class="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-300">
                {{ locale === 'en' ? 'Contractor Qualification' : 'Kualifikasi Badan Usaha' }}
              </p>
            </div>

            <div class="sm:pl-6">
              <p class="font-display text-3xl sm:text-4xl font-extrabold text-accent-400">100%</p>
              <p class="mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-300">
                {{ locale === 'en' ? 'National Compliance & IUJP' : 'Legalitas IUJP & SBU Konstruksi' }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Sejarah & Identitas Korporat (Corporate History & Overview) -->
    <section class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div>
          <!-- Section Title -->
          <div class="flex items-center gap-2.5">
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ locale === 'en' ? 'COMPANY HISTORY & LEGACY' : 'SEJARAH & REKAM JEJAK' }}
            </span>
          </div>

          <h2 class="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ locale === 'en' ? 'Built on Commitment, Grown into National Strength' : 'Tumbuh dari Komitmen, Berkembang Menjadi Kekuatan Nasional' }}
          </h2>

          <!-- Executive Quote Callout -->
          <div class="mt-6 rounded-2xl border-l-4 border-accent-500 bg-brand-50/80 p-5 dark:bg-white/5">
            <p class="font-display text-sm sm:text-base font-semibold italic text-brand-900 dark:text-accent-200">
              "{{ locale === 'en' ? 'Deliver different values — Ensuring project delivery with uncompromised integrity, safety, and operational excellence.' : 'Deliver different values — Memastikan keberhasilan proyek dengan integritas tanpa kompromi, keselamatan kerja prima, dan keunggulan operasional.' }}"
            </p>
          </div>

          <!-- History Narration -->
          <div class="mt-6 space-y-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <p v-for="(paragraph, index) in historyParagraphs" :key="index">
              {{ locale === 'en' ? paragraph.en : paragraph.id }}
            </p>
          </div>

          <!-- Highlight Cards -->
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              v-for="highlight in historyHighlights"
              :key="highlight.key"
              class="rounded-xl border border-stone-200/90 bg-[#fcfbfa] p-5 shadow-sm dark:border-white/10 dark:bg-brand-900/40"
            >
              <div class="flex items-center gap-2.5 text-accent-600 dark:text-accent-400">
                <UiIcon :name="highlight.key === 'legal' ? 'shield' : 'clock'" :size="20" />
                <h4 class="font-display text-sm font-bold text-brand-950 dark:text-white">
                  {{ locale === 'en' ? highlight.titleEn : highlight.titleId }}
                </h4>
              </div>
              <p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {{ locale === 'en' ? highlight.bodyEn : highlight.bodyId }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Side: Corporate Factsheet Card & Direct PDF Access -->
        <div class="space-y-6">
          <div class="rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-6 shadow-card dark:border-white/10 dark:bg-brand-900/50">
            <div class="border-b border-stone-200 pb-4 dark:border-white/10">
              <span class="text-[11px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'CORPORATE PROFILE SUMMARY' : 'RINGKASAN DATA KORPORAT' }}
              </span>
              <h3 class="mt-1 font-display text-lg font-bold text-brand-950 dark:text-white">
                PT LOBUNTA MANDIRI PERSADA
              </h3>
            </div>

            <dl class="mt-4 divide-y divide-stone-100 dark:divide-white/5 text-sm">
              <div class="py-2.5 flex justify-between gap-3">
                <dt class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ $t('profile.founded') }}
                </dt>
                <dd class="font-semibold text-brand-950 dark:text-white">1973 (50+ Tahun)</dd>
              </div>

              <div class="py-2.5 flex justify-between gap-3">
                <dt class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ locale === 'en' ? 'Qualification' : 'Kualifikasi' }}
                </dt>
                <dd class="font-semibold text-accent-600 dark:text-accent-400">Besar (B) / IUJP Resmi</dd>
              </div>

              <div class="py-2.5 flex justify-between gap-3">
                <dt class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ locale === 'en' ? 'Core Sector' : 'Sektor Utama' }}
                </dt>
                <dd class="font-medium text-right text-brand-950 dark:text-white">Pertambangan & Konstruksi Sipil</dd>
              </div>

              <div class="py-2.5 flex justify-between gap-3">
                <dt class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ $t('common.address') }}
                </dt>
                <dd class="font-medium text-right text-xs max-w-[200px] text-slate-700 dark:text-slate-300">
                  {{ pick(settings?.address) || 'Jakarta Pusat, Indonesia' }}
                </dd>
              </div>

              <div class="py-2.5 flex justify-between gap-3">
                <dt class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {{ $t('common.email') }}
                </dt>
                <dd class="font-medium text-brand-700 dark:text-accent-300">
                  {{ settings?.email || 'info@lobuntamandiri.com' }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Direct Company Profile Document Download Card -->
          <div class="rounded-2xl border-2 border-accent-500/40 bg-gradient-to-br from-brand-900 to-brand-950 p-6 text-white shadow-lg">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 place-items-center rounded-xl bg-accent-500 text-brand-950">
                <UiIcon name="document" :size="20" />
              </span>
              <div>
                <h4 class="font-display text-base font-bold text-white">
                  {{ locale === 'en' ? 'Official Company Profile' : 'Company Profile Resmi (PDF)' }}
                </h4>
                <p class="text-xs text-slate-300">
                  {{ locale === 'en' ? 'Verified Corporate Documentation' : 'Dokumen legalitas & portofolio lengkap' }}
                </p>
              </div>
            </div>

            <!-- PDF Links -->
            <div class="mt-5 space-y-2.5">
              <a
                href="/docs/lmp-mining-contractor-profile.pdf"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                <span class="flex items-center gap-2 truncate">
                  <UiIcon name="mountain" :size="16" class="text-accent-400 shrink-0" />
                  <span class="truncate">Profil Kontraktor Pertambangan (PDF)</span>
                </span>
                <UiIcon name="download" :size="14" class="shrink-0 text-accent-400" />
              </a>

              <a
                href="/docs/lmp-civil-construction-profile.pdf"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                <span class="flex items-center gap-2 truncate">
                  <UiIcon name="bridge" :size="16" class="text-accent-400 shrink-0" />
                  <span class="truncate">Profil Konstruksi Sipil (PDF)</span>
                </span>
                <UiIcon name="download" :size="14" class="shrink-0 text-accent-400" />
              </a>

              <a
                href="/docs/lmp-heavy-equipment-rental.pdf"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                <span class="flex items-center gap-2 truncate">
                  <UiIcon name="excavator" :size="16" class="text-accent-400 shrink-0" />
                  <span class="truncate">Katalog Sewa Alat Berat (PDF)</span>
                </span>
                <UiIcon name="download" :size="14" class="shrink-0 text-accent-400" />
              </a>
            </div>

            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener"
              class="mt-5 flex items-center justify-center gap-2 w-full rounded-xl bg-accent-500 py-3 text-xs font-bold text-brand-950 transition hover:bg-accent-400"
            >
              <UiIcon name="whatsapp" filled :size="16" />
              <span>{{ locale === 'en' ? 'Request Hardcopy / Meeting' : 'Minta Dokumen / Hubungi Tim' }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Empat Pilar Keunggulan Kompetitif ("Mengapa LMP / Percaya Diri") -->
    <section class="section bg-[#faf9f5] dark:bg-brand-900/30 border-y border-stone-200/70 dark:border-white/5">
      <div class="container-page">
        <div class="text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2.5">
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ locale === 'en' ? 'WHY PT LOBUNTA MANDIRI PERSADA' : 'KEUNGGULAN KOMPETITIF' }}
            </span>
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
          </div>

          <h2 class="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ locale === 'en' ? 'Pillars of Operational Confidence' : 'Fondasi Kepercayaan & Keunggulan Operasional' }}
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {{ locale === 'en'
              ? 'Our competitive strengths built through 50 years of delivering demanding national projects.'
              : 'Standar kapabilitas yang menjadikan LMP mitra pilihan dalam proyek pertambangan dan konstruksi berskala besar.'
            }}
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(pillar, index) in corporatePillars"
            :key="index"
            class="group rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/60"
          >
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-900 text-accent-400 dark:bg-white/10 group-hover:bg-accent-500 group-hover:text-brand-950 transition-colors">
              <UiIcon :name="pillar.icon" :size="24" :stroke-width="1.8" />
            </span>

            <h3 class="mt-5 font-display text-base sm:text-lg font-bold text-brand-950 dark:text-white leading-snug">
              {{ locale === 'en' ? pillar.titleEn : pillar.titleId }}
            </h3>

            <p class="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {{ locale === 'en' ? pillar.descEn : pillar.descId }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Visi, Misi & Falsafah Perusahaan -->
    <section class="section">
      <div class="container-page">
        <div class="text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ locale === 'en' ? 'VISION, MISSION & PHILOSOPHY' : 'ARAH STRATEGIS & FALSAFAH' }}
            </span>
          </div>
          <h2 class="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ companyMotto.id }}
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {{ locale === 'en'
              ? 'Guiding principles that steer our people and operational integrity.'
              : 'Prinsip kepemimpinan dan integritas yang menjadi kompas dalam setiap langkah pertumbuhan perusahaan.'
            }}
          </p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <div
            v-for="statement in companyStatements"
            :key="statement.key"
            class="relative rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-8 shadow-sm transition hover:border-brand-600 dark:border-white/10 dark:bg-brand-900/40 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-900 text-accent-400 dark:bg-white/10">
                  <UiIcon :name="statement.icon" :size="24" />
                </span>
                <span class="text-xs font-mono font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                  {{ statement.key }}
                </span>
              </div>

              <h3 class="mt-6 font-display text-xl font-bold text-brand-950 dark:text-white">
                {{ locale === 'en' ? statement.titleEn : statement.titleId }}
              </h3>

              <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {{ locale === 'en' ? statement.bodyEn : statement.bodyId }}
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-stone-200/60 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-300">
              <UiIcon name="check" :size="14" class="text-accent-500" />
              <span>Standar Keunggulan LMP</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Legalitas, Perizinan Usaha & Kepatuhan Regulasi (Compliance Section) -->
    <section id="legalitas" class="section scroll-mt-20 border-y border-stone-200/70 bg-[#faf9f5] dark:border-white/5 dark:bg-brand-900/30">
      <div class="container-page">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div class="inline-flex items-center gap-2.5">
              <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
                {{ locale === 'en' ? 'OFFICIAL LICENSING & COMPLIANCE' : 'LEGALITAS & PERIZINAN BERUSAHA' }}
              </span>
            </div>
            <h2 class="mt-3 font-display text-2xl font-extrabold tracking-tight text-brand-950 dark:text-white sm:text-3xl lg:text-4xl">
              {{ $t('profile.legalityTitle') }}
            </h2>
          </div>
          <p class="max-w-md text-sm text-slate-600 dark:text-slate-400">
            {{ $t('profile.legalityBody') }}
          </p>
        </div>

        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <article
            v-for="division in legalDivisions"
            :key="division.key"
            class="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-900/10 dark:border-white/10 dark:bg-brand-900/60 dark:hover:shadow-black/30"
          >
            <div class="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 px-6 py-6 sm:px-7">
              <div class="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-2xl" />
              <div class="pointer-events-none absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-white/10 blur-xl" />
              <div class="relative flex items-start justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/20 backdrop-blur">
                    <UiIcon :name="division.key === 'mining' ? 'mountain' : 'bridge'" :size="26" />
                  </span>
                  <div>
                    <span class="inline-flex items-center rounded-full bg-accent-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-300 ring-1 ring-accent-400/30">
                      {{ $t('profile.legalityDivision') }}
                    </span>
                    <h3 class="mt-2 font-display text-lg font-bold leading-snug text-white sm:text-xl">
                      {{ locale === 'en' ? division.titleEn : division.titleId }}
                    </h3>
                  </div>
                </div>
                <span class="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1.5 text-[11px] font-bold text-emerald-100 backdrop-blur">
                  <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                  </span>
                  {{ locale === 'en' ? 'Active' : 'Izin Aktif' }}
                </span>
              </div>
              <p class="relative mt-4 max-w-2xl text-sm leading-relaxed text-brand-100/90">
                {{ locale === 'en' ? division.descriptionEn : division.descriptionId }}
              </p>
            </div>

            <div class="flex flex-1 flex-col p-6 sm:p-7">
              <!-- Legal credentials -->
              <div>
                <h4 class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <span class="grid h-7 w-7 place-items-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                    <UiIcon name="shield" :size="14" />
                  </span>
                  {{ locale === 'en' ? 'Credentials & Licenses' : 'Dokumen & Perizinan' }}
                </h4>

                <ul class="mt-3 space-y-3">
                  <li
                    v-for="doc in division.documents"
                    :key="doc.labelId + doc.value"
                    class="relative overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-br from-[#fcfbfa] to-white p-4 shadow-sm transition hover:border-accent-300 dark:border-white/10 dark:from-brand-950/60 dark:to-brand-900/40 dark:hover:border-accent-500/30"
                  >
                    <div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-400 to-accent-600" />
                    <div class="flex items-start gap-3 pl-2">
                      <span class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-900 text-accent-400 shadow-sm dark:bg-white/10">
                        <UiIcon name="document" :size="16" />
                      </span>
                      <div class="min-w-0 flex-1">
                        <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          {{ legalLabel(doc) }}
                        </p>
                        <p class="mt-1 font-mono text-sm font-bold text-brand-950 break-words dark:text-white sm:text-[15px]">
                          {{ doc.value }}
                        </p>
                        <p v-if="doc.noteId" class="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          {{ locale === 'en' ? doc.noteEn : doc.noteId }}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- KBLI Licences -->
              <div class="mt-7 flex-1">
                <h4 class="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <span class="grid h-7 w-7 place-items-center rounded-lg bg-brand-900/5 text-brand-700 dark:bg-white/10 dark:text-accent-400">
                    <UiIcon name="check" :size="14" />
                  </span>
                  {{ $t('profile.kbliTitle') }}
                </h4>
                <ul class="mt-3 grid gap-2.5 sm:grid-cols-1">
                  <li
                    v-for="licence in division.licences"
                    :key="licence.code"
                    class="group/item flex items-start gap-3 rounded-xl border border-stone-200/70 bg-white px-3.5 py-3 transition hover:border-accent-300 hover:bg-accent-50/30 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent-500/30 dark:hover:bg-accent-500/5"
                  >
                    <span class="mt-0.5 inline-flex shrink-0 rounded-lg bg-gradient-to-br from-brand-900 to-brand-700 px-2.5 py-1 font-mono text-[11px] font-bold text-accent-200 shadow-sm">
                      {{ licence.code }}
                    </span>
                    <span class="text-xs leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm">
                      {{ locale === 'en' ? licence.titleEn : licence.titleId }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 6. Ruang Lingkup Pekerjaan Lengkap (Scope of Work) -->
    <section class="section">
      <div class="container-page">
        <div class="text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2.5">
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ locale === 'en' ? 'TECHNICAL CAPABILITIES' : 'RUANG LINGKUP PEKERJAAN' }}
            </span>
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
          </div>

          <h2 class="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ $t('profile.scopeTitle') }}
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {{ $t('profile.scopeBody') }}
          </p>

          <!-- Tab Selector for Divisi -->
          <div class="mt-8 inline-flex rounded-xl border border-stone-200 bg-stone-100/80 p-1 dark:border-white/10 dark:bg-white/5">
            <button
              v-for="division in scopeDivisions"
              :key="division.key"
              type="button"
              class="rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold transition flex items-center gap-2"
              :class="activeScopeTab === division.key
                ? 'bg-brand-900 text-white shadow-sm dark:bg-accent-500 dark:text-brand-950'
                : 'text-slate-600 hover:text-brand-900 dark:text-slate-300'"
              @click="activeScopeTab = division.key"
            >
              <UiIcon :name="division.key === 'mining' ? 'mountain' : 'bridge'" :size="16" />
              <span>{{ locale === 'en' ? division.titleEn : division.titleId }}</span>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="mt-10">
          <div
            v-for="division in scopeDivisions.filter(d => d.key === activeScopeTab)"
            :key="division.key"
          >
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div
                v-for="service in division.services"
                :key="service.code"
                class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/70 hover:shadow-xl dark:border-white/10 dark:bg-brand-900/50"
              >
                <span class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-800 via-brand-600 to-accent-500 opacity-80 transition-opacity group-hover:opacity-100" />
                <span class="pointer-events-none absolute -right-1 -top-3 select-none font-display text-6xl font-black leading-none text-brand-900/[0.04] transition-colors group-hover:text-accent-500/10 dark:text-white/[0.04]">
                  {{ service.code }}
                </span>

                <div class="relative flex items-start justify-between gap-3">
                  <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-900 to-brand-700 text-accent-300 shadow-sm ring-4 ring-brand-900/5 transition-transform duration-300 group-hover:scale-105 dark:from-accent-500 dark:to-accent-600 dark:text-brand-950 dark:ring-white/5">
                    <UiIcon :name="service.icon || 'target'" :size="20" />
                  </span>
                  <span class="inline-flex rounded-full border border-accent-200/70 bg-accent-50 px-2.5 py-1 font-mono text-[11px] font-bold text-accent-700 dark:border-accent-500/30 dark:bg-accent-950/40 dark:text-accent-300">
                    {{ service.code }}
                  </span>
                </div>

                <h4 class="relative mt-4 font-display text-sm font-bold leading-snug text-brand-950 dark:text-white">
                  {{ locale === 'en' ? service.titleEn : service.titleId }}
                </h4>

                <p class="relative mt-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {{ locale === 'en' ? service.descriptionEn : service.descriptionId }}
                </p>

                <div class="relative mt-4 flex items-center gap-2 border-t border-stone-100 pt-3 text-[11px] font-semibold uppercase tracking-wider text-brand-700/70 dark:border-white/10 dark:text-brand-300/70">
                  <span class="h-1.5 w-1.5 rounded-full bg-accent-500" />
                  <span>LMP Scope</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Jejak Langkah & Milestones Perjalanan (1973 - Sekarang) -->
    <section v-if="milestones.length" class="section bg-[#faf9f5] dark:bg-brand-900/30 border-y border-stone-200/70 dark:border-white/5">
      <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <div class="inline-flex items-center gap-2.5">
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ $t('home.aboutHeading') }}
            </span>
          </div>

          <h2 class="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ locale === 'en' ? 'Half a Century of Historic Milestones' : 'Perjalanan Sejarah 5 Dekade Penuh Prestasi' }}
          </h2>

          <p class="mt-4 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {{ $t('home.aboutBody') }}
          </p>

          <div class="mt-8 rounded-2xl bg-brand-900 p-6 text-white dark:bg-brand-900/70">
            <p class="text-xs uppercase tracking-wider text-accent-400 font-bold">Integritas & Keberlanjutan</p>
            <p class="mt-2 text-sm leading-relaxed text-slate-200">
              Dari CV. Lobunta di tahun 1973 hingga entitas modern PT Lobunta Mandiri Persada saat ini, kami terus menjaga dedikasi terhadap setiap jengkal komitmen proyek.
            </p>
          </div>
        </div>

        <MilestoneTimeline :items="milestones" />
      </div>
    </section>

    <!-- 8. Dokumentasi Galeri Lapangan (High-Res Operations) -->
    <section v-if="gallery.length" class="section">
      <div class="container-page">
        <div class="text-center max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2.5">
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
              {{ locale === 'en' ? 'OPERATIONAL DOCUMENTATION' : 'DOKUMENTASI OPERASIONAL' }}
            </span>
            <span class="inline-block h-[3px] w-8 rounded-full bg-accent-500" />
          </div>

          <h2 class="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ $t('profile.galleryTitle') }}
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {{ $t('profile.galleryBody') }}
          </p>
        </div>

        <div class="mt-10">
          <GalleryCarousel :images="gallery" />
        </div>
      </div>
    </section>

    <!-- 9. Executive CTA Banner -->
    <CtaBanner
      :heading="locale === 'en' ? 'Ready to Partner with LMP on Your Next Project?' : 'Siap Bermitra dengan PT Lobunta Mandiri Persada?'"
      :body="locale === 'en'
        ? 'Discuss your mining, earth moving, or civil engineering requirements with our expert team.'
        : 'Diskusikan kebutuhan proyek pertambangan, konstruksi sipil, dan penyewaan alat berat Anda bersama tim ahli kami.'
      "
      :button-label="t('nav.contact')"
      button-to="/contact"
      :secondary-label="locale === 'en' ? 'Explore Projects' : 'Lihat Portofolio Proyek'"
      secondary-to="/projects"
    />
  </div>
</template>
