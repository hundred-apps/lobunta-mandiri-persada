<script setup lang="ts">
import {
  lmpCivilProjects,
  lmpCivilScope,
  lmpCustomers,
  lmpDivisions,
  lmpHero,
  lmpMiningProjects,
  lmpMiningScope,
  lmpSettings,
  lmpStats
} from '~/content/lmp'

const { locale, t } = useI18n()
const milestones = useMilestones()

const highlightProjects = computed(() => [
  ...lmpMiningProjects.slice(0, 2),
  ...lmpCivilProjects.slice(0, 2)
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
    <HomeHero :hero="lmpHero" />

    <section v-if="lmpStats.length" class="relative z-10 -mt-8">
      <div class="container-page">
        <div
          class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-card dark:border-white/10 dark:bg-white/10 lg:grid-cols-4"
        >
          <div
            v-for="stat in lmpStats"
            :key="stat.label.id"
            class="bg-white p-6 text-center dark:bg-brand-900/60"
          >
            <p class="font-display text-2xl font-black text-brand-600 dark:text-brand-300 sm:text-3xl">
              {{ stat.value }}
            </p>
            <p class="mt-1 text-xs uppercase tracking-wider text-ink-mute">
              {{ pick(stat.label) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.primary')"
          :heading="$t('home.divisionsTitle')"
          :body="$t('home.divisionsBody')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            v-for="division in lmpDivisions"
            :key="division.id"
            :service="division"
          />
        </div>
        <div class="mt-10 flex justify-center">
          <NuxtLink :to="`/${locale}/profile`" class="btn-primary">
            {{ $t('common.learnMore') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <UiSectionHeading
            :heading="$t('home.scopeTitle')"
            :body="$t('home.scopeBody')"
          />
          <div class="mt-6 grid gap-6 sm:grid-cols-2">
            <div class="card p-5">
              <p class="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                {{ $t('home.scopeMining') }}
              </p>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="item in lmpMiningScope"
                  :key="item.id"
                  class="flex items-start gap-2.5 text-sm text-ink-soft dark:text-slate-300"
                >
                  <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600" />
                  <span>{{ pick(item) }}</span>
                </li>
              </ul>
            </div>
            <div class="card p-5">
              <p class="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                {{ $t('home.scopeCivil') }}
              </p>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="item in lmpCivilScope"
                  :key="item.id"
                  class="flex items-start gap-2.5 text-sm text-ink-soft dark:text-slate-300"
                >
                  <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600" />
                  <span>{{ pick(item) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <UiSectionHeading
            :heading="$t('home.fleetTitle')"
            :body="$t('home.fleetBody')"
          />
          <div class="mt-6 grid gap-4 sm:grid-cols-2">
            <div v-for="item in lmpSettings.gallery.slice(0, 4)" :key="item" class="overflow-hidden rounded-2xl border border-slate-200 shadow-card dark:border-white/10">
              <img :src="item" :alt="$t('home.fleetTitle')" class="aspect-[4/3] w-full object-cover" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="$t('home.projectsTitle')"
          :body="$t('home.projectsBody')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <article v-for="project in highlightProjects" :key="pick(project.title)" class="card flex flex-col p-6">
            <h3 class="text-lg">
              {{ pick(project.title) }}
            </h3>
            <p class="mt-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
              {{ pick(project.client) }}
            </p>
            <p class="mt-1 text-xs text-ink-mute">
              {{ pick(project.location) }}
            </p>
            <p class="prose-lkr mt-3 text-sm">
              {{ pick(project.scope) }}
            </p>
            <p v-if="project.value" class="mt-3 text-xs font-semibold text-ink-soft dark:text-slate-300">
              {{ pick(project.value) }}
            </p>
          </article>
        </div>
        <div class="mt-10 flex justify-center">
          <NuxtLink :to="`/${locale}/profile`" class="btn-outline">
            {{ $t('home.projectsAll') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
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

    <section v-if="lmpCustomers.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.customers')"
          :heading="$t('customers.title')"
          :body="$t('customers.intro')"
        />
        <div class="mt-10">
          <CustomerGrid :items="lmpCustomers" />
        </div>
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
