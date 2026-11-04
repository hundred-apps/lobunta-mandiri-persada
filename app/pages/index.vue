<script setup lang="ts">
import type { HomeContent, ProjectItem, ServiceItem } from '~/types/content'
import { useScopeOfWork } from '~/composables/useScopeOfWork'

const { locale, t } = useI18n()
const milestones = useMilestones()
const { divisions: scopeDivisions, allServices } = useScopeOfWork()

const { data: home } = await useCms<HomeContent>('home', 'home')
const { data: services } = await useCms<ServiceItem[]>('services', 'all')
const { data: projects } = await useCms<ProjectItem[]>('projects', 'all')
const { data: settings } = await useCompany()

const featuredProjects = computed(() => projects.value.slice(0, 3))

const showScopeOfWork = computed(() => scopeDivisions.length > 0 && allServices.length > 0)

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

    <section v-if="home.categories.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.primary')"
          :heading="$t('home.divisionsTitle')"
          :body="$t('home.divisionsBody')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            v-for="category in home.categories"
            :key="category.id"
            :category="category"
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

    <section v-if="services.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.services')"
          :heading="$t('services.heading')"
          :body="$t('services.intro')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
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
