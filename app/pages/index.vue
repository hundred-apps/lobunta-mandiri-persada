<script setup lang="ts">
import type { CustomerItem, HomeContent, ProjectItem } from '~/types/content'
import type { IntegratedServiceItem } from '~/components/IntegratedServiceCard.vue'
import { useScopeOfWork } from '~/composables/useScopeOfWork'

const { locale, t } = useI18n()
const milestones = useMilestones()
const { divisions: scopeDivisions, allServices } = useScopeOfWork()

const { data: home } = await useCms<HomeContent>('home', 'home')
const { data: projects } = await useCms<ProjectItem[]>('projects', 'all')
const { data: customers } = await useCms<CustomerItem[]>('customers', 'all')
const { data: settings } = await useCompany()

const showScopeOfWork = computed(() => scopeDivisions.length > 0 && allServices.length > 0)

const LMP_SERVICE_IMAGES = [
  '/img/lmp/card-mining.jpg',
  '/img/lmp/card-civil.jpg',
  '/img/lmp/card-rental.jpg',
  '/img/lmp/card-hauling.jpg',
  '/img/lmp/mining-1.jpg',
  '/img/lmp/civil-1.jpg',
  '/img/lmp/mining-2.jpg',
  '/img/lmp/civil-2.jpg'
]

/** Layanan dari API (kategori layanan) untuk section Layanan Lobunta Mandiri Persada */
const integratedServices = computed<IntegratedServiceItem[]>(() =>
  (home.value.categories || []).map((cat, idx) => ({
    id: cat.slug,
    title: pick(cat.name),
    description: pick(cat.description),
    image: cat.image || LMP_SERVICE_IMAGES[idx % LMP_SERVICE_IMAGES.length] || '/img/lmp/card-mining.jpg',
    icon: cat.icon || 'lab',
    to: `/${locale.value}/products?category=${cat.slug}`
  }))
)

const miningProjects = computed(() => projects.value.filter((p) => p.type === 'mining').slice(0, 4))
const civilProjects = computed(() => projects.value.filter((p) => p.type === 'civil').slice(0, 4))
const hasProjects = computed(() => miningProjects.value.length > 0 || civilProjects.value.length > 0)

