<script setup lang="ts">
import type { HomeContent, ProjectItem } from '~/types/content'
import type { IntegratedServiceItem } from '~/components/IntegratedServiceCard.vue'
import { useScopeOfWork } from '~/composables/useScopeOfWork'

const { locale, t } = useI18n()
const milestones = useMilestones()
const { divisions: scopeDivisions, allServices } = useScopeOfWork()

const { data: home } = await useCms<HomeContent>('home', 'home')
const { data: projects } = await useCms<ProjectItem[]>('projects', 'all')
const { data: settings } = await useCompany()

const featuredProjects = computed(() => projects.value.slice(0, 3))

const showScopeOfWork = computed(() => scopeDivisions.length > 0 && allServices.length > 0)

const integratedServices = computed<IntegratedServiceItem[]>(() => [
  {
    id: 'mining',
    title: locale.value === 'en' ? 'Mining Contractor' : 'Kontraktor Pertambangan',
    description: locale.value === 'en'
      ? 'Mining contractor services backed by fleet capacity, expert personnel, and proven experience.'
      : 'Jasa kontraktor pertambangan dengan dukungan armada, tenaga ahli, dan pengalaman yang andal.',
    image: '/img/lmp/card-mining.jpg',
    icon: 'mountain',
    to: `/${locale.value}/products?category=pertambangan`
  },
  {
    id: 'civil',
    title: locale.value === 'en' ? 'Civil Construction' : 'Konstruksi Sipil',
    description: locale.value === 'en'
      ? 'Civil construction works to support infrastructure development in various regions of Indonesia.'
      : 'Pekerjaan konstruksi sipil untuk mendukung pembangunan infrastruktur di berbagai wilayah Indonesia.',
    image: '/img/lmp/card-civil.jpg',
    icon: 'bridge',
    to: `/${locale.value}/products?category=konstruksi-sipil`
  },
  {
    id: 'rental',
    title: locale.value === 'en' ? 'Heavy Equipment Rental' : 'Penyewaan Alat Berat',
    description: locale.value === 'en'
      ? 'Provision and rental of diverse heavy equipment to support mining and civil construction projects.'
      : 'Penyediaan dan penyewaan berbagai alat berat untuk mendukung proyek pertambangan dan konstruksi sipil.',
    image: '/img/lmp/card-rental.jpg',
    icon: 'excavator',
    to: `/${locale.value}/units`
  },
  {
    id: 'hauling',
    title: locale.value === 'en' ? 'Hauling & Mining Logistics' : 'Pengangkutan & Hauling',
    description: locale.value === 'en'
      ? 'Short-to-medium hauling and transport of mining materials with high-capacity dump truck fleets.'
      : 'Layanan pengangkutan dan hauling material tambang jarak dekat hingga menengah dengan armada dump truck berkapasitas tinggi.',
    image: '/img/lmp/card-hauling.jpg',
    icon: 'truck-dump',
    to: `/${locale.value}/products?category=hauling-logistik`
  }
])

useSeoMeta({
  title: () => t('meta.homeTitle'),
  description: () => t('meta.homeDescription'),
  ogTitle: () => t('meta.homeTitle'),
  ogDescription: () => t('meta.homeDescription'),
  ogType: 'website'
})
</script>

<template>
  <div>
    <HomeHero :hero="home.hero" />

    <!-- Layanan Terintegrasi (4 Card Layanan Sesuai Desain) -->
    <section class="section bg-[#faf9f5] dark:bg-brand-950/60 border-b border-stone-200/60 dark:border-white/5">
      <div class="container-page">
        <div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ locale === 'en' ? 'Integrated Services' : 'Layanan Terintegrasi' }}
          </h2>
          <div class="mt-3 h-1 w-14 rounded-full bg-accent-500" />
        </div>

        <div class="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2">
          <IntegratedServiceCard
            v-for="service in integratedServices"
            :key="service.id"
            :service="service"
          />
        </div>
      </div>
    </section>

    <!-- Scope of Work Section -->
    <section v-if="showScopeOfWork" class="section">
      <div class="container-page">
        <UiSectionHeading
          :heading="$t('home.scopeTitle')"
          :body="$t('home.scopeBody')"
        />
        
        <!-- Mining Services -->
        <div class="mb-12">
          <h3 class="text-2xl font-bold mb-6">
            {{ $t('home.scopeMining') }}
          </h3>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="service in scopeDivisions.find(d => d.key === 'mining')?.services || []"
              :key="service.code"
              class="card p-4 hover:shadow-lg transition-shadow"
            >
              <span class="chip font-mono">{{ service.code }}</span>
              <h4 class="mt-3 font-semibold text-sm">
                {{ locale === 'en' ? service.titleEn : service.titleId }}
              </h4>
              <p class="mt-2 text-xs text-ink-soft dark:text-slate-400">
                {{ locale === 'en' ? service.descriptionEn : service.descriptionId }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Civil Services -->
        <div>
          <h3 class="text-2xl font-bold mb-6">
            {{ $t('home.scopeCivil') }}
          </h3>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="service in scopeDivisions.find(d => d.key === 'civil')?.services || []"
              :key="service.code"
              class="card p-4 hover:shadow-lg transition-shadow"
            >
              <span class="chip font-mono">{{ service.code }}</span>
              <h4 class="mt-3 font-semibold text-sm">
                {{ locale === 'en' ? service.titleEn : service.titleId }}
              </h4>
              <p class="mt-2 text-xs text-ink-soft dark:text-slate-400">
                {{ locale === 'en' ? service.descriptionEn : service.descriptionId }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="featuredProjects.length" class="section section-alt">
      <div class="container-page">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <UiSectionHeading
            :eyebrow="$t('nav.projects')"
            :heading="$t('home.projectsTitle')"
            :body="$t('home.projectsBody')"
          />
          <NuxtLink :to="`/${locale}/projects`" class="btn-outline">
            {{ $t('home.projectsAll') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>

    <section v-if="home.customers.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.customers')"
          :heading="$t('customers.title')"
          :body="$t('customers.intro')"
        />
        <div class="mt-10">
          <CustomerGrid :items="home.customers" />
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="$t('home.aboutHeading')"
          :body="$t('home.aboutBody')"
        />
        <MilestoneTimeline :items="milestones" />
      </div>
    </section>

    <CtaBanner
      :heading="$t('home.ctaHeading')"
      :body="$t('home.ctaBody')"
      :button-label="$t('home.ctaButton')"
      button-to="/contact"
      :secondary-label="$t('nav.profile')"
      secondary-to="/profile"
    />
  </div>
</template>