const miningCustomers = computed(() => customers.value.filter((c) => c.type === 'mining').slice(0, 4))
const civilCustomers = computed(() => customers.value.filter((c) => c.type === 'civil').slice(0, 4))
const hasCustomers = computed(() => miningCustomers.value.length > 0 || civilCustomers.value.length > 0)

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

    <!-- Layanan Lobunta Mandiri Persada (dari API) -->
    <section v-if="integratedServices.length" class="section bg-[#faf9f5] dark:bg-brand-950/60 border-b border-stone-200/60 dark:border-white/5">
      <div class="container-page">
        <div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-950 dark:text-white">
            {{ $t('home.integratedTitle') }}
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

        <div class="mt-10 grid gap-8 lg:grid-cols-2">
          <!-- Mining -->
          <div>
            <h3 class="mb-5 text-xl font-bold sm:text-2xl">
              {{ $t('home.scopeMining') }}
            </h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="service in scopeDivisions.find(d => d.key === 'mining')?.services || []"
                :key="service.code"
                class="card p-4 transition-shadow hover:shadow-lg"
              >
                <span class="chip font-mono">{{ service.code }}</span>
                <h4 class="mt-3 text-sm font-semibold">
                  {{ locale === 'en' ? service.titleEn : service.titleId }}
                </h4>
                <p class="mt-2 text-xs text-ink-soft dark:text-slate-400">
                  {{ locale === 'en' ? service.descriptionEn : service.descriptionId }}
                </p>
              </div>
            </div>
          </div>

          <!-- Civil -->
          <div>
            <h3 class="mb-5 text-xl font-bold sm:text-2xl">
              {{ $t('home.scopeCivil') }}
            </h3>
            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="service in scopeDivisions.find(d => d.key === 'civil')?.services || []"
                :key="service.code"
                class="card p-4 transition-shadow hover:shadow-lg"
              >
                <span class="chip font-mono">{{ service.code }}</span>
                <h4 class="mt-3 text-sm font-semibold">
                  {{ locale === 'en' ? service.titleEn : service.titleId }}
                </h4>
                <p class="mt-2 text-xs text-ink-soft dark:text-slate-400">
                  {{ locale === 'en' ? service.descriptionEn : service.descriptionId }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="hasProjects" class="section section-alt">
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

        <div class="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 class="mb-5 text-xl font-bold sm:text-2xl">
              {{ $t('home.scopeMining') }}
            </h3>
            <div class="grid auto-rows-fr grid-cols-2 gap-4 sm:gap-5">
              <ProjectCard
                v-for="project in miningProjects"
                :key="project.id"
                :project="project"
              />
              <p v-if="!miningProjects.length" class="col-span-2 text-sm text-ink-soft dark:text-slate-400">
                {{ $t('projects.empty') }}
              </p>
            </div>
          </div>

          <div>
            <h3 class="mb-5 text-xl font-bold sm:text-2xl">
              {{ $t('home.scopeCivil') }}
            </h3>
            <div class="grid auto-rows-fr grid-cols-2 gap-4 sm:gap-5">
              <ProjectCard
                v-for="project in civilProjects"
                :key="project.id"
                :project="project"
              />
              <p v-if="!civilProjects.length" class="col-span-2 text-sm text-ink-soft dark:text-slate-400">
                {{ $t('projects.empty') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="hasCustomers" class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.customers')"
          :heading="$t('customers.title')"
          :body="$t('customers.intro')"
        />
        <div class="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 class="mb-5 text-xl font-bold sm:text-2xl">
              {{ $t('home.scopeMining') }}
            </h3>
            <ul class="grid auto-rows-fr grid-cols-2 gap-4">
              <li
                v-for="item in miningCustomers"
                :key="item.id"
                class="group flex h-full min-h-[168px] flex-col items-center gap-3 rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
              >
                <span class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-stone-200/80 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-brand-950">
                  <img v-if="item.logo" :src="item.logo" :alt="item.name" class="h-full w-full object-contain" loading="lazy">
                  <span v-else class="font-display text-sm font-extrabold text-brand-900 dark:text-accent-400">
                    {{ item.name.slice(0, 2).toUpperCase() }}
                  </span>
                </span>
                <span class="flex min-w-0 flex-1 flex-col justify-center">
                  <span class="block font-display text-sm font-bold leading-snug text-brand-950 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                    {{ item.name }}
                  </span>
                  <span class="mt-1 block min-h-[2rem] text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                    {{ pick(item.industry) || '\u00A0' }}
                  </span>
                </span>
              </li>
              <li v-if="!miningCustomers.length" class="col-span-2 text-sm text-ink-soft dark:text-slate-400">
                {{ $t('products.empty') }}
              </li>
            </ul>
          </div>

          <div>
            <h3 class="mb-5 text-xl font-bold sm:text-2xl">
              {{ $t('home.scopeCivil') }}
            </h3>
            <ul class="grid auto-rows-fr grid-cols-2 gap-4">
              <li
                v-for="item in civilCustomers"
                :key="item.id"
                class="group flex h-full min-h-[168px] flex-col items-center gap-3 rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-400 hover:shadow-lg dark:border-white/10 dark:bg-brand-900/40"
              >
                <span class="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-stone-200/80 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-brand-950">
                  <img v-if="item.logo" :src="item.logo" :alt="item.name" class="h-full w-full object-contain" loading="lazy">
                  <span v-else class="font-display text-sm font-extrabold text-brand-900 dark:text-accent-400">
                    {{ item.name.slice(0, 2).toUpperCase() }}
                  </span>
                </span>
                <span class="flex min-w-0 flex-1 flex-col justify-center">
                  <span class="block font-display text-sm font-bold leading-snug text-brand-950 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                    {{ item.name }}
                  </span>
                  <span class="mt-1 block min-h-[2rem] text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
                    {{ pick(item.industry) || '\u00A0' }}
                  </span>
                </span>
              </li>
              <li v-if="!civilCustomers.length" class="col-span-2 text-sm text-ink-soft dark:text-slate-400">
                {{ $t('products.empty') }}
              </li>
            </ul>
          </div>
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
